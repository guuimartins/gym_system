from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text
from app.db.database import Base


class Trainer(Base):
    __tablename__ = "Trainer"
    id = Column(Integer, primary_key=True, index=True)
    cref = Column(String(20), unique=True)
    age = Column(Text(), nullable=False)
    address = Column(Text(), nullable=False)
    phone = Column(String(10), nullable=False)
