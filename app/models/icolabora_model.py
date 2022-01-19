from dataclasses import dataclass
from sqlalchemy import (
    Column,
    String,
    Integer,
)
from app.configs.database import db


@dataclass
class IcolaboraModel(db.Model):
    id: int
    label: str
    simple_text: str
    long_text: str
    free_content: str

    __tablename__ = "teste"

    id = Column(Integer, primary_key=True)
    label = Column(String(200), unique=True)
    simple_text = Column(String(30))
    long_text = Column(String(100))
    free_content = Column(String)
