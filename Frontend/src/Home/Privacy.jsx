import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';

const paperStyle = {
    padding: '50px 80px 50px 80px',
    borderRadius: '20px',
    maxWidth: '60%',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
};


const PrivacyPolicy = () => {
    return (
        <Grid container sx={{  justifyContent: 'center', backgroundColor:'#deded5'}}>



            <Grid item xs={12} md={10.0} sx={{ display:'flex' , justifyContent: 'center', alignItems: 'center', minHeight: '100vh' ,padding:'80px 0px 80px 0px'}}>
                <Paper elevation={3} style={paperStyle}>
                    <Typography variant="h2" gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Last Updated: September 11, 2023
                    </Typography>

                    {/* Information We Collect */}
                    <Typography variant="h5" gutterBottom>
                        Information We Collect
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        We may collect the following types of information from users of our platform:
                    </Typography>
                    <ul>
                        <li style={{}}>
                            <strong>User Authentication Data:</strong> When you sign up or log in to the platform as a content creator or video editor, we collect certain personal information, including your  email address, and other account-related details. This information is necessary for user authentication and account management.
                        </li>
                        <br/>
                        <li>
                            <strong>Creator Channel Permissions:</strong> Content creators may grant permissions to our platform to access and upload videos directly to their YouTube channels. This includes access to video files, thumbnails, titles, and descriptions. We do not store or retain your YouTube channel login credentials.
                        </li>
                        <br/>
                        <li>
                            <strong>Connection Establishment Data:</strong> When creators invite video editors to collaborate via their usernames, we facilitate the connection by sharing the necessary information between users. This information is used solely for establishing connections on our platform.
                        </li>
                        <br/>
                        <li>
                            <strong>Video Submission Data:</strong> Video editors can submit videos along with associated metadata, such as thumbnails, titles, and descriptions. This data is used for the submission and approval workflow within our platform.
                        </li>
                    </ul>

                    {/* How We Use Your Information */}
                    <Typography variant="h5" gutterBottom>
                        How We Use Your Information
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        We use the collected information for the following purposes:
                    </Typography>
                    <ul>
                        <li>
                            <strong>User Authentication:</strong> To verify your identity and provide access to our platform.
                        </li>
                        <br/>
                        <li>
                            <strong>Creator Channel Permissions:</strong> To enable direct video uploads to YouTube channels, as granted by content creators.
                        </li>
                        <br/>
                        <li>
                            <strong>Connection Establishment:</strong> To facilitate connections between content creators and video editors on our platform.
                        </li>
                        <br/>
                        <li>
                            <strong>Video Submission:</strong> To allow video editors to submit videos for review and approval by content creators.
                        </li>
                        <br/>
                        <li>
                            <strong>Creator Approval Workflow:</strong> To enable content creators to review and verify submitted videos and schedule them for uploading to their YouTube channels.
                        </li>
                        <br/>
                        <li>
                            <strong>Communication:</strong> To send notifications and updates related to platform activities.
                        </li>
                    </ul>

                    {/* Security Measures */}
                    <Typography variant="h5" gutterBottom>
                        Security Measures
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        We take the security and privacy of your data seriously. We implement appropriate security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. These measures include but are not limited to encryption, access controls, and regular security audits.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        Data Retention
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by applicable laws and regulations. We do not retain your YouTube channel login credentials.

                    </Typography>



                    <Typography variant="h5" gutterBottom>
                        Third-Party Services
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Our platform may integrate with third-party services, such as YouTube Data API and AWS S3 for video and thumbnail storage. We encourage you to review the privacy policies of these services for information on how they handle your data.

                    </Typography>



                    <Typography variant="h5" gutterBottom>
                        Changes to this Privacy Policy
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        We may update this Privacy Policy from time to time to reflect changes in our practices and services. Any updates will be posted on this page, and the "Last Updated" date will be revised accordingly. We encourage you to regularly review this Privacy Policy for any changes.
                    </Typography>


                    <Typography variant="h5" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        If you have any questions or concerns about our Privacy Policy, please contact us:
                        By email: support@tubesynchub.tech
                    </Typography>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default PrivacyPolicy;
