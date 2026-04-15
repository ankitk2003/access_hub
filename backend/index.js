import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRouter from './routes/adminRouter.js';
import commonRouter from './routes/commonRouter.js';
const app = express();
const PORT = 3000;  
dotenv.config();
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/common", commonRouter);

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
