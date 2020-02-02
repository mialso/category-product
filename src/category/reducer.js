import { compose } from 'redux';
import { SUCCESS } from 'remote/api';
import { USER_LOGOUT } from 'user/action';
import { getTreeFromParentsMap, itemTreeNode } from 'tree/tree';
import {
    stateSelectable, createSelectableFromMap, toggleParentSelect, toggleSelect, itemSelectable,
} from 'tree/selectable';
import {
    SET_CATEGORIES, READ_CATEGORIES, CREATE_CATEGORY, CREATE_CATEGORY_API,
    CATEGORY_NORMAL_MODE, UPDATE_CATEGORY, UPDATE_CATEGORY_API, TOGGLE_SELECT_CATEGORY,
} from './action';
import { NOT_ASKED, ASKED, READY } from '../constants';
import { MODE_EDIT, MODE_CREATE, MODE_NORMAL } from './constants';

const initialState = compose(
    stateSelectable,
)({
    ids: [],
    byId: {},
    dataStatus: NOT_ASKED,
    error: '',
    edit: {},
    mode: MODE_NORMAL,
});

export const createItem = compose(itemSelectable, itemTreeNode);

// TODO: remove selectors to separate file ?
export const categoryState = ({ category }) => category;
export const categoryMode = ({ category }) => category.mode;
export const categoryById = (id) => ({ category }) => category.byId[id];
export const categoryEdited = ({ category }) => category.edit;

export const categoryRootNodeIds = ({ category }) => Object.values(category.byId)
    .filter((item) => !item.parentId)
    .map((item) => item.id);

export const addItem = (item) => (state) => ({
    ...state,
    ids: state.ids.concat(item.id),
    byId: {
        ...state.byId,
        [item.id]: item,
    },
});
export const updateItem = (item) => (state) => ({
    ...state,
    byId: { ...state.byId, [item.id]: item },
});

export const updateParent = (item) => (state) => {
    if (!item.parentId) {
        return state;
    }
    const parentCat = state.byId[item.parentId];
    if (!(parentCat && parentCat.id)) {
        // TODO: create transaction cancel
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

export const switchMode = (mode) => (state) => ({ ...state, mode });

export const setEditItem = (itemId, item) => (state) => ({
    ...state,
    edit: item || state.byId[itemId],
});
export const cleanEditItem = (state) => ({ ...state, edit: {} });

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
            const categories = compose(
                createSelectableFromMap,
                getTreeFromParentsMap,
            )(message.payload);
            return {
                ...state,
                ids: state.ids.concat(ids.filter((id) => !state.ids.includes(id))),
                byId: ids.reduce((acc, catId) => ({
                    ...acc,
                    [catId]: categories[catId],
                }), { ...state.byId }),
                dataStatus: READY,
            };
        }
        case CREATE_CATEGORY: {
            const { payload: { parentId } } = message;
            return compose(
                switchMode(MODE_CREATE),
                setEditItem(null, { name: '', parentId }),
            )(state);
        }
        case CREATE_CATEGORY_API + SUCCESS: {
            const { payload } = message;
            const newCategory = createItem(payload);
            return compose(
                switchMode(MODE_NORMAL),
                updateParent(newCategory),
                addItem(newCategory),
            )(state);
        }
        case UPDATE_CATEGORY: return compose(
            switchMode(MODE_EDIT),
            setEditItem(message.payload),
        )(state);
        case UPDATE_CATEGORY_API + SUCCESS: {
            const { payload: { id, name } } = message;
            return compose(
                switchMode(MODE_NORMAL),
                updateItem({ ...state.byId[id], name }),
            )(state);
        }
        case CATEGORY_NORMAL_MODE: return compose(
            switchMode(MODE_NORMAL),
            cleanEditItem,
        )(state);
        case USER_LOGOUT: {
            return initialState;
        }
        case TOGGLE_SELECT_CATEGORY: return compose(
            toggleParentSelect(message.payload),
            toggleSelect(message.payload),
        )(state);
        default: return state;
    }
};
