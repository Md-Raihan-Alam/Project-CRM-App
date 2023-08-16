const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};
module.exports = auth;
