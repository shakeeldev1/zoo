import express from 'express'
import { createAnimal, deleteAnimal, getAllAnimal, updateAnimal } from '../controller/AnimalController.js'
import { authenticateToken } from '../middlware/VerifyToken.js';
import upload from '../middlware/Multer.js';
const animalRouter=express.Router()
animalRouter.post("/createanimal",authenticateToken,upload.any("animalimage"),createAnimal);
animalRouter.get("/getallanimal",getAllAnimal);
animalRouter.put(
  "/updateanimal/:id",
  upload.single("animalimage"),
  updateAnimal
)
animalRouter.delete("/deleteanimal/:id",deleteAnimal);
export default animalRouter
