from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api.routes import api_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="API for The Seven Pillars tutoring platform",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "The Seven Pillars API", "status": "healthy"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
