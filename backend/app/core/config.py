from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    app_name: str = "The Seven Pillars API"
    debug: bool = False

    # Supabase
    supabase_url: str
    supabase_key: str  # Service role key for backend
    supabase_jwt_secret: str

    # CORS
    cors_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
