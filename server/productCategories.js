const { model: { productCategories } } = require('./constants');
const { findById, getAll, add, update } = require('./store');

const findProductCategories = findById(productCategories);

const allProductCategories = getAll(productCategories, 'byProductId');
const allCategoryProducts = getAll(productCategories, 'byCategoryId');

const categoriesByProduct = (req) => {
    debugger;
    return findProductCategories('product_1');
};

module.exports = {
    allCategoryProducts,
    allProductCategories,
    categoriesByProduct,
};
