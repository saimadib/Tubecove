const express = require("express");
const router = express.Router();
const authCreator = require("../controllers/authCreator");

const {
  registerCreator,
  loginCreator,
  addInvite,
  submissions,
  acceptSubmit,
  deleteSubmit,
  preview,
} = require("../controllers/creatorController");

const {getPermission,callbackFunction}=require("../controllers/outhPermission");

const {initiatePass ,resetPassword,setPassword}=require("../controllers/resetPassword");





router.route("/signup").post(registerCreator);
router.route("/login").post(loginCreator);
router.route("/invite").post(authCreator,addInvite);
router.route("/auth/google").get(getPermission);
router.route("/auth/google/callback").get(callbackFunction);
router.route("/submissions").get(authCreator,submissions);
router.route("/submissions/:videoId").get(authCreator,preview);
router.route("/submissions/:submissionId").post(authCreator,acceptSubmit);
router.route("/submissions/:submissionId").delete(deleteSubmit);
router.route("/forgotpassword").post(initiatePass);
router.route("/resetpassword").get(resetPassword);
router.route("/resetpassword").post(setPassword);

module.exports = router;
