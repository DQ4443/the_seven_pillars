from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user, require_admin, TokenData
from app.core.supabase import supabase_client
from app.schemas.user import (
    ProfileResponse,
    ProfileUpdate,
    RelationshipResponse,
)

router = APIRouter()


@router.get("/me", response_model=ProfileResponse)
async def get_current_profile(current_user: TokenData = Depends(get_current_user)):
    """Get current user's profile."""
    response = supabase_client.table("profiles").select("*").eq("id", current_user.sub).single().execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    return response.data


@router.patch("/me", response_model=ProfileResponse)
async def update_current_profile(
    profile_update: ProfileUpdate,
    current_user: TokenData = Depends(get_current_user),
):
    """Update current user's profile."""
    update_data = profile_update.model_dump(exclude_unset=True, exclude={"role"})

    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    response = (
        supabase_client.table("profiles")
        .update(update_data)
        .eq("id", current_user.sub)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    return response.data[0]


@router.get("/", response_model=list[ProfileResponse])
async def list_users(_: TokenData = Depends(require_admin)):
    """List all users (admin only)."""
    response = supabase_client.table("profiles").select("*").order("created_at", desc=True).execute()
    return response.data


@router.get("/{user_id}", response_model=ProfileResponse)
async def get_user(user_id: str, _: TokenData = Depends(require_admin)):
    """Get a specific user's profile (admin only)."""
    response = supabase_client.table("profiles").select("*").eq("id", user_id).single().execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return response.data


@router.patch("/{user_id}", response_model=ProfileResponse)
async def update_user(
    user_id: str,
    profile_update: ProfileUpdate,
    _: TokenData = Depends(require_admin),
):
    """Update a user's profile (admin only)."""
    update_data = profile_update.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    response = supabase_client.table("profiles").update(update_data).eq("id", user_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return response.data[0]


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: str, _: TokenData = Depends(require_admin)):
    """Delete a user (admin only)."""
    response = supabase_client.table("profiles").delete().eq("id", user_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


@router.get("/me/children", response_model=list[RelationshipResponse])
async def get_my_children(current_user: TokenData = Depends(get_current_user)):
    """Get current parent's children."""
    response = (
        supabase_client.table("relationships")
        .select("*, student:profiles!student_id(*)")
        .eq("parent_id", current_user.sub)
        .execute()
    )
    return response.data


@router.post("/{parent_id}/children/{student_id}", response_model=RelationshipResponse)
async def add_child_relationship(
    parent_id: str,
    student_id: str,
    _: TokenData = Depends(require_admin),
):
    """Add a parent-child relationship (admin only)."""
    response = (
        supabase_client.table("relationships")
        .insert({"parent_id": parent_id, "student_id": student_id})
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create relationship",
        )

    return response.data[0]


@router.delete("/{parent_id}/children/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_child_relationship(
    parent_id: str,
    student_id: str,
    _: TokenData = Depends(require_admin),
):
    """Remove a parent-child relationship (admin only)."""
    response = (
        supabase_client.table("relationships")
        .delete()
        .eq("parent_id", parent_id)
        .eq("student_id", student_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Relationship not found")
