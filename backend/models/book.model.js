const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    pageCount: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
