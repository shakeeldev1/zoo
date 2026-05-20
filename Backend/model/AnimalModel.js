import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    animalimage: {
        url: {
            type: String,
        },
        publicId: {
            type: String,
        }
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    }
})

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;