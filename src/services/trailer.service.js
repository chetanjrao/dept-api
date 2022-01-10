import axios from "axios";
import { findBestMatch } from "../helpers/util.helper.js";
import pubsubLoader from "../loaders/pubsub.loader.js";
import { loadSearch } from "../events/trailer.events.js";

export class TrailerService {
    /**
     *
     * @param {any} config Platform Configuration
     */
    constructor(config, cacheService) {
        this.cacheService = cacheService;
        this.pubSub = pubsubLoader();
        this.config = config;
    }

    /**
     *
     * @param {any} key Cache parent Key
     * @param {any} callback Execution Callback
     * @param {any} nestedKey Nested cache key
     * @returns
     */
    async cacheUtility(key, callback, nestedKey = null) {
        // Connect to redis instance
        // await this.cacheService.cacheInstance.connect();
        // Search for the cached key
        let cachedData = await this.cacheService.getCachedData(key);
        // Lookup for nested key
        let nestedCacheData = cachedData ? cachedData[nestedKey] : null;
        if (!cachedData) {
            if (!nestedCacheData) {
                // Execute the callback
                cachedData = await callback();
                // Set the cached data
                await this.cacheService.setCachedData(key, cachedData);
            } else {
                cachedData = {};
            }
        }
        if (nestedKey && !nestedCacheData) {
            nestedCacheData = await callback();
            cachedData[nestedKey] = nestedCacheData;
            await this.cacheService.setCachedData(key, cachedData);
        }
        // Disconnect and clear the allocations
        // await this.cacheService.cacheInstance.disconnect();
        return !nestedKey ? cachedData : cachedData[nestedKey];
    }

    async getTopMovies() {
        return await this.cacheUtility("topMovies", async () => {
            const apiResponse = await axios.get(this.config.APIS.TOP);
            return apiResponse.data;
        });
    }

    async getSearchData(search) {
        // await this.cacheService.cacheInstance.connect();
        // Get the matching keys from regular expression
        const matchingKeys = await this.cacheService.getMatchKeys(search);
        // Search for ranking of best match
        const rankings = findBestMatch(search, matchingKeys);
        let response = [];
        if (matchingKeys.length) {
            // Concat existing keywords' response and show immediate results
            // Execute the further processing in the background
            response = (
                await this.cacheService.cacheInstance.mGet(rankings)
            ).map((v) => JSON.parse(v));
            if (matchingKeys.indexOf(search) === -1) {
                // Execute the current search process as a background service
                this.pubSub.publish(loadSearch, async () => {
                    const apiResponse = await axios.get(
                        this.config.APIS.SEARCH + search
                    );
                    await this.cacheService.setCachedData(
                        search,
                        apiResponse.data
                    );
                });
            }
        } else {
            const apiResponse = await axios.get(
                this.config.APIS.SEARCH + search
            );
            // Execute the caching process as a background service
            this.pubSub.publish(loadSearch, async () => {
                await this.cacheService.setCachedData(search, apiResponse.data);
            });
            response.push(apiResponse.data);
        }
        // Disconnect the instance
        // await this.cacheService.cacheInstance.disconnect();
        return response;
    }

    async getTrailerData(id) {
        // Populate the trailer data from the API and save it in the movie id node
        return await this.cacheUtility(
            id,
            async () => {
                const apiResponse = await axios.get(
                    this.config.APIS.TRAILER.replace(":id", id)
                );
                return apiResponse.data;
            },
            "youtubeTrailer"
        );
    }

    async getMovieInfo(id) {
        // Populate the complete movie data from the API and save it in the movie id node
        return await this.cacheUtility(
            id,
            async () => {
                const apiResponse = await axios.get(
                    this.config.APIS.INFO.replace(":id", id)
                );
                return apiResponse.data;
            },
            "info"
        );
    }
}
