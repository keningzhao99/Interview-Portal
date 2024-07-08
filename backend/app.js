const express=require('express');
const app=express();
const cors = require("cors")
app.use(cors())

const port=5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());