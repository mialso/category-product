const { model: { product } } = require('./constants');
const {
    getAll, add, update, findById, remove,
} = require('./store');

const allProducts = getAll(product);
const addProduct = add(product);
const changeProduct = update(product);
const findProduct = findById(product);
const removeProduct = remove(product);

const createProduct = ({ name, price, expireDate }) => {
    const newProduct = { name, price, expireDate };
    return addProduct(newProduct);
};

const updateProduct = (item) => {
    const productChange = {
        id: item.id,
        name: item.name,
        price: item.price,
        expireDate: item.expireDate,
    };
    return changeProduct(productChange);
};

const deleteProduct = ({ id }) => removeProduct(id);

module.exports = {
    allProducts,
    createProduct,
    updateProduct,
    findProduct,
    deleteProduct,
};
