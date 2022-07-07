const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Input = new Schema({
  _id: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  options1: {
    type: String,
    required: false,
  },
  options2: {
    type: String,
    required: false,
  },
  options3: {
    type: String,
    required: false,
  },
});

mongoose.model("inputs", Input);
