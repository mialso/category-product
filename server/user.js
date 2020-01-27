const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./constants');
const { findById, hasExistId } = require('./store');

function createUser(name) {
    return {
        name,
    };
}

const findUserByName = findById('user');
const hasUserWithName = hasExistId('user');

function generateJwt(user, today) {
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        name: user.name,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, jwtSecret);
}

function getAuthJson(user) {
    return {
        name: user.name,
        token: generateJwt(user),
    };
}

function checkUserName(req, res, next) {
    const { name } = req.query;
    if (!hasUserWithName(name)) {
        return res.status(404).send({
            error: `No user found for name: ${name}`,
        });
    }
    req.userName = name;
    return next();
}

module.exports = {
    createUser,
    generateJwt,
    getAuthJson,
    findUserByName,
    checkUserName,
};
