import { Router } from "express";
import {
    getMovieInfo,
    getTopMovies,
    getTrailer,
    searchMovies,
} from "../../controllers/trailer.controller.js";

const router = Router();

/**
 *
 * @param {Router} app
 */
export default (app, config, cacheInstance) => {
    app.use("/trailers", router);
    router.use("/popular/", getTopMovies(config, cacheInstance));
    router.use("/search/", searchMovies(config, cacheInstance));
    router.use("/:id/trailer/", getTrailer(config, cacheInstance));
    router.use("/:id/info/", getMovieInfo(config, cacheInstance));
};
