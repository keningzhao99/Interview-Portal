const express = require("express");
const router = express.Router();
const { storage } = require("./firebase");
const { ref, uploadBytes } = require("firebase/storage");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Set up multer for file handling
const upload = multer({ storage: multer.memoryStorage() });

// Upload current video to Firebase Storage
router.post("/", upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const file = req.file.buffer;
        const fileName = `${uuidv4()}.mp4`;
        const vidRef = ref(storage, `files/${fileName}`);

        // Upload file
        await uploadBytes(vidRef, file);

        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to upload file.');
    }
});

module.exports = router;
