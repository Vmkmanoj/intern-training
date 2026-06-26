from fastapi import APIRouter, Depends, HTTPException

from app.database.database import get_db
from sqlalchemy.orm import Session
from app.models.sessions import ChatSession
from app.schemas.chatSessoinRespones import CreateSession

chatRouter = APIRouter()


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
