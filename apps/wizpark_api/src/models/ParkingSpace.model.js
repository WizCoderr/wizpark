import mongoose from "mongoose";

const parkingSpaceSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    address: { type: String, required: true },
    isOccupied: { type: Boolean, default: false },
    occupiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    rate: { type: Number, required: true },
    parkingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParkingHistory' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now, immutable: true }
  });
  
  export const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);
  