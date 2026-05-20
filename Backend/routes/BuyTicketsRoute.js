import express from "express";
import { addBuyTicket, getBuyTickets, deleteBuyTicket, getBuyTicketById } from "../controller/BuyTicketsController.js";
const BuyTicketsRoute = express.Router();
BuyTicketsRoute.post("/buytickets",addBuyTicket);
BuyTicketsRoute.get("/getbuytickets",getBuyTickets);
BuyTicketsRoute.get("/getbuyticketbyid/:userId",getBuyTicketById);
BuyTicketsRoute.delete("/deletebuyticket/:ticketId",deleteBuyTicket);
export default BuyTicketsRoute;
