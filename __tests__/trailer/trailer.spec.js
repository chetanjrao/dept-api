import config from "../../src/loaders/config.loader.js";
import { TrailerService } from "../../src/services/trailer.service.js";
import { CacheService } from "../../src/services/cache.service.js";

const cacheService = new CacheService();
const trailerService = new TrailerService(config(), cacheService);
describe("Trailer Functionality Test", () => {
    test("getTopMovies - should show all popular movies", async () => {
        await trailerService.cacheService.cacheInstance.connect();
        const movies = await trailerService.getTopMovies();
        expect(movies.items.length).toBeGreaterThan(0);
    });

    test("getSearchData - search for movies on keywords", async () => {
        const searchData = await trailerService.getSearchData("man");
        expect(searchData.length).toBeGreaterThan(0);
    });

    test("getMovieInfo - get Particular Movie Info", async () => {
        const movieInfo = await trailerService.getMovieInfo("tt0111161");
        expect(movieInfo).not.toBeNull();
    });

    test("getTrailerData - get Particular Movie Trailer", async () => {
        const tailerInfo = await trailerService.getTrailerData("tt0111161");
        expect(tailerInfo).not.toBeNull();
        await trailerService.cacheService.cacheInstance.disconnect();
    });
});
