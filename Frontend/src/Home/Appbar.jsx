import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';



const CustomAppBar = () => {
    const scrollToLoginSignup = () => {
        const loginSignupContainer = document.getElementById('loginSignupContainer');
        loginSignupContainer.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToHowitWorks = () => {
        const loginSignupContainer = document.getElementById('HowItWorks');
        loginSignupContainer.scrollIntoView({ behavior: 'smooth' });
    };

    

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={0} md={1.45} />
                    <Grid item xs={4} md={1} >
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <img
                                src={'logo-removebg-preview.png'}
                                alt="Logo"
                                height="40"
                                width="100%"
                                style={{ marginTop: '5px', cursor: 'pointer' }}
                            />
                        </a>
                    </Grid>
                    <Grid item xs={2}  md={5} />
                    <Grid item xs={0.6} md={1.2}>
                        <Button color="inherit" onClick={scrollToHowitWorks}>How It Works</Button>
                    </Grid>
                    <Grid item xs={2} md={0.1} />
                    <Grid item xs={2} md={1.1}>
                        <Button variant="contained" color="primary" sx={{ backgroundColor: "#000000", '&:hover': { backgroundColor: '#393E46' } }} onClick={scrollToLoginSignup}>
                            Get Started
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
