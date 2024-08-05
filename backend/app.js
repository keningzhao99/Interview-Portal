const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());

const port = 5001;
const firebase = require("firebase/app");

// Required for side-effects
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

// Import the router modules
const videoRouter = require("./video");

// Use the router modules
app.use("/video", videoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
