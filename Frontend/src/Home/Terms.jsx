import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const paperStyle = {
  padding: '50px 80px 50px 80px',
  borderRadius: '20px',
  maxWidth: '60%',
  boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
};

const TermsOfUse = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        backgroundColor: '#deded5',
      }}
    >
      <Grid
        item
        xs={12}
        md={10.0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '80px 0px 80px 0px',
        }}
      >
        <Paper elevation={3} style={paperStyle}>
          <Typography variant="h2" gutterBottom>
            Terms of Use
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Last Updated: September 11, 2023
          </Typography>

          <Typography variant="body1" gutterBottom>
            Welcome to Tubesynchub!
          </Typography>

          <Typography variant="body1" gutterBottom>
            Please read these Terms of Use ("Terms") carefully before using Tubesynchub (the "Website"). By accessing
            or using the Website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms,
            please do not use this Website.
          </Typography>

          <Typography variant="h5" gutterBottom>
            1. Acceptance of Terms
          </Typography>

          <Typography variant="body1" gutterBottom>
            By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and
            any future modifications that may be made to them.
          </Typography>

          <Typography variant="h5" gutterBottom>
            2. Use of the Website
          </Typography>

          <Typography variant="body1" gutterBottom>
            2.1. Eligibility: You must be at least 18 years old to use this Website. By using the Website, you represent
            that you are at least 18 years of age.
          </Typography>

          <Typography variant="body1" gutterBottom>
            2.2. User Accounts: Some features of the Website may require you to create a user account. You are responsible
            for maintaining the confidentiality of your account information and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account.
          </Typography>

          <Typography variant="body1" gutterBottom>
            2.3. Prohibited Activities: You agree not to use the Website for any unlawful or prohibited purposes. This
            includes, but is not limited to, the following:
          </Typography>

          <ul>
            <li>
              Transmitting any harmful code or viruses.
            </li>
            <li>
              Attempting to gain unauthorized access to the Website or its servers.
            </li>
            <li>
              Impersonating another person or entity.
            </li>
          </ul>

          <Typography variant="h5" gutterBottom>
            3. Intellectual Property
          </Typography>

          <Typography variant="body1" gutterBottom>
            3.1. Content Ownership: All content and materials on this Website, including but not limited to text, graphics,
            logos, images, and software, are the property of [Your Company Name] and are protected by copyright and other
            intellectual property laws.
          </Typography>

          <Typography variant="body1" gutterBottom>
            3.2. User Content: By posting or submitting any content to the Website, you grant [Your Company Name] a
            non-exclusive, worldwide, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, adapt,
            publish, translate, create derivative works from, distribute, and display such content.
          </Typography>

          <Typography variant="h5" gutterBottom>
            4. Privacy
          </Typography>

          <Typography variant="body1" gutterBottom>
            Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
          </Typography>

          <Typography variant="h5" gutterBottom>
            5. Disclaimer of Warranties
          </Typography>

          <Typography variant="body1" gutterBottom>
            This Website is provided "as is" and "as available" without warranties of any kind, either express or implied.
            Tubesynchub disclaims all warranties, including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, and non-infringement.
          </Typography>

          <Typography variant="h5" gutterBottom>
            6. Limitation of Liability
          </Typography>

          <Typography variant="body1" gutterBottom>
            In no event shall Tubesynchub be liable for any indirect, consequential, incidental, special, punitive,
            or exemplary damages arising out of or in connection with the use of this Website.
          </Typography>

          <Typography variant="h5" gutterBottom>
            7. Changes to Terms
          </Typography>

          <Typography variant="body1" gutterBottom>
            Tubesynchub reserves the right to modify or revise these Terms at any time. Changes will be effective
            immediately upon posting on the Website. Your continued use of the Website after any changes will constitute
            your acceptance of such changes.
          </Typography>

          <Typography variant="h5" gutterBottom>
            8. Contact Us
          </Typography>

          <Typography variant="body1" gutterBottom>
            If you have any questions or concerns regarding these Terms, please contact us at support@tubesynchub.tech.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TermsOfUse;
