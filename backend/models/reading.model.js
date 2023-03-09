/* Model for book data using mongoose Schema */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readingSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    pagesRead: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Reading = mongoose.model("Reading", readingSchema);

module.exports = Reading;
