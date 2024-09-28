import React from 'react';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container style={styles.container}>
      <Typography variant="h3"style={styles.title}>
        Welcome to the Admin Panel
      </Typography>
      <Typography variant="body1" style={styles.body}>
        Use the navigation bar to manage users and view analytics.
      </Typography>
    </Container>
  );
};

const styles = {
  container: {
    padding: '20px', 
    marginTop: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', 
    borderRadius: '8px', 
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
    marginBottom: '16px', 
  },
  body: {
    fontSize: '1rem', 
    lineHeight: '1.5', 
    textAlign: 'center',
  },
};

export default Home;
