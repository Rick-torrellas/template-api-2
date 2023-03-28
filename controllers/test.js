const Test = require("./../models/Test.js")

const test = async (req,res) => {
    return res.status(200).send("test");
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
        res.sendStatus(400);   
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
module.exports = {
    test,
    testPost,
    getOne,
    edit,
    getAll,
    delete_
};