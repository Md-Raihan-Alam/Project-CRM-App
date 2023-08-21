const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthenticatedError("User not allowed");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded.user;
  } catch (error) {
    res.clearCookie("token");
    throw new UnauthenticatedError("User not allowed");
  }
};

module.exports = authenticateToken;
