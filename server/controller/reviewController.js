
const Review = require("../models/Review");

exports.getAllReviews = async (req, res) => {
    try{
        const reviews = await Review.find();
        if(!reviews) return res.status(404).json({ message: "No reviews found" });
        res.status(200).json({ message: "Reviews fetched successfully", reviews });
    }catch(error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.addReview = async (req, res) => {
    try{
        const {bookId, userId, rating, comment} = req.body;
        const newReview = await Review.create({
            bookId,
            userId,
            rating,
            comment
        });
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    }catch(error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.addReviewByBookId = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { userId, rating, comment } = req.body;
        const newReview = await Review.create({
            book: bookId,
            user: userId,
            rating,
            comment
        });
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.getReviewsByBookId = async (req, res) => {
    try {
        const bookId = req.params.id;
        const reviews = await Review.find({ book: bookId }).populate("user", "username");
        if (!reviews || reviews.length === 0) return res.status(404).json({ message: "No reviews found for this book" });
        res.status(200).json({ message: "Reviews fetched successfully", reviews });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}