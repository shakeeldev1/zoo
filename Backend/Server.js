import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/UserRoute.js';
import reviewRouter from './routes/ReviewRoute.js';
import animalRouter from './routes/AnimalRoute.js';
const app = express();
app.use(express.json());
import dotenv from 'dotenv'
dotenv.config()
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
app.use("v3/api/animal",animalRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});