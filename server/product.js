const { model: { product } } = require('./constants');
const { getAll, add, update } = require('./store');

const allProducts = getAll(product);
const addProduct = add(product);
const changeProduct = update(product);

const createProduct = ({ name, parentId }) => {
    const newProduct = { name, parentId };
    return addProduct(newProduct);
};

const updateProduct = ({ id, name, parentId }) => {
    const productChange = { id, name, parentId };
    return changeProduct(productChange);
};

module.exports = {
    allProducts,
    createProduct,
    updateProduct,
};
