from app.database.base import Base
from sqlalchemy import Column, String , DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship
from datetime import datetime

class Users(Base):

    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100),nullable=False)
    email = Column(String(100),nullable=False)
    password = Column(String(100),nullable=False)
    createdat = Column(DateTime, default=datetime.utcnow)
    updatedat = Column(DateTime,default=datetime.utcnow)
    updatedby = Column(String(100),nullable=False)
    createdby = Column(String(100),nullable=False)

    sessions = relationship(
        "Sessoion",
        back_populates="users"
    )

