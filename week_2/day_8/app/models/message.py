from sqlalchemy import Column ,String  , Boolean , DateTime ,ForeignKey , TEXT
from sqlalchemy.dialects.postgresql import UUID  
from datetime import datetime
from sqlalchemy.orm import relationship
import uuid
from app.database.base import Base


class Message(Base):
    __tablename__ = "message"

    id = Column(
    UUID(as_uuid=True),
    primary_key=True,
    default=uuid.uuid4
    )

    conversationId = Column(UUID(as_uuid=True),ForeignKey("conversation.id"),nullable= False)

    senderId = Column(UUID(as_uuid=True),ForeignKey("Users.id"),nullable= False)

    MessageText = Column(TEXT,nullable=False)

    MessageType = Column(String(200),nullable=False)

    createdAt = Column(DateTime,default=datetime.utcnow)

    groupname = relationship(
        "Conversation",
        back_populates= "messageId"
    )

    username = relationship("UserTable",back_populates="message")

    

