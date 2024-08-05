import { AIRTABLE_API_KEY } from "./keys";
// import { cleanResume } from "./utils";

export const getResumeByID = async (id) => {
  const data = await fetch(
    `https://airtable.com/apprF55loNzQZSQqA/tblZ9H2rnszvPNHzb/viwrfg0zEeIMWdTtX/${id}`,
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
