// config/db.js
import mongoose from 'mongoose';

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('Error: MONGO_URI is not defined in environment variables.');
      process.exit(1);
    } else {
      console.log('MONGO_URI is loaded.');
    }

    await mongoose.connect(process.env.MONGO_URI, clientOptions);

    // Optionally, ping the database to verify the connection
    await mongoose.connection.db.admin().ping();
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed. Full error message:');
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
