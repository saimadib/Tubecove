import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import config from '../config/config';
import Axios from 'axios';
import { useRecoilValue } from 'recoil';
import { token_editor } from '../Store/Atom/editor';


function InvitationBox({ invitation }) {
  const token = useRecoilValue(token_editor);
  const headers = {
    Authorization: "Bearer " + token,
};
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleConfirm = (action) => {
    setActionType(action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAction = async () => {
    if (actionType === 'accept') {
      try {
        const url = `${config.base_url}/api/editor/invitations/${invitation._id}`;
        const loginRes = await Axios.post(url, {}, { headers });
        if (loginRes.data.status === 'success') {
          alert('Invitation accepted successfully');
        }

      } catch (error) {
        console.error('Error accepting invitation:', error);
      }
    } 
    else if (actionType === 'decline') {
      try {
        const url = `${config.base_url}/api/editor/invitations/${invitation._id}`;
        const loginRes = await Axios.delete(url, {}, { headers });
      } catch (error) {
        console.error('Error accepting invitation:', error);
      }
    }
    setDialogOpen(false);
  };
  
  return (
    <Card variant="outlined" sx={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">Invitation from  {invitation.creatorUsername}</Typography>
        <br/>
        <Button variant="outlined" onClick={() => handleConfirm('accept')} sx={{ marginRight: '8px' }}>
          Accept
        </Button>
        <Button onClick={() => handleConfirm('decline')} color="secondary">
          Decline
        </Button>
      </CardContent>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{actionType === 'accept' ? 'Accept Invitation' : 'Decline Invitation'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType === 'accept' ? 'accept' : 'decline'} this invitation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleAction} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default InvitationBox;
