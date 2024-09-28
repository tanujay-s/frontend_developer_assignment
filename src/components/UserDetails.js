import React, { useEffect, useState } from 'react';
import { getUser } from '../api';
import { useParams, Link } from 'react-router-dom';
import { Paper, Typography, Button } from '@mui/material';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(id)
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <Paper style={styles.paper}>
                <Typography variant="h5" style={styles.title}>
                    User Details
                </Typography>
                <Typography variant="body1" style={styles.textField}><strong>Name:</strong> {user.name}</Typography>
                <Typography variant="body1" style={styles.textField}><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body1" style={styles.textField}><strong>Role:</strong> {user.role}</Typography>
                <Button variant="contained" color="primary" component={Link} to={`/users/edit/${user.id}`} style={styles.button}>
                    Edit User
                </Button>
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

export default UserDetails;
