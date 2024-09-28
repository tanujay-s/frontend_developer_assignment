import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers()
      .then((res) => {
        setUsers(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
        .then(() => fetchUsers())
        .catch((err) => console.error(err));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    setSortField(field);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchField}
        />
        <Button variant="contained" color="primary" component={Link} to="/users/new">
          Add User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('name')} style={styles.tableCell}>
                Name
              </TableCell>
              <TableCell onClick={() => handleSort('email')} style={styles.tableCell}>
                Email
              </TableCell>
              <TableCell onClick={() => handleSort('role')} style={styles.tableCell}>
                Role
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/users/edit/${user.id}`} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} style={styles.noUsersCell}>
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const styles = {
    container: {
      padding: '20px',
      marginTop: '80px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
    },
    searchContainer: {
      marginBottom: '20px',
      display: 'flex', 
      justifyContent: 'space-between', 
    },
    searchField: {
      flexGrow: 1,
      marginRight: '20px', 
    },
    tableCell: {
      cursor: 'pointer',
    },
    noUsersCell: {
      textAlign: 'center',
    },
  };

export default UserList;
