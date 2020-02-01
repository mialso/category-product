// select modes
export const EMPTY = 'EMPTY';
export const PARTIAL = 'PARTIAL';
export const FULL = 'FULL';

export function itemSelectable(item) {
    return { ...item, selectMode: EMPTY };
}

export function stateSelectable(state) {
    return { ...state, selected: [] };
}

export function createSelectableFromMap(map) {
    return Object.values(map).reduce(
        (acc, item) => ({ ...acc, [item.id]: itemSelectable(item) }),
        {},
    );
}

export const toggleSelect = (itemId) => (state) => {
    const shouldSelect = !state.selected.includes(itemId);
    return {
        ...state,
        selected: shouldSelect
            ? state.selected.concat(itemId)
            : state.selected.filter((id) => id !== itemId),
        byId: {
            ...state.byId,
            [itemId]: { ...state.byId[itemId], selectMode: shouldSelect ? FULL : EMPTY },
        },
    };
};
export const toggleParentSelect = (itemId) => (state) => {
    const { parentId } = state.byId[itemId];
    if (!parentId) {
        return state;
    }
    let selectMode = EMPTY;
    const parentItem = state.byId[parentId];
    if (parentItem.children.length) {
        selectMode = parentItem.children
            .reduce((mode, id, index) => {
                if (mode === PARTIAL) {
                    return PARTIAL;
                }
                const childItem = state.byId[id];
                if (index === 0) {
                    return childItem.selectMode;
                }
                if (mode === FULL && childItem.selectMode === FULL) {
                    return FULL;
                }
                return (mode === FULL || childItem.selectMode === FULL)
                    ? PARTIAL
                    : childItem.selectMode;
            }, EMPTY);
    }
    const newState = {
        ...state,
        selected: selectMode === FULL
            ? state.selected.concat(parentId)
            : state.selected.filter((id) => id !== parentId),
        byId: {
            ...state.byId,
            [parentItem.id]: { ...parentItem, selectMode },
        },
    };
    return toggleParentSelect(parentItem.id)(newState);
};
