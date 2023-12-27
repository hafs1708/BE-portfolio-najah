export const logging = (req, res, next) => {
    const time = new Date().toLocaleDateString();
    const log = {
        time: time,
        path: req.path,
        method: req.method,
        query: req.query,
        cookies: req.cookies,
        protocol: req.protocol,
        body: req.body
    }
    console.info(log)
    next()
};