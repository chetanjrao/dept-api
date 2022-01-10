import express from "express";
import expressLoader from "./src/loaders/express.loader.js";
import configLoader from "./src/loaders/config.loader.js";
import redisLoader from "./src/loaders/redis.loader.js";
import eventsLoader from "./src/loaders/events.loader.js";
import pubSubLoader from "./src/loaders/pubsub.loader.js";
import { CacheService } from "./src/services/cache.service.js";

async function initServer() {
    /**
     * Initialize the express instance
     */
    const app = express();
    /**
     * Load the platform configuration and use it as a dependency for different operations
     */
    const platformConfig = configLoader();
    /**
     * Load the platform configuration and use it as a dependency for different operations
     */
    redisLoader(platformConfig.REDIS_PORT);
    // Initiate a cache service and pass it as a dependency
    const cacheInstance = new CacheService();
    await cacheInstance.cacheInstance.connect();
    // Initiate PubSub instance
    const pubSub = pubSubLoader();
    /**
     * Load PubSub events with redis and pubSub instances as dependencies
     */
    eventsLoader(pubSub);
    /**
     * Load Express instance with express app instance and platform config as dependencies
     */
    expressLoader(app, platformConfig, cacheInstance);
    /**
     * Initiate the server
     */
    app.listen(process.env.PORT, () => {
        // eslint-disable-next-line no-undef
        console.log(`Listening at ${process.env.PORT}`);
    });
}

initServer();
