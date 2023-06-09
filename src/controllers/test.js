const Test = require("./../models/Test.js");
const UserTest = require("./../models/UserTest.js");
const jwt = require("jsonwebtoken");

const {config: {auth: {secret_token}}} = require('./../config.js');
const { generateToken, refreshToken } = require("../services/auth.js");


const test = async (req,res) => {
    const {testsample} = req
    return res.status(200).send(testsample);
}
const getAll = async (req,res) => {
    try {
        const allTests = await Test.find().lean();
        res.send(allTests); 
    } catch (error) {
        console.log(error);
        res.redirect(400,'/');
    }
}
const getOne = async (req,res) => {
    try {
        const oneTest = await Test.findById(req.params.id).lean()
        res.status(200).send(oneTest);
    } catch (error) {
        console.log(error);
        res.redirect(400,"/");
    }
}
const testPost = async (req,res) => {
    try {
        const test = Test(req.body);
        const testCreated = await test.save();
        res.status(201).send(testCreated);
    } catch (error) {
        res.redirect(400,"/");    
    }
}
const edit = async (req,res) => {
    try {
        const {id} = req.params;
        const content = req.body;
        await Test.findByIdAndUpdate(id, content);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error);   
    }
}
const delete_ = async (req,res) => {
    try {
        const {id} = req.params
        const testDeleted = await Test.findByIdAndDelete(id);
        res.status(204).send(testDeleted);
    } catch (error) {
        res.redirect(400,"/");    
    }
}
const signin = async (req,res) => {
    const {user} = req.test;
    const userID = user._id;
    const token = generateToken(userID);
    // const refreshToken_ = refreshToken(userID);

    res.json({auth:true,token});
}

const signup = async (req,res) => {
    const user_test = new UserTest(req.body);
    user_test.password = await user_test.encryptPassword(user_test.password);
    const userId = user_test._id;
     await user_test.save();
    const token = generateToken(userId);

    res.json({auth: true, token});
}

const me = async (req,res) => {
    const {token} = req
    const user_test = await UserTest.findById(token.id);
    if (!user_test) {
        return res.sed(404).send("User not found");
    }
    res.json(user_test);
}
module.exports = {
    test,
    testPost,
    getOne,
    edit,
    getAll,
    delete_,
    signin,
    signup,
    me
};