const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  locate: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "red",
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = model("Event", EventSchema);
