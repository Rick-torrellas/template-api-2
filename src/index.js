
const app = require("./routes.js");
const {showConfig: {name , port , url , verbose, debug,node_env}, helloDebug, hello} = require('./services');
require("./database/mongodb.js");
 //TODO: crear una funcion que registre en un archivo json, la ultima vez que se logeo, puede ser una funcion de los services.
//TODO: configurar el favicon
//TODO: usar un controlador de error de express, para mandar los errores por consola, cuando esta en modo debug y un json mas el status code de 500.

const server = app.listen(port,() => {
    if ( verbose || debug ) hello(name,port,url,node_env);
    if (debug) helloDebug();
});

module.exports = {app,server};