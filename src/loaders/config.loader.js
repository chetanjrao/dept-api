import configDevelopment from "../config/config.development.js";
import configProduction from "../config/config.production.js";

export default () =>
    process.env.ENV === "development" ? configDevelopment : configProduction;
