// import { AIRTABLE_API_KEY } from "./keys";
// // import { cleanResume } from "./utils";

// export const getResumeByID = async (id) => {
//   const data = await fetch(
//     `https://airtable.com/apprF55loNzQZSQqA/tblZ9H2rnszvPNHzb/viwrfg0zEeIMWdTtX/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${AIRTABLE_API_KEY}`,
//       },
//     }
//   );
//   const record = await data.json();
//   const resume = cleanResume(record);
//   return resume;
// };

import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableId = process.env.AIRTABLE_TABLE_ID;

Airtable.configure({
  endpointUrl: "https://api.airtable.com/v0",
  apiKey: apiKey,
});

export const fetchallData = async () => {
  try {
    const records = await base(tableName).select().all();
    console.log(records);
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
  }
};

// Taken from resume repository
export const getResumeByID = async (id) => {
  const data = await fetch(
    `https://api.airtable.com/v0${tableId}/Launch Resumes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );
  const record = await data.json();
  const resume = cleanResume(record);
  return resume;
};
