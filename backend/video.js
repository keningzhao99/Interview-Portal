const express = require("express");
const router = express.Router();
const { storage } = require("./firebase");
const { ref, uploadBytes } = require("firebase/storage");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Set up multer for file handling
const upload = multer({ storage: multer.memoryStorage() });

// Upload current video to Firebase Storage
router.post("/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      console.log('File size:', req.file); // Log file size to check if it's empty
  
      const file = req.file.buffer;
      const fileName = `${uuidv4()}.webm`;
      const vidRef = ref(storage, `files/${fileName}`);
  
      // Upload file
      await uploadBytes(vidRef, file);
  
      res.status(200).send('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Failed to upload file.');
    }
});
  
router.get('/', async (req, res) => {
    try {
      // List all files in the 'files' directory
      const [files] = await bucket.getFiles({ prefix: 'files/' });
      
      // Filter to include only video files based on their extension or mime type
      const videoFiles = files.filter(file => file.name.endsWith('.webm'));
  
      // Create a list of video file names
      const videoFileNames = videoFiles.map(file => ({
        name: file.name,
        url: `https://storage.googleapis.com/${bucket.name}/${file.name}`
      }));
  
      res.status(200).json(videoFileNames);
    } catch (error) {
      console.error('Error fetching video files:', error);
      res.status(500).send('Failed to retrieve video files.');
    }
  });

module.exports = router;
