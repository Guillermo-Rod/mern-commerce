import 'dotenv/config';
import mongoose from "mongoose";

const {
    MONGODB_HOST,
    MONGODB_PORT,
    MONGODB_DATABASE,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_OPTIONS
} = process.env;

export const config = {
    mongodb: {
        getMongoUriString() {
            return `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}${MONGODB_OPTIONS}`;
        },
        async openConnection() {
            console.log('Connecting to MongoDB...');
            return await mongoose
                    .connect(this.getMongoUriString())
                    .then(() => console.log("Connected to mongo"))
                    .catch(() => console.log("Not connected")); 
        },
    },
}

export async function connectToDB() {
    if (process.env.APP_IS_TESTING === 'true') {
        // Use memory database
        return ;
    }

    return await config.mongodb.openConnection();
}
