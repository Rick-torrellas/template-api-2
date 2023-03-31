const test = (req,res,next) => {
    const test = "test";
    req.test = test;
    next();
}



module.exports = {
    test
}

