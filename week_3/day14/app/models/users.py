from app.database.base import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid


class Users(Base):
    __tablename__ = "users"

    usersId = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    userName = Column(String(100), nullable=False)
    emailId = Column(String(100), nullable=False)
    about = Column(String(100), nullable=False)
    createdby = Column(String(100), nullable=False)
    updatedby = Column(String(100), nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, nullable=False)

    posts = relationship("Post", back_populates="user")
