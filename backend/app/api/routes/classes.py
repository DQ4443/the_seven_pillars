from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import Optional
from app.core.security import get_current_user, require_admin, TokenData
from app.core.supabase import supabase_client
from app.schemas.academic import (
    SubjectCreate,
    SubjectUpdate,
    SubjectResponse,
    ClassCreate,
    ClassUpdate,
    ClassResponse,
)

router = APIRouter()


# ============================================
# SUBJECTS
# ============================================


@router.get("/subjects", response_model=list[SubjectResponse])
async def list_subjects(year_level: Optional[int] = Query(None, ge=1, le=12)):
    """List all subjects, optionally filtered by year level."""
    query = supabase_client.table("subjects").select("*").order("year_level").order("name")

    if year_level:
        query = query.eq("year_level", year_level)

    response = query.execute()
    return response.data


@router.post("/subjects", response_model=SubjectResponse, status_code=status.HTTP_201_CREATED)
async def create_subject(subject: SubjectCreate, _: TokenData = Depends(require_admin)):
    """Create a new subject (admin only)."""
    response = supabase_client.table("subjects").insert(subject.model_dump()).execute()

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create subject"
        )

    return response.data[0]


@router.get("/subjects/{subject_id}", response_model=SubjectResponse)
async def get_subject(subject_id: int):
    """Get a specific subject."""
    response = supabase_client.table("subjects").select("*").eq("id", subject_id).single().execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subject not found")

    return response.data


@router.patch("/subjects/{subject_id}", response_model=SubjectResponse)
async def update_subject(
    subject_id: int,
    subject_update: SubjectUpdate,
    _: TokenData = Depends(require_admin),
):
    """Update a subject (admin only)."""
    update_data = subject_update.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    response = supabase_client.table("subjects").update(update_data).eq("id", subject_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subject not found")

    return response.data[0]


@router.delete("/subjects/{subject_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subject(subject_id: int, _: TokenData = Depends(require_admin)):
    """Delete a subject (admin only)."""
    response = supabase_client.table("subjects").delete().eq("id", subject_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subject not found")


# ============================================
# CLASSES
# ============================================


@router.get("/", response_model=list[ClassResponse])
async def list_classes(
    subject_id: Optional[int] = None,
    upcoming_only: bool = False,
):
    """List all classes."""
    query = supabase_client.table("classes").select("*, subject:subjects(*)")

    if subject_id:
        query = query.eq("subject_id", subject_id)

    if upcoming_only:
        from datetime import datetime

        query = query.gte("start_time", datetime.utcnow().isoformat())

    response = query.order("start_time").execute()
    return response.data


@router.post("/", response_model=ClassResponse, status_code=status.HTTP_201_CREATED)
async def create_class(class_data: ClassCreate, _: TokenData = Depends(require_admin)):
    """Create a new class (admin only)."""
    response = supabase_client.table("classes").insert(class_data.model_dump()).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create class")

    return response.data[0]


@router.get("/{class_id}", response_model=ClassResponse)
async def get_class(class_id: int):
    """Get a specific class."""
    response = (
        supabase_client.table("classes")
        .select("*, subject:subjects(*)")
        .eq("id", class_id)
        .single()
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")

    # Get enrollment count
    enrollment_count = (
        supabase_client.table("enrollments")
        .select("id", count="exact")
        .eq("class_id", class_id)
        .eq("status", "active")
        .execute()
    )

    result = response.data
    result["enrollment_count"] = enrollment_count.count

    return result


@router.patch("/{class_id}", response_model=ClassResponse)
async def update_class(
    class_id: int,
    class_update: ClassUpdate,
    _: TokenData = Depends(require_admin),
):
    """Update a class (admin only)."""
    update_data = class_update.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    response = supabase_client.table("classes").update(update_data).eq("id", class_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")

    return response.data[0]


@router.delete("/{class_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_class(class_id: int, _: TokenData = Depends(require_admin)):
    """Delete a class (admin only)."""
    response = supabase_client.table("classes").delete().eq("id", class_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Class not found")
