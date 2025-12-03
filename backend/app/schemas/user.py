from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    ADMIN = "admin"
    PARENT = "parent"
    STUDENT = "student"


class ProfileBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None


class ProfileCreate(ProfileBase):
    role: UserRole = UserRole.STUDENT
    password: str


class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    role: Optional[UserRole] = None


class ProfileResponse(ProfileBase):
    id: str
    role: UserRole
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class RelationshipResponse(BaseModel):
    id: int
    parent_id: str
    student_id: str
    created_at: datetime
    student: Optional[ProfileResponse] = None

    class Config:
        from_attributes = True
