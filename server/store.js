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
};

const countItems = (modelName) => () => Object.keys(store[modelName].byId).length;
const hasExistId = (modelName) => (id) => store[modelName].ids.includes(id);
const setById = (modelName) => (item) => {
    const { id } = item;
    const state = store[modelName];
    state.byId[id] = item;
    const hasId = hasExistId(modelName)(id);
    if (hasId && item.op === operations.remove) {
        state.ids = state.ids.filter((itemId) => itemId !== id);
    } else if (!hasId && item.op !== operations.remove) {
        state.ids.push(id);
    }
};
const loadAsIs = (modelName) => (data) => {
    try {
        data.forEach(setById(modelName));
        console.info(`[INFO: <store>]: <${modelName}>: {${store[modelName].ids.length}} set success`);
    } catch (e) {
        store[modelName] = { ids: [], byId: {} };
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
}

const findById = (modelName) => (id) => new Promise((resolve, reject) => {
    const hasEntry = hasExistId(modelName)(id);
    if (!hasEntry) {
        return reject(new Error(`No [${modelName}]: <${id}> found`));
    }
    return resolve(store[modelName].byId[id]);
});

const getAll = (modelName) => () => new Promise((resolve, reject) => {
    const modelStore = store[modelName];
    if (!modelStore) {
        return reject(new Error(`No [${modelName}] data found`));
    }
    return resolve(modelStore.ids.reduce(
        (acc, id) => ({ ...acc, [id]: modelStore.byId[id] }),
        {},
    ));
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

const remove = (modelName) => async (itemId) => {
    const modelStore = store[modelName];
    const storeItem = modelStore.byId[itemId];
    if (!storeItem) {
        throw new Error(`Unable to delete item [${modelName}]: id<${itemId}> absent`);
    }
    const deletedItem = {
        id: itemId,
        op: operations.remove,
    };
    await addData(modelName)(deletedItem);
    // if above addData resolved success, continue
    setById(modelName)(deletedItem);
    // modelStore.byId[deletedItem.id] = { ...storeItem, ...deletedItem };
    console.info(`[INFO: <store>]: ${modelName}: deleted item id={${deletedItem.id}}`);
    return deletedItem;
};

module.exports = {
    initStore: init,
    getAll,
    findById,
    hasExistId,
    add,
    update,
    remove,
    countItems,
};
