from app.database.database import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schema.post import Poster
from app.models.post import Post
from datetime import datetime
from uuid import UUID


postRouter = APIRouter()


@postRouter.post("/create-post")
def postGet(userPost: Poster, db: Session = Depends(get_db)):

    post = Post(
        userId=userPost.userId,
        description=userPost.description,
        createdBy=userPost.createdBy,
        updatedBy=userPost.updatedBy,
        updatedAt=datetime.now(),
        createdAt=datetime.now(),
    )
    db.add(post)
    db.commit()

    return {"message": "post added successfully...!", "postId": post.postId}

@postRouter.get("/get-all-post")
def getAllPost(db:Session = Depends(get_db)):

    allPost = db.query(Post).all()

    return allPost

@postRouter.get("/get-post/{postId}")
def getPost(postId: UUID, db: Session = Depends(get_db)):

    post = db.query(Post).filter(Post.postId == postId).first()

    if not post:
        raise HTTPException(status_code=409, detail="post not found")

    return post


@postRouter.delete("/post-delete/{postId}")
def postDelete(postId: UUID, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.postId == postId).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    db.delete(post)
    db.commit()

    return {"message": "Post deleted successfully"}


@postRouter.patch("/post-update/{postId}")
def update_post(postId: UUID, description: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.postId == postId).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if description is not None:
        post.description = description

    db.commit()
    db.refresh(post)

    return {"message": "Post updated successfully", "postId": post.postId}
