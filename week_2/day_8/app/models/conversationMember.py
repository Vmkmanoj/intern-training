from sqlalchemy import Column , DateTime ,ForeignKey 
from sqlalchemy.dialects.postgresql import UUID  
from datetime import datetime
from sqlalchemy.orm import relationship
import uuid
from app.database.base import Base



class ConversationMember(Base):

    __tablename__ = "conversationMembers"

    id = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    conversationId = Column(UUID(as_uuid=True),ForeignKey("conversation.id"),nullable=False)
    userId = Column(UUID(as_uuid=True),ForeignKey("Users.id"),nullable= False)
    joinedAt = Column(DateTime,default=datetime.utcnow)

    user = relationship(
    "UserTable",
    back_populates="conversations_members"
    )

    conversation = relationship(
    "Conversation",
    back_populates="conversation_members"
    )

