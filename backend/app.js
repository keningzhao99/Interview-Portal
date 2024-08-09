const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001; // Use environment variable for port, default to 5001 if not set

// Import the router modules
const videoRouter = require("./video");
const apiRouter = require("./functions/api");

// Use the router modules
app.use("/video", videoRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
