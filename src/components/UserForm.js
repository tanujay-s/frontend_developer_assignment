import React, { useState, useEffect } from 'react';
import { createUser, getUser, updateUser } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem, Paper, Typography } from '@mui/material';

const UserForm = () => {
    const [user, setUser] = useState({ name: '', email: '', role: 'user' });
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    useEffect(() => {
        if (isEdit) {
            getUser(id)
                .then((res) => setUser(res.data))
                .catch((err) => console.error('Error fetching user:', err));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentDate = new Date().toISOString();

        if (isEdit) {
            const updatedUser = { ...user, updatedAt: currentDate };
            updateUser(id, updatedUser)
                .then(() => navigate('/users'))
                .catch((err) => console.error('Error updating user:', err));
        } else {
            const newUser = { ...user, createdAt: currentDate, updatedAt: currentDate };
            createUser(newUser)
                .then(() => navigate('/users'))
                .catch((err) => console.error('Error creating user:', err));
        }
    };

    return (
        <div style={styles.container}>
            <Paper style={styles.paper}>
                <Typography variant="h6" style={styles.title}>
                    {isEdit ? 'Edit User' : 'Add New User'}
                </Typography>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <TextField
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        style={styles.textField}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        style={styles.textField}
                    />
                    <TextField
                        select
                        label="Role"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                        style={styles.textField}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" style={styles.button}>
                        {isEdit ? 'Update User' : 'Create User'}
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '80px',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', 
    },
    paper: {
        padding: '30px',
        margin: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        marginBottom: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    textField: {
        borderRadius: '4px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#3f51b5',
            },
            '&:hover fieldset': {
                borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3f51b5',
            },
        },
    },
    button: {
        marginTop: '20px',
        borderRadius: '4px',
    },
};

export default UserForm;
