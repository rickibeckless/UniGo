import express from 'express';
import './config/dotenv.js';
import cors from 'cors';
import { studentRoutes } from './routes/data.js';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on 'http://localhost:${PORT}'`);
});