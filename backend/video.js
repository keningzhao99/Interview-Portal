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
      const [files] = await storage.bucket.getFiles({ prefix: 'files/' });
      
      // Array to store object URLs
      const videoUrls = [];
  
      // Process each video file
      for (const file of files) {
        const [fileBuffer] = await file.download(); // Download file as buffer
        const blob = new Blob([fileBuffer], { type: 'video/webm' }); // Convert buffer to blob
        
        // Generate the object URL for the blob
        const objectUrl = URL.createObjectURL(blob);
  
        // Append to the array
        videoUrls.push(objectUrl);
      }
  
      // Send the array of video URLs
      res.status(200).json(videoUrls);
    } catch (error) {
      console.error('Error fetching video files:', error);
      res.status(500).send('Failed to retrieve video files.');
    }
  });

module.exports = router;
