from pydantic import BaseModel
from uuid import UUID
from sqlalchemy.dialects.postgresql import UUID as ui
from sqlalchemy import Column , String , DateTime , ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship ,DeclarativeBase
import uuid
from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker 
from dotenv import load_dotenv
import os

load_dotenv()

DATA_BASE = os.getenv("DATABASE_URL")

engine = create_engine(DATA_BASE)

sessionLocal = sessionmaker(
    autoflush= False,
    autocommit = False,
    bind= engine
)

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


class Poster(BaseModel):
    userId : UUID
    description : str
    createdBy : str
    updatedBy : str

class UsersData(BaseModel):
    userName: str
    emailId: str
    about: str
    createdby: str
    updatedby: str



class Base(DeclarativeBase):
    pass

class Post(Base):

    __tablename__ = "post"

    postId = Column(ui(as_uuid=True),primary_key=True,default=uuid.uuid4)
    userId = Column(ui(as_uuid=True),ForeignKey("users.usersId"),nullable=False)
    description = Column(String(100),nullable=True)
    createdBy = Column(String(100),nullable=False)
    updatedBy = Column(String(100),nullable=False)
    createdAt  = Column(DateTime,default=datetime.date)
    updatedAt = Column(DateTime,default=False)

    user  = relationship("Users", back_populates="posts")


class Users(Base):

    __tablename__ = "users"

    usersId = Column(ui(as_uuid=True),primary_key=True,default=uuid.uuid4)
    userName = Column(String(100),nullable=False)
    emailId = Column(String(100),nullable=False)
    about = Column(String(100),nullable=False)
    createdby = Column(String(100),nullable=False)
    updatedby = Column(String(100),nullable=False)
    createdAt = Column(DateTime,default=datetime.utcnow)
    updatedAt = Column(DateTime,nullable=False)


    posts  = relationship("Post",back_populates="user")

def userAdd():

    db = next(get_db())

    userName = input("Enter the name: ")
    emailId = input("Enter the email id: ")
    about = input("Enter the about : ")
    createdby = input("Enter the createby : ")
    updatedby = input("Enter the updateby :")

    userFind = db.query(Users).filter(Users.emailId == emailId).first()

    if userFind:
        return "Already exits"

    usersAdd = Users(
        userName=userName,
        emailId=emailId,
        about=about,
        createdby=createdby,
        updatedby=updatedby,
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    db.add(usersAdd)
    db.commit()

    return {
        "messgae" : "user added successfully.....!",
        "userId" : usersAdd.usersId
    }

def getUser():

    userId = input("Enter the Id : ")


    db = next(get_db())
    post = db.query(Users).filter(Users.usersId == userId).first()

    if not post:
        return "post is not Available..."
    
    return {
        "name" : post.userName ,
            "emailId" : post.emailId,
            "about" : post.about , 
            "createdBy" : post.createdby ,
            "updatedBy" : post.updatedby , 
            "createAt" : post.updatedAt , 
            "createdAt"  : post.createdAt
            }
def addPost():

    db = next(get_db())

    userId = input("enter the userId :")
    description = input("Enter the description : ")
    createdBy = input("Enter the createdBy : ")
    updatedBy = input("Enter the updated by : ")
    
    
    post = Post(
        userId = userId,
        description = description,
        createdBy = createdBy,
        updatedBy = updatedBy,
        updatedAt = datetime.now(),
        createdAt = datetime.now()
    )
    db.add(post)
    db.commit()

    return {
        "message" : "post added successfully...!",
        "postId" : post.postId
    }

def getPost():

    db = next(get_db())

    postId = input("Enter the postId: ")

    post = db.query(Post).filter(Post.postId == postId).first()

    if not post:
        return "post is not available"
        
    
    return {
        "postId" : post.postId,
        "description" : post.description,
        "createdBy" : post.createdBy
    }


def main():
    
    while True:
        chooese = int(input("Enter the choose : "))
        print("""1 . add user 
                 2 . add post 
                 3 . view users 
                 4 . view post
              """)
        
        if chooese == 1:
            print(userAdd())
        elif chooese == 2:
            print(getUser())
        
if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    main()







