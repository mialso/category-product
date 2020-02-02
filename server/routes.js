const { findUserByName, checkUserName, generateJwt } = require('./user');
const { allCategories, createCategory, updateCategory } = require('./category');
const { allProducts, createProduct, updateProduct } = require('./product');
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
    app.get(
        '/api/product/all',
        [ verifyToken ],
        (req, res) => allProducts()
            .then((categories) => res.status(200).send(categories)),
    );
    app.post(
        '/api/product/create',
        [ verifyToken ],
        (req, res) => createProduct(req.body)
            .then((item) => res.status(200).send(item))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
    app.put(
        '/api/product/update',
        [ verifyToken ],
        (req, res) => updateProduct(req.body)
            .then((item) => res.status(200).send(item))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
}

module.exports = initRoutes;
