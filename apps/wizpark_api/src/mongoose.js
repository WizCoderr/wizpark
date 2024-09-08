// db.js
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    // MongoDB connection URL
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

    // Connect to MongoDB
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options can be added here
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
