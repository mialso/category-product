const { findUserByName, checkUserName, generateJwt } = require('./user');
const { allCategories, createCategory, updateCategory } = require('./category');
const { verifyToken } = require('./auth');

function initRoutes(app) {
    app.get(
        '/api/user/me',
        [ verifyToken ],
        (req, res) => findUserByName(req.userName)
            .then((user) => res.status(200).send(user)),
    );
    app.get(
        '/api/user/login',
        [ checkUserName ],
        (req, res) => findUserByName(req.userName)
            .then((user) => res.status(200).send({ user, token: generateJwt(user, new Date()) })),
    );
    app.get(
        '/api/category/all',
        [ verifyToken ],
        (req, res) => allCategories()
            .then((categories) => res.status(200).send(categories)),
    );
    app.post(
        '/api/category/create',
        [ verifyToken ],
        (req, res) => createCategory(req.body)
            .then((item) => res.status(200).send(item))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
    app.put(
        '/api/category/update',
        [ verifyToken ],
        (req, res) => updateCategory(req.body)
            .then((item) => res.status(200).send(item))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
}

module.exports = initRoutes;
