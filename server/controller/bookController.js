const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const { title, author, description, genre } = req.body;
    const coverImage = req.file ? `uploads/${req.file.filename}` : null;

    const newBook = await Book.create({ title, author, description, genre, coverImage });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Books fetched successfully", books });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getBooksById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: " Book not found" });
    res.status(200).json({ message: "Book fetched successfully", book });
    book.visitCount += 1;
    await book.save();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getTopAndWorstReviews = async (req, res) => {
    try {
        const bookId = req.params.id;

        const topReview = await Review.findOne({ book: bookId })
            .sort({ rating: -1 })
            .populate("user", "username");

        const worstReview = await Review.findOne({ book: bookId })
            .sort({ rating: 1 })
            .populate("user", "username");

        res.status(200).json({
            message: "Top and worst reviews fetched",
            topReview,
            worstReview
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// controllers/bookController.js
exports.getTopBooks = async (req, res) => {
  try {
    const topBooks = await Book.find()
      .sort({ visitCount: -1, ratings: -1 }) // you can adjust sorting fields
      .limit(10); // return top 10 books

    res.status(200).json(topBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top books", error: error.message });
  }
};




