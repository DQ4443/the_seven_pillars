from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import Optional
from app.core.security import get_current_user, require_admin, TokenData
from app.core.supabase import supabase_client
from app.schemas.resource import ResourceCreate, ResourceResponse

router = APIRouter()


@router.get("/", response_model=list[ResourceResponse])
async def list_resources(
    current_user: TokenData = Depends(get_current_user),
    student_id: Optional[str] = None,
    class_id: Optional[int] = None,
    public_only: bool = False,
):
    """List resources based on user role and filters."""
    query = supabase_client.table("resources").select("*")

    if public_only:
        query = query.eq("is_public", True)
    elif current_user.role == "admin":
        # Admins can see all resources
        if student_id:
            query = query.eq("student_id", student_id)
        if class_id:
            query = query.eq("class_id", class_id)
    elif current_user.role == "parent":
        # Parents can see their children's resources
        children = (
            supabase_client.table("relationships")
            .select("student_id")
            .eq("parent_id", current_user.sub)
            .execute()
        )
        child_ids = [r["student_id"] for r in children.data]

        if student_id:
            if student_id not in child_ids:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Not authorized to view this student's resources",
                )
            query = query.eq("student_id", student_id)
        else:
            query = query.or_(
                f"student_id.in.({','.join(child_ids)}),is_public.eq.true"
            )
    else:
        # Students can see their own resources and public resources
        query = query.or_(f"student_id.eq.{current_user.sub},is_public.eq.true")

    if class_id:
        query = query.eq("class_id", class_id)

    response = query.order("uploaded_at", desc=True).execute()
    return response.data


@router.get("/{resource_id}", response_model=ResourceResponse)
async def get_resource(resource_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get a specific resource."""
    response = (
        supabase_client.table("resources")
        .select("*")
        .eq("id", resource_id)
        .single()
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")

    resource = response.data

    # Check access
    if current_user.role == "admin":
        pass  # Admin can access all
    elif resource["is_public"]:
        pass  # Public resource
    elif resource["student_id"] == current_user.sub:
        pass  # Own resource
    elif current_user.role == "parent":
        # Check if it's their child's resource
        relationship = (
            supabase_client.table("relationships")
            .select("id")
            .eq("parent_id", current_user.sub)
            .eq("student_id", resource["student_id"])
            .execute()
        )
        if not relationship.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this resource",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this resource",
        )

    return resource


@router.post("/", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
async def create_resource(
    resource: ResourceCreate,
    current_user: TokenData = Depends(require_admin),
):
    """Create a resource (admin only)."""
    data = resource.model_dump()
    data["uploaded_by"] = current_user.sub

    response = supabase_client.table("resources").insert(data).execute()

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create resource",
        )

    return response.data[0]


@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resource(resource_id: int, _: TokenData = Depends(require_admin)):
    """Delete a resource (admin only)."""
    response = supabase_client.table("resources").delete().eq("id", resource_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
