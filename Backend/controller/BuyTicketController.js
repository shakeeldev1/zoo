import BuyTicket from "../model/BuyTicketModel.js";

export const addBuyTicket = async (req, res) => {
    try {
        const { userId, } = req.body;
        const { ticketId } = req.params;
        const buyTicket = new BuyTicket({ userId, ticketId });
        await buyTicket.save();
        res.status(201).json(buyTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBuyTickets = async (req, res) => {
    try {
        const buyTickets = await BuyTicket.find().populate("userId", "name email").populate("ticketId", "name price");
        if (buyTickets.length === 0) {
            return res.status(404).json({ message: "No buy tickets found" });
        }
        res.status(200).json(buyTickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBuyTicketById = async (req, res) => {
    try {
        const { userId } = req.params;
        const buyTicket = await BuyTicket.findOne({ userId }).populate("userId", "name email").populate("ticketId", "name price");
        if (!buyTicket) {
            return res.status(404).json({ message: "Buy ticket not found" });
        }
        res.status(200).json(buyTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBuyTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const buyTicket = await BuyTicket.findOneAndDelete({ ticketId }).populate("userId", "name email").populate("ticketId", "name price");
        if (!buyTicket) {
            return res.status(404).json({ message: "Buy ticket not found" });
        }
        res.status(200).json({ message: "Buy ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


