const { model } = require('./constants');
const { getData } = require('./file_storage');

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
            const { name } = category;
            const nextCategory = { ...category };
            if (hasExistId(model.category)(name)) {
                setById(model.category)(name, nextCategory);
            } else {
                store[model.category].ids.push(name);
                setById(model.category)(name, nextCategory);
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

const add = (modelName) => (id, item) => new Promise((resolve, reject) => {
    const modelStore = store[modelName];
    if (modelStore.byId[id]) {
        return reject(new Error(`Unable to create item [${modelName}]: id<${id}> exists`));
    }
    modelStore.ids.push(id);
    modelStore.byId[id] = item;
    return resolve(item);
});

module.exports = {
    initStore: init,
    getAll,
    findById,
    hasExistId,
    add,
};
