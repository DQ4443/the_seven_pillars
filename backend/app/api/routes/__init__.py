from fastapi import APIRouter
from app.api.routes import users, classes, enrollments, resources, tests

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(classes.router, prefix="/classes", tags=["classes"])
api_router.include_router(enrollments.router, prefix="/enrollments", tags=["enrollments"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])
api_router.include_router(tests.router, prefix="/tests", tags=["tests"])
