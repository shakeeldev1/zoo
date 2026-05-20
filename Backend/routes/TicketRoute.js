import express from "express";
import { createTicket, deleteTicket, getAllTickets, updateTicket,getTicketById } from "../controller/TicketController.js";
const ticketRouter = express.Router();

ticketRouter.post("/createticket",createTicket);
ticketRouter.get("/gettickets",getAllTickets);
ticketRouter.get("/getticket/:id",getTicketById);
ticketRouter.put("/updateticket/:id",updateTicket);
ticketRouter.delete("/deleteticket/:id",deleteTicket);
export default ticketRouter;