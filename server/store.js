const { model, operations } = require('./constants');
const { getData, addData } = require('./file_storage');

const store = {
    [model.user]: {
        ids: [],
        byId: {},
    },
    [model.category]: {
        ids: [],
        byId: {},
    },
    [model.product]: {
        ids: [],
        byId: {},
    },
    [model.productCategories]: {
        byProductId: {},
        byCategoryId: {},
    },
};

const countItems = (modelName) => () => store[modelName].ids.length;
const hasExistId = (modelName) => (id) => store[modelName].ids.includes(id);
const setById = (modelName) => (id, item) => {
    store[modelName].byId[id] = item;
};
const loadAsIs = (modelName) => (data) => {
    try {
        data.forEach((item) => {
            const { id } = item;
            const nextItem = { ...item };
            if (hasExistId(modelName)(id)) {
                setById(modelName)(id, nextItem);
            } else {
                store[modelName].ids.push(id);
                setById(modelName)(id, nextItem);
            }
        });
        console.info(`[INFO: <store>]: <${modelName}>: {${store[modelName].ids.length}} set success`);
    } catch (e) {
        store[modelName] = { ids: [], byId: {} };
        console.error(`[ERROR: <store>]: Unable to set <${modelName}>: ${e.message}`);
    }
};
const loadAggregate = (modelName) => (data) => {
    const resultState = {
        byProductId: {},
        byCategoryId: {},
    };
    try {
        data.forEach((item) => {
            const { productId, categoryIds, op } = item;
            switch (op) {
                case 'CREATE': {
                    categoryIds.forEach((categoryId) => {
                        if (resultState.byCategoryId[categoryId]) {
                            resultState.byCategoryId[categoryId].push(productId);
                        } else {
                            resultState.byCategoryId[categoryId] = [ productId ];
                        }
                    });
                    resultState.byProductId[productId] = categoryIds;
                    break;
                }
                default: {
                    console.error(`[ERROR: <store>]: Unknown operation: ${op}`);
                    break;
                }
            }
        });
        debugger;
        store[modelName] = resultState;
        console.info(`[INFO: <store>]: <${modelName}>: aggregate set success`);
    } catch (e) {
        store[modelName] = { byProductId: {}, byCategoryId: {} };
        console.error(`[ERROR: <store>]: Unable to set <${modelName}>: ${e.message}`);
    }
};

async function init() {
    const usersData = 'mak\nmik';
    usersData.split('\n').forEach((userName) => {
        const userStore = store[model.user];
        userStore.ids.push(userName);
        userStore.byId[userName] = { name: userName, role: 'REGULAR' };
    });

    const categories = await getData(model.category);
    loadAsIs(model.category)(categories);

    const products = await getData(model.product);
    loadAsIs(model.product)(products);

    const productCategories = await getData(model.productCategories);
    loadAggregate(model.productCategories)(productCategories);
}

const findById = (modelName) => (id) => new Promise((resolve, reject) => {
    const hasEntry = hasExistId(modelName)(id);
    if (!hasEntry) {
        return reject(new Error(`No [${modelName}]: <${id}> found`));
    }
    return resolve(store[modelName].byId[id]);
});

const getAll = (modelName, key = 'byId') => () => new Promise((resolve, reject) => {
    const modelStore = store[modelName];
    if (!modelStore) {
        return reject(new Error(`No [${modelName}] data found`));
    }
    return resolve(modelStore[key]);
});

const add = (modelName) => async (item) => {
    const modelStore = store[modelName];
    const id = `${modelName}_${countItems(modelName)() + 1}`;
    if (modelStore.byId[id]) {
        throw new Error(`Unable to create item [${modelName}]: id<${id}> exists`);
    }
    const newItem = { ...item, id, op: operations.create };
    await addData(modelName)(newItem);
    // if above addData resolved success, continue
    modelStore.ids.push(newItem.id);
    modelStore.byId[newItem.id] = newItem;
    console.info(`[INFO: <store>]: ${modelName}: created item id={${newItem.id}}`);
    return newItem;
};

const update = (modelName) => async (item) => {
    const modelStore = store[modelName];
    const storeItem = modelStore.byId[item.id];
    if (!storeItem) {
        throw new Error(`Unable to update item [${modelName}]: id<${item.id}> absent`);
    }
    const updatedItem = {
        ...storeItem,
        ...item,
        op: operations.update,
    };
    await addData(modelName)(updatedItem);
    // if above addData resolved success, continue
    modelStore.byId[updatedItem.id] = { ...storeItem, ...item };
    console.info(`[INFO: <store>]: ${modelName}: updated item id={${updatedItem.id}}`);
    return updatedItem;
};

module.exports = {
    initStore: init,
    getAll,
    findById,
    hasExistId,
    add,
    update,
    countItems,
};
