const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("No User found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Incorrect Password or Email");
  }
  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: false,
  });
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
const authVerify = async (req, res) => {
  const { token } = req.body;
  try {
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    return res.status(StatusCodes.OK).json({ operation: "success" });
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ operation: "unsuccess" });
  }
};
module.exports = {
  register,
  login,
  authVerify,
};
