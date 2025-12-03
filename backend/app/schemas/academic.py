from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime


class SubjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    curriculum_code: Optional[str] = None
    year_level: int

    @field_validator("year_level")
    @classmethod
    def validate_year_level(cls, v: int) -> int:
        if v < 1 or v > 12:
            raise ValueError("Year level must be between 1 and 12")
        return v


class SubjectCreate(SubjectBase):
    pass


class SubjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    curriculum_code: Optional[str] = None
    year_level: Optional[int] = None


class SubjectResponse(SubjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ClassBase(BaseModel):
    subject_id: int
    name: str
    start_time: datetime
    end_time: datetime
    teacher_name: str
    meet_link: Optional[str] = None
    recurring: bool = False
    recurrence_rule: Optional[str] = None
    max_students: int = 20


class ClassCreate(ClassBase):
    pass


class ClassUpdate(BaseModel):
    subject_id: Optional[int] = None
    name: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    teacher_name: Optional[str] = None
    meet_link: Optional[str] = None
    recurring: Optional[bool] = None
    recurrence_rule: Optional[str] = None
    max_students: Optional[int] = None


class ClassResponse(ClassBase):
    id: int
    created_at: datetime
    updated_at: datetime
    subject: Optional[SubjectResponse] = None
    enrollment_count: Optional[int] = None

    class Config:
        from_attributes = True


class EnrollmentBase(BaseModel):
    class_id: int
    student_id: str


class EnrollmentCreate(EnrollmentBase):
    pass


class EnrollmentResponse(EnrollmentBase):
    id: int
    enrolled_at: datetime
    status: str

    class Config:
        from_attributes = True
