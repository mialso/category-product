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
    product: {
        ids: [],
        byId: {},
    },
};

const countItems = (modelName) => () => store[modelName].ids.length;
const hasExistId = (modelName) => (id) => store[modelName].ids.includes(id);
const setById = (modelName) => (id, item) => {
    store[modelName].byId[id] = item;
};

async function init() {
    const usersData = 'mak\nmik';
    usersData.split('\n').forEach((userName) => {
        const userStore = store[model.user];
        userStore.ids.push(userName);
        userStore.byId[userName] = { name: userName, role: 'REGULAR' };
    });

    const categories = await getData(model.category);
    try {
        categories.forEach((category) => {
            const { id } = category;
            const nextCategory = { ...category };
            if (hasExistId(model.category)(id)) {
                setById(model.category)(id, nextCategory);
            } else {
                store[model.category].ids.push(id);
                setById(model.category)(id, nextCategory);
            }
        });
        console.info(`[INFO: <store>]: Categories: {${store[model.category].ids.length}} set success`);
    } catch (e) {
        store[model.category] = { ids: [], byId: {} };
        console.error(`[ERROR: <store>]: Unable to set categories:: ${e.message}`);
    }
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
    return resolve(modelStore.byId);
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
    console.info(`[INFO: <store>]: ${modelName}: created item id={${updatedItem.id}}`);
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
