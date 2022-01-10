import { createClient } from "redis";

/**
 * @type {redis.RedisClientType}
 */
let client = null;

export default (port) => {
    if (!client) {
        client = createClient(port);
    }
    return client;
};
