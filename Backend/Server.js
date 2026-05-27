import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/UserRoute.js';
import reviewRouter from './routes/ReviewRoute.js';
import animalRouter from './routes/AnimalRoute.js';
import ticketRouter from './routes/TicketRoute.js';
import BuyAnimalRoute from './routes/BuyAnimalRoute.js';
import BuyTicketsRoute from './routes/BuyTicketsRoute.js';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URL
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("database connected successfully")
})
.catch((error)=>{
    console.log("error in connection",error)
})
app.use("/v1/api/users", userRouter);
app.use("/v2/api/reviews", reviewRouter);
app.use("/v3/api/animal", animalRouter);
app.use("/v4/api/buy-animals", BuyAnimalRoute);
app.use("/v5/api/tickets", ticketRouter);
app.use("/v6/api/buy-tickets", BuyTicketsRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});