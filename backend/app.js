require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authMiddleware = require("./middleware/authMIddleware");
const port = 3000;
const app = express();
const addSubscription = require('./controllers/AddSubscription')

app.use(cors());
app.use(express.json());

app.post("/subscription", authMiddleware, addSubscription)

app.listen(port, () => {
  console.log("App Listen to port " + port);
});
