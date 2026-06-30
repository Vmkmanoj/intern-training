from app.database.base import Base
from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
# from openpyxl import load_workbook
# from app.database.database import get_db

class ChatBotData(Base):
    __tablename__ = "chatbot_data"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    category = Column(String)
    question = Column(Text)
    answer = Column(Text)
    keywords = Column(Text)
    status = Column(String)



# wb = load_workbook(r"D:\intern-training\helthcareApp\helth_care_chatbot\app\model\healthcare_chatbot_100_unique.xlsx")
# sheet = wb.active
# def mainSheet():
#     db = next(get_db())
#     for row in sheet.iter_rows(min_row=2, values_only=True):

#         chatbot = ChatBotData(
#             category=row[1],
#             question=row[2],
#             answer=row[3],
#             keywords=row[4],
#             status=row[5]
#         )

#         db.add(chatbot)

#     db.commit()