import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    licensePlate: { type: String, required: true },
    parkingStatus: { type: String, enum: ['PARKED', 'NOT_PARKED', 'SEIZED'], required: true },
    parkingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParkingHistory' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now, immutable: true }
  });
  
  export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
  