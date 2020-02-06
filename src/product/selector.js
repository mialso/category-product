export const productState = ({ product }) => product;
export const productById = (id) => ({ product, category }) => ({
    ...product.byId[id],
    categoryIds: category.byProductId[id] || [],
});
export const productIds = ({ product }) => product.ids;
export const productIdsByCategoryIds = (categoryIds) => ({ product }) => {
    if (!(Array.isArray(categoryIds) && categoryIds.length)) {
        return product.ids;
    }
    return categoryIds.reduce(
        (acc, categoryId) => {
            const ids = product.byCategoryId[categoryId];
            if (!(Array.isArray(ids) && ids.length)) {
                return acc;
            }
            return acc.concat(ids.filter((id) => !acc.includes(id)));
        },
        [],
    );
};
