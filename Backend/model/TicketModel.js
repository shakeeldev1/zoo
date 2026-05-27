import mongoose from 'mongoose';
const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ticketimage: {
        url: { type: String, required: true },
        public_id: { type: String },
     },
     ticketQty:{
        type : Number,
        required:true
     }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;