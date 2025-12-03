from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user, require_admin, TokenData
from app.core.supabase import supabase_client
from app.schemas.academic import EnrollmentCreate, EnrollmentResponse

router = APIRouter()


@router.get("/me", response_model=list[EnrollmentResponse])
async def get_my_enrollments(current_user: TokenData = Depends(get_current_user)):
    """Get current student's enrollments."""
    response = (
        supabase_client.table("enrollments")
        .select("*")
        .eq("student_id", current_user.sub)
        .order("enrolled_at", desc=True)
        .execute()
    )
    return response.data


@router.get("/student/{student_id}", response_model=list[EnrollmentResponse])
async def get_student_enrollments(
    student_id: str,
    current_user: TokenData = Depends(get_current_user),
):
    """Get a student's enrollments (parents can view their children's)."""
    # Check if user is admin
    if current_user.role == "admin":
        pass  # Admin can view all
    elif current_user.role == "parent":
        # Check if student is a child of this parent
        relationship = (
            supabase_client.table("relationships")
            .select("id")
            .eq("parent_id", current_user.sub)
            .eq("student_id", student_id)
            .execute()
        )
        if not relationship.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this student's enrollments",
            )
    elif current_user.sub != student_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this student's enrollments",
        )

    response = (
        supabase_client.table("enrollments")
        .select("*")
        .eq("student_id", student_id)
        .order("enrolled_at", desc=True)
        .execute()
    )
    return response.data


@router.get("/class/{class_id}", response_model=list[EnrollmentResponse])
async def get_class_enrollments(class_id: int, _: TokenData = Depends(require_admin)):
    """Get all enrollments for a class (admin only)."""
    response = (
        supabase_client.table("enrollments")
        .select("*")
        .eq("class_id", class_id)
        .order("enrolled_at")
        .execute()
    )
    return response.data


@router.post("/", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
async def create_enrollment(
    enrollment: EnrollmentCreate,
    _: TokenData = Depends(require_admin),
):
    """Create an enrollment (admin only)."""
    # Check class capacity
    class_info = (
        supabase_client.table("classes")
        .select("max_students")
        .eq("id", enrollment.class_id)
        .single()
        .execute()
    )

    if not class_info.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")

    current_count = (
        supabase_client.table("enrollments")
        .select("id", count="exact")
        .eq("class_id", enrollment.class_id)
        .eq("status", "active")
        .execute()
    )

    if current_count.count >= class_info.data["max_students"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Class is full")

    response = supabase_client.table("enrollments").insert(enrollment.model_dump()).execute()

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create enrollment",
        )

    return response.data[0]


@router.patch("/{enrollment_id}/status")
async def update_enrollment_status(
    enrollment_id: int,
    new_status: str,
    _: TokenData = Depends(require_admin),
):
    """Update enrollment status (admin only)."""
    if new_status not in ["active", "withdrawn", "completed"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid status")

    response = (
        supabase_client.table("enrollments")
        .update({"status": new_status})
        .eq("id", enrollment_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")

    return response.data[0]


@router.delete("/{enrollment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_enrollment(enrollment_id: int, _: TokenData = Depends(require_admin)):
    """Delete an enrollment (admin only)."""
    response = supabase_client.table("enrollments").delete().eq("id", enrollment_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
