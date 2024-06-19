import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

var mongoTempServer;

export const connectToMemoryDB = async () => {
    mongoTempServer = await MongoMemoryServer.create();
    const uri = mongoTempServer.getUri();
    await mongoose.connect(uri);
}

export const disconnectMemoryDB = async () => {
    await mongoose.disconnect();
    await mongoTempServer.stop();
}