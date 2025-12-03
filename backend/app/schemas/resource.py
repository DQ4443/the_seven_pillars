from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None
    file_type: Optional[str] = None
    is_public: bool = False


class ResourceCreate(ResourceBase):
    file_url: str
    file_size: Optional[int] = None
    student_id: Optional[str] = None
    class_id: Optional[int] = None


class ResourceResponse(ResourceBase):
    id: int
    file_url: str
    file_size: Optional[int] = None
    student_id: Optional[str] = None
    class_id: Optional[int] = None
    uploaded_by: str
    uploaded_at: datetime

    class Config:
        from_attributes = True
