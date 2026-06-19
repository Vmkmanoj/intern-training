from fastapi import APIRouter
from app.api.auth.auth import authRouter
from app.api.conversation.create_conversation import convertionRouter


apiRouter = APIRouter()


apiRouter.include_router(
    authRouter,
    prefix="/auth",
    tags = ["auth"]
)

apiRouter.include_router(
    convertionRouter,
    prefix="/convertion",
    tags = ["convertion"]
)

