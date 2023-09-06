require('dotenv').config();
const { User, Invitation, PendingVideo, Submission } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const request = require('request');
const fs = require('fs');
const url = require('url');
const AWS = require('aws-sdk');
const axios = require('axios');
const service = google.youtube('v3');
const nodemailer = require('nodemailer');
const emailHtml = fs.readFileSync('./controllers/emailTemplate.html', 'utf8');

const { getNewAccessToken } =require('./outhPermission') ;


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});

const s3 = new AWS.S3({
  region: 'eu-north-1',
});

const errorMessage = (res, error) => {
  return res.status(400).json({ status: "fail", message: error.message });
};

exports.registerCreator = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(200).json({
        status: "fail",
        message: "Not all fields have been entered",
      });
    }
    if (password.length < 6 || password.length > 25) {
      return res.status(200).json({
        status: "fail",
        message: "Password must be between 6-25 characters",
        type: "password",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({
        status: "fail",
        message: "An account with this username already exists.",
        type: "username",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword, role: "Creator" });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }
  catch (error) {
    return errorMessage(res, error);
  }
};

exports.loginCreator = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(200).json({
        status: "fail",
        message: "Not all fields have been entered.",
      });
    }

    const user = await User.findOne({ username, role: "Creator" });

    if (!user) {
      return res.status(200).json({
        status: "fail",
        message: "User Doesn't exits. Please Signup as Creator",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({
        status: "fail",
        message: "Invalid credentials. Please try again.",
      });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_CREATOR_SECRET);
    return res.status(200).json({
      token,
      user: {
        username,
        id: user._id,
      },
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

exports.addInvite = async (req, res) => {
  try {
    const { editorUsername } = req.body;
    const creatorId = req.user;

    // Find the creator and editor
    const creator = await User.findById(creatorId);
    const editor = await User.findOne({ username: editorUsername });

    if (!editor) {
      return res.status(200).json({
        status: "fail",
        message: "Editor Doesn't Exits, Please ask editor to SignUp",
      });
    }

    if (!creator) {
      return res.status(200).json({
        status: "fail",
        message: "creator doesn't Exits",
      });
    }

    // Create an invitation
    const invitation = new Invitation({ creatorID: creator._id, editorID: editor._id, creatorUsername: creator.username, editorUsername: editor.username, accepted: "false" });

    // Save the invitation
    await invitation.save();

    return res.status(201).json({ message: 'Invitation sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

};


exports.submissions = async (req, res) => {
  try {
    const creatorId = req.user; // Get the creator's user ID from the authentication
    const submissions = await Submission.find({ creatorId: creatorId }).sort('-timestamp');
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


const emailUsername = process.env.Email_username;
const emailAppPassword = process.env.Email_app_password;

// Create a transporter object using your Google Workspace SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your email service provider
  auth: {
    user: emailUsername,
    pass: emailAppPassword,
  },
});

// Async function to send an email
async function sendEmail(to, subject, text, html) {
  try {
    // Define the email data
    const mailOptions = {
      from: 'dolbyvid@gmail.com',
      to: to,
      subject: subject,
      text: text, 
      html: html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true; 
  } catch (error) {
    console.error('Error sending email:', error);
    return false; 
  }
}


exports.acceptSubmit = async (req, res) => {
  try {
    const submissionId = req.params.submissionId;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: "submission not found." });
    }

    const creatorId = submission.creatorId;

    // Find the creator based on creatorId
    const creator = await User.findById(creatorId);

    if (!creator) {
      return res.status(404).json({ message: "Creator not found." });
    }

    // Get the creator's access token
    const accessToken = await getNewAccessToken(creator.refreshToken);

    const pendingVideo = await PendingVideo.findById(submission.videoId);

    if (!pendingVideo) {
      return res.status(404).json({ message: "Pending video not found." });
    }

    const videoTitle = pendingVideo.title;
    const videoDescription = pendingVideo.description;
    const videoUrl = pendingVideo.videoUrl; // Assuming this is the S3 URL
    const thumbnailUrl = pendingVideo.thumbnailUrl; // Assuming this is the S3 URL for thumbnail
    const keywords = pendingVideo.keywords;

    const keywordsArray = keywords.split(',').map(keyword => keyword.trim());

    // Create OAuth2 client with the provided access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Download the video file from the provided S3 URL

    const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoFile = videoResponse.data;

    const thumbnailResponse = await axios.get(thumbnailUrl, { responseType: 'stream' });
    const thumbnailFile = thumbnailResponse.data;

    // Insert the video
    const insertResponse = await service.videos.insert({
      auth: oauth2Client,
      part: 'snippet,contentDetails,status',
      resource: {
        // Video title and description
        snippet: {
          title: videoTitle,
          description: videoDescription,
          tags: keywordsArray
        },
        // Set the privacy status of the video
        status: {
          privacyStatus: 'public'
        }
      },

      // Create the readable stream to upload the video
      media: {
        body: videoFile
      }
    });

    // Get the video ID
    const videoId = insertResponse.data.id;

    // Set the thumbnail for the uploaded video
    await service.thumbnails.set({
      auth: oauth2Client,
      videoId: videoId,
      media: {
        mimeType: 'image/jpeg',
        body: thumbnailFile
      }
    });

    submission.accepted = true;
    submission.save();
   

    (async () => {
      const toEmail = 'adibsheikh2000@gmail.com';
      const emailSubject = 'Video Successfully Uploaded';
      const emailText = 'Success';

      const emailSent = await sendEmail(toEmail, emailSubject, emailText, emailHtml);

      if (emailSent) {
        console.log('Email sent successfully');
      } else {
        console.log('Failed to send email');
      }
    })();
    
    return res.json("Success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.preview = async (req, res) => {
  try {
    const creatorId = req.user; // Get the creator's user ID from the authentication
    const videoId = req.params.videoId;
    const previewVideo = await PendingVideo.findById(videoId);
    res.json(previewVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


exports.deleteSubmit = async (req, res) => {
  try {
    const submissionId = req.params.submissionId;


    const submission = await Submission.findById(submissionId);

    submission.read = true;
    submission.save();
    return res.json({ message: "Submission declined" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

