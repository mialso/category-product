const { model: { category } } = require('./constants');
const { getAll, add } = require('./store');

const allCategories = getAll(category);
const addCategory = add(category);

const createCategory = ({ name, parent }) => {
    const newCategory = { name, parent, ver: 1 };
    return addCategory(name, newCategory);
};

module.exports = {
    allCategories,
    createCategory,
};
