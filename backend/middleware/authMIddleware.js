require("dotenv").config();

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({ message: "No Token Provided" });
  }
  const token = authHeader.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decode.sub;

  next();
};

module.exports = authMiddleware;
