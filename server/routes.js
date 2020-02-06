const { findUserByName, checkUserName, generateJwt } = require('./user');
const {
    allCategories, createCategory, updateCategory, deleteCategory,
} = require('./category');
const {
    allProducts, createProduct, updateProduct, findProduct, deleteProduct,
} = require('./product');
const {
    allCategoryProducts, allProductCategories, createProductCategories, findProductCategories,
    updateProductCategories, deleteProductCategories, deleteCategoryProducts,
} = require('./productCategories');
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
        (req, res) => Promise.all([ allCategories(), allCategoryProducts() ])
            .then(([ categoryMap, productByCategory ]) => res.status(200)
                .send({ categoryMap, productByCategory }))
            .catch((error) => res.status(400).send({ error: error.message })),
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
        '/api/category/delete',
        [ verifyToken ],
        (req, res) => deleteCategory(req.query)
            .then(({ id }) => deleteCategoryProducts(id))
            .then(({ id, removedFrom }) => res.status(200).send({ id, removedFrom }))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
    app.get(
        '/api/product/all',
        [ verifyToken ],
        (req, res) => Promise.all([ allProducts(), allProductCategories() ])
            .then(([ productMap, categoriesByProduct ]) => res.status(200)
                .send({ productMap, categoriesByProduct })),
    );
    app.post(
        '/api/product/create',
        [ verifyToken ],
        (req, res) => createProduct(req.body)
            .then(({ id }) => createProductCategories({ id, categoryIds: req.body.categoryIds }))
            .then(({ productId }) => Promise.all([
                findProduct(productId),
                findProductCategories(productId),
            ]))
            .then(([ productMap, categoriesByProduct ]) => res.status(200)
                .send({ ...productMap, categoryIds: categoriesByProduct }))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
    app.put(
        '/api/product/update',
        [ verifyToken ],
        (req, res) => updateProduct(req.body)
            .then(({ id }) => updateProductCategories({ id, categoryIds: req.body.categoryIds }))
            .then(({ productId }) => Promise.all([
                findProduct(productId),
                findProductCategories(productId),
            ]))
            .then(([ productMap, categoriesByProduct ]) => res.status(200)
                .send({ ...productMap, categoryIds: categoriesByProduct }))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
    app.get(
        '/api/product/delete',
        [ verifyToken ],
        (req, res) => deleteProduct(req.query)
            .then(({ id }) => deleteProductCategories(id))
            .then(({ productId }) => res.status(200).send({ id: productId }))
            .catch((error) => res.status(400).send({ error: error.message })),
    );
    app.get(
        '/api/product/byCategory/all',
        [ verifyToken ],
        (req, res) => allCategoryProducts()
            .then((products) => res.status(200).send(products)),
    );
    app.get(
        '/api/category/byProduct/all',
        [ verifyToken ],
        (req, res) => allProductCategories()
            .then((categories) => res.status(200).send(categories)),
    );
}

module.exports = initRoutes;
