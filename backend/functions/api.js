const dotenv = require("dotenv");
dotenv.config(); // This loads environment variables from the .env file

const Airtable = require("airtable");
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: apiKey }).base(baseId);

if (!apiKey || !baseId) {
  console.error("API Key or Base ID is missing");
  process.exit(1);
}

console.log("reached");

// Fetching records of resumes
base("Launch Resumes")
  .select({
    // Selecting the first 3 records in Grid view - DO NOT FILTER:
    maxRecords: 3,
    view: "Grid view - DO NOT FILTER",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        console.log("Retrieved", record.get("Resume"));
      });

      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
