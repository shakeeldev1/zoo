import mongoose from "mongoose";

const BuyTicketSchema = new mongoose.Schema({
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
});

const BuyTicket = mongoose.model("buyTicket", BuyTicketSchema);

export default BuyTicket;