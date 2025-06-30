require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/authMIddleware");
const port = 3000;
const app = express();
const addSubscription = require('./controllers/AddSubscription')
const getAllSubscription = require("./controllers/getAllSubscription");

app.use(cors());
app.use(express.json());

app.post("/subscription", authMiddleware, addSubscription);
app.get("/subscription", getAllSubscription);

app.listen(port, () => {
  console.log("App Listen to port " + port);
});
