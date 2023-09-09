import * as React from 'react';
;
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

import { useState } from 'react';
import { token_local } from "../Store/Atom/creator";
import config from '../config/config';
import { useSetRecoilState } from 'recoil';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
      Tubesynchub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function EditorForgotPassword() 
{
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const newUser = {   email: data.get('email') };
    const url = config.base_url + "/api/editor/forgotpassword";
    const loginRes = await Axios.post(url, newUser);

    if (loginRes.data.status === "fail") {
    setEmailError(loginRes.data.message);
    } 
    else {
      alert(loginRes.data.message);
      navigate('/editor/login');
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
     
      {/* Left side with image */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Editor  Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={emailError.length > 0 ? true : false}
              helperText={emailError}
              autoFocus
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Forgot Password
            </Button>
            {loading && (
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <Box
                    sx={{
                      position: 'fixed',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: '9999',
                    }}
                  >

                    <CircularProgress variant="indeterminate" size={80} thickness={6} color="primary" />

                  </Box>
                </Box>
              )}
            <Grid container>
              <Grid item>
                <Link href="/editor/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}