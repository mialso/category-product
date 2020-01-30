const path = require('path');
const { readFile } = require('fs').promises;
const yaml = require('js-yaml');
const { model } = require('./constants');

const modelFileMap = {
    [model.user]: path.resolve(process.cwd(), './data/users.yml'),
    [model.category]: path.resolve('./data/categories.yml'),
};

const getData = (modelName) => readFile(modelFileMap[modelName], 'utf-8')
    .then((data) => yaml.safeLoad(data).categories)
    .catch((e) => {
        const error = e.message;
        console.error(`unable to read storage data for model: [${modelName}]: ${error}`);
        return [];
    });

module.exports = {
    getData,
};
