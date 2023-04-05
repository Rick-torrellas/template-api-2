const app = require("./config.js");
const test = require("./routes/test.js");
const {home} = require("./controllers/home");

app.all('/',home);
app.use('/test', test);

module.exports = app;