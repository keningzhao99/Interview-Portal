const dotenv = require("dotenv");
dotenv.config(); // This loads environment variables from the .env file

const express = require('express');
const router = express.Router();

// Define your API routes here
router.post('/airtable/find', (req, res) => {
  res.send('API response');
});

const Airtable = require("airtable");
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: apiKey }).base(baseId);

if (!apiKey || !baseId) {
  console.error("API Key or Base ID is missing");
  process.exit(1);
}

console.log("reached");

// Documentation through JSON (limit 3)
const fetchRecords = async () => {
  try {
    const records = [];
    await base("Launch Resumes")
      .select({
        maxRecords: 1,
        view: "Grid view - DO NOT FILTER",
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

    console.log(JSON.stringify({ records }, null, 2));
  } catch (error) {
    console.error("Error fetching records:", error);
  }
};

// const fetchAirtableData = async () => {
//   try {
//     const response = await fetch(
//       "https://api.airtable.com/v0/${baseId}/Launch Resumes",
//       {
//         headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
//       }
//     );
//     console.log(response.data.records);
//   } catch (error) {
//     console.error(error);
//   }
// };

const getResumeByID = async (string) => {
  const data = await fetch(
    `https://api.airtable.com/v0/${baseId}/Launch Resumes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );
  const record = await data.json();
  // const resume = cleanResume(record);
  // return resume;
  // console.log(record); // Log the record directly
  return record;
};

// Export the fetchRecords function
module.exports = { fetchRecords, getResumeByID };

// Call the function to fetch and display records
fetchRecords();

// fetchAirtableData();
module.exports = router;