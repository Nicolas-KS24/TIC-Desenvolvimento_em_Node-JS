const { readToken } = require('../utils/auth.js');

module.exports = {
    async middleware(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "User don't authorized!" });
        }
        try {
            const user = await readToken(token);
            req.user = user;
            next();
        } catch {
            return res.status(404).json({ message: "Token invalid!" });
        }
    }
};