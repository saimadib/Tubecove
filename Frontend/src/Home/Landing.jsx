import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Footer from './Footer';



import CustomAppBar from './Appbar';

const DarkGlassBox = styled(Box)({
    background: 'white',
    boxShadow: '0 8px 32px 0 rgba(52, 73, 94, 0.5)',
    backdropFilter: 'blur(2px)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
});


const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Camphor, sans-serif',
    backgroundColor: 'white', // Change background color to white
    marginTop: '60px',
    [theme.breakpoints.between(690, 720)]: {
        // Add your styles for mobile devices here
        '& h2': {
            fontSize: '30px',
        },
        '& h6': {
            fontSize: '14px',
        },
        '& img': {
            width: '100vw',
            marginTop: '30px',
        },
    },
}));





const LandingPage = () => {
    const navigate = useNavigate();

    const creatorLoginClick = () => {
        navigate('/creator/login');
    };

    const editorLoginClick = () => {
        navigate('/editor/login');
    };

    const creatorSignupClick = () => {
        navigate('/creator/signup');
    };

    const editorSignupClick = () => {
        navigate('/editor/signup');
    };

    const scrollToLoginSignup = () => {
        const loginSignupContainer = document.getElementById('loginSignupContainer');
        loginSignupContainer.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div style={{ scrollBehavior: "smooth", width: '100%', margin: 0 }}>
            <CustomAppBar />
            <StyledContainer>
                <Grid container> {/* Use Grid container */}
                    <Grid item xs={12} md={5}> {/* Specify grid layout */}
                        <Typography variant="h2" sx={{ color: 'black', fontWeight: 'bold', width: '80%', fontSize: '45px' }}>
                            Streamline Your Creative Journey Empowering Video Creators and Editors
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'black', fontSize: '17px' }}>
                            <br></br>
                            Say goodbye to the hassle of downloading and uploading large video files.

                            <p>Experience the power of real-time collaboration, secure sharing permissions, and a modern aesthetic that reflects the creativity within. </p>

                        </Typography>
                        <br></br>

                        <Button variant="contained" sx={{
                            width: "150px", height: "60px", backgroundColor: "#000000", borderRadius: 10, fontSize: "15px", '&:hover': {
                                background: 'linear-gradient(45deg, purple, blue, orange)', // Replace with your desired gradient colors
                                transition: 'background 0.3s, color 0.3s',
                            },
                        }} onClick={scrollToLoginSignup}>
                            Get Started
                        </Button>


                    </Grid>
                    <Grid item xs={12} md={2}></Grid>
                    <Grid item xs={12} md={5}>
                        <img
                            id='image1'
                            src={'undraw_youtube_tutorial_re_69qc.svg'}
                            alt="Logo"
                            style={{
                                marginTop: '60px', cursor: 'pointer', width: '80%',
                                height: '60vh'
                            }}
                        />
                    </Grid>
                </Grid>
            </StyledContainer>

            <div
                id="HowItWorks"
                style={{
                    fontFamily: 'Camphor, sans-serif',
                    backgroundColor: '#f0f0f0',
                    padding: '20px 20px 50px 20px', // Add some padding for better spacing on small screens
                }}
            >
                <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '90vh' }}>
                    <Typography variant="h4" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '35px' }}>
                        How it works in 3 steps
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ marginBottom: '20px', maxWidth: '800px', fontSize: '17px' }}>
                        Effortlessly collaborate, review, and streamline video projects with Tubesynchub, simplifying the creative journey for video creators and editors.
                    </Typography>
                    <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '50px' }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <div style={{ height: '200px', overflow: 'hidden', borderRadius: '10px' }}>
                                <img src={'Signup.png'} alt="Signup Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Signup
                            </Typography>
                            <Typography variant="body1">
                                Sign up as a Creator or an Editor and create your account. It's quick and easy!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div style={{ height: '200px', overflow: 'hidden', borderRadius: '10px' }}>
                                <img src={'connect.jpg'} alt="Connect Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Connect
                            </Typography>
                            <Typography variant="body1">
                                Creators can send invitations to Editors and establish a connection. Editors can accept or decline invitations.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div style={{ height: '200px', overflow: 'hidden', borderRadius: '10px' }}>
                                <img src={'collaborate.jpg'} alt="Collaborate Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Collaborate
                            </Typography>
                            <Typography variant="body1">
                                Editors can submit their work to Creators for review. Creators can preview and approve or decline submissions. Approved submissions are uploaded to YouTube.
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Camphor, sans-serif',
                    backgroundColor: 'black',
                    padding: '20px', // Add padding for better spacing on small screens
                }}
            >
                <Grid container sx={{ padding: '80px 0px 80px 0px' }}>
                    <Grid item xs={12} md={1.5} />
                    <Grid item xs={12} md={4}>
                        <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', width: '100%', fontSize: '35px' }}>
                            Remove the Hassle of Uploads and Downloads
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'white', fontSize: '17px' }}>
                            <br />
                            Tired of the endless back-and-forth of uploading and downloading large video files for review? We eliminate the hassle of dealing with network issues and multiple file transfers.

                            <p>With our innovative approach, creators and editors can seamlessly collaborate, saving valuable time in the video review process.</p>
                        </Typography>
                        <br />

                        <Button
                            variant="contained"
                            sx={{
                                width: '150px',
                                height: '60px',
                                background: 'linear-gradient(45deg, purple, blue, orange)', // Replace with your desired gradient colors
                                color: 'white',
                                fontSize: '15px',
                                transition: 'background 0.3s, color 0.3s', // Add transition properties
                                '&:hover': {
                                    background: 'white', // Change to your desired hover background color
                                    color: 'black', // Change to your desired hover font color
                                },
                            }}
                            onClick={scrollToLoginSignup}
                        >
                            Start now
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={1.5} />
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src={'undraw_multitasking_re_ffpb.svg'}
                            alt="Logo"
                            style={{ width: '100%', maxWidth: '350px', marginTop: '10px', cursor: 'pointer' }}
                        />
                    </Grid>
                </Grid>
            </div>
            <div
                id="loginSignupContainer"
                style={{
                    fontFamily: 'Camphor, sans-serif',
                    backgroundColor: '#f0f0f0',
                    padding: '20px 20px 100px 20px'
                }}
            >
                <Typography variant="h4" gutterBottom align="center" sx={{ color: 'black', paddingTop: '80px', fontWeight: 'bold' }}>
                    Get Started as an Editor or Creator
                </Typography>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: '100px' }}>
                    <Grid item xs={12} md={4}>
                        <DarkGlassBox name="Editor" sx={{ p: 2 }}>
                            <Typography variant="h4" gutterBottom align="center" sx={{ color: 'black' }}>
                                Editor
                            </Typography>
                            <Typography variant="body1" gutterBottom align="center" sx={{ color: 'black' }}>
                                As an editor, you can collaborate with creators in real-time and streamline your workflow. With our platform, you can easily accept invitations from creators, submit your work, and get feedback instantly.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button variant="contained" onClick={editorSignupClick} sx={{ mr: 1, backgroundColor: '#000000', '&:hover': { backgroundColor: '#393E46' } }}>
                                    Signup
                                </Button>
                                <Button variant="outlined" onClick={editorLoginClick} sx={{ ml: 1, backgroundColor: '#000000', color: 'white', '&:hover': { backgroundColor: '#393E46' } }}>
                                    Login
                                </Button>
                            </Box>
                        </DarkGlassBox>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DarkGlassBox name="Creator" sx={{ p: 2 }}>
                            <Typography variant="h4" gutterBottom align="center" sx={{ color: 'black' }}>
                                Creator
                            </Typography>
                            <Typography variant="body1" gutterBottom align="center" sx={{ color: 'black' }}>
                                As a creator, you can easily find and collaborate with editors. Our platform provides a seamless experience for previewing and approving submissions from editors. Say goodbye to the hassle of managing large video files.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button variant="contained" onClick={creatorSignupClick} sx={{ mr: 1, backgroundColor: '#000000', '&:hover': { backgroundColor: '#393E46' } }}>
                                    Signup
                                </Button>
                                <Button variant="outlined" onClick={creatorLoginClick} sx={{ ml: 1, backgroundColor: '#000000', color: 'white', '&:hover': { backgroundColor: '#393E46' } }}>
                                    Login
                                </Button>
                            </Box>
                        </DarkGlassBox>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
