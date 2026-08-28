import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db.js';

// Load routes
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database
await initDb().catch(console.error);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolios', portfolioRoutes);

app.get('/', (req, res) => {
  res.send('Escape the PDF Prison API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Trigger nodemon restart
