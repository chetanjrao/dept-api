import { loadSearch } from "../events/trailer.events.js";

/**
 * @param {PubSub} pubsub
 */
export default (pubsub) => {
    pubsub.subscribe(loadSearch, async (event, callback) => {
        await callback();
    });
};
