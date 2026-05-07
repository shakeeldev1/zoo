import mongoose from "mongoose";
const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    animalimage: {
        url:{
            type: String,
        },
        PublicId: {
            type: String,
        }
    },
    description: {
        type: String,
        required: true,
    }
})
const Animal = mongoose.model("Animal", animalSchema);
export default Animal;