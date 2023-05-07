from fastapi import FastAPI

from app.db.database import engine, Base
from trainers.router import trainerRouter

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(trainerRouter)


@app.get("/")
async def root():
    return {"message": "Hello World"}
