from fastapi import Depends , APIRouter
from sqlalchemy.orm import Session
from ..database.session import get_db
from ..schema.teacherRespone import TeacherRespone
from ..services.create_teacher import create_new_teacher , getAllTeacher , getByIdTeacher, deleteById


router = APIRouter()

@router.post('/create')
def create_teacher(teacherRespone: TeacherRespone, db: Session = Depends(get_db)):

    return create_new_teacher(teacherRespone,db)

@router.get('/getAll')
def get_teacher(db : Session = Depends(get_db)):
    
    return getAllTeacher(db)

@router.get('/getById/{user_id}')
def getById(user_id, db: Session = Depends(get_db)):
    return getByIdTeacher(user_id,db)

@router.delete("/deleteById/{user_id}")
def getDeleteById(userId , db : Session = Depends(get_db)):
    print("deleteId" , userId)
    return deleteById(userId,db)



