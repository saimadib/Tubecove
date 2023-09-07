import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Autocomplete, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Axios from 'axios';
import config from '../config/config';
import { useRecoilValue } from 'recoil';
import { token_editor } from '../Store/Atom/editor';
import CircularProgress from '@mui/material/CircularProgress';

const MAX_VIDEO_SIZE_GB = 10;
const MAX_THUMBNAIL_SIZE_MB = 2; // Maximum thumbnail size allowed by YouTube (in megabytes)
const THUMBNAIL_WIDTH = 1280; // Thumbnail width in pixels
const THUMBNAIL_HEIGHT = 720; // Thumbnail height in pixels

const SubmitVideo = () => {
  const token = useRecoilValue(token_editor);

  const [creators, setCreators] = useState([]);
  const [creatorId, setCreatorId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [keywords, setKeywords] = useState('');
  const [isMadeForKids, setIsMadeForKids] = useState(false);


  const titleLimit = 100;
  const descriptionLimit = 5000;
  const keywordsLimit = 500;


  useEffect(() => {
    async function fetchCreators() {
      try {
        const response = await Axios.get(`${config.base_url}/api/editor/creatorlist`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCreators(response.data.connections); // Assuming the response data has an array called "connections"
      } catch (error) {
        console.error(error);
        // alert(error);
      }
    }

    fetchCreators();
  }, []);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeGB = file.size / (1024 * 1024 * 1024); // Convert bytes to gigabytes
      if (fileSizeGB > MAX_VIDEO_SIZE_GB) {
        alert(`Video size exceeds the maximum allowed size of ${MAX_VIDEO_SIZE_GB} GB.`);
        // Optionally, you can reset the input or show an error message.
      } else {
        setVideoFile(file);
      }
    }
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };


  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to megabytes
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (fileSizeMB > MAX_THUMBNAIL_SIZE_MB) {
          alert(`Thumbnail size exceeds the maximum allowed size of ${MAX_THUMBNAIL_SIZE_MB} MB.`);
          // Optionally, you can reset the input or show an error message.
        } else if (width !== THUMBNAIL_WIDTH || height !== THUMBNAIL_HEIGHT) {
          alert(`Thumbnail dimensions must be ${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT} pixels.`);
          // Optionally, you can reset the input or show an error message.
        } else {
          setThumbnailFile(file);
        }
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('creatorUsername', creatorId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('keywords', keywords);
    formData.append('isMadeForKids', isMadeForKids);


    try {
      setLoading(true); // Show loading overlay
      const response = await Axios.post(`${config.base_url}/api/editor/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + token,
        },
        onUploadProgress: (progressEvent) => {
          // Calculate and update the upload progress
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      // Reset the form and loading state after successful submission
      setCreatorId('');
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
      setKeywords('');
      setUploadProgress(0);

      alert('Video submitted successfully.');
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the video.');
    } finally {
      setLoading(false); // Hide the loading overlay
    }
  };

  return (
    <>
      {isLoading && (
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

      <Typography variant="h4" gutterBottom>
        Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Autocomplete
          disablePortal
          id="creator-autocomplete"
          options={creators}
          value={creatorId}
          onChange={(event, newValue) => setCreatorId(newValue)}
          renderInput={(params) => <TextField {...params} label="Creator Username" />}
        />
        <TextField
          label={`Title (${title.length}/${titleLimit})`}
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(event) => {
            const newValue = event.target.value;
            if (newValue.length <= titleLimit) {
              setTitle(newValue);
            }
          }}
          inputProps={{ maxLength: titleLimit, required: true }}
        />

        <TextField
          label={`Description (${description.length}/${descriptionLimit})`}
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          minRows={4}
          value={description}
          onChange={(event) => {
            const newValue = event.target.value;
            if (newValue.length <= descriptionLimit) {
              setDescription(newValue);
            }
          }}
          inputProps={{
            maxLength: descriptionLimit,
          }}
        />


        <TextField
          label={`Keywords (${keywords.length}/${keywordsLimit})`}
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          value={keywords}
          onChange={(event) => {
            const newValue = event.target.value;
            if (newValue.length <= keywordsLimit) {
              setKeywords(newValue);
            }
          }}
          inputProps={{ maxLength: keywordsLimit }}
          helperText={`Enter keywords separated by commas (e.g., keyword1, keyword2). Maximum ${keywordsLimit} characters.`}
        />
        <Grid container spacing={2} justifyContent="space-around" sx={{ marginBottom: '15px' }} >
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: 'grey',
                width: '320px',
                height: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15px',
              }}
            >
              {videoFile ? (
                <video src={URL.createObjectURL(videoFile)} controls width="320" height="180" />
              ) : (
                <>
                  <label htmlFor="video-file-input">
                    <Button variant="contained" component="span" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#393E46' } }}>
                      Select Video
                    </Button>
                    <input
                      accept="video/*"
                      style={{ display: 'none' }}
                      id="video-file-input"
                      type="file"
                      onChange={handleVideoChange}
                    />
                  </label>
                </>
              )}
            </Box>


          </Grid>
          <Grid item xs={12} md={3}>

            <Box
              sx={{
                backgroundColor: 'grey',
                width: '320px',
                height: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15px',
              }}
            >
              {thumbnailFile ? (
                <img src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail" width="320" height="180" />
              ) : (
                <>
                  <label htmlFor="thumbnail-file-input">
                    <Button variant="contained" component="span" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#393E46' } }}>
                      Select Thumbnail
                    </Button>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="thumbnail-file-input"
                      type="file"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <FormControl component="fieldset" sx={{ display: 'flex', flexDirection: 'column', marginTop: '30px', marginBottom: '20px' }}>
          <FormLabel component="legend" sx={{ fontWeight: 'bold', color: 'black !important' }}>Audience</FormLabel>

          <Typography sx={{ marginTop: '15px', color: 'gray', fontSize: '13px', maxWidth: '500px' }}>Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are made for kids.
            <a href='https://support.google.com/youtube/answer/9528076?hl=en' style={{ color: '#3f50b5', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">What's content made for kids?</a>
          </Typography>
          <Box sx={{ backgroundColor: '#f5f5f5', maxWidth: '500px', margin: '30px 0px 15px 0px' }}>
            <Typography sx={{ marginTop: '10px', color: 'gray', fontSize: '12px', maxWidth: '600px', marginBottom: '10px', marginLeft: '5px' }}>Features like personalized ads and notifications won’t be available on videos made for kids. Videos that are set as made for kids by you are more likely to be recommended alongside other kids’ videos.
              <a href='https://support.google.com/youtube/answer/9527654?hl=en' style={{ color: '#3f50b5', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Learn more</a>
            </Typography>
          </Box>
          <RadioGroup
            aria-label="audience"
            name="audience"
            value={isMadeForKids.toString()}
            onChange={(event) => setIsMadeForKids(event.target.value === "true")}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label={<span style={{ color: 'black' }}>Yes, it's made for kids.</span>}
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label={<span style={{ color: 'black' }}>No, it's not made for kids.</span>}
            />
          </RadioGroup>
        </FormControl>


        <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#393E46' } }}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default SubmitVideo;
