const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Fields must not be empty" });
  }
  if (password.length < 6) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Password needs to be at least 6 character" });
  }
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    return res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name }, token });
  } catch (error) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Email must be unique" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // throw new BadRequestError("Please provide both email and password");
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Enter email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "No user found" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Incorrect password" });
  }
  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: false,
  });
  res.status(StatusCodes.OK).json({ message: "success" });
};
const authVerify = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res
      .status(StatusCodes.OK)
      .json({ operation: "success", name: decoded.name });
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ operation: "unsuccess", err: error });
  }
};
const logout = async (req, res) => {
  res.cookie("token", "");
  res.status(StatusCodes.OK).json({ message: "success" });
};
module.exports = {
  register,
  login,
  authVerify,
  logout,
};
