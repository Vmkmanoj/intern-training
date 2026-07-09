from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime


class PatientCreate(BaseModel):
    DoctorId: UUID
    Name: str = Field(..., min_length=2, max_length=100)
    PhoneNumber: str = Field(..., min_length=10, max_length=15)
    Address: str | None = None


class PatientUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=100)
    phone_number: str | None = Field(None, min_length=10, max_length=15)
    address: str | None = None


class PatientResponse(BaseModel):
    id: UUID
    doctor_id: UUID
    patient_token: int
    name: str
    phone_number: str
    address: str | None = None
    created_by: str
    updated_by: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }