const express = require("express");
const router = express.Router();
const { fetchRecords, getResumeByID } = require("./functions/api");

// Route to get all records
router.get("/fetch-records", async (req, res) => {
  try {
    const records = await fetchRecords();
    res.json(records);
  } catch (error) {
    res.status(500).send("Error fetching records");
  }
});

// Route to get a resume by ID
router.get("/resume/:id", async (req, res) => {
  try {
    const record = await getResumeByID(req.params.id);
    res.json(record);
  } catch (error) {
    res.status(500).send("Error fetching resume");
  }
});

module.exports = router;
