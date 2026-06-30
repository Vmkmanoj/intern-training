from app.database.base import Base
from sqlalchemy import Column , String , ForeignKey ,DateTime
from sqlalchemy.dialects.postgresql import UUID , JSONB
from sqlalchemy.ext.mutable import MutableList
import uuid
from datetime import datetime
from sqlalchemy.orm import relationship


class Sessoion(Base):
    __tablename__ = "session_table"

    id = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    sessiontitle = Column(String(100),nullable=True)
    message = Column(MutableList.as_mutable(JSONB), default=list)
    userid = Column(UUID(as_uuid=True),ForeignKey("users.id"),nullable=False)
    createdat = Column(DateTime, default=datetime.utcnow)
    updatedat = Column(DateTime,default=datetime.utcnow)
    updatedby = Column(String(100),nullable=False)
    createdby = Column(String(100),nullable=False)
    
    users = relationship(
        "Users",
        back_populates="sessions"
    )