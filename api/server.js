import express from 'express';
import schoolRoutes from '../routes/schoolRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Express now has built-in JSON parser (no need for body-parser)
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Start server
export default app;

