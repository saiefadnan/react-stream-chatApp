import 'flag-icons/css/flag-icons.min.css';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const Home = () => {
    return ( 
    <div className="page">
        <div className="box">
            <h2>Real-Time-Chat-App</h2>
            <h3>Hello this is a testing-website</h3>
            <p>Developed by saief adnan</p>
            <p>From</p>
            <i className="fi fi-bd"></i>
            <div className='link-container'>
                <Link to="/login" 
                component={RouterLink}
                sx={{ 
                    backgroundColor: 'crimson', 
                    color: 'white', 
                    padding: '8px 16px', 
                    textDecoration: 'none', 
                    borderRadius: '4px',
                    display: 'inline-block',
                    cursor: 'pointer'
                }}>Login</Link>
                <Link to="/signin" 
                component={RouterLink}
                sx={{ 
                    backgroundColor: '#0078D7', 
                    color: 'white', 
                    padding: '8px 16px', 
                    textDecoration: 'none', 
                    borderRadius: '4px',
                    display: 'inline-block',
                    cursor: 'pointer'
                }}>Signin</Link>
            </div>
        </div>
    </div> 
    )
}
 
export default Home;