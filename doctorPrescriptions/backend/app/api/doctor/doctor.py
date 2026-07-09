from fastapi import APIRouter , Depends
from app.database.database import get_db 
from sqlalchemy.orm import Session
from app.utils.security import get_current_user
from app.model.users import Users


doctorRouter = APIRouter()


@doctorRouter.get("/get-all-doctor")
def get_all_doctors(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    doctors = (
        db.query(Users)
        .filter(Users.Roles == "Doctoer")
        .all()
    )

    return {
        "success": True,
        "data": doctors
    }




