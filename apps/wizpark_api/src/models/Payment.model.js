import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  export const Payment = mongoose.model('Payment', paymentSchema);
  