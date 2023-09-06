const {User,Invitation,PendingVideo,Submission} = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const errorMessage = (res, error) => {
    return res.status(400).json({ status: "fail", message: error.message });
  };
  
  exports.registerEditor = async (req, res) => 
  {
    try 
    {
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
  
      const newUser = new User({ username, password: hashedPassword ,role:"Editor"});
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } 
    catch (error) 
    {
      return errorMessage(res, error);
    }
  };

  exports.loginEditor = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(200).json({
          status: "fail",
          message: "Not all fields have been entered.",
        });
      }
  
      const user = await User.findOne({ username ,role:"Editor"});
  
      if (!user) {
        return res.status(200).json({
          status: "fail",
          message: "User Doesn't exits. Please Signup as Editor",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(200).json({
          status: "fail",
          message: "Invalid credentials. Please try again.",
        });
      }
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_EDITOR_SECRET);
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

  exports.allInvitations=async(req,res)=>
  {
    try {
      const editorId = req.user;
  
      const invitations = await Invitation.find({ editorID:editorId,accepted:false });
  
      return res.json({ invitations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.acceptInvitation=async(req,res)=>
  {
    try {

      const invitationId=req.params.inviteId;
      const invitation = await Invitation.findById(invitationId);

      if(!invitation)
      {
        return res.status(200).json({
          status: "fail",
          message: "Inavlid Invitation",
        });
      }

      const creatorID=invitation.creatorID;
      const editorID=invitation.editorID;
      const creatorUsername=invitation.creatorUsername;
      const editorUsername=invitation.editorUsername;


      // Update the connections of the creator and the editor
      await User.findByIdAndUpdate(
        creatorID,
        { $addToSet: { connections: editorUsername } }, // Add editor to creator's connections
        { new: true }
      );

      await User.findByIdAndUpdate(
        editorID,
        { $addToSet: { connections: creatorUsername } }, // Add creator to editor's connections
        { new: true }
      );

      await Invitation.findByIdAndUpdate(
        invitationId,
        { accepted: true },
        { new: true }
      );

      return res.status(201).json({status: "success", message: 'Invitation accepted Succesfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.deleteInvitation=async(req,res)=>
  {
    try {

      const invitationId=req.params.inviteId;
      const invitation = await Invitation.findById(invitationId);

      if(!invitation)
      {
        return res.status(200).json({
          status: "fail",
          message: "Inavlid Invitation",
        });
      }

      await Invitation.deleteOne({ _id: invitationId});
      
      return res.status(201).json({ message: 'Invitation accepted Succesfully' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.creatorlist=async(req,res)=>
  {
    try {
      const editorId = req.user;
  
      // Find the user by ID
      const user = await User.findById(editorId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's connections array
      res.json({ connections: user.connections });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.submissions= async (req, res) => {
    try {
      const  editorId = req.user; // Get the creator's user ID from the authentication
      const submissions = await Submission.find({  editorId:  editorId }).sort('-timestamp');
      res.json(submissions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

  exports.preview= async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const previewVideo = await PendingVideo.findById(videoId);
      res.json(previewVideo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

  