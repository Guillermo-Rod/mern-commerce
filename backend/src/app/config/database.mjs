import 'dotenv/config';
import mongoose from "mongoose";

export const config = {
    mongodb: {
        getMongoUriString() {
            if (process.env.APP_ENV == 'production') {
                `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`;
            }

            return `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
        },
        async openConnection() {
            return await mongoose
                    .connect(this.getMongoUriString())
                    .then(() => console.log("Connected to mongo"))
                    .catch(() => console.log("Not connected")); 
        },
    },
}


export async function connectToDB() {
    return await config.mongodb.openConnection();
}
