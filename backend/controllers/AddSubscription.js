const connectDB = require("../config/connectDB");

const addSubscription = async (req, res) => {
    const supabase = connectDB();
    const subscriptionData = req.body;
    const userId = req.user

    const { data, error } = await supabase
        .from("subscription")
        .insert({
            ...subscriptionData,
            userId
        });

    if (error) {
        console.error("Supabase insert error:", error);
        return res.status(500).json({ message: "Insert failed", error });
    }

    return res.status(200).json({
        message: "Berhasil menambahkan data subscription di database",
        data,
    });
};

module.exports = addSubscription;
