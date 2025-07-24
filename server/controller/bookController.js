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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
