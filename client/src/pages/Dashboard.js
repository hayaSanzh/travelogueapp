import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { entryService } from '../services/entryService';
import { userService } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEntry, setNewEntry] = useState({ title: '', description: '', travelDate: '', location: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [userResponse, entriesResponse] = await Promise.all([
          userService.getProfile(),
          entryService.getUserEntries()
        ]);
        setUserData(userResponse.data);
        setEntries(entriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await entryService.createEntry(newEntry);
      setNewEntry({ title: '', description: '', travelDate: '', location: '' });
      const response = await entryService.getUserEntries();
      setEntries(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to create entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await entryService.deleteEntry(id);
      const response = await entryService.getUserEntries();
      setEntries(response.data);
    } catch (err) {
      setError('Failed to delete entry');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="user-info">
        <h2>Welcome, {userData.username}!</h2>
        <p>Email: {userData.email}</p>
      </div>

      <div className="entries-section">
        <h3>Add New Entry</h3>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="entry-form">
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Travel Date:</label>
            <input
              type="date"
              value={newEntry.travelDate}
              onChange={(e) => setNewEntry({ ...newEntry, travelDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={newEntry.location}
              onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Entry'}
          </button>
        </form>

        <h3>Your Recent Entries</h3>
        <div className="entries-list">
          {entries.map(entry => (
            <div key={entry._id} className="entry-card">
              <h3>{entry.title}</h3>
              <p><strong>Description:</strong> {entry.description}</p>
              <p><strong>Travel Date:</strong> {new Date(entry.travelDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {entry.location}</p>
              <div className="entry-actions">
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 