import 'dotenv/config';

export default {
    origin: process.env.CORS_ALLOWED_ORIGINS,
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    allowedHeaders: 'X-Requested-With, Content-Type',
    credentials: process.env.CORS_CREDENTIALS // cookies
};
