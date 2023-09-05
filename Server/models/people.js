const mongoose = require("mongoose");
const PeopleScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name here"],
      maxlength: 50,
    },
    address: {
      type: String,
      required: [true, "please provide address here"],
    },
    city: {
      type: String,
      required: [true, "please provide city here"],
    },
    state: {
      type: String,
      required: [true, "please provide state here"],
    },
    zipcode: {
      type: String,
      required: [true, "pleasae provide zipcode here"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Client", PeopleScehma);
