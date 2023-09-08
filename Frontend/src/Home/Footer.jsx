import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Paper } from '@mui/material';



const classes = {

  link: {
    textDecoration: 'none',
    color: 'black',

  },
};

const Footer = () => {


  return (
    <div style={{
      height: '300px',
    }}>
    <Paper sx={{backgroundColor: '#deded5',width:'100%', paddingBottom:'50px'}}>
      <Container >
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <Grid item md={2} >
            <Typography variant="h6">
              <Link href="#" sx={classes.link}>
                About us
              </Link>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="h6">
              <Link href="#" sx={classes.link}>
                Products
              </Link>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="h6">
              <Link href="#" sx={classes.link}>
                Awards
              </Link>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="h6">
              <Link href="#" sx={classes.link}>
                Help
              </Link>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="h6">
              <Link href="#" sx={classes.link}>
                Contact
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <hr />

        <Grid container align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
          <Grid item lg={10}>
            <Typography variant="body1">
            Explore, connect, and elevate your YouTube channel to new heights. 
            Unleash your potential and make your mark on the digital landscape with our innovative platform.
            </Typography>
          </Grid>
        </Grid>

      </Container>
      </Paper>
      <Paper
      elevation={3}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body2" color="text.primary" align="center">
          © 2023 Copyright:
          <Link
            href="https://tubecove.zenservers.com/"
            color="inherit"
            underline="none"
          >
            Tubecove.com
          </Link>
        </Typography>
      </Container>
    </Paper>
    </div>
  );
}

export default Footer;
