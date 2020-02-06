const { model: { productCategories } } = require('./constants');
const {
    findById, getAll, add, update,
} = require('./relation_store');

const findProductCategories = findById({
    modelName: productCategories,
    relationName: 'byProductId',
});

const allProductCategories = getAll(productCategories, 'byProductId');
const allCategoryProducts = getAll(productCategories, 'byCategoryId');

const addProductCategories = add({
    modelName: productCategories,
    relationName: 'byProductId',
});

const createProductCategories = ({ id, categoryIds }) => addProductCategories({
    id,
    itemIds: categoryIds,
});

const editProductCategories = update({
    modelName: productCategories,
    relationName: 'byProductId',
});

const updateProductCategories = ({ id, categoryIds }) => editProductCategories({
    id,
    itemIds: categoryIds,
});

module.exports = {
    allCategoryProducts,
    allProductCategories,
    createProductCategories,
    findProductCategories,
    updateProductCategories,
};
