from fastapi import HTTPException, status
from sqlalchemy import update
from sqlalchemy.orm import Session
import models
from schemas import groups

# Create
def create(db: Session, group: groups.GroupCreate):
    exists = db.query(models.Group).filter(models.Group.name == group.name).first()
    if exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Existe un grupo con este nombre"
        )
    else:
        db_group = models.Group(name=group.name, description=group.description)
        db.add(db_group)
        db.commit()
        db.refresh(db_group)
        return db_group

# Read One
def get_one(db: Session, group_id: int):
    return db.query(models.Group).filter(models.Group.id == group_id).first()

# Read All
def get_all(db: Session):
    return db.query(models.Group).all()

# Update
def refresh(db: Session, group_id: int, group: groups.GroupCreate):
    db_group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not db_group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )

    db_group.description = group.description
    db_group.name = group.name    
    db.commit()
    
    return get_one(db=db, group_id=group_id)

# Delete
def delete(db: Session, group_id):
    db_group = get_one(db=db, group_id=group_id)
    if db_group:
        db.delete(db_group)
        db.commit()
        db.close()
        return "Group deleted"
    else:
        raise HTTPException(status_code=404, detail=f"group with id {group_id} not found")
