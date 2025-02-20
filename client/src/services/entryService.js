import api from '../utils/api';

export const entryService = {
  getAllEntries: () => api.get('/entries'),
  getUserEntries: () => api.get('/entries/user'),
  getEntry: (id) => api.get(`/entries/${id}`),
  createEntry: async (entryData) => {
    try {
      const response = await api.post('/entries', entryData);
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateEntry: (id, entryData) => api.put(`/entries/${id}`, entryData),
  deleteEntry: (id) => api.delete(`/entries/${id}`)
}; 