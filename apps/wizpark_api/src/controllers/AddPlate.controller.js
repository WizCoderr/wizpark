import Vehicle from '../models/Vehicle.model.js' 
function AddPlate(){
    var userId = req.body.userId;
  var licensePlate = req.body.licensePlate;
  var make = req.body.make;
  var model = req.body.model;
  var color = req.body.color;
  var parkingStatus = req.body.parkingStatus;

  if (!userId || !licensePlate || !make || !model || !color || !parkingStatus) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  var newVehicle = new Vehicle({
    userId: userId,
    licensePlate: licensePlate,
    make: make,
    model: model,
    color: color,
    parkingStatus: parkingStatus
  });

  newVehicle.save()
    .then(function (vehicle) {
      res.status(201).json({ message: 'Vehicle added successfully', vehicle: vehicle });
    })
    .catch(function (error) {
      res.status(500).json({ message: 'Server error', error: error });
    });

}

export {AddPlate}


