import { compose } from 'redux';
import { SUCCESS } from 'remote/api';
import { SET_CATEGORIES, READ_CATEGORIES, CREATE_CATEGORY_API } from './action';
import { NOT_ASKED, ASKED, READY } from '../constants';

const initialState = {
    ids: [],
    byId: {},
    dataStatus: NOT_ASKED,
    error: '',
};

export const categoryById = (id) => ({ category }) => category.byId[id];

export const categoryRootNodeIds = ({ category }) => Object.values(category.byId)
    .filter((item) => !item.parent)
    .map((item) => item.id);

function getCategoriesFromPayload(payload) {
    const treeMap = {};
    Object.values(payload)
        .forEach((category) => {
            const { id, parent } = category;
            // add parent to tree map
            const parentCat = payload[parent];
            if (parentCat) {
                if (!treeMap[parentCat.id]) {
                    treeMap[parentCat.id] = parentCat;
                    treeMap[parentCat.id].children = [ id ];
                } else {
                    treeMap[parentCat.id].children.push(id);
                }
            }
        });
    // TODO: avoid this - use tree map only
    const finalCategories = Object.values(payload).reduce(
        (acc, category) => {
            let children = [];
            if (treeMap[category.id]) {
                children = treeMap[category.id].children;
            }
            return { ...acc, [category.id]: { ...category, children } };
        },
        {},
    );
    return finalCategories;
}

export const addItem = (item) => (state) => ({
    ...state,
    ids: state.ids.concat(item.id),
    byId: {
        ...state.byId,
        [item.id]: item,
    },
});

export const updateParent = (item) => (state) => {
    if (!item.parent) {
        return state;
    }
    const parentCat = state.byId[item.parent];
    if (!(parentCat && parentCat.id)) {
        // TODO: create transaction cancell
        return { ...state, error: `unable to updateParent of [${item.id}]` };
    }
    return {
        ...state,
        byId: {
            ...state.byId,
            [parentCat.id]: {
                ...parentCat,
                children: parentCat.children.concat(item.id),
            },
        },
    };
};

export const categoryReducer = (state = initialState, message) => {
    switch (message.type) {
        case READ_CATEGORIES: return { ...state, dataStatus: ASKED };
        case SET_CATEGORIES: {
            const { payload } = message;
            const ids = Object.keys(payload);
            if (!(Array.isArray(ids) && ids.length)) {
                // no data -> do nothing
                return state;
            }
            const categories = getCategoriesFromPayload(message.payload);
            return {
                ids: state.ids.concat(ids.filter((id) => !state.ids.includes(id))),
                byId: ids.reduce((acc, catId) => ({
                    ...acc,
                    [catId]: categories[catId],
                }), { ...state.byId }),
                dataStatus: READY,
            };
        }
        case CREATE_CATEGORY_API + SUCCESS: {
            const { payload } = message;
            const newCategory = {
                ...payload,
                children: [],
            };
            return compose(
                updateParent(newCategory),
                addItem(newCategory),
            )(state);
        }
        default: return state;
    }
};
