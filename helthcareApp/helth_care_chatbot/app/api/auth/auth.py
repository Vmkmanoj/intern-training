from fastapi import APIRouter , Depends ,HTTPException
from sqlalchemy.orm import Session
from app.model.users import Users
from app.schema.auth import UserRegiser , login
from app.utils.passwordhashing import hash_password , verify_password
from app.schema.success import UserRegisterSuccess , loginSuccess , UserDetails
from app.database.database import get_db
from app.utils.jwt import create_access_token

authRouter = APIRouter()

@authRouter.post("/register",response_model=UserRegisterSuccess)
def register(userRegister : UserRegiser, db : Session = Depends(get_db)):
    usersCheck = db.query(Users).filter(Users.email == userRegister.email).first()

    if usersCheck:
        raise HTTPException(status_code=400,detail="users already register...!")
    password = userRegister.password
    print(password)
    print(type(password))
    print(len(password))

    userResponse = Users(
        name=userRegister.name,
        email=userRegister.email,
        password=hash_password(userRegister.password) ,
        updatedby = userRegister.name,
        createdby = userRegister.name
    )
    
    db.add(userResponse)
    db.commit()

    return UserRegisterSuccess(message="Register success..!",success=True)



@authRouter.post("/login",response_model= loginSuccess)
def login(user : login , db : Session = Depends(get_db)):

    userRespone = db.query(Users).filter(user.email == Users.email).first()

    if not userRespone:
        raise HTTPException(status_code=401,detail= "Invalid credentials")
    
    if not verify_password(user.password , userRespone.password):
        raise HTTPException(status_code=401,detail= "Invalid credentials")
    

    access_token = create_access_token(
        {"sub":str(userRespone.id)}
    )

    return loginSuccess(message= "login success" , access_token = access_token , token_type= "bearer" ,
        userdetails=UserDetails(
        userName=userRespone.name,
        emailId=userRespone.email
    ))

@authRouter.get("/")
def getAuth():
    return "testing...."







