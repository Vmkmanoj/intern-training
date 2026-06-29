from sqlalchemy import Column, String
from app.database.base import Base
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.ext.mutable import MutableList
import uuid


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_name = Column(String, nullable=False)
    messages = Column(MutableList.as_mutable(JSONB), default=list)
    createdby = Column(String, nullable=False)
