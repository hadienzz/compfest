require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const connectDB = () => {
  const supabase = createClient(process.env.API_URL, process.env.API_KEY);

  return supabase;
};

module.exports = connectDB;
