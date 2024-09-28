import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

    <AppBar style={style.appBar}>
      <Toolbar style={style.toolbar}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button style={style.button} component={Link} to="/users">
          Users
        </Button>
        <Button style={style.button} component={Link} to="/analytics">
          Analytics
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const style = {
    appBar: {
        backgroundColor: '#606c38',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', 
        position: 'fixed', 
        width: '100%', 
        height: '80px',
        top: 0,  
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'space-between', 
        padding: '16px', 
      },
      button: {
        color: 'white', 
        fontWeight: 'bold', 
      },
};

export default Navbar;
