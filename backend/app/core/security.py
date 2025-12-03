from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from pydantic import BaseModel
from typing import Optional
from app.core.config import get_settings

settings = get_settings()
security = HTTPBearer()


class TokenData(BaseModel):
    sub: str  # User ID
    email: Optional[str] = None
    role: Optional[str] = None


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> TokenData:
    """Validate JWT token and return user data."""
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            audience="authenticated",
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )

        return TokenData(
            sub=user_id,
            email=payload.get("email"),
            role=payload.get("user_metadata", {}).get("role"),
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )


async def require_admin(current_user: TokenData = Depends(get_current_user)) -> TokenData:
    """Require the current user to be an admin."""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user


async def require_parent_or_admin(
    current_user: TokenData = Depends(get_current_user),
) -> TokenData:
    """Require the current user to be a parent or admin."""
    if current_user.role not in ["admin", "parent"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Parent or admin access required",
        )
    return current_user
