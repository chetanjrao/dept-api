import { TrailerService } from "../services/trailer.service.js";

export function getTopMovies(config, cacheInstance) {
    const trailerService = new TrailerService(config, cacheInstance);

    return async (req, res) => {
        try {
            res.json(await trailerService.getTopMovies());
        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: 500,
            });
        }
    };
}

export function searchMovies(config, cacheInstance) {
    const trailerService = new TrailerService(config, cacheInstance);

    return async (req, res) => {
        const { q } = req.query;
        try {
            res.json(await trailerService.getSearchData(q));
        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: 500,
            });
        }
    };
}

export function getTrailer(config, cacheInstance) {
    const trailerService = new TrailerService(config, cacheInstance);

    return async (req, res) => {
        try {
            res.json(await trailerService.getTrailerData(req.params.id));
        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: 500,
            });
        }
    };
}

export function getMovieInfo(config, cacheInstance) {
    const trailerService = new TrailerService(config, cacheInstance);

    return async (req, res) => {
        try {
            res.json(await trailerService.getMovieInfo(req.params.id));
        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: 500,
            });
        }
    };
}
