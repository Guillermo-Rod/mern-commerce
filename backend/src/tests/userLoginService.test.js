import jwt from "jsonwebtoken";
import AuthValidationError from "../app/errors/AuthValidationError.mjs";
import ParametersError from "../app/errors/ParametersError.mjs";
import ResourceNotFoundError from "../app/errors/ResourceNotFoundError.mjs";
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
            expect(error).toBeInstanceOf(ParametersError);
            expect(error.message).toBe('Missing required parameters');
            expect(error.parameters).toEqual(['email', 'password']);
        }
    });


    it('should validate email format', async () => {
        try {
            await loginUser('not-valid', 'secret');
            fail('Expected login to throw AuthValidationError');
        } catch (error) {
            expect(error).toBeInstanceOf(ParametersError);
            expect(error.message).toBe('Invalid email format!');
            expect(error.parameters).toEqual(['email']);
        }
    });

    it('should throws an exception if user not found', async () => {
        try {
            await loginUser('demoemail@gmail.com', 'secret');
            fail('Expected login to throw ResourceNotFoundError');
        } catch (error) {
            expect(error).toBeInstanceOf(ResourceNotFoundError);
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
            expect(error.parameters).toEqual(['password']);
        }
    });
});

describe('Login | Auth Service (pass cases)', () => {
    it('should authenticate user, successfully', async () => {
       const tokens = await loginUser(userData.email, userData.password);
       
       // Validate that tokens is a non-null string
       expect(typeof tokens).toBe('object');
       expect(tokens.user_id).toBeDefined();
       expect(tokens.token).toBeDefined();
       expect(tokens.refresh_token).toBeDefined();
       expect(tokens.token_expires_in).toBeDefined();
       expect(tokens.refresh_token_expires_in).toBeDefined();
    });
});