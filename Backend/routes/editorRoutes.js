const express = require("express");
const router = express.Router();
const authEditor = require("../controllers/authEditor");
const {
  registerEditor,
  loginEditor,
  allInvitations,
  acceptInvitation,
  deleteInvitation,
  creatorlist,
  submissions,
  preview
} = require("../controllers/editorControlller");

const {submitVideo} =require('../controllers/EDsubmitvideo')





router.route("/signup").post(registerEditor);
router.route("/login").post(loginEditor);
router.route("/invitations").get(authEditor,allInvitations);
router.route("/invitations/:inviteId").post(authEditor,acceptInvitation);
router.route("/invitations/:inviteId").delete(deleteInvitation);
router.route("/submit").post(authEditor,submitVideo);
router.route("/creatorlist").get(authEditor,creatorlist);
router.route("/submissions").get(authEditor,submissions);
router.route("/submissions/:videoId").get(authEditor,preview);

module.exports = router;

