export const categoryState = ({ category }) => category;
export const categoryMode = ({ category }) => category.mode;
export const categoryById = (id) => ({ category }) => category.byId[id];
export const categoryEdited = ({ category }) => category.edit;
export const categoryPath = (id) => ({ category }) => {
    if (!id) {
        return '/';
    }
    const initialCategory = category.byId[id];
    let path = `/${initialCategory.name}`;
    let nextParentId = initialCategory.parentId;
    while (nextParentId) {
        const { name, parentId } = category.byId[nextParentId];
        path = `/${name}${path}`;
        nextParentId = parentId;
    }
    return path;
};

export const categoryRootNodeIds = ({ category }) => Object.values(category.byId)
    .filter((item) => !item.parentId)
    .map((item) => item.id);

export const categoriesByProduct = (productId) => ({ category }) => category.byProductId[productId];
