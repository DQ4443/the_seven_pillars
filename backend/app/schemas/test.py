from pydantic import BaseModel, field_validator
from typing import Optional, Any
from datetime import datetime
from enum import Enum


class QuestionType(str, Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    SHORT_ANSWER = "short_answer"
    ESSAY = "essay"


class SubmissionStatus(str, Enum):
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    GRADED = "graded"


class TestBase(BaseModel):
    title: str
    description: Optional[str] = None
    year_level: int
    time_limit_minutes: int = 60
    is_active: bool = True

    @field_validator("year_level")
    @classmethod
    def validate_year_level(cls, v: int) -> int:
        if v < 1 or v > 12:
            raise ValueError("Year level must be between 1 and 12")
        return v


class TestCreate(TestBase):
    pass


class TestUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    year_level: Optional[int] = None
    time_limit_minutes: Optional[int] = None
    is_active: Optional[bool] = None


class TestResponse(TestBase):
    id: int
    created_at: datetime
    updated_at: datetime
    question_count: Optional[int] = None

    class Config:
        from_attributes = True


class QuestionBase(BaseModel):
    question_text: str
    question_type: QuestionType
    options: Optional[dict[str, Any]] = None
    correct_answer: Optional[str] = None
    points: int = 1
    order_index: int


class QuestionCreate(QuestionBase):
    test_id: int


class QuestionResponse(QuestionBase):
    id: int
    test_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class SubmissionBase(BaseModel):
    test_id: int


class SubmissionCreate(SubmissionBase):
    pass


class SubmissionResponse(SubmissionBase):
    id: int
    student_id: str
    started_at: datetime
    submitted_at: Optional[datetime] = None
    score: Optional[int] = None
    max_score: Optional[int] = None
    graded_by: Optional[str] = None
    graded_at: Optional[datetime] = None
    status: SubmissionStatus

    class Config:
        from_attributes = True


class AnswerBase(BaseModel):
    question_id: int
    answer_text: Optional[str] = None


class AnswerCreate(AnswerBase):
    submission_id: int


class AnswerResponse(AnswerBase):
    id: int
    submission_id: int
    is_correct: Optional[bool] = None
    points_awarded: Optional[int] = None
    feedback: Optional[str] = None

    class Config:
        from_attributes = True
