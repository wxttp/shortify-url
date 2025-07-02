import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import shortenUrlApi from './api/shortenUrlApi.js';
import getOriginalUrlRoutes from './routes/getOriginalUrlRoutes.js';
import { cleanupExpiredUrls } from './middleware/checkExpiredAtMiddleware.js';

// Configuration
const app = express();
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(cleanupExpiredUrls);

// Routes
app.use('/api/shorten', shortenUrlApi);
app.use('/', getOriginalUrlRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;