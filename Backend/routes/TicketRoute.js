import express from "express";
import { authenticateToken } from "../middlware/VerifyToken.js";
import { createTicket, deleteTicket, getAllTickets, updateTicket,getTicketById } from "../controller/TicketController.js";
import upload from "../middlware/Multer.js";
const ticketRouter = express.Router();

ticketRouter.post("/createticket", authenticateToken, upload.single("ticketimage"), createTicket);
ticketRouter.get("/gettickets",getAllTickets);
ticketRouter.get("/getticket/:id",getTicketById);
ticketRouter.put("/updateticket/:id", upload.single("ticketimage"),updateTicket);
ticketRouter.delete("/deleteticket/:id",deleteTicket);
export default ticketRouter;