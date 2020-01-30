import { SUCCESS } from 'remote/api';
import { SET_CATEGORIES, READ_CATEGORIES, CREATE_CATEGORY_API } from './action';
import { NOT_ASKED, ASKED, READY } from '../constants';

const initialState = {
    names: [],
    byName: {},
    dataStatus: NOT_ASKED,
};

export const categoryByName = (name) => ({ category }) => category.byName[name];

export const categoryRootNodeIds = ({ category }) => Object.values(category.byName)
    .filter((item) => !item.parent)
    .map((item) => item.name);

function findLevel({ parent }, categoriesMap) {
    const parentCat = categoriesMap[parent];
    if (parentCat.level) {
        return parentCat.level + 1;
    }
    return findLevel(parentCat, categoriesMap) + 1;
}

function getCategoriesFromPayload(payload) {
    const childMap = {};
    const newCategories = Object.values(payload)
        .map((category) => {
            const { name, parent } = category;
            const parentCat = payload[parent];
            const level = parent ? 0 : 1;
            if (parentCat) {
                if (!childMap[parentCat.name]) {
                    childMap[parentCat.name] = parentCat;
                    childMap[parentCat.name].children = [ name ];
                    childMap[parentCat.name].level = parentCat.parent ? 0 : 1;
                } else {
                    childMap[parentCat.name].children.push(name);
                }
            }
            return { name, parent, level };
        });
    const finalCategories = newCategories.reduce(
        (acc, category) => {
            let children = [];
            if (childMap[category.name]) {
                children = childMap[category.name].children;
            }
            const level = category.level || findLevel(category, childMap);
            return { ...acc, [category.name]: { ...category, children, level } };
        },
        {},
    );
    return finalCategories;
}

export const categoryReducer = (state = initialState, message) => {
    switch (message.type) {
        case READ_CATEGORIES: return { ...state, dataStatus: ASKED };
        case SET_CATEGORIES: {
            const { payload } = message;
            const names = Object.keys(payload);
            if (!(Array.isArray(names) && names.length)) {
                // no data -> do nothing
                return state;
            }
            const categories = getCategoriesFromPayload(message.payload);
            return {
                names: state.names.concat(names.filter((name) => !state.names.includes(name))),
                byName: names.reduce((acc, catId) => ({
                    ...acc,
                    [catId]: categories[catId],
                }), { ...state.byName }),
                dataStatus: READY,
            };
        }
        case CREATE_CATEGORY_API + SUCCESS: {
            const { payload } = message;
            const newCategory = {
                ...payload,
                children: [],
                level: findLevel(payload, state.byName),
            };
            const parentCat = state.byName[newCategory.parent];
            return {
                ...state,
                names: state.names.concat(newCategory.name),
                byName: {
                    ...state.byName,
                    [newCategory.name]: newCategory,
                    [parentCat.name]: {
                        ...parentCat,
                        children: parentCat.children.concat(newCategory.name),
                    },
                },
            };
        }
        default: return state;
    }
};
