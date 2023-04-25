from sqlalchemy.orm import Session

from app.db.table.trainer import Trainer


class TrainerRepository:
    @staticmethod
    def find_all(db: Session) -> list[Trainer]:
        return db.query(Trainer).all()

    @staticmethod
    def save(db: Session, curso: Trainer) -> Trainer:
        if curso.id:
            db.merge(curso)
        else:
            db.add(curso)
        db.commit()
        return curso

    @staticmethod
    def find_by_id(db: Session, id: int) -> Trainer:
        return db.query(Trainer).filter(Trainer.id == id).first()

    @staticmethod
    def exists_by_id(db: Session, id: int) -> bool:
        return db.query(Trainer).filter(Trainer.id == id).first() is not None

    @staticmethod
    def delete_by_id(db: Session, id: int) -> None:
        curso = db.query(Trainer).filter(Trainer.id == id).first()
        if curso is not None:
            db.delete(curso)
            db.commit()
