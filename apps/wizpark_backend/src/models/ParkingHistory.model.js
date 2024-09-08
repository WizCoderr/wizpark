import mongoose from "mongoose";

const parkingHistorySchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    parkingSpaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpace', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    totalCost: { type: Number, required: true }
  });
  
  export const ParkingHistory = mongoose.model('ParkingHistory', parkingHistorySchema);
  