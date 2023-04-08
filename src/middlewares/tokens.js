const jwt = require("jsonwebtoken");
const {config: {auth: {secret_token}}} = require('./../config.js');


function authenticateToken(req,res,next) {
    const token_ = req.headers['core-access-token'];
    
    jwt.verify(token_, secret_token, (err,token) => {
        if (err) return res.sendStatus(403);
//TODO: es req.test.token;
        req.token = token;
        next()
    });
}
//TODO: crear un midleware init, que cree este objeto req.test
const checkSecretToken = (req,res,next) => {
    if (secret_token) {
        return next();
    }
    return res.status(500).json({
        msg: "No secret token provided"
    })
}

module.exports = {
    authenticateToken,
    checkSecretToken
}