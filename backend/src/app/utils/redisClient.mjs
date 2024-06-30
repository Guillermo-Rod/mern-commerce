import redis from "redis";
import redisConfig from '../config/redis.mjs';

export const client = redis.createClient();

export async function connectToRedis() {
    console.log('Connecting to redis...');

    await client.connect({
            host: redisConfig.host,
            port: redisConfig.port, 
            password: redisConfig.password 
        })
        .then(() => console.log('Connected to Redis'))
        .catch((err) => console.error('Error connecting to Redis:', err));
}

client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});
