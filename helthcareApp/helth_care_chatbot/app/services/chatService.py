import re
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.model.chatModel import ChatBotData 


def search_database(question: str, db: Session):

    words = set(re.findall(r"\b\w+\b", question.lower()))

    
    conditions = []

    for word in words:
        conditions.append(ChatBotData.question.ilike(f"%{word}%"))
        conditions.append(ChatBotData.keywords.ilike(f"%{word}%"))

   
    rows = db.query(ChatBotData).filter(
        or_(*conditions)
    ).all()

    best_match = None
    best_score = 0

    for row in rows:

        searchable_text = f"{row.question} {row.keywords}".lower()

        tokens = set(re.findall(r"\b\w+\b", searchable_text))

        score = len(words & tokens)

        if score > best_score:
            best_score = score
            best_match = row

    return best_match