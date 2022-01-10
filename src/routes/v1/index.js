import { Router } from "express";
import trailerRouter from "./trailer.router.js";

export default (config, cacheInstance) => {
    const app = Router();
    // Initiate trailer routes
    trailerRouter(app, config, cacheInstance);
    return app;
};
