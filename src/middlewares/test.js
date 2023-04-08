const test = (req,res,next) => {
    const test = "test";
    req.testsample = test;
    next();
}

const initTestObject = (req,res,next) => {
    req.test = {}
    next();
}

module.exports = {
    test,
    initTestObject
}

