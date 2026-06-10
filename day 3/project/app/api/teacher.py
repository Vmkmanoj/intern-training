from fastapi import Depends , APIRouter
from sqlalchemy.orm import Session
from ..database.session import get_db
from ..schema.teacherRespone import TeacherRespone
from ..services.create_teacher import create_new_teacher , getAllTeacher

router = APIRouter()

@router.post('/create')
def create_teacher(teacherRespone: TeacherRespone, db: Session = Depends(get_db)):
    return create_new_teacher(teacherRespone,db)

@router.get('/getAll')
def get_teacher(db : Session = Depends(get_db)):
    return getAllTeacher(db)




