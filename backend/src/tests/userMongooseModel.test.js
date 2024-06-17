import User from "../app/models/User.mjs";

describe('User mongoose model validations (fail cases)', () => {
    const user = {
        name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
    };
    
    it('should require name, last_name, email and password', () => {
        const data = {...user};
        const error = (new User(data)).validateSync();

        expect(error.errors).toHaveProperty('name');
        expect(error.errors).toHaveProperty('last_name');
        expect(error.errors).toHaveProperty('email');
        expect(error.errors).not.toHaveProperty('phone');
        expect(error.errors).toHaveProperty('password');
    })

    it('should have a validation error type for invalid email', () => {
        const emailCases = ['notemail', '', '@h.com', 'notemail@', 'notemail.com', 'notemail.' ];
        
        emailCases.forEach(email => {
            var { errors } = (new User({ ...user, email })).validateSync();
            expect(errors).toHaveProperty('email');
        });
    })

    it('should have a validation error type for invalid phone number', async () => {
        const phoneCases = [12,'123','ds2','233445566778','12233445'];
        
        phoneCases.forEach(phone => {
            var { errors } = (new User({ ...user, phone })).validateSync();
            expect(errors).toHaveProperty('phone');
        });
    });
})

describe('User mongoose model validation (passing cases)', () => {
    const user = {
        name: 'demo',
        last_name: 'demo',
        email: 'demo@gmail.com',
        password: 'secret',
    };
    
    it('should pass validation when all required fields are provided', () => {
        const error = (new User(user)).validateSync();
        expect(error).toBeUndefined();
    })

    it('should pass validation for a valid email', () => {
        const emailCases = ['demo@admin.com', 'demo.test@gmail.com', 'demo.test.test@business.mx'];
        
        emailCases.forEach(email => {
            var error = (new User({ ...user, email })).validateSync();
            expect(error).toBeUndefined();
        });
    })

    it('should pass validation for a valid phone number', async () => {
        const phoneCases = [1223344556, '3445566778'];
        
        phoneCases.forEach(phone => {
            var error = (new User({ ...user, phone })).validateSync();
            expect(error).toBeUndefined();
        });
    });
})