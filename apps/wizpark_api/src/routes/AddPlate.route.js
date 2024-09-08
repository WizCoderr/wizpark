import express from "express";
import { AddPlate } from "../controllers/AddPlate.controller";
const AddPlateRoute = express.Router();

AddPlateRoute.post('/plate',AddPlate())
export default AddPlateRoute