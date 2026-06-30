from fastapi import APIRouter
from app.api.chatbot.chatapi import chatRouter
from app.api.auth.auth import authRouter
api_router = APIRouter()


api_router.include_router(
    chatRouter,
    prefix="/chat",
    tags=["chat"]
)

api_router.include_router(
    authRouter,
    prefix="/auth",
    tags= ["auth"]
)




