const Client = require("../models/people");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const createPerson = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { name, address, city, state, zipcode } = req.body;
  if (!name || !address || !city || !state || !zipcode) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Fields must not be empty" });
  }
  try {
    const poeple = await Client.create(req.body);
    return res.status(StatusCodes.CREATED).json({ message: "success" });
  } catch (error) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Fields data must be correct" });
  }
};
const getAllPerson = async (req, res) => {
  try {
    const peoples = await Client.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    // console.log(peoples);
    return res.status(StatusCodes.OK).json({ peoples, count: peoples.length });
  } catch (error) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "There is some problem. Please try again later" });
  }
};
const getSinglePerson = async (req, res) => {
  const {
    user: userId,
    params: { id: peopleId },
  } = req;
  const people = await Client.findOne({ createdBy: userId, _id: peopleId });
  if (!people) {
    throw new NotFoundError(`No person found by id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ people });
};
const updatePerson = async (req, res) => {
  const {
    body: { name, address, city, state, zipcode },
    user: { userId },
    params: { id: peopleId },
  } = req;
  if (
    name === " " ||
    address === " " ||
    city === " " ||
    state === " " ||
    position === " "
  ) {
    throw new BadRequestError("fields are incomplete");
  }
  const people = await findOneAndUpdate(
    { _id: peopleId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ people });
};
const deletePerson = async (req, res) => {
  const {
    user: userId,
    params: { id: peopleId },
  } = req;
  const people = await Client.findByIdAndRemove({
    _id: peopleId,
    createdBy: userId,
  });
  if (!people) {
    throw new NotFoundError(`No person found by id ${userId}`);
  }
  res.status(StatusCodes.OK).send();
};
module.exports = {
  createPerson,
  getAllPerson,
  getSinglePerson,
  updatePerson,
  deletePerson,
};
