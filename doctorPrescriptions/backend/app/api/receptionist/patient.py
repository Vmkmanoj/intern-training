from fastapi import APIRouter , Depends
from app.database.database import get_db 
from app.model.patient import Patient
from sqlalchemy.orm import Session
from app.schema.createPatient import PatientCreate
from app.utils.security import get_current_user



patientRouter = APIRouter()


@patientRouter.post("/create-patient")
def create_patient(
    patientCreate: PatientCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    
    patient = Patient(
        DoctorId=patientCreate.DoctorId,
        Name=patientCreate.Name,
        PhoneNumber=patientCreate.PhoneNumber,
        Address=patientCreate.Address,
        CreatedBy=current_user,
        UpdatedBy=current_user,
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return {
        "success": True,
        "message": "Patient created successfully.",
        "data": patient
    }






