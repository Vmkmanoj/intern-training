from  pydantic import BaseModel
from uuid import UUID

class CreateSession(BaseModel):
    title : str
    message : str

class ChatSession(BaseModel):
    sessionId: UUID | None = None
    userid: UUID
    message : str
    username : str
    email : str
    
    