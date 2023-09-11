import React from 'react';
import { Typography, Grid, Paper, Container } from '@mui/material';

const paperStyle = {
  padding: '90px 80px 50px 80px',
  borderRadius: '20px', // Rounded edges
  backgroundColor: 'white', // Paper background color
  minHeight: '80vh',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
};

const headingStyle = {
  fontWeight: 'bold',
  marginBottom: '16px',
  fontSize: '24px', // Larger text size
};

const bodyTextStyle = {
  marginBottom: '12px',
  fontSize: '18px', // Larger text size
};

const AboutUs = () => {
  return (
    <Grid container sx={{  justifyContent: 'center', backgroundColor:'#deded5'}}>
        <Grid item xs={12} md={8} sx={{padding:'80px 0px 80px 0px'}}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h4" style={headingStyle}>
              About YouTube Video Collaboration Platform
            </Typography>
            <Typography variant="body1" style={bodyTextStyle}>
              Welcome to the YouTube Video Collaboration Platform, your ultimate
              destination for seamless collaboration between content creators
              and skilled video editors.
            </Typography>
            <Typography variant="body1" style={bodyTextStyle}>
              Our mission is to simplify the video collaboration process for
              YouTubers by offering an innovative platform that streamlines
              video editing and uploading, leaving creators free to focus on
              their content.
            </Typography>
            <Typography variant="body1" style={bodyTextStyle}>
              Key Features:
            </Typography>
            <ul>
              <li>
                <Typography variant="body2" style={bodyTextStyle}>
                  Secure User Authentication: Ensuring data privacy and
                  protection.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" style={bodyTextStyle}>
                  Direct Video Uploads: Eliminating the need for
                  downloading/re-uploading large files.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" style={bodyTextStyle}>
                  Efficient Workflow: Reducing turnaround times and enhancing
                  efficiency.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" style={bodyTextStyle}>
                  Familiar Interface: Providing a YouTube-like experience for
                  users.
                </Typography>
              </li>
            </ul>
            <Typography variant="body1" style={bodyTextStyle}>
              We're excited to be a part of your YouTube journey, helping you
              optimize content creation and editing for more engaging and
              high-quality videos.
            </Typography>
            <Typography variant="body1" sx={{fontSize: '18px',}}>
              Contact Us at support@tubesynchub.tech for any questions or
              feedback.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
  );
};

export default AboutUs;
