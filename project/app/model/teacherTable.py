from ..database.base import Base 
from sqlalchemy import Column , String , Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Teacher(Base):

    __tablename__ = "Teachers"

    Id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    Name = Column(String(100))
    age = Column(Integer)
    adderss = Column(String(100))







