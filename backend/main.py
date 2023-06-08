from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import groups
from database import engine,SessionLocal
from uses import groupsCRUD
import models
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/groups", tags=["Groups"])
def create_group(group: groups.GroupCreate, db: Session = Depends(get_db)):
    db_group = groupsCRUD.create(db=db, group=group)
    return db_group

@app.get("/group/{group_id}", tags=["Groups"])
def get_one(group_id: int, db: Session = Depends(get_db)):
    db_group = groupsCRUD.get_one(db=db, group_id=group_id)
    return db_group

@app.get("/groups", tags=["Groups"])
def get_all(db: Session = Depends(get_db)):
    db_groups = groupsCRUD.get_all(db=db)
    return db_groups

@app.patch("/groups", tags=["Groups"])
def update_group(group_id: int, group: groups.GroupCreate, db: Session = Depends(get_db)):
    db_group = groupsCRUD.refresh(db=db, group_id=group_id, group=group)
    return db_group
    
@app.delete("/group/{group_id}", tags=["Groups"])
def delete_group(group_id: int, db: Session = Depends(get_db)):
    return groupsCRUD.delete(db=db, group_id=group_id)