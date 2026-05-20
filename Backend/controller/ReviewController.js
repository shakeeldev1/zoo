import Review from "../model/ReviewsModel.js";
export const createReview = async (req, res) => {
    try {
        const userId = req.userId; // This comes from the token
        const { rating, comment } = req.body;
        
        // Validate required fields
        if (!rating || !comment) {
            return res.status(400).json({ 
                message: "Rating and comment are required" 
            });
        }
        
        const review = await Review.create({ userId, rating, comment });
        
        // Populate user info before sending response
        const populatedReview = await Review.findById(review._id).populate("userId", "name");
        
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: populatedReview
        });
    } catch (error) {
        console.error("Create review error:", error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("userId", "name");
        res.status(200).json({
            success: true,
            data: reviews
        });
    }
    catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
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
        res.status(200).json({ 
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
        }
};

