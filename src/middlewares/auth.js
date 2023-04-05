const jwt = require("jsonwebtoken");

function authenticateToken(req,res,next) {
    const authHeader = req.headers['x-access-token'];
    const token_ = authHeader && authHeader.split(' ')[1];
    const secretToken = req.app.get("secret token");
    if (!secretToken) {
        return res.status(500).send("No secret token provided");
    }

    if (token_ == null) return res.status(401).json({
        auth: false,
        msg: 'No Token provided'
    });

    jwt.verify(token_, secretToken, (err,token) => {
        if (err) return res.sendStatus(403);
        req.token = token;
        next()
    });
}

module.exports = {
    authenticateToken
}