const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./constants');

function getTokenFromHeaders(req) {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }
    return null;
}

function verifyToken(req, res, next) {
    const token = getTokenFromHeaders(req);
    if (!token) {
        return res.status(401).send({
            message: 'no valid authentication credentials',
        });
    }

    return jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'authentication credentials are invalid',
            });
        }
        req.userName = decoded.name;
        return next();
    });
}

module.exports = {
    getTokenFromHeaders,
    verifyToken,
};
