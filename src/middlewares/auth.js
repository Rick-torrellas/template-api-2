const jwt = require("jsonwebtoken");
const {config: {auth: {secret_token}}} = require('../config.js');
const UserTest = require("./../models/UserTest.js");

function authenticateToken(req,res,next) {
    const token_ = req.headers['core-access-token'];
    
    jwt.verify(token_, secret_token, (err,token) => {
        if (err) return res.sendStatus(403);
//TODO: es req.test.token;
        req.token = token;
        next()
    });
}
const checkSecretToken = (req,res,next) => {
    if (secret_token) {
        return next();
    }
    return res.status(500).json({
        msg: "No secret token provided"
    })
}

const checkEmailPassword = async (req,res,next) => {
    const {email,password} = req.body
    const user = await UserTest.findOne({email});
  
    if (!user) {
      return res.status(404).send("The email doesn't exists");
  } 
  const validatePassword = await user.validatePassword(password);
  if (!validatePassword) return res.status(401).json({
    auth: false,
    msg: "Invalid Password"
  });
    req.test.user = user;
  return next();
  }

const authenticateToken_ = [checkSecretToken,authenticateToken];
module.exports = {
    authenticateToken,
    checkSecretToken,
    checkEmailPassword,
    authenticateToken_
}