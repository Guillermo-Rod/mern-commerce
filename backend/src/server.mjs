import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import webRoutes from "./routes/web.mjs";
import cors from "cors";
import corsConfig from "./app/config/cors.mjs";
import { connectToDB } from "./app/config/database.mjs";

// Connect to database
// If true, use memory database
if (process.env.APP_IS_TESTING === false) {
    await connectToDB();
}

// Create app
const app = express();

// Cors
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(webRoutes);

const server = app.listen(process.env.APP_PORT, () => {
    if (process.env.APP_IS_TESTING === false) {
        console.log(`Running on ${process.env.APP_URL}`);
    }
});

export {
    app,
    server
};