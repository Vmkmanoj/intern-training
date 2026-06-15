from fastapi import Depends , APIRouter
from sqlalchemy.orm import Session
from ..database.session import get_db
from ..schema.teacherRespone import TeacherRespone
from app.services import create_new_teacher , getAllTeacher , getByIdTeacher, deleteById ,update


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

@router.patch("updated/{user_id}")
def updateById(teacherRespone : TeacherRespone ,userId , db : Session =  Depends(get_db)):
    return update(teacherRespone,userId,db)



