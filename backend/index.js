import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRouter from './routes/adminRouter.js';
import commonRouter from './routes/commonRouter.js';
import managerRouter from './routes/managerRoutes.js';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
const app = express();
const PORT = 3000;  
dotenv.config();


const allowedOrigins = [
  'http://localhost:5173',
  'https://collabsphereai.vercel.app',
  'https://access-hub-2-1tx4.onrender.com'
];

//  CORS for Express
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/admin", adminRouter);
app.use("/api/common", commonRouter);
app.use("/api/manager", managerRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Hello, Access Hub!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
