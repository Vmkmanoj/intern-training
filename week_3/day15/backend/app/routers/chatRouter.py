from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from uuid import UUID
from app.database.database import get_db
from sqlalchemy.orm import Session
from app.models.sessions import ChatSession
from app.schemas.chatSessoinRespones import CreateSession
from datetime import datetime
from fastapi.responses import StreamingResponse
import asyncio


chatRouter = APIRouter()


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


@chatRouter.websocket("/ws/{username}/{sessionId}")
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


@chatRouter.post("/create-session")
def create_session(sessoinName: CreateSession, db: Session = Depends(get_db)):

    findingSession = (
        db.query(ChatSession)
        .filter(ChatSession.session_name == sessoinName.session_name)
        .first()
    )

    if findingSession:
        raise HTTPException(status_code=402, detail="session name already in....!")

    createSessoin = ChatSession(
        session_name=sessoinName.session_name,
        messages=[],
        createdby=sessoinName.createdby,
    )

    db.add(createSessoin)
    db.commit()

    return {"message": "session created..!", "sessionId": createSessoin.id}


@chatRouter.get("/get-all-session")
def getAllSession(db: Session = Depends(get_db)):

    getAllSession = db.query(ChatSession).all()

    allIds = []

    for i in getAllSession:
        allIds.append(
            {
                "session_id": i.id,
                "session_name": i.session_name,
                "createdBy": i.createdby,
            }
        )
    return allIds


async def clock():
    while True:
        current_time = datetime.now().strftime("%H:%M:%S")

        # SSE format
        yield f"data: {current_time}\n\n"

        await asyncio.sleep(1)


@chatRouter.get("/clock")
async def stream_timer():
    return StreamingResponse(clock(), media_type="text/event-stream")
