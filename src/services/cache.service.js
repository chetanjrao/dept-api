import redisLoader from "../loaders/redis.loader.js";

export class CacheService {
    /**
     *
     * @param {import('redis').RedisClientType} cacheInstance
     */
    constructor() {
        this.cacheInstance = redisLoader();
    }

    async getMatchKeys(key) {
        return await this.cacheInstance.keys(`*${key}*`);
    }

    async getCachedData(key) {
        const data = await this.cacheInstance.get(key);
        return data ? JSON.parse(data) : null;
    }

    async setCachedData(key, data) {
        return await this.cacheInstance.set(key, JSON.stringify(data));
    }
}
