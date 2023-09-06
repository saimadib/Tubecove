import React from 'react';
import GetInvitations from './GetInvitations';
import InvitationBox from './InvitationBox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Invitations() {
  const data = GetInvitations();

  if (!data || !data.invitations) {
    return <div>Loading...</div>; // You can use any loading indicator here
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
          marginBottom: '20px',
        }}
      >
        Collaborate with Creators
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: '20px',
          marginBottom: '0px',
          maxWidth: '600px',
          
        }}
      >
        Explore invitations from creators who want to collaborate with you.
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
  Upon accepting an invitation, a secure connection is established between you and the creator, allowing you to submit videos directly to them.
</Typography>


      <div>
        {data.invitations.map((invitation) => (
          <InvitationBox key={invitation._id} invitation={invitation} />
        ))}
      </div>
    </div>
  );
}
