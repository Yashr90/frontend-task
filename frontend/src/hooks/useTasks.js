import { useState, useEffect, useCallback } from 'react';
import { tasksService } from '../services/tasks';

export const useTasks = (initialParams = {}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    total: 0,
  });

  const fetchTasks = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksService.getTasks({ ...initialParams, ...params });
      setTasks(data.tasks);
      setPagination({
        page: data.page,
        page_size: data.page_size,
        total: data.total,
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    const newTask = await tasksService.createTask(taskData);
    await fetchTasks();
    return newTask;
  };

  const updateTask = async (taskId, taskData) => {
    const updatedTask = await tasksService.updateTask(taskId, taskData);
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? updatedTask : task))
    );
    return updatedTask;
  };

  const deleteTask = async (taskId) => {
    await tasksService.deleteTask(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return {
    tasks,
    loading,
    error,
    pagination,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};