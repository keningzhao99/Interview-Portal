const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const serviceAccount = require("./permissions.json");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

module.exports = {
  auth,
  firestore,
  storage
};
