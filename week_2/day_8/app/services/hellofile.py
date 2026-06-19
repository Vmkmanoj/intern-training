from app.schema.ApiSuccessResponce import ApiSuccessResponce , UserDetails
from app.models.userTable import UserTable
from sqlalchemy.orm import Session


def hellofunction(user : UserDetails,db : Session):

    respone = UserTable(name = user.name,age =user.age)
    db.add(respone)
    db.commit()

    return ApiSuccessResponce(
        message=f"Api say's hello {respone.name}",
        success=True
    )