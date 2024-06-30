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

export async function saveToRedis(key, data) {
    const success = await client.set(key, JSON.stringify(data));

    return success === 'OK';
}

export async function getFromRedis(key) {
    const data = await client.get(key);
    
    return JSON.parse(data);
}

export async function deleteFromRedis(key) {
    const result = await client.del(key);
    
    return result > 0; 
}

client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});