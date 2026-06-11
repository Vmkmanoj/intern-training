from ..model.teacherTable import Teacher
from ..schema.teacherRespone import TeacherRespone
from ..redisConifg import redic_client as r
import json


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


    catched_teacher = r.get("teachers:all")

    if catched_teacher:
        print("from readis")
        return json.loads(catched_teacher)
    
    teachers = db.query(Teacher).all()

    print(
        "from db loads"
        )
    list_teacher = [
        {
            "id": str(teacher.Id),
            "name": teacher.Name,
            "age": teacher.age,
            "address": teacher.adderss
        }
        for teacher in teachers
        
    ]

    r.setex(
        "teachers:all",
        300,
        json.dumps(list_teacher)
    )

    return list_teacher

def getByIdTeacher(user_id, db):

    cached_teacher = r.get(f"teacher:{user_id}")

    if cached_teacher:
        print("Data from Redis")
        return json.loads(cached_teacher)

    teacher = db.query(Teacher).filter(Teacher.Id == user_id).first()

    if not teacher:
        return None

    teacher_data = {
        "id": str(teacher.Id),
        "name": teacher.Name,
        "age": teacher.age,
        "address": teacher.adderss
    }

    r.setex(
        f"teacher:{user_id}",
        60,
        json.dumps(teacher_data)
    )

    print("Data from Database")

    return teacher_data


def deleteById(user_id,db):

    print(user_id)
    
    teacher = db.query(Teacher).filter(user_id == Teacher.Id).first()

    if not teacher:
        return {"message" : "no teacher found"}

    db.delete(teacher)

    db.commit()

    return {"message":"Teacher deleted"}




