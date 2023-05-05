const {app} = require("./config.js");
const test = require("./routes/test.js");
const {home} = require("./controllers/home");
const { showConfig } = require("./controllers/config.js");
const {errorHandler} = require('./middlewares/errorHandler.js');

app.use((err,req,res,next) => {
    console.log("ola1");
    if (err) {
        console.error(err.stack);
        return res.status(500).json({msg: "Something broke!, err"})
    }
    console.log("ola");
    next();
});

app.all('/',home);
app.use('/test', test);
//TODO: protegerla con tokens
app.use('/config', showConfig);

module.exports = app;