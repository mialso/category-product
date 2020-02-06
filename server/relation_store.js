const { model, operations } = require('./constants');
const { getData, addData } = require('./file_storage');

const store = {
    [model.productCategories]: {
        byProductId: {},
        byCategoryId: {},
    },
};

const loadItem = (state) => (item) => {
    const { productId, categoryIds, op } = item;
    switch (op) {
        case 'CREATE': {
            categoryIds.forEach((categoryId) => {
                if (state.byCategoryId[categoryId]) {
                    state.byCategoryId[categoryId].push(productId);
                } else {
                    state.byCategoryId[categoryId] = [ productId ];
                }
            });
            state.byProductId[productId] = categoryIds;
            break;
        }
        case 'UPDATE': {
            // TODO: use explicit ADD and REMOVE
            const prevProductCategories = state.byProductId[productId];
            const toRemove = [];
            prevProductCategories.forEach((categoryId) => {
                if (!categoryIds.includes(categoryId)) {
                    toRemove.push(categoryId);
                }
            });
            const toAdd = [];
            categoryIds.forEach((categoryId) => {
                if (!prevProductCategories.includes(categoryId)) {
                    toAdd.push(categoryId);
                }
            });
            if (!toAdd.length && !toRemove.length) {
                // nothing to update, do nothing
                console.info('[INFO: <relation store>]: no store update for productCategories');
                break;
            }
            toRemove.forEach((categoryId) => {
                state.byCategoryId[categoryId] = state.byCategoryId[categoryId]
                    .filter((id) => id !== productId);
            });
            toAdd.forEach((categoryId) => {
                if (!state.byCategoryId[categoryId]) {
                    state.byCategoryId[categoryId] = [];
                }
                state.byCategoryId[categoryId] = state.byCategoryId[categoryId]
                    .concat(productId);
            });
            state.byProductId[productId] = categoryIds;
            break;
        }
        default: {
            console.error(`[ERROR: <store>]: Unknown operation: ${op}`);
            break;
        }
    }
};

const loadAggregate = (modelName) => (data) => {
    const resultState = {
        byProductId: {},
        byCategoryId: {},
    };
    try {
        data.forEach(loadItem(resultState));
        store[modelName] = resultState;
        console.info(`[INFO: <store>]: <${modelName}>: aggregate set success`);
    } catch (e) {
        store[modelName] = { byProductId: {}, byCategoryId: {} };
        console.error(`[ERROR: <store>]: Unable to set <${modelName}>: ${e.message}`);
    }
};

async function init() {
    const productCategories = await getData(model.productCategories);
    loadAggregate(model.productCategories)(productCategories);
}


const getAll = (modelName, key) => () => new Promise((resolve, reject) => {
    const modelStore = store[modelName];
    if (!modelStore) {
        return reject(new Error(`No [${modelName}] data found`));
    }
    return resolve(modelStore[key]);
});

const add = ({ modelName, relationName }) => async ({ id, itemIds }) => {
    const modelStore = store[modelName];
    if (modelStore[relationName][id]) {
        throw new Error(`Unable to add item [${modelName}::${relationName}]: id<${id}> exists`);
    }
    const newItem = { productId: id, categoryIds: itemIds, op: operations.create };
    await addData(modelName)(newItem);
    // if above addData resolved success, continue
    loadItem(modelStore)(newItem);
    console.info(`[INFO: <relation store>]: ${modelName}::${relationName}: created item id={${newItem.productId}}`);
    return newItem;
};

const update = ({ modelName, relationName }) => async ({ id, itemIds }) => {
    const modelStore = store[modelName];
    const storeItem = modelStore[relationName][id];
    if (!storeItem) {
        console.info(`Unable to update item: [${modelName}::${relationName}]: id<${id}> absent: perform CREATE instead`);
        return add({ modelName, relationName })({ id, itemIds });
    }
    const updatedItem = {
        productId: id,
        categoryIds: itemIds,
        op: operations.update,
    };
    await addData(modelName)(updatedItem);
    // if above addData resolved success, continue
    loadItem(modelStore)(updatedItem);
    console.info(`[INFO: <store>]: ${modelName}::${relationName}: updated item id={${id}}`);
    return updatedItem;
};

const findById = ({ modelName, relationName }) => (id) => new Promise(
    (resolve, reject) => {
        let item;
        try {
            item = store[modelName][relationName][id];
            if (!item) {
                return reject(new Error(`No [${modelName}::${relationName}]: <${id}> found`));
            }
        } catch (e) {
            return reject(new Error(`findById(): [${modelName}::${relationName}]: <${id}> error: ${e.message}`));
        }
        return resolve(item);
    },
);

module.exports = {
    initRelationStore: init,
    getAll,
    add,
    update,
    findById,
};
