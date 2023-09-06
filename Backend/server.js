require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const cors=require("cors");


app.use(express.json());
// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}));
mongoose.connect(`mongodb+srv://admin-saim:${process.env.MONGO_SECRET}@cluster0.fzd8b5a.mongodb.net/Youedit`);

// Import and use your route handlers here
const creatorRouter = require("./routes/creatorRoutes");
const editorRouter = require("./routes/editorRoutes");

app.use("/api/creator", creatorRouter);
app.use("/api/editor", editorRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;