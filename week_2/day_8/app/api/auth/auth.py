from fastapi import APIRouter , Depends , HTTPException
from sqlalchemy.orm import Session
from app.schema.authResponce import UserLoginSuccess , Users , UserRegisterSuccess , UserLogin
from app.database.session import get_db
from app.models.userTable import UserTable
from app.utils.passwordHashing import hash_password , verify_password 
from app.utils.jwt import create_access_token

authRouter = APIRouter()



@authRouter.get("/login",response_model= UserLoginSuccess)
def login(user : UserLogin, db : Session = Depends(get_db)):

    userRespone = db.query(UserTable).filter(user.email == UserTable.email).first()

    if not userRespone:
        raise HTTPException(status_code=401,detail= "Invalid credentials")
    
    if not verify_password(user.password , userRespone.password):
        raise HTTPException(status_code=401,detail= "Invalid credentials")
    

    access_token = create_access_token(
        {"sub":str(userRespone.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@authRouter.post("/register",response_model= UserRegisterSuccess)
def register(userRegister : Users, db : Session = Depends(get_db)):

    usersCheck = db.query(UserTable).filter(UserTable.email == userRegister.email).first()

    if usersCheck:
        raise HTTPException(detail="users already register...!")
    
    print(userRegister.password)
    print(type(userRegister.password))
    print(len(userRegister.password))

    userResponse = UserTable(
    username=userRegister.username,
    email=userRegister.email,
    password=hash_password(userRegister.password),
    profilepic=userRegister.profilepic,
    isOnline=userRegister.isOnline
    )
    

    db.add(userResponse)
    db.commit()

    return {
        "message": "User registered successfully",
    }

    
    
    

    

    


    

    



