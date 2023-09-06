import React, { useState, useRef } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import config from '../config/config';
import Axios from 'axios';
import { useRecoilValue } from 'recoil';
import { token_local } from '../Store/Atom/creator';
import { Container } from '@mui/system';

const defaultTheme = createTheme();

const Content = styled('div')({
  padding: '20px',
  textAlign: 'center',
});

const ChannelName = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
});

const Detail = styled(Typography)({
  fontSize: '1rem',
  marginBottom: '20px',
  color: '#333',
});

const InviteButton = styled(Button)({
  width: '150px',
  height: '50px',
  borderRadius: '10px',
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: '#000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#393E46',
  },
});

const InviteModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Paper)({
  position: 'absolute',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: defaultTheme.shadows[5],
  padding: defaultTheme.spacing(2, 4, 3),
  textAlign: 'center',
});

function InviteComponent() {
  const token = useRecoilValue(token_local);
  const headers = {
    Authorization: 'Bearer ' + token,
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  const formRef = useRef(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = async (event) => {
    event.preventDefault();
    const formElement = formRef.current;
    const formData = new FormData(formElement);

    const newUser = { editorUsername: formData.get('email') };
    const url = config.base_url + '/api/creator/invite';
    const loginRes = await Axios.post(url, newUser, { headers });

    if (loginRes.data.status === 'fail') {
      setEmailError(loginRes.data.message);
    } else {
      alert('Invitation Sent Successfully');
      setModalOpen(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
        <CssBaseline />

        <Grid item>
        <Typography
          variant="h4"
          sx={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '20px' }}
        >
          Invite Collaborators to Your Channel
        </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: '20px', marginBottom: '10px', maxWidth: '600px' }}
          >
         <strong>&bull;</strong>  Invite video editors based on their application Email Address.
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: '20px', marginBottom: '10px', maxWidth: '600px' }}
          >
          <strong>&bull;</strong>  Only invited editors are allowed to submit video to the respective creator.
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontSize: '20px', marginBottom: '25px', maxWidth: '600px' }}
          >
          <strong>&bull;</strong>   To kickstart the process, simply click the "Invite" button.
          </Typography>

          <InviteButton variant="outlined" onClick={handleModalOpen}>
            Invite
          </InviteButton>
        </Grid>

        <InviteModal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Invite to Channel Name
            </Typography>
            <form ref={formRef} onSubmit={handleModalClose}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                name="email"
                error={emailError.length > 0 ? true : false}
                helperText={emailError}
                autoFocus
              />
              <Button type="submit" variant="contained" color="primary" sx={{backgroundColor:'black', '&:hover': { backgroundColor: '#393E46' }}}>
                Send Invitation
              </Button>
            </form>
          </ModalContent>
        </InviteModal>
      </Grid>
    </ThemeProvider>
  );
}

export default InviteComponent;
