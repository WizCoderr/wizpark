import mongoose from "mongoose";

const corporationSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    officers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now, immutable: true }
  });
  
  export const Corporation = mongoose.model('Corporation', corporationSchema);
  