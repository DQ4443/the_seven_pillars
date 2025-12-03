from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from app.core.security import get_current_user, require_admin, TokenData
from app.core.supabase import supabase_client
from app.schemas.test import (
    TestCreate,
    TestUpdate,
    TestResponse,
    QuestionCreate,
    QuestionResponse,
    SubmissionCreate,
    SubmissionResponse,
    AnswerCreate,
    AnswerResponse,
)

router = APIRouter()


# ============================================
# TESTS
# ============================================


@router.get("/", response_model=list[TestResponse])
async def list_tests(active_only: bool = True):
    """List entrance tests."""
    query = supabase_client.table("entrance_tests").select("*")

    if active_only:
        query = query.eq("is_active", True)

    response = query.order("year_level").execute()
    return response.data


@router.post("/", response_model=TestResponse, status_code=status.HTTP_201_CREATED)
async def create_test(test: TestCreate, _: TokenData = Depends(require_admin)):
    """Create an entrance test (admin only)."""
    response = supabase_client.table("entrance_tests").insert(test.model_dump()).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create test")

    return response.data[0]


@router.get("/{test_id}", response_model=TestResponse)
async def get_test(test_id: int):
    """Get a specific test."""
    response = (
        supabase_client.table("entrance_tests")
        .select("*")
        .eq("id", test_id)
        .single()
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")

    # Get question count
    question_count = (
        supabase_client.table("test_questions")
        .select("id", count="exact")
        .eq("test_id", test_id)
        .execute()
    )

    result = response.data
    result["question_count"] = question_count.count

    return result


@router.patch("/{test_id}", response_model=TestResponse)
async def update_test(test_id: int, test_update: TestUpdate, _: TokenData = Depends(require_admin)):
    """Update a test (admin only)."""
    update_data = test_update.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    response = (
        supabase_client.table("entrance_tests").update(update_data).eq("id", test_id).execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")

    return response.data[0]


@router.delete("/{test_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_test(test_id: int, _: TokenData = Depends(require_admin)):
    """Delete a test (admin only)."""
    response = supabase_client.table("entrance_tests").delete().eq("id", test_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Test not found")


# ============================================
# QUESTIONS
# ============================================


@router.get("/{test_id}/questions", response_model=list[QuestionResponse])
async def list_questions(test_id: int, _: TokenData = Depends(get_current_user)):
    """List questions for a test."""
    response = (
        supabase_client.table("test_questions")
        .select("*")
        .eq("test_id", test_id)
        .order("order_index")
        .execute()
    )
    return response.data


@router.post("/{test_id}/questions", response_model=QuestionResponse, status_code=status.HTTP_201_CREATED)
async def create_question(
    test_id: int,
    question: QuestionCreate,
    _: TokenData = Depends(require_admin),
):
    """Create a question for a test (admin only)."""
    data = question.model_dump()
    data["test_id"] = test_id

    response = supabase_client.table("test_questions").insert(data).execute()

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create question",
        )

    return response.data[0]


@router.patch("/questions/{question_id}", response_model=QuestionResponse)
async def update_question(
    question_id: int,
    question_text: str | None = None,
    options: dict | None = None,
    correct_answer: str | None = None,
    points: int | None = None,
    _: TokenData = Depends(require_admin),
):
    """Update a question (admin only)."""
    update_data = {}
    if question_text:
        update_data["question_text"] = question_text
    if options:
        update_data["options"] = options
    if correct_answer:
        update_data["correct_answer"] = correct_answer
    if points is not None:
        update_data["points"] = points

    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    response = (
        supabase_client.table("test_questions").update(update_data).eq("id", question_id).execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")

    return response.data[0]


@router.delete("/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_question(question_id: int, _: TokenData = Depends(require_admin)):
    """Delete a question (admin only)."""
    response = supabase_client.table("test_questions").delete().eq("id", question_id).execute()

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")


# ============================================
# SUBMISSIONS
# ============================================


@router.post("/submissions", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
async def start_test(
    submission: SubmissionCreate,
    current_user: TokenData = Depends(get_current_user),
):
    """Start a test (create a submission)."""
    # Check if user already has a submission for this test
    existing = (
        supabase_client.table("test_submissions")
        .select("id")
        .eq("test_id", submission.test_id)
        .eq("student_id", current_user.sub)
        .execute()
    )

    if existing.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already started this test",
        )

    data = submission.model_dump()
    data["student_id"] = current_user.sub

    response = supabase_client.table("test_submissions").insert(data).execute()

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to start test",
        )

    return response.data[0]


@router.get("/submissions/me", response_model=list[SubmissionResponse])
async def get_my_submissions(current_user: TokenData = Depends(get_current_user)):
    """Get current user's test submissions."""
    response = (
        supabase_client.table("test_submissions")
        .select("*")
        .eq("student_id", current_user.sub)
        .order("started_at", desc=True)
        .execute()
    )
    return response.data


@router.get("/submissions/{submission_id}", response_model=SubmissionResponse)
async def get_submission(submission_id: int, current_user: TokenData = Depends(get_current_user)):
    """Get a specific submission."""
    response = (
        supabase_client.table("test_submissions")
        .select("*")
        .eq("id", submission_id)
        .single()
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found")

    submission = response.data

    # Check access
    if current_user.role != "admin" and submission["student_id"] != current_user.sub:
        # Check if parent
        if current_user.role == "parent":
            relationship = (
                supabase_client.table("relationships")
                .select("id")
                .eq("parent_id", current_user.sub)
                .eq("student_id", submission["student_id"])
                .execute()
            )
            if not relationship.data:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Not authorized to view this submission",
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to view this submission",
            )

    return submission


@router.post("/submissions/{submission_id}/submit", response_model=SubmissionResponse)
async def submit_test(submission_id: int, current_user: TokenData = Depends(get_current_user)):
    """Submit a test for grading."""
    # Verify ownership
    submission = (
        supabase_client.table("test_submissions")
        .select("*")
        .eq("id", submission_id)
        .eq("student_id", current_user.sub)
        .single()
        .execute()
    )

    if not submission.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found")

    if submission.data["status"] != "in_progress":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Test has already been submitted",
        )

    # Auto-grade multiple choice and short answer questions
    answers = (
        supabase_client.table("test_answers")
        .select("*, question:test_questions(*)")
        .eq("submission_id", submission_id)
        .execute()
    )

    total_score = 0
    max_score = 0
    needs_manual_grading = False

    for answer in answers.data:
        question = answer["question"]
        max_score += question["points"]

        if question["question_type"] in ["multiple_choice", "short_answer"]:
            if answer["answer_text"] and answer["answer_text"].strip().lower() == question["correct_answer"].strip().lower():
                total_score += question["points"]
                supabase_client.table("test_answers").update({
                    "is_correct": True,
                    "points_awarded": question["points"],
                }).eq("id", answer["id"]).execute()
            else:
                supabase_client.table("test_answers").update({
                    "is_correct": False,
                    "points_awarded": 0,
                }).eq("id", answer["id"]).execute()
        else:
            needs_manual_grading = True

    # Update submission
    update_data = {
        "submitted_at": datetime.utcnow().isoformat(),
        "score": total_score,
        "max_score": max_score,
        "status": "submitted" if needs_manual_grading else "graded",
    }

    if not needs_manual_grading:
        update_data["graded_at"] = datetime.utcnow().isoformat()

    response = (
        supabase_client.table("test_submissions")
        .update(update_data)
        .eq("id", submission_id)
        .execute()
    )

    return response.data[0]


# ============================================
# ANSWERS
# ============================================


@router.post("/submissions/{submission_id}/answers", response_model=AnswerResponse)
async def save_answer(
    submission_id: int,
    answer: AnswerCreate,
    current_user: TokenData = Depends(get_current_user),
):
    """Save or update an answer for a question."""
    # Verify submission ownership and status
    submission = (
        supabase_client.table("test_submissions")
        .select("*")
        .eq("id", submission_id)
        .eq("student_id", current_user.sub)
        .eq("status", "in_progress")
        .single()
        .execute()
    )

    if not submission.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found or already submitted",
        )

    # Upsert answer
    data = answer.model_dump()
    data["submission_id"] = submission_id

    # Check if answer already exists
    existing = (
        supabase_client.table("test_answers")
        .select("id")
        .eq("submission_id", submission_id)
        .eq("question_id", answer.question_id)
        .execute()
    )

    if existing.data:
        response = (
            supabase_client.table("test_answers")
            .update({"answer_text": answer.answer_text})
            .eq("id", existing.data[0]["id"])
            .execute()
        )
    else:
        response = supabase_client.table("test_answers").insert(data).execute()

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to save answer",
        )

    return response.data[0]


@router.get("/submissions/{submission_id}/answers", response_model=list[AnswerResponse])
async def get_submission_answers(
    submission_id: int,
    current_user: TokenData = Depends(get_current_user),
):
    """Get all answers for a submission."""
    # Verify access
    submission = (
        supabase_client.table("test_submissions")
        .select("student_id")
        .eq("id", submission_id)
        .single()
        .execute()
    )

    if not submission.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found")

    if current_user.role != "admin" and submission.data["student_id"] != current_user.sub:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view these answers",
        )

    response = (
        supabase_client.table("test_answers")
        .select("*")
        .eq("submission_id", submission_id)
        .execute()
    )

    return response.data


@router.patch("/answers/{answer_id}/grade", response_model=AnswerResponse)
async def grade_answer(
    answer_id: int,
    points_awarded: int,
    feedback: str | None = None,
    current_user: TokenData = Depends(require_admin),
):
    """Grade an essay answer (admin only)."""
    response = (
        supabase_client.table("test_answers")
        .update({
            "points_awarded": points_awarded,
            "feedback": feedback,
            "is_correct": points_awarded > 0,
        })
        .eq("id", answer_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")

    return response.data[0]
