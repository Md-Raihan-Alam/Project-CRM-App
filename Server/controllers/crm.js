const { StatusCodes } = require("http-status-codes");
const createPerson = (req, res) => {
  res.send("Created Person");
};
const getAllPerson = (req, res) => {
  res.send("Get all person");
};
const getSinglePerson = (req, res) => {
  res.send("Getting a single person");
};
const updatePerson = (req, res) => {
  res.send("Updating a person");
};
const deletePerson = (req, res) => {
  res.send("Delete person");
};
module.exports = {
  createPerson,
  getAllPerson,
  getSinglePerson,
  updatePerson,
  deletePerson,
};
