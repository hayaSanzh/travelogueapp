import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

function Admin() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, statsResponse] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getStats()
      ]);
      setUsers(usersResponse.data);
      setStats(statsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch admin data');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await adminService.deleteUser(userId);
      fetchData();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      
      {stats && (
        <div className="stats">
          <h3>Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Users</h4>
              <p>{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h4>Total Entries</h4>
              <p>{stats.totalEntries}</p>
            </div>
          </div>
        </div>
      )}

      <div className="users-list">
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin; 