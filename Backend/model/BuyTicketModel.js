import mongoose from "mongoose";

const BuyTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    ticketQty: {
      type: Number,
      required: true,
      default: 1,
    },

    // ================= ORIGINAL STOCK =================
    originalQty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BuyTicket = mongoose.model(
  "buyTicket",
  BuyTicketSchema
);

export default BuyTicket;