from supabase import create_client, Client
from app.core.config import get_settings

settings = get_settings()


def get_supabase_client() -> Client:
    """Get Supabase client with service role key for backend operations."""
    return create_client(settings.supabase_url, settings.supabase_key)


# Singleton client
supabase_client: Client = get_supabase_client()
