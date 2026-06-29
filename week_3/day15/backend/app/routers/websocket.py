from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from datetime import datetime
from uuid import UUID
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.sessions import ChatSession

websocket = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, room_id: str, websocket: WebSocket):

        await websocket.accept()

        if room_id not in self.active_connections:
            self.active_connections[room_id] = []

        self.active_connections[room_id].append(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket):

        self.active_connections[room_id].remove(websocket)

    async def broadcast(self, room_id: str, data):

        for connection in self.active_connections.get(room_id, []):
            await connection.send_json(data)


manager = ConnectionManager()


@websocket.websocket("/ws/{username}/{sessionId}")
async def chat_application(
    websocket: WebSocket,
    sessionId: UUID,
    username: str,
    db: Session = Depends(get_db),
):
    room = db.query(ChatSession).filter(ChatSession.id == sessionId).first()

    if not room:
        await websocket.accept()
        await websocket.send_text("Session not found")
        await websocket.close()
        return

    await manager.connect(str(sessionId), websocket)

    await websocket.send_json({"type": "history", "messages": room.messages})

    try:
        while True:
            data = await websocket.receive_json()

            message = {
                "user": username,
                "message": data["message"],
                "time": datetime.utcnow().isoformat(),
            }

            room.messages.append(message)
            db.commit()

            await manager.broadcast(
                str(sessionId),
                {
                    "type": "message",
                    **message,
                },
            )

    except WebSocketDisconnect:
        manager.disconnect(str(sessionId), websocket)

    finally:
        db.close()
