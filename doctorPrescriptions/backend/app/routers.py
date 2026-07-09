from fastapi import APIRouter
from app.api.auth.auth import authRouter
from app.api.receptionist.patient import patientRouter
from app.api.doctor.doctor import doctorRouter
from app.api.dashbord.dashbord import dashboardRouter
router = APIRouter()

router.include_router(
    authRouter,
    prefix="/auth",
    tags=["auth"]
)

router.include_router(
    patientRouter,
    prefix="/receptionist",
    tags = ["receptionist"]
)

router.include_router(
    doctorRouter,
    prefix="/doctor",
    tags = ["doctor"]
)


router.include_router(
    dashboardRouter,prefix="/receptionist",tags = ["receptionist"]

)


