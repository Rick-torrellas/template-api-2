const {app} = require("./config.js");
const test = require("./routes/test.js");
const {home} = require("./controllers/home");
const { showConfig } = require("./controllers/config.js");

app.all('/',home);
app.use('/test', test);
//TODO: protegerla con tokens
app.use('/config', showConfig);

module.exports = app;