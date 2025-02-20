import api from '../utils/api';

export const entryService = {
  getAllEntries: () => api.get('/entries'),
  getUserEntries: () => api.get('/entries/user'),
  getEntry: (id) => api.get(`/entries/${id}`),
  createEntry: (entryData) => api.post('/entries', entryData),
  updateEntry: (id, entryData) => api.put(`/entries/${id}`, entryData),
  deleteEntry: (id) => api.delete(`/entries/${id}`)
}; 