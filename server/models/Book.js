const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  author: String,
  description: String,
  genre: String,
  coverImage: String,
  visitCount: {type: Number, default: 0},
  ratings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  trends: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  reviewCount: {type: Number, default: 0},
  comments: {type: Number, default: 0}
});

module.exports = mongoose.model("Book", bookSchema);
