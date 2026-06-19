from fastapi import APIRouter , Depends ,HTTPException
from app.dependency.security import get_current_user
from app.schema.CreateConvertion import CreateConvertion , message
from app.models.conversation import Conversation 
from app.models.conversationMember import ConversationMember 
from app.models.message import Message
from app.database.session import get_db
from sqlalchemy.orm import Session
from uuid import UUID

convertionRouter = APIRouter()




@convertionRouter.post("/create-convertions")
def create_convertion(convo : CreateConvertion ,
                      current_user = Depends(get_current_user),
                      db : Session = Depends(get_db)):

    createConvo = Conversation(name = convo.name ,
                                isgroup = convo.isgroup , 
                                createby = current_user)
    
    db.add(createConvo)
    db.commit()
    return {
        "message" : "Convertion Created...!"
    }
    
@convertionRouter.post("/join-convertions/{convertionId}")
def join_convertions(convertionId : UUID, current_user = Depends(get_current_user), db : Session = Depends(get_db)):

    findconversion = db.query(Conversation).filter(Conversation.id == convertionId).first()

    if not findconversion:
        raise HTTPException(status_code= 402 , detail= "converstion not found")
    
    joinConvo  = ConversationMember(conversationId = findconversion.id,userId=current_user)
    db.add(joinConvo)
    db.commit()

    return {
        "message" : "joined converstioned"
    }

@convertionRouter.post("/create-message/{convertion_Id}")
def create_message(msg : message , convertion_Id : UUID, current_user = Depends(get_current_user), db : Session = Depends(get_db)):

    storeMessage = Message(conversationId = convertion_Id , senderId = current_user , MessageText = msg.message, MessageType = "Text")

    db.add(storeMessage)
    db.commit()

    return {
        "message" : f"message send to {convertion_Id}"
    }
    



    
    
    


    

