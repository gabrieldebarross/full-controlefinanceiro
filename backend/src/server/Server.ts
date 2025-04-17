import cors from 'cors';
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(userRoutes);

export default app;

