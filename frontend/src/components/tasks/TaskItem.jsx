import React from 'react';
import { Button } from '../common/Button';

export const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  const statusLabels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
              className="h-5 w-5 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
            />
            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-3 ml-8">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 ml-8">
            <span className={`badge badge-${task.status}`}>
              {statusLabels[task.status]}
            </span>
            <span className={`badge badge-${task.priority}`}>
              {priorityLabels[task.priority]}
            </span>
            <span className="text-sm text-gray-500">
              Due: {formatDate(task.due_date)}
            </span>
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <Button
            onClick={() => onEdit(task)}
            variant="secondary"
            className="text-sm px-3 py-1.5"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(task)}
            variant="secondary"
            className="text-sm px-3 py-1.5 text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};