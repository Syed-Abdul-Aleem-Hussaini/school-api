import express from 'express';
import schoolRoutes from './routes/schoolRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Express now has built-in JSON parser (no need for body-parser)
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
