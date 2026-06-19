from sqlalchemy import Column ,String  , Boolean , DateTime ,ForeignKey 
from sqlalchemy.dialects.postgresql import UUID  
from datetime import datetime
from sqlalchemy.orm import relationship
import uuid
from app.database.base import Base


class Conversation(Base):
    
    __tablename__ = "conversation"

    id = Column(
    UUID(as_uuid=True),
    primary_key=True,
    default=uuid.uuid4
    )
    name = Column(String(200),nullable= False)
    isgroup = Column(Boolean(),nullable=False)

    createby = Column(UUID(as_uuid=True),ForeignKey("Users.id"),nullable= False)
    createdAt = Column(DateTime,default=datetime.utcnow)

    creator = relationship(
        "UserTable",
        back_populates="conversations"
    )

    conversation_members = relationship(
        "ConversationMember",
        back_populates="conversation"
    )

    messageId = relationship("Message",back_populates="groupname")






