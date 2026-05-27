import BuyTicket from "../model/BuyTicketModel.js";
import Ticket from "../model/TicketModel.js";

// ======================================================
// CREATE BUY TICKET
// ======================================================

export const addBuyTicket = async (
  req,
  res
) => {
  try {
    const userId = req.userId;

    const { ticketId } = req.params;

    const { ticketQty } = req.body;

    // ================= LOGIN CHECK =================
    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized please login first",
      });
    }

    // ================= VALIDATION =================
    if (!ticketQty || ticketQty < 1) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid quantity",
      });
    }

    // ================= FIND TICKET =================
    const ticket = await Ticket.findById(
      ticketId
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // ================= STOCK CHECK =================
    if (ticket.ticketQty < ticketQty) {
      return res.status(400).json({
        success: false,
        message:
          "Not enough tickets available",
      });
    }

    // ================= CHECK EXISTING =================
    const existingTicket =
      await BuyTicket.findOne({
        userId,
        ticketId,
      });

    // ================= IF ALREADY EXISTS =================
    if (existingTicket) {
      existingTicket.ticketQty += ticketQty;

      ticket.ticketQty -= ticketQty;

      await existingTicket.save();

      await ticket.save();

      return res.status(200).json({
        success: true,
        message:
          "Ticket quantity updated",
        data: existingTicket,
      });
    }

    // ================= CREATE NEW =================
    const buyTicket =
      await BuyTicket.create({
        userId,
        ticketId,
        ticketQty,
        originalQty: ticket.ticketQty,
      });

    // ================= UPDATE STOCK =================
    ticket.ticketQty -= ticketQty;

    await ticket.save();

    return res.status(201).json({
      success: true,
      message:
        "Ticket purchased successfully",
      data: buyTicket,
    });
  } catch (error) {
    console.log(
      "ADD BUY TICKET ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong",
    });
  }
};

// ======================================================
// GET ALL USER BUY TICKETS
// ======================================================

export const getBuyTickets = async (
  req,
  res
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized please login first",
      });
    }

    const buyTickets =
      await BuyTicket.find({
        userId,
      })
        .populate(
          "ticketId",
          "name price location date ticketimage ticketQty"
        )
        .populate(
          "userId",
          "name email"
        );

    return res.status(200).json({
      success: true,
      data: buyTickets,
    });
  } catch (error) {
    console.log(
      "GET BUY TICKETS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong",
    });
  }
};

// ======================================================
// GET SINGLE BUY TICKET
// ======================================================

export const getBuyTicketById =
  async (req, res) => {
    try {
      const { id } = req.params;

      const buyTicket =
        await BuyTicket.findById(id)
          .populate(
            "ticketId",
            "name price location date ticketimage ticketQty"
          )
          .populate(
            "userId",
            "name email"
          );

      if (!buyTicket) {
        return res.status(404).json({
          success: false,
          message:
            "Buy ticket not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: buyTicket,
      });
    } catch (error) {
      console.log(
        "GET BUY TICKET BY ID ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Something went wrong",
      });
    }
  };

// ======================================================
// INCREASE QUANTITY
// ======================================================

export const increaseBuyTicketQuantity =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide valid quantity",
        });
      }

      const buyTicket =
        await BuyTicket.findById(id);

      if (!buyTicket) {
        return res.status(404).json({
          success: false,
          message:
            "Buy ticket not found",
        });
      }

      await buyTicket.populate(
        "ticketId"
      );

      const ticket =
        buyTicket.ticketId;

      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Ticket not found",
        });
      }

      // ================= LIMIT CHECK =================
      if (ticket.ticketQty < quantity) {
        return res.status(400).json({
          success: false,
          message:
            "You have reached the quantity limit",
        });
      }

      // ================= UPDATE =================
      buyTicket.ticketQty += quantity;

      ticket.ticketQty -= quantity;

      await buyTicket.save();

      await ticket.save();

      return res.status(200).json({
        success: true,
        message:
          "Quantity increased successfully",
        data: buyTicket,
      });
    } catch (error) {
      console.log(
        "INCREASE QUANTITY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Something went wrong",
      });
    }
  };

// ======================================================
// DECREASE QUANTITY
// ======================================================

export const decreaseBuyTicketQuantity =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide valid quantity",
        });
      }

      const buyTicket =
        await BuyTicket.findById(id);

      if (!buyTicket) {
        return res.status(404).json({
          success: false,
          message:
            "Buy ticket not found",
        });
      }

      if (
        buyTicket.ticketQty <= 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Minimum quantity is 1",
        });
      }

      await buyTicket.populate(
        "ticketId"
      );

      const ticket =
        buyTicket.ticketId;

      buyTicket.ticketQty -= quantity;

      ticket.ticketQty += quantity;

      await buyTicket.save();

      await ticket.save();

      return res.status(200).json({
        success: true,
        message:
          "Quantity decreased successfully",
        data: buyTicket,
      });
    } catch (error) {
      console.log(
        "DECREASE QUANTITY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Something went wrong",
      });
    }
  };

// ======================================================
// DELETE BUY TICKET
// ======================================================

export const deleteBuyTicket = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const buyTicket =
      await BuyTicket.findById(id);

    if (!buyTicket) {
      return res.status(404).json({
        success: false,
        message:
          "Buy ticket not found",
      });
    }

    // ================= RESTORE STOCK =================
    await Ticket.findByIdAndUpdate(
      buyTicket.ticketId,
      {
        $inc: {
          ticketQty:
            buyTicket.ticketQty,
        },
      }
    );

    // ================= DELETE =================
    await BuyTicket.findByIdAndDelete(
      id
    );

    return res.status(200).json({
      success: true,
      message:
        "Ticket removed successfully",
    });
  } catch (error) {
    console.log(
      "DELETE BUY TICKET ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong",
    });
  }
};