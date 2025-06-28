require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const { email, password } = req.body;

  const supabase = connectDB();
  const { data, error } = await supabase.from("users").select("*");

  return res.json({ data });
});

app.post("/subscription", async (req, res) => {
  const subscriptionData = req.body;
  const supabase = connectDB();

  const { data, error } = await supabase
    .from("subscription")
    .insert(subscriptionData);

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ message: "Insert failed", error });
  }

  return res.status(200).json({
    message: "Berhasil menambahkan data subscription di database",
    data,
  });
});

app.listen(port, () => {
  console.log("App Listen to port " + port);
});
