from fastapi import APIRouter
from app.routers.chatRouter import chatRouter

router = APIRouter()


router.include_router(chatRouter, prefix="/chat", tags=["chat"])
