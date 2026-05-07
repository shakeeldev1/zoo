import express from 'express'
import { createAnimal, deleteAnimal, getAllAnimal, updateAnimal } from '../controller/AnimalController.js'
const animalRouter=express.Router()
animalRouter.post("/createanimal",createAnimal);
animalRouter.get("/getallanimal",getAllAnimal);
animalRouter.put("/updateanimal",updateAnimal);
animalRouter.delete("/deleteanimal",deleteAnimal)
export default animalRouter
