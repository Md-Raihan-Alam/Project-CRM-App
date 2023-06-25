const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const toke = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = auth;
