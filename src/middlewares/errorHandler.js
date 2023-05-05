const errorHandler = (err,req,res,next) => {
    if (err) {
        console.error(err.stack);
        return res.status(500).json({msg: "Something broke!, err"})
    }
    next();
}

module.exports = {
    errorHandler
}