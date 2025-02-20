import React, { useState, useEffect } from 'react';
import { entryService } from '../services/entryService';

function Entries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEntry, setNewEntry] = useState({ title: '', description: '', travelDate: '', location: '' });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await entryService.getAllEntries();
      setEntries(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch entries');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await entryService.createEntry(newEntry);
      setNewEntry({ title: '', description: '', travelDate: '', location: '' });
      fetchEntries();
    } catch (err) {
      setError('Failed to create entry');
    }
  };

  const handleDelete = async (id) => {
    try {
      await entryService.deleteEntry(id);
      fetchEntries();
    } catch (err) {
      setError('Failed to delete entry');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="entries">

      <div className="entries-list">
        {entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <h3>{entry.title}</h3>
            <p><strong>Description:</strong> {entry.description}</p>
            <p><strong>Travel Date:</strong> {new Date(entry.travelDate).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {entry.location}</p>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default Entries; 