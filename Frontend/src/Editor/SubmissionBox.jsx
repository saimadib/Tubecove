import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import PreviewModal from './PreviewModal'; // Adjust the path accordingly
import axios from 'axios';
import config from '../config/config';
import { useRecoilValue } from 'recoil';
import { token_editor } from '../Store/Atom/editor';


function SubmissionBox({ submission }) {
  const token = useRecoilValue(token_editor);
  const headers = {
    Authorization: "Bearer " + token,
};

  const [modalOpen, setModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null); // State to store the fetched data

  useEffect(() => {
    // Fetch preview data when the modal opens
   
      const url = `${config.base_url}/api/editor/submissions/${submission.videoId}`;
      axios.get(url,{headers})
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


  return (
    <Card variant="outlined" sx={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">Submitted to {submission.creatorUsername}</Typography>
        <br/>
        <Button variant="contained" sx={{ marginRight: '8px' ,'&:hover': { backgroundColor: '#393E46' } ,backgroundColor:'black'}} onClick={handlePreviewClick}>
          Preview
        </Button>
      </CardContent>
      <PreviewModal open={modalOpen} onClose={handleCloseModal} previewData={previewData} />
    </Card>
  );
}

export default SubmissionBox;
