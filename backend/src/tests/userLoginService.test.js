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
       const jwToken = await loginUser(userData.email, userData.password);
       
       // Validate that jwToken is a non-null string
       expect(typeof jwToken).toBe('string');
       expect(jwToken).not.toBeNull();
       expect(jwToken).not.toBeUndefined();

       try {
           const decoded = jwt.verify(jwToken, process.env.APP_KEY);
           expect(decoded).toBeDefined(); 
       } catch (error) {
           expect(error).not.toBeInstanceOf(jwt.JsonWebTokenError);
       }
    });
});