const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "You are not allowed" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, name: decoded.name };
    next();
  } catch (error) {
    res.clearCookie("token");
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "You are not allowed" });
  }
};

module.exports = authenticateToken;
