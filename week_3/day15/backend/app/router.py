from fastapi import APIRouter
from app.routers.chatRouter import chatRouter
from app.routers.websocket import websocket
from app.routers.sse import sse

router = APIRouter()


router.include_router(chatRouter, prefix="/chat", tags=["chat"])
router.include_router(websocket, prefix="/web", tags=["websocket"])
router.include_router(sse, prefix="/sse", tags=["sse"])
