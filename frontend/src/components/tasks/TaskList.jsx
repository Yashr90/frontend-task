import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { Alert } from '../common/Alert';
import { useTasks } from '../../hooks/useTasks';

export const TaskList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    page: 1,
  });
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [actionLoading, setActionLoading] = useState(false);

  const { tasks, loading, error, pagination, fetchTasks, createTask, updateTask, deleteTask } = useTasks(filters);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
      page: 1, // Reset to first page when filter changes
    }));
  };

  const handleSearch = (searchValue) => {
    // Debounce search
    if (searchTimeout) clearTimeout(searchTimeout);
    
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchValue,
        page: 1,
      }));
    }, 500);

    setSearchTimeout(timeout);
    setFilters((prev) => ({ ...prev, search: searchValue }));
  };

  const handleCreateTask = async (taskData) => {
    setActionLoading(true);
    try {
      await createTask(taskData);
      setIsCreateModalOpen(false);
      setMessage({ type: 'success', text: 'Task created successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to create task' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditTask = async (taskData) => {
    setActionLoading(true);
    try {
      await updateTask(selectedTask.id, taskData);
      setIsEditModalOpen(false);
      setSelectedTask(null);
      setMessage({ type: 'success', text: 'Task updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update task' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(task.id);
      setMessage({ type: 'success', text: 'Task deleted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to delete task' });
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update task' });
    }
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const totalPages = Math.ceil(pagination.total / pagination.page_size);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create New Task
        </Button>
      </div>

      {/* Messages */}
      {message.text && (
        <Alert type={message.type} message={message.text} onClose={() => setMessage({ type: '', text: '' })} />
      )}

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      {/* Task List */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert type="error" message={error} />
      ) : tasks.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-lg">No tasks found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first task to get started</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                variant="secondary"
                className="px-3 py-1.5"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {totalPages}
              </span>
              <Button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === totalPages}
                variant="secondary"
                className="px-3 py-1.5"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={actionLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        title="Edit Task"
      >
        <TaskForm
          task={selectedTask}
          onSubmit={handleEditTask}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedTask(null);
          }}
          loading={actionLoading}
        />
      </Modal>
    </div>
  );
};