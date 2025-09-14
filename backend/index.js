import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount user routes for auth
import userRoutes from './routes/user.route.js';
app.use('/api/auth', userRoutes);

const URI = process.env.MONGO_URI;

try {
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
} catch (error) {
  console.error('MongoDB connection error:', error);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

