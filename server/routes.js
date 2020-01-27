const { findUserByName, checkUserName, generateJwt } = require('./user');
const { verifyToken } = require('./auth');

const TIMEOUT = 2000;

function initRoutes(app) {
    app.get(
        '/api/user/me',
        [ verifyToken ],
        (req, res) => findUserByName(req.userName)
            .then((user) => setTimeout(() => res.status(200).send(user), TIMEOUT)),
    );
    app.get(
        '/api/user/login',
        [ checkUserName ],
        (req, res) => findUserByName(req.userName)
            .then((user) => res.status(200).send({ user, token: generateJwt(user, new Date()) })),
    );
}

module.exports = initRoutes;
