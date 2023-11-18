import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const paperStyle = {
  padding: '50px 80px 50px 80px',
  borderRadius: '20px',
  maxWidth: '60%',
  boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
};

const GoogleAPI = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        backgroundColor: '#deded5',
      }}
    >
      <Grid
        item
        xs={12}
        md={10.0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '80px 0px 80px 0px',
        }}
      >
        <Paper elevation={3} style={paperStyle}>
          <Typography variant="h2" gutterBottom>
          Google API Disclosure for Tubesynchub
          </Typography>
          
          <br></br>

          <Typography variant="body1" gutterBottom>
          Tubesynchub client apps use Google APIs when you use your Google account to sign in and use Tubesynchub apps and services.
          </Typography>

          <br></br>
          <br></br>
          <Typography variant="body1" gutterBottom>
          Tubesynchub use and transfer to any other app of information received from Google APIs will adhere to <a href='https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes'>Google API Services User Data Policy</a>, including the Limited Use requirements.
          </Typography>

          <br></br>
          <br></br>

          <Typography variant="body1" gutterBottom>
          The Tubesynchub app doesn’t transfer information received from Google APIs to any other app.
          </Typography>
          <br></br>
          <br></br>

          <Typography variant="body1" gutterBottom>
          You can also see our <a href='https://tubesynchub.tech/privacy-policy'>privacy policy </a>.
          </Typography>

         
          <br></br>
          

          <Typography variant="body1" gutterBottom>
          If you have any questions, clarifications, or concerns, please contact us: By email: support@tubesynchub.tech
          </Typography>

        </Paper>
      </Grid>
    </Grid>
  );
};

export default GoogleAPI;
