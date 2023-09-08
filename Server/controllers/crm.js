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
    return res.status(StatusCodes.OK).json({ peoples, count: peoples.length });
  } catch (error) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "There is some problem. Please try again later" });
  }
};
const getSinglePerson = async (req, res) => {
  const {
    user: { userId: userID },
    params: { id: peopleId },
  } = req;
  // console.log(req.user.userId);
  // console.log(peopleId);
  try {
    const people = await Client.findOne({
      createdBy: userID,
      _id: peopleId,
    });
    // console.log(people);
    if (!people) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "unsuccess" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ people: people, message: "success" });
  } catch (error) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "unsuccess" });
  }
};
const updatePerson = async (req, res) => {
  const {
    body: { name, address, city, state, zipcode },
    user: { userId: userID },
    params: { id: peopleId },
  } = req;
  if (
    name === " " ||
    address === " " ||
    city === " " ||
    state === " " ||
    zipcode === " "
  ) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Fields data must not be empty" });
  }
  try {
    const people = await Client.findOneAndUpdate(
      { _id: peopleId, createdBy: userID },
      req.body,
      { new: true, runValidators: true }
    );
    // console.log(people);
    return res.status(StatusCodes.OK).json({ message: "success" });
  } catch (error) {
    return res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ message: "Some error occured. Please try again later" });
  }
};
const deletePerson = async (req, res) => {
  const {
    user: { userId: userID },
    params: { id: peopleId },
  } = req;
  const people = await Client.findByIdAndRemove({
    _id: peopleId,
    createdBy: userID,
  });
  res.status(StatusCodes.OK).send();
};
module.exports = {
  createPerson,
  getAllPerson,
  getSinglePerson,
  updatePerson,
  deletePerson,
};
