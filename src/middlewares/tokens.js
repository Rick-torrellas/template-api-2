const jwt = require("jsonwebtoken");

function authenticateToken(req,res,next) {
    const token_ = req.headers['core-access-token'];
    const {secretToken} = req.test;
    
    jwt.verify(token_, secretToken, (err,token) => {
        if (err) return res.sendStatus(403);
        req.token = token;
        next()
    });
}
//TODO: crear un midleware init, que cree este objeto req.test
const checkSecretToken = (req,res,next) => {
    const secretToken = req.app.get("secret token");
    if (secretToken) {
        req.test = {}
        req.test.secretToken = secretToken;
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