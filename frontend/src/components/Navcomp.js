import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const Navcomp = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          ChatApp 
        </Typography>
       <Button color="inherit" component={RouterLink} to="/home">Home</Button>
        <Button color="inherit" component={RouterLink} to="/about">About</Button>
        </Toolbar>
    </AppBar>
  );
};
 
export default Navcomp;