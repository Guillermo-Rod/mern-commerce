import jwt from "jsonwebtoken";
import AuthValidationError from "../app/exceptions/AuthValidationError.mjs";
import ModelNotFoundError from "../app/exceptions/ModelNotFoundError.mjs";
import { loginUser, signupUser } from "../app/services/authService.mjs";
import { connectToMemoryDB, disconnectMemoryDB } from "./mongoMemoryServerInitConfig.mjs";

const userData = {
    name: 'Demo',
    last_name: 'demo',
    phone: '',
    email: 'demo@gmail.com',
    password: 'secret',
};

beforeAll(async () => {
    await connectToMemoryDB();
    await signupUser(userData);
});

afterAll(async () => await disconnectMemoryDB());

describe('Login | Auth Service (fail cases)', () => {

    it('should require email, password', async () => {
        try {
            await loginUser();
            fail('Expected login to throw AuthValidationError');
        } catch (error) {
            expect(error).toBeInstanceOf(AuthValidationError);
            expect(error.message).toBe('Missing required parameters');
            expect(error.requiredParameters).toEqual(['email', 'password']);
        }
    });


    it('should validate email format', async () => {
        try {
            await loginUser('not-valid', 'secret');
            fail('Expected login to throw AuthValidationError');
        } catch (error) {
            expect(error).toBeInstanceOf(AuthValidationError);
            expect(error.message).toBe('Invalid email format!');
            expect(error.requiredParameters).toEqual(['email']);
        }
    });

    it('should throws an exception if user not found', async () => {
        try {
            await loginUser('demoemail@gmail.com', 'secret');
            fail('Expected login to throw ModelNotFoundError');
        } catch (error) {
            expect(error).toBeInstanceOf(ModelNotFoundError);
            expect(error.message).toBe('User Not Found!');
        }
    });

    it('should throws an exception if password is incorrect', async () => {
        try {
            await loginUser(userData.email, 'wrongpassword');
            fail('Expected login to throw AuthValidationError');
        } catch (error) {
            expect(error).toBeInstanceOf(AuthValidationError);
            expect(error.message).toBe('Wrong password!');
            expect(error.requiredParameters).toEqual(['password']);
        }
    });
});

describe('Login | Auth Service (pass cases)', () => {
    it('should authenticate user, successfully', async () => {
       const tokens = await loginUser(userData.email, userData.password);
       
       // Validate that tokens is a non-null string
       expect(typeof tokens).toBe('object');
       expect(tokens).toHaveProperty('token');
       expect(tokens).toHaveProperty('refresh_token');
       expect(tokens.token).toBeDefined();
       expect(tokens.refresh_token).toBeDefined();

       try {
           const authToken = jwt.verify(tokens.token, process.env.APP_KEY);
           const refreshToken = jwt.verify(tokens.refresh_token, process.env.APP_REFRESH_KEY);
           expect(authToken).toBeDefined(); 
           expect(refreshToken).toBeDefined(); 
       } catch (error) {
           expect(error).not.toBeInstanceOf(jwt.JsonWebTokenError);
       }
    });
});