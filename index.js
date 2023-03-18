
const app = require("./routes.js");
const {hello} = require("./services");
require("./database/mongodb.js");

const env = app.get('env');
const name = app.get('name');
const port = app.get('port');
const url = app.get('url');

const server = app.listen(port,() => {
    if( env == "development" || env == "debug") {
        hello(name,port,url,env);
        //TODO: crear una funcion que registre en un archivo json, la ultima vez que se logeo, puede ser una funcion de los services.
    }
});
module.exports = {app,server};