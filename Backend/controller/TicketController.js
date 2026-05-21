import fs from "fs";
import Ticket from "../model/TicketModel.js";
import cloudinary from "../Cloudinay.js";


export const createTicket = async (
  req,
  res
) => {
  try {

    // ================= DEBUG =================
    console.log(req.file);

    // ================= BODY =================
    const {
      name,
      description,
      price,
    } = req.body;

    // ================= VALIDATION =================
    if (
      !name ||
      !description ||
      !price ||
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    // ================= CLOUDINARY UPLOAD =================
    const uploadedImage =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "tickets",
        }
      );

    // ================= DELETE LOCAL FILE =================
    fs.unlink(
      req.file.path,
      (err) => {
        if (err) {
          console.log(
            "File Delete Error:",
            err
          );
        }
      }
    );

    // ================= CREATE TICKET =================
    const newTicket =
      await Ticket.create({
        name,
        description,
        price,

        ticketimage: {
          public_id:
            uploadedImage.public_id,

          url:
            uploadedImage.secure_url,
        },
      });

    // ================= RESPONSE =================
    return res.status(201).json({
      success: true,
      message:
        "Ticket created successfully",
      data: newTicket,
    });

  } catch (error) {

    console.log(
      "CREATE TICKET ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
    });
  }
};

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        return res.status(200).json({
            success: true,
            data: tickets
        });
    } catch (error) {
        console.error("Get All Tickets Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: ticket
        });
    } catch (error) {
        console.error("Get Ticket by ID Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};



export const updateTicket = async (req, res) => {
  try {

    const { id } = req.params;

    const { name, description, price } = req.body;

    // ================= FIND TICKET =================
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // ================= UPDATE FIELDS =================
    if (name) {
      ticket.name = name;
    }

    if (description) {
      ticket.description = description;
    }

    if (price) {
      ticket.price = price;
    }

    // ================= IMAGE UPDATE =================
    if (req.file) {

      // DELETE OLD IMAGE FROM CLOUDINARY
      if (ticket.ticketimage?.public_id) {

        await cloudinary.uploader.destroy(
          ticket.ticketimage.public_id
        );
      }

      // UPLOAD NEW IMAGE
      const uploadedImage =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "tickets",
          }
        );

      // SAVE OBJECT
      ticket.ticketimage = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };

      // DELETE LOCAL FILE
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    // ================= SAVE =================
    await ticket.save();

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });

  } catch (error) {

    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found",
            });
        }

        // ✅ CLEAN & MODERN WAY
        await Ticket.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Ticket deleted successfully",
        });

    } catch (error) {
        console.error("Delete Ticket Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

