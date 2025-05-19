import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/user.routes.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'))
app.listen(PORT)
app.use(express.json())
app.use(userRoutes)

console.log('Server is running on port', PORT);