const store = {
    user: {
        ids: [],
        byId: {},
    },
    product: {
        ids: [],
        byId: {},
    },
    category: {
        ids: [],
        byId: {},
    },
};

function init() {
    const usersData = 'mak\nmik';
    usersData.split('\n').forEach((userName) => {
        store.user.ids.push(userName);
        store.user.byId[userName] = { name: userName, role: 'REGULAR' };
    });
}

const hasExistId = (model) => (id) => store[model].ids.includes(id);

const findById = (model) => (id) => new Promise((resolve, reject) => {
    const hasEntry = hasExistId(model)(id);
    if (!hasEntry) {
        return reject(new Error(`No [${model}]: <${id}> found`));
    }
    return resolve(store[model].byId[id]);
});

module.exports = {
    initStore: init,
    findById,
    hasExistId,
};
