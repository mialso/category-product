export function itemTreeNode(item) {
    return { ...item, children: [] };
}

export function getTreeFromParentsMap(parentMap) {
    const treeMap = {};
    // populate tree map
    Object.values(parentMap)
        .forEach((item) => {
            const { id, parentId } = item;
            // add parent to tree map
            const parentItem = parentMap[parentId];
            if (parentItem) {
                if (!treeMap[parentItem.id]) {
                    treeMap[parentItem.id] = parentItem;
                    treeMap[parentItem.id].children = [ id ];
                } else {
                    treeMap[parentItem.id].children.push(id);
                }
            }
            treeMap[id] = itemTreeNode(item);
        });
    return treeMap;
}

export const cleanParentChildren = ({ parentId, id }) => (state) => ({
    ...state,
    byId: {
        ...state.byId,
        [parentId]: {
            ...state.byId[parentId],
            children: state.byId[parentId].children.filter((childId) => childId !== id),
        },
    },
});
