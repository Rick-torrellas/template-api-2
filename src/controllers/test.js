const Test = require("./../models/Test.js");
const UserTest = require("./../models/UserTest.js");
const jwt = require("jsonwebtoken");

const test = async (req,res) => {
    const {test} = req
    return res.status(200).send(test);
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
const signin = async (req,res,next) => {
    const {email,password} = req.body
    const secretToken = req.app.get("secret token");
    const user_test = await UserTest.findOne({email});
    if (!user_test) {
        return res.status(404).send("The email doesn't exists");
    } 

    const validatePassword = await user_test.validatePassword(password);
    if (!validatePassword) return res.status(401).json({
        auth: false,
        token: null
    });
    const token = jwt.sign({id: user_test._id}, secretToken);
    res.json(token);
}

const signup = async (req,res,next) => {
    const user_test = new UserTest(req.body);
    user_test.password = await user_test.encryptPassword(user_test.password);
    const secretToken = req.app.get("secret token");
     await user_test.save();
    const token = jwt.sign({id: user_test._id}, secretToken);
    res.json({auth: true, token});
}

const me = async (req,res) => {
//TODO: Esto tiene que ser si o si un midleware, para reusarlo, el verificador de tokens

    console.log(req.token)
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