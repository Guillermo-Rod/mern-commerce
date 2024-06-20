import 'dotenv/config';

export default {
    token : {
        secret_key: process.env.APP_KEY,
        expires_in: '15m',
    },
    refresh_token: {
        secret_key: process.env.APP_REFRESH_KEY,
        expires_in: '2d',
        refresh_threshold: (10 * 60) // 10 minutes before expires
    }
}