import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import config from '../config/config';
import { useRecoilValue } from 'recoil';
import { token_local } from '../Store/Atom/creator';
import { maxWidth } from '@mui/system';

function DashboardComponent() {
  const token = useRecoilValue(token_local);

  const handleSubmit = () => {
    const url = `${config.base_url}/api/creator/auth/google?token=${token}`;
    const width = 600;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const options = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, 'googleAuth', options);
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light grey background color
      }}
    >
      <Grid item>
        <Typography
          variant="h4"
          sx={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '20px' }}
        >
          Authenticate Your YouTube Channel
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: '20px', marginBottom: '10px',maxWidth:'600px' }}
        >
       <strong>&bull;</strong> To streamline your video collaboration process, we require you to authenticate your YouTube channel.
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: '20px', marginBottom: '10px' ,maxWidth:'600px'}}
        >
         <strong>&bull;</strong>  Once the video has been approved by you, Application will upload that video to your Youtube Channel.
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontSize: '20px', marginBottom: '25px' ,maxWidth:'600px'}}
        >
         <strong>&bull;</strong> To get started, click the "Youtube" button below.
        </Typography>

        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<img src={'/yt_logo.png'} style={{width: '100%', height: '100%', objectFit: 'cover' }} alt="YouTube Logo" />}
          sx={{
            width: '200px',
            height: '60px',
            backgroundColor: 'white',
            borderRadius: '10px',
            fontSize: '15px',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'white', // Darker color on hover
            },
            marginBottom:'30px'
          }}
        >
        </Button>
      
      </Grid>
      <Typography
          variant="h6"
          sx={{ fontSize: '15px', marginBottom: '0px', maxWidth:"1000px" }}
        >
         Note: Your privacy is of utmost importance to us, and your permissions remain confidential. They are not shared with anyone, including the editors you collaborate with.
        </Typography>
    </Grid>
  );
}

export default DashboardComponent;
