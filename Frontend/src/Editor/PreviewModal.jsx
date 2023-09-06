import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function PreviewModal({ open, onClose, previewData }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Preview</DialogTitle>
      <DialogContent>
       
          <TextField
            label={`Title`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={previewData?.title}
            inputProps={{ maxLength: 100, required: true }}
          />

          <TextField
            label={`Description`}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={previewData?.description}
            inputProps={{ maxLength: 5000 }}
          />

          <Grid container spacing={2} justifyContent="space-around" sx={{ marginBottom: '15px',marginTop:'15px' }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={6} style={{ padding: '5px', textAlign: 'center' }}>
                <img
                  src={previewData?.thumbnailUrl}
                  alt="Thumbnail"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={6} style={{ padding: '5px', textAlign: 'center' }}>
                <video controls style={{ width: '100%' }}>
                  <source src={previewData?.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Paper>
            </Grid>
          </Grid>

          <TextField
            label="Keywords (comma-separated)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={previewData?.keywords}
          />

          <Button onClick={onClose} variant="contained" color="primary" sx={{backgroundColor:'black','&:hover': { backgroundColor: '#393E46' }}}>
            Close
          </Button>
       
      </DialogContent>
    </Dialog>
  );
}

export default PreviewModal;
