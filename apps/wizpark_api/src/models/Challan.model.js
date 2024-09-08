import mongoose from "mongoose";

const challanSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    corporationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Corporation', required: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['PAID', 'UNPAID'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now, immutable: true }
  });
  
  export const Challan = mongoose.model('Challan', challanSchema);

  