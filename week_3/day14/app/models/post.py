from app.database.base import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship
import uuid


class Post(Base):
    __tablename__ = "post"

    postId = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    userId = Column(UUID(as_uuid=True), ForeignKey("users.usersId"), nullable=False)
    description = Column(String(100), nullable=True)
    createdBy = Column(String(100), nullable=False)
    updatedBy = Column(String(100), nullable=False)
    createdAt = Column(DateTime, default=datetime.date)
    updatedAt = Column(DateTime, default=False)

    user = relationship("Users", back_populates="posts")
