from sqlalchemy import Column, String, DateTime, func 
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID 
import uuid

from app.database import Base


class Users(Base):
    __tablename__ = "Users"

    Id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )

    Name = Column(
        String(100),
        nullable=False
    )

    Qualification = Column(
        String(100),
        nullable=False
    )

    Specialization = Column(
        String(100),
        nullable=True
    )

    Email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    PhoneNumber = Column(
        String(15),
        nullable=True
    )

    HospitalName = Column(
        String(150),
        nullable=True
    )

    RegistrationNumber = Column(
        String(100),
        nullable=True
    )

    Password = Column(
        String(255),
        nullable=False
    )

    CreatedAt = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )

    UpdatedAt = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    Roles = Column(
        String(100),
        nullable=False
    )

    patients = relationship(
    "Patient",
    back_populates="doctor",
    cascade="all, delete-orphan"
    )