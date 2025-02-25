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
  const [editingEntry, setEditingEntry] = useState(null);

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
      const formattedEntry = {
        ...newEntry,
        travelDate: new Date(newEntry.travelDate).toISOString()
      };

      await entryService.createEntry(formattedEntry);
      setNewEntry({ title: '', description: '', travelDate: '', location: '' });
      const response = await entryService.getUserEntries();
      setEntries(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create entry');
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

  const handleUpdate = (entry) => {
    const travelDateFormatted = entry.travelDate ? entry.travelDate.split('T')[0] : '';
    setEditingEntry({ ...entry, travelDate: travelDateFormatted });
  };

  const handleEditingChange = (e) => {
    setEditingEntry({ ...editingEntry, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...editingEntry,
        travelDate: new Date(editingEntry.travelDate).toISOString()
      };
      await entryService.updateEntry(editingEntry._id, updatedData);
      const response = await entryService.getUserEntries();
      setEntries(response.data);
      setEditingEntry(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update entry');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!userData) return <div className="alert alert-error">Unable to load user data</div>;

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
              minLength="3"
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              required
              minLength="10"
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
              minLength="2"
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
              <p>
                <strong>Travel Date:</strong> {new Date(entry.travelDate).toLocaleDateString()}
              </p>
              <p><strong>Location:</strong> {entry.location}</p>
              <div className="entry-actions">
                <button onClick={() => handleUpdate(entry)}>Update</button>
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingEntry && (
        <div
          className="modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            className="modal-content"
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '5px',
              width: '500px',
              maxWidth: '90%',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h3>Edit Entry</h3>
            <form onSubmit={handleEditSubmit}>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editingEntry.title}
                  onChange={handleEditingChange}
                  required
                  minLength="3"
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={editingEntry.description}
                  onChange={handleEditingChange}
                  required
                  minLength="10"
                  rows="5"
                  cols="45"
                />
              </div>
              <div>
                <label>Travel Date:</label>
                <input
                  type="date"
                  name="travelDate"
                  value={editingEntry.travelDate}
                  onChange={handleEditingChange}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={editingEntry.location}
                  onChange={handleEditingChange}
                  required
                  minLength="2"
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <button type="submit">Update Entry</button>
                <button type="button" onClick={() => setEditingEntry(null)} style={{ marginLeft: '10px' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
