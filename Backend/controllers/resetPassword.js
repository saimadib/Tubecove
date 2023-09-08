require('dotenv').config();
const { User, Invitation, PendingVideo, Submission } = require("../models/userModel");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");

const emailUsername = process.env.Email_username;
const emailAppPassword = process.env.Email_app_password;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailUsername,
    pass: emailAppPassword,
  },
});

// Route to initiate password reset
exports.initiatePass = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ username: email });

    if (!user) {
      return res.status(404).json({  status: "fail", message: 'User not found' });
    }

    const role = user.role.toLowerCase();

    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = Date.now() + 3600000; // 1 hour in milliseconds

    user.passwordResetToken = token;
    user.passwordResetTokenExpires = expirationTime;
    await user.save();

    const resetLink = `https://tubecove.zenservers.tech/api/${role}/resetpassword?token=${token}`;
    const mailOptions = {
      from: emailUsername,
      to: user.username,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) requested a password reset for your account.\n\nPlease click on the following link to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({  error: 'Internal server error' });
  }
};


exports.resetPassword = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({  status: "fail", message: 'Invalid or expired token' });
    }

    const formHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Change Form</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .container {
                  max-width: 400px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .form-group {
                  margin-bottom: 20px;
              }
              label {
                  display: block;
                  margin-bottom: 5px;
              }
              input[type="password"] {
                  width: 100%;
                  padding: 10px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
              }
              button {
                  background-color: #007bff;
                  color: #fff;
                  border: none;
                  border-radius: 5px;
                  padding: 10px 20px;
                  cursor: pointer;
              }
              button:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Password Change</h2>
              <form id="passwordChangeForm">
                  <div class="form-group">
                      <label for="newPassword">New Password</label>
                      <input type="password" id="newPassword" name="newPassword" required>
                  </div>
                  <!-- Hidden input for token -->
                  <input type="hidden" id="token" name="token" value="${token}">
                  <div class="form-group">
                      <button type="submit">Change Password</button>
                  </div>
              </form>
          </div>
      
          <script>
           
              document.getElementById("passwordChangeForm").addEventListener("submit", function (event) {
                  event.preventDefault(); // Prevent the default form submission
      
                  
                  const newPassword = document.getElementById("newPassword").value;
                  const token=document.getElementById("token").value;
      
                 
                  fetch("https://tubecove.zenservers.tech/api/creator/resetpassword", {
                      method: "POST",
                      body: JSON.stringify({ newPassword, token }),
                      headers: {
                          "Content-Type": "application/json"
                      }
                  })
                  .then(response => {
                      if (response.ok) {
                          alert("Password changed successfully");
                      } else {
                          alert("Password change failed");
                      }
                  })
                  .catch(error => {
                      console.error("Error:", error);
                      alert("An error occurred while changing the password");
                  });
              });
          </script>
      </body>
      </html>
      
      `;

    res.send(formHTML);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.setPassword = async (req, res) => {

  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ status: "fail", message: 'Invalid or expired token' });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


