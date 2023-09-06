require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const cors=require("cors");
const path=require ("path");


app.use(express.json());
// CORS configuration
app.use(cors());
mongoose.connect(`mongodb+srv://admin-saim:${process.env.MONGO_SECRET}@cluster0.fzd8b5a.mongodb.net/Youedit`);

// Import and use your route handlers here
const creatorRouter = require("./routes/creatorRoutes");
const editorRouter = require("./routes/editorRoutes");

app.use("/api/creator", creatorRouter);
app.use("/api/editor", editorRouter);


app.use(express.static("public"));



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
