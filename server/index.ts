import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

const app = express();

import _initializePassport from './config/passport';
import taskRouter from './routes/tasks';
import userRouter from './routes/users';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import passport from './config/passport';
import { rateLimit } from 'express-rate-limit';



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
});

// Apply the rate limiting middleware to all requests.

dotenv.config();

connectDB();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(helmet());
app.use(limiter);
// Import Routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

app.use(errorHandler);

// Listen to server
const port = 3000;
app.listen(port, () => console.log(`Server Up and running at http://localhost:${port}`));
