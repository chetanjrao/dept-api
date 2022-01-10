import { json } from "express";
import compression from "compression";
import cors from "cors";
import routes from "../routes/v1/index.js";

/**
 * @param {application} app
 */
export default (app, configuration, cacheInstance) => {
    // Use compression middleware
    app.use(compression());
    // Use JSON body parser middleware
    app.use(json());
    // Use CORS middleware
    app.use(cors());
    // Create a status check end point
    app.get("/status", (req, res) => res.status(200).send("ok").end());
    // Configure all routes
    app.use("/", routes(configuration, cacheInstance));
};
