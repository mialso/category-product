const path = require('path');
const { readFile, appendFile } = require('fs').promises;
const yaml = require('js-yaml');
const { model } = require('./constants');

const ITEM_LIMIT = 800;

const modelFileMap = {
    [model.user]: path.resolve(process.cwd(), './data/users.yml'),
    [model.category]: path.resolve('./data/categories.yml'),
    [model.product]: path.resolve('./data/products.yml'),
    [model.productCategories]: path.resolve('./data/productCategories.yml'),
};

const getData = (modelName) => readFile(modelFileMap[modelName], 'utf8')
    .then((data) => yaml.load(data)[modelName])
    .catch((e) => {
        const error = e.message;
        console.error(`unable to read storage data for model: [${modelName}]: ${error}`);
        return [];
    });

const addData = (modelName) => (data) => {
    const yamlString = yaml.dump([ data ], { flowLevel: 1, lineWidth: ITEM_LIMIT })
        .replace('-', '    - !!map');
    if (yamlString.length > (ITEM_LIMIT - 10)) {
        return Promise.reject(new Error(`[File Store]: add: [${modelName}]: unsupported item size`));
    }
    return appendFile(
        modelFileMap[modelName],
        `${yamlString}`,
        'utf8',
    );
};

module.exports = {
    getData,
    addData,
};
