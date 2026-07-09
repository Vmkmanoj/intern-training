from fastapi import APIRouter , Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.model.users import Users
from app.model.patient import Patient
from datetime import date
from app.utils.security import get_current_user
dashboardRouter = APIRouter()


@dashboardRouter.get("/dashboard")
def dashboard(db: Session = Depends(get_db) , getuser = Depends(get_current_user) ):

    total_doctors = (
        db.query(func.count())
        .select_from(Users)
        .filter(Users.Roles == "Doctor")
        .scalar()
    )

    total_patients = (
        db.query(func.count())
        .select_from(Patient)
        .scalar()
    )

    today_patients = (
        db.query(func.count())
        .select_from(Patient)
        .filter(func.date(Patient.CreatedAt) == date.today())
        .scalar()
    )


    return {
        "total_doctors" : total_doctors,
        "total_patients" : total_patients,
        "today_patients" : today_patients
    }