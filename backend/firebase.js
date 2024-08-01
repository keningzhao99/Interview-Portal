const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const serviceAccount = require('./permissions.json');



const app = initializeApp(serviceAccount);
const storage = getStorage(app);

module.exports = { storage };