const dotenv = require("dotenv");
dotenv.config(); // This loads environment variables from the .env file

const express = require("express");
const router = express.Router();

const Airtable = require("airtable");
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: apiKey }).base(baseId);

if (!apiKey || !baseId) {
  console.error("API Key or Base ID is missing");
  process.exit(1);
}

// Documentation through JSON
const fetchRecords = async () => {
  try {
    const records = [];
    await base("Launch Resumes")
      .select({
        view: "Grid view - DO NOT FILTER", // No maxRecords specified
        // Comment out maxRecords to retrieve all records
      })
      .eachPage((pageRecords, fetchNextPage) => {
        records.push(
          ...pageRecords.map((record) => ({
            id: record.id,
            createdTime: record._rawJson.createdTime,
            fields: record.fields,
          }))
        );
        fetchNextPage();
      });

    // Return the records array
    return records;
  } catch (error) {
    console.error("Error fetching records:", error);
    return []; // Return an empty array in case of an error
  }
};

// Finding user by checking their full name & phone number
router.post("/find", async (req, res) => {
  const { name, phone } = req.body; // Adjusted to match login form field names

  try {
    // Fetch records from Airtable
    const records = await fetchRecords();

    // Check if records is defined and is an array
    if (!Array.isArray(records)) {
      console.error("Expected an array of records but got:", records);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }

    // Find the record that matches the username and password
    const matchingRecord = records.find((record) => {
      const phoneField = record.fields["Phone"];
      const fullNameField = record.fields["Student Name"];

      // Extract and trim values from arrays
      const phoneValue = Array.isArray(phoneField) ? phoneField[0].trim() : "";
      const fullNameValue = Array.isArray(fullNameField)
        ? fullNameField[0].trim()
        : "";

      // Check if values match
      return phoneValue === phone && fullNameValue === name;
    });

    if (matchingRecord) {
      // Successful login
      res.status(200).json({ success: true });
    } else {
      // No matching record found
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error verifying login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
