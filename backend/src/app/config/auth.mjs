import 'dotenv/config';
import { timeToSeconds } from "../utils/dateTimeHelpers.mjs";

export default {
    token : {
        secret_key: process.env.APP_KEY,
        expires_in: timeToSeconds('15m'),
    },
    refresh_token: {
        secret_key: process.env.APP_REFRESH_KEY,
        expires_in: timeToSeconds('2d'),
        refresh_threshold: timeToSeconds('10m') // 10 minutes before expires
    }
}