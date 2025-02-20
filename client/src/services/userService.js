import api from '../utils/api';

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  deleteAccount: () => api.delete('/users/profile')
}; 