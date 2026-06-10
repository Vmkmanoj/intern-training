from ..model.teacherTable import Teacher
from ..schema.teacherRespone import TeacherRespone

def create_new_teacher(teacherRespone : TeacherRespone , db):
    teacher = Teacher(
        Name=teacherRespone.name,
        age=teacherRespone.age,
        adderss=teacherRespone.address,
    )
    db.add(teacher)
    db.commit()
    db.refresh(teacher)

    return {
        "message": "successfully",
        "teacher": teacher.Id,
    }

def getAllTeacher(db):
    
    responce = db.query(Teacher).all()

    return responce

    

