export default {
    moduleFileExtensions: ["js", "json", "mjs", "ts", "tsx", "json"],
    transform: {
        "^.+\\.(js|jsx)?$": "babel-jest",
    },
    testEnvironment: "node",
    transformIgnorePatterns: ["/node_modules/"],
};
