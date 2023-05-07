from datetime import date
from pydantic import BaseModel


class TrainerBase(BaseModel):
    name = str
    cref = str
    age = int
    address = str
    phone = str


class TrainerRequest(TrainerBase):
    ...


class TrainerResponse(TrainerBase):
    id: int

    class Config:
        orm_mode = True
