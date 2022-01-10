import dotenv from "dotenv";

dotenv.config();

export default {
    REDIS_PORT: process.env.REDIS_PORT,
    API_KEY: process.env.API_KEY,
    APIS: {
        TOP: `https://imdb-api.com/en/API/Top250Movies/${process.env.API_KEY}`,
        SEARCH: `https://imdb-api.com/API/AdvancedSearch/${process.env.API_KEY}?title=`,
        TRAILER: `https://imdb-api.com/en/API/YouTubeTrailer/${process.env.API_KEY}/:id/`,
        INFO: `https://imdb-api.com/en/API/Title/${process.env.API_KEY}/:id/FullActor,FullCast,Images,Trailer,Ratings,`,
    },
};
