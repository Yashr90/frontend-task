from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    status: str = Field(default="pending")
    priority: str = Field(default="medium")
    due_date: Optional[datetime] = None

    @validator('status')
    def validate_status(cls, v):
        allowed_statuses = ['pending', 'in_progress', 'completed']
        if v not in allowed_statuses:
            raise ValueError(f'Status must be one of: {", ".join(allowed_statuses)}')
        return v

    @validator('priority')
    def validate_priority(cls, v):
        allowed_priorities = ['low', 'medium', 'high']
        if v not in allowed_priorities:
            raise ValueError(f'Priority must be one of: {", ".join(allowed_priorities)}')
        return v


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None
    completed: Optional[bool] = None

    @validator('status')
    def validate_status(cls, v):
        if v is not None:
            allowed_statuses = ['pending', 'in_progress', 'completed']
            if v not in allowed_statuses:
                raise ValueError(f'Status must be one of: {", ".join(allowed_statuses)}')
        return v

    @validator('priority')
    def validate_priority(cls, v):
        if v is not None:
            allowed_priorities = ['low', 'medium', 'high']
            if v not in allowed_priorities:
                raise ValueError(f'Priority must be one of: {", ".join(allowed_priorities)}')
        return v


class TaskResponse(TaskBase):
    id: int
    completed: bool
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TaskListResponse(BaseModel):
    tasks: list[TaskResponse]
    total: int
    page: int
    page_size: int