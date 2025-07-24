const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["Authorization"];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied , no token provided" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({ messsage: "Invalid token", error: error.message });
  }
};

module.exports = authMiddleware;
