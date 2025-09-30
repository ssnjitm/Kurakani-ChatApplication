import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			// useNewUrlParser and useUnifiedTopology are not needed in Mongoose 6+
		});
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error('MongoDB connection error:', error.message);
		process.exit(1);
	}
};
