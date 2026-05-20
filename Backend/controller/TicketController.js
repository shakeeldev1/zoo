import fs from "fs";
import Ticket from "../model/TicketModel.js";
import cloudinary from "../Cloudinay.js";

export const createTicket = async (req, res) => {
    try {

        if (!req.file && req.files?.length) {
            req.file = req.files[0];
        }

        const {
            name,
            description,
            price,
            quantity
        } = req.body;

        // ✅ Validation
        if (
            !name ||
            !description ||
            !price ||
            !req.file
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, description, price and image are required",
            });
        }

        // ✅ Upload to Cloudinary using file path
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "tickets",
        });

        // ✅ Delete local file after upload
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("File delete error:", err);
        });

        // ✅ Save to DB
        const newTicket = new Ticket({
            name,
            description,
            price,
            image: uploadedImage.secure_url,
        });

        await newTicket.save();

        return res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            data: newTicket,
        });

    } catch (error) {

        console.error("Create Animal Error:", error);

        // ✅ If error occurs, try deleting file
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
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
        const { name, description, price  } = req.body;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found",
            });
        }
        // ✅ Update fields if provided
        ticket.name = name || ticket.name;
        ticket.description = description || ticket.description;
        ticket.price = price || ticket.price;
        await ticket.save();

        return res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            data: ticket,
        });
    } catch (error) {
        console.error("Update Ticket Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
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
        await ticket.remove();

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

