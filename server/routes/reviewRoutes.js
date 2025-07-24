const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllReviews,
  getReviewsByBookId,
  addReview,
  addReviewByBookId,
} = require("../controller/reviewController");

router.get("/", authMiddleware, getAllReviews);
router.post("/", authMiddleware, addReview);
router.post("/:id", authMiddleware, addReviewByBookId);
router.get("/:id", authMiddleware, getReviewsByBookId);

module.exports = router;
