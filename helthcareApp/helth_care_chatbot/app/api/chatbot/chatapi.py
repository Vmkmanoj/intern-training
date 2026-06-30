from fastapi import APIRouter, Depends , HTTPException
import asyncio
from fastapi.responses import StreamingResponse 
from app.services.chatService import search_database
from app.database.database import get_db, sessionLocal
from sqlalchemy.orm import Session
from app.schema.createSession import ChatSession
from app.model.session import Sessoion
from app.utils.security import get_current_user
from datetime import datetime, timezone
from uuid import UUID

chatRouter = APIRouter()


@chatRouter.post("/chat")
async def chat(
    message: ChatSession,
    db: Session = Depends(get_db),
    getUsers  = Depends(get_current_user)
):
    print("get users" , getUsers)
    result = search_database(message.message, db)

    async def generate():
        agentresponse = ""

        if result:
            for word in result.answer.split():
                yield f"event: message\ndata: {word}\n\n"
                agentresponse += word + " "
                await asyncio.sleep(0.05)
        else:
            agentresponse = "Sorry, I could not find an answer for that."
            yield f"event: message\ndata: {agentresponse}\n\n"

        save_db = sessionLocal()
        try:
            session = None

            if message.sessionId:
                session = (
                    save_db.query(Sessoion)
                    .filter(Sessoion.id == message.sessionId)
                    .first()
                )

            if session:
                session.message.extend([
                    {
                        "role": "user",
                        "content": message.message,
                        "timeStamp": datetime.now(timezone.utc).isoformat(),
                    },
                    {
                        "role": "assistant",
                        "content": agentresponse.strip(),
                        "timeStamp": datetime.now(timezone.utc).isoformat(),
                    },
                ])
                save_db.commit()
                save_db.refresh(session)
            else:
                session = Sessoion(
                    sessiontitle=message.message[:30],
                    message=[
                        {
                            "role": "user",
                            "content": message.message,
                            "timeStamp": datetime.now(timezone.utc).isoformat(),
                        },
                        {
                            "role": "assistant",
                            "content": agentresponse.strip(),
                            "timeStamp": datetime.now(timezone.utc).isoformat(),
                        },
                    ],
                    userid=message.userid,
                    createdby=message.email,
                    updatedby=message.email,
                )

                save_db.add(session)
                save_db.commit()
                save_db.refresh(session)

            yield f"event: session\ndata: {session.id}\n\n"
        finally:
            save_db.close()

        yield "event: done\ndata: complete\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )

@chatRouter.get("/get-history/{sessionId}")
def get_session_history(
    sessionId: str,
    db: Session = Depends(get_db),
    getUser=Depends(get_current_user),
):
    try:
        session_uuid = UUID(sessionId)
        user_uuid = UUID(getUser)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid session id")

    sessionHistory = (
        db.query(Sessoion)
        .filter(
            Sessoion.id == session_uuid,
            Sessoion.userid == user_uuid,
        )
        .first()
    )

    if sessionHistory is None:
        raise HTTPException(status_code=404, detail="Session not available")

    return {
        "message": sessionHistory.message,
        "success": True,
    }



@chatRouter.get("/get-all-session")
def get_all_session(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    try:
        user_uuid = UUID(user)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user id")

    rows = (
        db.query(Sessoion)
        .filter(Sessoion.userid == user_uuid)
        .order_by(Sessoion.updatedat.desc())
        .all()
    )

    return {
        "message": [
            {
                "id": str(row.id),
                "sessiontitle": row.sessiontitle,
                "message": row.message,
                "createdat": row.createdat.isoformat() if row.createdat else None,
                "updatedat": row.updatedat.isoformat() if row.updatedat else None,
                "createdby": row.createdby,
                "updatedby": row.updatedby,
                "userid": str(row.userid),
            }
            for row in rows
        ],
        "success": True,
    }
        
    

    

    

