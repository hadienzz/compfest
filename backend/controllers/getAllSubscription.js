const connectDB = require("../config/connectDB");

const getAllSubscription = async (req, res) => {
  const supabase = connectDB();

  try {
    const { data, error } = await supabase.from("subscription").select("*");

    if (error) {
      return res
        .status(400)
        .json({ message: `Failed to get all data: ${error}` });
    }

    const dataLength = data.length;
    const totalRevenue = data.reduce((acc, cur) => acc + cur.price, 0);

    return res.status(200).json({ dataLength, totalRevenue });
  } catch (err) {
    return res.status(400).json({ message: `An Error Occured: ${err}` });
  }
};

module.exports = getAllSubscription;
