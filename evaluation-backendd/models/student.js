const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  ideation: {
    type: Number,
    required: true,
  },
  execution: {
    type: Number,
    required: true,
  },
  viva: {
    type: Number,
    required: true,
  },
  theory: {
    type: Number,
    required: true,
  },
  email: {
    lowercase: true,
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
  assigned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Student", userSchema);
