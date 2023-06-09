from fastapi import APIRouter
from fastapi import Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies import apiVersion
from app.trainers.db.schema.trainerSchema import TrainerRequest, TrainerResponse
from app.trainers.db.table.trainer import Trainer
from app.trainers.repository.trainerRepository import TrainerRepository

trainerRouter = APIRouter(
    prefix=apiVersion + "/trainer",
)


@trainerRouter.post("", response_model=TrainerResponse, status_code=status.HTTP_201_CREATED)
def create(request: TrainerRequest, db: Session = Depends(get_db)):
    trainer = TrainerRepository.save(db, Trainer(**request.dict()))
    return TrainerResponse.from_orm(trainer)


@trainerRouter.get("", response_model=list[TrainerResponse])
def find_all(db: Session = Depends(get_db)):
    trainers = TrainerRepository.find_all(db)
    return [TrainerResponse.from_orm(trainer) for trainer in trainers]


@trainerRouter.get("/{id}", response_model=TrainerResponse)
def find_by_id(id: int, db: Session = Depends(get_db)):
    trainer = TrainerRepository.find_by_id(db, id)
    if not trainer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Personal Trainer não encontrado"
        )
    return TrainerResponse.from_orm(trainer)


@trainerRouter.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_by_id(id: int, db: Session = Depends(get_db)):
    if not TrainerRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Personal Trainer não encontrado"
        )
    TrainerRepository.delete_by_id(db, id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@trainerRouter.put("/{id}", response_model=TrainerResponse)
def update(id: int, request: TrainerRequest, db: Session = Depends(get_db)):
    if not TrainerRepository.exists_by_id(db, id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Trainer não encontrado")
    trainer = TrainerRepository.save(db, Trainer(id=id, **request.dict()))
    return TrainerResponse.from_orm(trainer)
