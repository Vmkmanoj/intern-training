import uuid

from sqlalchemy import Column, String, DateTime, ForeignKey, Text , Integer ,Sequence
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy import Identity
from app.database import Base

patient_token_seq = Sequence(
    "patient_token_seq",
    start=1001
)


class Patient(Base):
    __tablename__ = "Patient"

    Id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    PatientToken = Column(
    Integer,
    patient_token_seq,
    server_default=patient_token_seq.next_value(),
    unique=True,
    nullable=False
)

    DoctorId = Column(
        UUID(as_uuid=True),
       ForeignKey("Users.Id"),
        nullable=False
    )


    Name = Column(String(100), nullable=False)

    PhoneNumber = Column(String(15))

    Address = Column(Text)

    CreatedBy = Column(String(100))

    UpdatedBy = Column(String(100))

    CreatedAt = Column(DateTime, server_default=func.now())

    UpdatedAt = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    doctor = relationship("Users", back_populates="patients")