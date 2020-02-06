const { model: { productCategories } } = require('./constants');
const {
    findById, getAll, add, update, deleteItem, deleteRelations,
} = require('./relation_store');

const meta = (key) => ({
    modelName: productCategories,
    relationName: key,
});

const findProductCategories = findById(meta('byProductId'));

const allProductCategories = getAll(productCategories, 'byProductId');
const allCategoryProducts = getAll(productCategories, 'byCategoryId');

const createProductCategories = ({ id, categoryIds }) => add(meta('byProductId'))({
    id,
    itemIds: categoryIds,
});

const updateProductCategories = ({ id, categoryIds }) => update(meta('byProductId'))({
    id,
    itemIds: categoryIds,
});

module.exports = {
    allCategoryProducts,
    allProductCategories,
    createProductCategories,
    findProductCategories,
    updateProductCategories,
    deleteProductCategories: deleteItem(meta('byProductId')),
    deleteCategoryProducts: deleteRelations(meta('byCategoryId')),
};
