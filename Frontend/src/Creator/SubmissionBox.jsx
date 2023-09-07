import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PreviewModal from './PreviewModal'; // Adjust the path accordingly
import axios from 'axios';
import config from '../config/config';
import { useRecoilValue } from 'recoil';
import { token_local } from '../Store/Atom/creator';




function SubmissionBox({ submission }) {
  const token = useRecoilValue(token_local);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null); // State to store the fetched data

  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleConfirm = (action) => {
    setActionType(action);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    // Fetch preview data when the modal opens

    const url = `${config.base_url}/api/creator/submissions/${submission.videoId}`;
    axios.get(url, { headers })
      .then(response => {
        setPreviewData(response.data);
      })
      .catch(error => {
        console.error('Error fetching preview data:', error);
      });

  }, [modalOpen, submission.videoId]);

  const handlePreviewClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAction = async () => {
    if (actionType === 'accept') {
      setDialogOpen(false);
      alert("Your upload is in progress. You may leave, and we will notify you via email upon completion.")
      try {
        const url = `${config.base_url}/api/creator/submissions/${submission._id}`;
        const loginRes = await axios.post(url, {}, { headers });
      } catch (error) {
        console.error('Error Deleting:', error);
      }
    }
    else if (actionType === 'decline') {
      try {
        const url = `${config.base_url}/api/creator/submissions/${submission._id}`;
        const loginRes = await axios.delete(url, {}, { headers });
        alert(loginRes.data.message);
      } catch (error) {
        console.error('Error Deleting:', error);
      }
    }
    setDialogOpen(false);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">
          {submission.accepted ? (
            `Sucessfully uploaded to Youtube channel ${submission.creatorUsername}`
          ) : (
            `You got a new submission from ${submission.editorUsername}`
          )}
        </Typography>
        <br />
        <Button variant="contained" sx={{ marginRight: '8px', '&:hover': { backgroundColor: '#393E46' }, backgroundColor: 'black' }} onClick={handlePreviewClick}>
          Preview
        </Button>
        {!submission.accepted && (
          <>
            <Button color="primary" onClick={() => handleConfirm('accept')} sx={{ marginRight: '8px' }}>
              Accept
            </Button>
            <Button color="secondary" onClick={() => handleConfirm('decline')}>Decline</Button>
          </>
        )}
      </CardContent>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{actionType === 'accept' ? 'Accept Submission' : 'Decline Submission'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType === 'accept' ? 'accept' : 'decline'} this submission?
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
      <PreviewModal open={modalOpen} onClose={handleCloseModal} previewData={previewData} />
    </Card>
  );
}

export default SubmissionBox;
