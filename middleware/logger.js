/**
 * Print messages to the console
 */
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.headers.host}/${req.originalUrl}`)
    next();
}

module.exports = logger;
