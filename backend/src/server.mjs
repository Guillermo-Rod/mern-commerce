import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import webRoutes from "./routes/web.mjs";
import cors from "cors";
import corsConfig from "./app/config/cors.mjs";
import { connectToDB } from "./app/config/database.mjs";
import { getMiddlewares } from './app/config/middlewares.mjs';
import ErrorHandler from './app/errors/ErrorHandler.mjs';
import { connectToRedis } from './app/utils/redisClient.mjs';

// Connect to database
// If true, use memory database
if (process.env.APP_IS_TESTING === 'false') {
    await connectToDB();
    await connectToRedis();
}

// Create app
const app = express();

// Cors
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(...getMiddlewares())
app.use(webRoutes);


// Middleware to handle errors
app.use(ErrorHandler.handleAsMiddleware);

const server = app.listen(process.env.APP_PORT, () => {
    if (process.env.APP_IS_TESTING === 'false') {
        console.log(`Running on ${process.env.APP_URL}`);
    }
});

export {
    app,
    server
};