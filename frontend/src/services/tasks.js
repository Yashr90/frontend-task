import api from './api';

export const tasksService = {
  async getTasks(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.page_size) queryParams.append('page_size', params.page_size);
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.priority) queryParams.append('priority', params.priority);

    const response = await api.get(`/api/v1/tasks?${queryParams.toString()}`);
    return response.data;
  },

  async getTask(taskId) {
    const response = await api.get(`/api/v1/tasks/${taskId}`);
    return response.data;
  },

  async createTask(taskData) {
    const response = await api.post('/api/v1/tasks/', taskData);
    return response.data;
  },

  async updateTask(taskId, taskData) {
    const response = await api.put(`/api/v1/tasks/${taskId}`, taskData);
    return response.data;
  },

  async deleteTask(taskId) {
    await api.delete(`/api/v1/tasks/${taskId}`);
  },
};