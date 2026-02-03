from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import Optional
from app.database import get_db
from app.models.user import User
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse, TaskListResponse
from app.utils.auth import get_current_active_user
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/tasks", tags=["Tasks"])


@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Create a new task
    
    - **title**: Task title (required)
    - **description**: Task description
    - **status**: pending, in_progress, or completed (default: pending)
    - **priority**: low, medium, or high (default: medium)
    - **due_date**: Optional due date
    
    Requires authentication.
    """
    new_task = Task(
        **task_data.model_dump(),
        owner_id=current_user.id
    )
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    
    logger.info(f"Task created: {new_task.id} by user {current_user.email}")
    
    return new_task


@router.get("/", response_model=TaskListResponse)
async def get_tasks(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get all tasks for current user with filtering and pagination
    
    - **page**: Page number (default: 1)
    - **page_size**: Items per page (default: 10, max: 100)
    - **search**: Search in title and description
    - **status**: Filter by status (pending, in_progress, completed)
    - **priority**: Filter by priority (low, medium, high)
    
    Requires authentication.
    """
    query = db.query(Task).filter(Task.owner_id == current_user.id)
    
    # Apply filters
    if search:
        query = query.filter(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%")
            )
        )
    
    if status:
        query = query.filter(Task.status == status)
    
    if priority:
        query = query.filter(Task.priority == priority)
    
    # Get total count
    total = query.count()
    
    # Apply pagination
    skip = (page - 1) * page_size
    tasks = query.order_by(Task.created_at.desc()).offset(skip).limit(page_size).all()
    
    return TaskListResponse(
        tasks=tasks,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific task by ID
    
    Requires authentication. Users can only access their own tasks.
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update a task
    
    - **title**: Update task title
    - **description**: Update description
    - **status**: Update status
    - **priority**: Update priority
    - **due_date**: Update due date
    - **completed**: Mark as completed/incomplete
    
    Requires authentication. Users can only update their own tasks.
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    # Update fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    # Auto-update status based on completed flag
    if task_update.completed is not None:
        task.status = "completed" if task_update.completed else "pending"
    
    db.commit()
    db.refresh(task)
    
    logger.info(f"Task updated: {task.id} by user {current_user.email}")
    
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Delete a task
    
    Requires authentication. Users can only delete their own tasks.
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    db.delete(task)
    db.commit()
    
    logger.info(f"Task deleted: {task_id} by user {current_user.email}")
    
    return None