const jwt = require("jsonwebtoken");

const {config: {auth: {secret_token,refresh_secret_token}}} = require('./../config.js');


function generateToken (userId) {
    return jwt.sign({id: userId}, secret_token, {expiresIn: '1h'});
}

function refreshToken (userId) {
    return jwt.sign({id: userId}, refresh_secret_token);
}

module.exports = {
    generateToken,
    refreshToken
}