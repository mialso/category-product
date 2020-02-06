const { model: { category } } = require('./constants');
const {
    getAll, add, update, remove,
} = require('./store');

const allCategories = getAll(category);
const addCategory = add(category);
const changeCategory = update(category);
const removeCategory = remove(category);

const createCategory = ({ name, parentId }) => {
    const newCategory = { name, parentId };
    return addCategory(newCategory);
};

const updateCategory = ({ id, name, parentId }) => {
    const categoryChange = { id, name, parentId };
    return changeCategory(categoryChange);
};

const deleteCategory = ({ id }) => removeCategory(id);

module.exports = {
    allCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
