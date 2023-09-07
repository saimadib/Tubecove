const {User,Invitation,PendingVideo,Submission} = require("../models/userModel");
const multer = require('multer');
const aws = require('aws-sdk'),
      {
        Upload
      } = require("@aws-sdk/lib-storage"),
      {
        S3
      } = require("@aws-sdk/client-s3");
const multerS3 = require('multer-s3');
const mongoose = require("mongoose");


aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-north-1',
  });
  
  const s3 = new S3({
    region: 'eu-north-1',
});
  
  aws.config.logger = console;


  const upload = multer();

  exports.submitVideo = async (req, res) => {
    try {
        const editorId = req.user;

        const editor=await User.findById(editorId);

        

        upload.fields([{ name: 'video' }, { name: 'thumbnail' }])(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ message: err });
            }

            const { creatorUsername , title, description ,keywords ,isMadeForKids} = req.body;
          
            const creator = await User.findOne({username: creatorUsername}).populate('connections');
            const creatorId=creator._id;
           
            if (!creator || !creator.connections.includes(editor.username)) {
                return res.status(400).json({ message: 'Invalid editorUsername or not a valid connection.' });
            }
           

            const videoFile = req.files['video'][0];
            const thumbnailFile = req.files['thumbnail'][0];

            const videoKey = `videos/${Date.now()}-${videoFile.originalname}`;
            const thumbnailKey = `thumbnails/${Date.now()}-${thumbnailFile.originalname}`;

            const videoParams = {
                Bucket: 'youeditfiles',
                Key: videoKey,
                Body: videoFile.buffer,
                ContentType: videoFile.mimetype,
                ACL: 'public-read'
            };
            
            const thumbnailParams = {
                Bucket: 'youeditfiles',
                Key: thumbnailKey,
                Body: thumbnailFile.buffer,
                ContentType: thumbnailFile.mimetype,
                ACL: 'public-read'
            };

            const [videoUploadResult, thumbnailUploadResult] = await Promise.all([
                new Upload({
                    client: s3,
                    params: videoParams
                }).done(),
                new Upload({
                    client: s3,
                    params: thumbnailParams
                }).done()
            ]);

            const pendingVideo = new PendingVideo({
                creatorId,
                title,
                description,
                videoUrl: videoUploadResult.Location,
                thumbnailUrl: thumbnailUploadResult.Location,
                keywords,
                isMadeForKids:isMadeForKids,
            });

            await pendingVideo.save();

            const submission = new Submission({
                creatorId: creator._id,
                editorId:editorId,
                videoId: pendingVideo._id,
                editorUsername:editor.username,
                creatorUsername:creator.username,
            });
            await submission.save();

            res.status(201).json({ message: 'Video submitted successfully.' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
