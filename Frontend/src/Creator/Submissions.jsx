import React from 'react';
import SubmissionBox from './SubmissionBox'; // Update the import path
import GetSubmissions from './GetSubmissions';
import Typography from '@mui/material/Typography';

export default function Submissions() {


  const Data = GetSubmissions();


  if (Data === null) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        height: '100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '35px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Submission from the Editors
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: '20px',
          marginBottom: '0px',
          maxWidth: '600px',

        }}
      >
        Explore Submissions from editor who has collaborate with you.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: '20px',
          marginTop: '20px',
          marginBottom: '30px',
          maxWidth: '700px',
          textAlign: 'center', // Center the content horizontally within each line
        }}
      >
        Upon accepting an Submission,  video will get directly uploaded to Youtube.
      </Typography>

      <div>
        {Data.filter((submission) => !submission.read).map((submission) => (
          <SubmissionBox key={submission._id} submission={submission} />
        ))}
      </div>

    </div>
  );
}
