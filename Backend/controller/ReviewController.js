import Review from "../model/ReviewsModel.js";
export const createReview = async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;
        const review = await Review.create({ userId, rating, comment });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("userId", "name");
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
        }
};

