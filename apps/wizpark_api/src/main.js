/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import connectDB from './mongoose';
configDotenv({
  path:'./.env'
})
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to wizpark_backend!' });
});

// Import Routes
import user from './routes/User.routes';
import AddPlateRoute from './routes/AddPlate.route';
import { ImageComponent } from 'react-native';
import { configDotenv } from 'dotenv';

app.use('/api/user',user)
app.use('/api/plates',AddPlateRoute)
const port = process.env.PORT || 3333;
connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
}).catch((e)=>{
  console.log(e);
})


server.on('error', console.error);
