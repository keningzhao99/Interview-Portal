const express = require("express");
const router = express.Router();
const { storage } = require("./firebase");
const { ref, getMetadata, listAll, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
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

      // Create metadata
      const metadata = {
        contentType: 'video/webm',
        customMetadata: {
          uploadedBy: 'Kening Zhao', // TODO: req.body contains uploadedby and description
          description: 'Lesson 1',
        }
      };

      // Upload file with metadata
      await uploadBytesResumable(vidRef, file, metadata);
  
      // Upload file
      //await uploadBytes(vidRef, file);
  
      res.status(200).send('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Failed to upload file.');
    }
});
  
router.get('/', async (req, res) => {
  const listRef = ref(storage, 'files/');

  try {
    // List all items in the directory
    const listResult = await listAll(listRef);

    // Array to store download URLs and metadata
    const videoData = [];

    // Process each item
    for (const itemRef of listResult.items) {
      const url = await getDownloadURL(itemRef); // Get download URL for each item
      const metadata = await getMetadata(itemRef); // Get metadata for each item
      console.log("debugging metadata");
      console.log(url);
      console.log(metadata);
      videoData.push({ url, metadata }); // Store both URL and metadata
    }
    
    console.log(videoData);
    // Return the array of video data
    res.status(200).json(videoData);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).send('Failed to list files.');
  }
});

module.exports = router;
