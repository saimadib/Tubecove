// app.js
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const session = require('express-session');
const express = require('express');
require('dotenv').config();
const { google } = require("googleapis");
const { User } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();

let token;

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: 'https://tubesynchub.tech/api/creator/auth/google/callback',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},
async ( accessToken, refreshToken, profile, done) => {
  try {
    
    const verified = jwt.verify(token, process.env.JWT_CREATOR_SECRET);
    const userId = verified.id;
    token=null;

    const userCreator = await User.findById(userId);

    if (!userCreator) {
      return done(null, false, { message: 'User not found' });
    }

    userCreator.accessToken = accessToken; // Store the access token string
    userCreator.refreshToken = refreshToken; // Store the refresh token string
    userCreator.googleId = profile.id;
    await userCreator.save();


    return done(null, userCreator);
  } catch (error) {
    return done(error);
  }
}));


exports.getPermission = (req, res) => {

   token=req.query.token;
 
    passport.authenticate('google', {
    accessType: 'offline',
    prompt: 'consent',
    scope: ['profile', 'https://www.googleapis.com/auth/youtube.upload'],
  })(req, res);
};

exports.callbackFunction = (req, res) => {
  
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json('Authenticated Successfully');
  })(req, res);
};


  exports.getNewAccessToken= async (refreshToken) =>{
    try {
      
      const requestBody = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.clientID,
        client_secret: process.env.clientSecret,
      };

      const response = await axios.post(process.env.tokenEndpoint, requestBody);

      const newAccessToken = response.data.access_token;

      return newAccessToken;

    } catch (error) {
      console.error('Error refreshing access token:', error);
      return error;
    }
  }
