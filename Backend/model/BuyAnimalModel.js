import mongoose from "mongoose";

const buySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
    required: true,
  },

  // ✅ ADD THIS
  cartQty: {
    type: Number,
    default: 1,
  },

}, { timestamps: true });

const BuyAnimal = mongoose.model("BuyAnimal", buySchema);

export default BuyAnimal;