const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "An account with this username already exists."],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role:{
        type:String,
        required:[false],
    },
    connections: [{ type:String}],
    googleId: String,
    accessToken: String,
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const invitationSchema = new mongoose.Schema({
  creatorID: String,
  editorID: String,
  creatorUsername: String,
  editorUsername: String,
  accepted: Boolean,
});


const pendingVideoSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true }, // Add video URL field
  thumbnailUrl:{ type: String, required: true },
  keywords: { type: String },
}, { timestamps: true });


const submissionSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  editorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoId:{ type: mongoose.Schema.Types.ObjectId, ref: 'pendingVideo', required: true },
  editorUsername: { type: String, required: true },
  creatorUsername: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  accepted:Boolean,
});

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
const Invitation = mongoose.model('Invitation', invitationSchema);
const PendingVideo = mongoose.model('PendingVideo', pendingVideoSchema);
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = {User,Invitation,PendingVideo,Submission};
