const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBooksById,
  addBook,
} = require("../controller/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAllBooks);
router.get("/:id", getBooksById);
router.post("/",authMiddleware, addBook);

module.exports = router;
