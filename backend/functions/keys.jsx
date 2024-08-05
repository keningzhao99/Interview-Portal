import * as functions from "firebase-functions";

export const AIRTABLE_API_KEY = functions.config().airtable.token;
