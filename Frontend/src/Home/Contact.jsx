import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const paperStyle = {
    padding: '50px 80px 50px 80px',
    borderRadius: '20px',
    maxWidth: '60%',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
};


const ContactUs= () => {
    return (
        <Grid container sx={{  justifyContent: 'center', backgroundColor:'#deded5'}}>



            <Grid item xs={12} md={10.0} sx={{ display:'flex' , justifyContent: 'center', alignItems: 'center', minHeight: '100vh' ,padding:'80px 0px 80px 0px'}}>
                <Paper elevation={3} style={paperStyle}>
                    <Typography variant="h2" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                    In case of any issue or feedback reach out to us at - support@tubesynchub.tech
                    </Typography>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default ContactUs;
