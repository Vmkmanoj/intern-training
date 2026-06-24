from app.database.database import get_db
from fastapi import APIRouter , Depends ,HTTPException
from sqlalchemy.orm import Session
from app.schema.post import Poster
from app.models.post import Post
from datetime import datetime



postRouter = APIRouter()


@postRouter.post("/create-post")
def postGet(userPost : Poster,
            db : Session = Depends(get_db)):
    
    post = Post(
        userId = userPost.userId,
        description = userPost.description,
        createdBy = userPost.createdBy,
        updatedBy = userPost.updatedBy,
        updatedAt = datetime.now(),
        createdAt = datetime.now()
    )
    db.add(post)
    db.commit()

    return {
        "message" : "post added successfully...!",
        "postId" : post.postId
    }




