
from sqlalchemy.orm import  relationship
from sqlalchemy import Column ,String  , Boolean , DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from app.database.base import Base


class UserTable(Base):

    __tablename__ = "Users"
    
    id = Column(
    UUID(as_uuid=True),
    primary_key=True,
    default=uuid.uuid4
)
    username = Column(String(200),nullable=False)
    email = Column(String(200),nullable=False)
    password = Column(String(200),nullable=False)
    profilepic = Column(String(200),nullable=False)
    isOnline = Column(Boolean,nullable=False)
    createdAt = Column(DateTime,default=datetime.utcnow)

    conversations = relationship(
        "Conversation",
        back_populates="creator"
    )

    conversations_members = relationship(
        "ConversationMember",
        back_populates= "user"
    )

    message = relationship("Message",back_populates="username")


    

