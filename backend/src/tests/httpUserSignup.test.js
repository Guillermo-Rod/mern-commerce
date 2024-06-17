import request from "supertest";
import { app, server } from "../server.mjs";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

var mongoTempServer;

beforeAll(async () => {
    // it is now
    mongoTempServer = await MongoMemoryServer.create();
    const uri = mongoTempServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoTempServer.stop();
    await server.close();
});

const user = {
    name: 'Demo', 
    last_name: 'demo last_name',
    email: 'demo@gmail.com',
    password: 'secret'
};

describe('POST / signup (pass cases)', () => {
    it('should respond with 201 OK if user was successfully created', async () => {
        const response = await request(app).post('/signup').send(user);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('message', "User registered successfully");
        expect(response.body.data).toHaveProperty('user');
        expect(response.body.data.user).not.toHaveProperty('password');
    });
})

describe('POST / signup (fail cases)', () => {
    it('should respond with 400 Bad Request when user model validation fails', async () => {
        const response = await request(app).post('/signup').send({name: 'Demo'});
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('data.exception_name', 'ValidationError');
    });

    it('should respond with 409 Conflict when an incoming user email exists', async () => {
        const response = await request(app).post('/signup').send(user);
        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('data.exception_name', 'ModelAlreadyExists');
    });
})

