const express = require("express");
const router = express.Router();
const {
  createPerson,
  getAllPerson,
  getSinglePerson,
  updatePerson,
  deletePerson,
} = require("../controllers/crm");
router.route("/").get(getAllPerson).post(createPerson);
router
  .route("/:id")
  .patch(updatePerson)
  .delete(deletePerson)
  .get(getSinglePerson);
module.exports = router;
