export const productState = ({ product }) => product;
export const productById = (id) => ({ product }) => product.byId[id];
export const productIds = ({ product }) => product.ids;
export const productMode = ({ product }) => product.mode;
export const productEdited = ({ product }) => product.edit;
