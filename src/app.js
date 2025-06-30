import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import shortenUrlApi from './api/shortenUrlApi.js';
import getOriginalUrlRoutes from './routes/getOriginalUrlRoutes.js';

// Configuration
const app = express();
dotenv.config();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/shorten', shortenUrlApi);
app.use('/shorten/', getOriginalUrlRoutes);

app.get('/', (req, res) => {
  res.send('Shortify-URL API is running!');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;