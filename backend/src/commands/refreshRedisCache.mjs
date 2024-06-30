import mongoose from "mongoose";
import Role from "../app/models/Role.mjs";
import { connectToDB } from "../app/config/database.mjs";
import * as redis from '../app/utils/redisService.mjs';
import constants from "../app/config/constants.mjs";



/**
 * Command config and defaults
 */
export const config = {
    name: 'Refresh default cache',
    syntax: 'cache:refresh',
    description: 'Refresh default redis cache',
    options: {
        key: {
            syntax: '--key',
            default: 'all',
            information: 'Hash Key to refresh',
        },
    }
};

export const handle = async ({ key }) => {
    await connectToDB();
    await redis.connectToRedis();

    console.log('Refreshing cache...');
    const hashId = (key || config.options.key.default);

    try {
        await refreshPermissions(hashId);
        console.log('Cache was refreshed!');
    } catch (error) {
        console.error('Cache was not refreshed!:', error.message);
    } finally {
        await mongoose.disconnect();
        await redis.client.disconnect();
    }
}

async function refreshPermissions(hashId) {
    if (hashId == 'all' || hashId == constants.permissions_cache_key) {
        const roles = await Role.find().populate('permissions');
        await redis.saveToRedis(constants.permissions_cache_key, roles);
    }
}
