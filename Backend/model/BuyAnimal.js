import mongoose from 'mongoose';

const buyAnimalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
}, { timestamps: true });

const BuyAnimal = mongoose.model('BuyAnimal', buyAnimalSchema);
