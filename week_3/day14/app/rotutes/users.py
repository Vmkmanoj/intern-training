from app.database.database import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schema.users import UsersData
from app.models.users import Users
from datetime import datetime
from uuid import UUID


userPoster = APIRouter()


@userPoster.get("/")
def usersGet():
    return {"message": "User poster"}


@userPoster.post("/create-users")
def createUser(userdetails: UsersData, db: Session = Depends(get_db)):

    userFind = db.query(Users).filter(Users.emailId == userdetails.emailId).first()

    if userFind:
        raise HTTPException(status_code=402, detail="user already exits...!")

    usersAdd = Users(
        userName=userdetails.userName,
        emailId=userdetails.emailId,
        about=userdetails.about,
        createdby=userdetails.createdby,
        updatedby=userdetails.updatedby,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(usersAdd)
    db.commit()

    return {"messgae": "user added successfully.....!", "userId": usersAdd.usersId}


@userPoster.get("/get-user/{userId}")
def getPost(userId: UUID, db: Session = Depends(get_db)):

    post = db.query(Users).filter(Users.usersId == userId).first()

    if not post:
        raise HTTPException(status_code=409, detail="post not found")

    return post
