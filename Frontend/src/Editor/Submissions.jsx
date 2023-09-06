import React from 'react';
import SubmissionBox from './SubmissionBox'; // Update the import path
import GetSubmissions from './GetSubmissions';
import Typography from '@mui/material/Typography';

export default function AllSubmissions() {


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
        height:'100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '35px',
          fontWeight: 'bold',
          marginBottom: '40px',
        }}
      >
        All your past Submitted Videos to particular creators.
      </Typography>
      
    <div>
      {Data.map((submission) => (
        <SubmissionBox key={submission._id} submission={submission} />
      ))}
    </div>
    </div>
  );
}
