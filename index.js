
const app = require("./config.js");
//TODO: destructurar el hello().
const services = require("./services");
const test = require("./routes/test.js");
const {home} = require("./controllers/home");

app.all('/',home);
app.use('/test', test);

app.listen(app.get('port'),() => {
    if(app.get('env') == "dev") {
        services.hello(app.get('name'),app.get('port'),app.get('url'));
        //TODO: crear una funcion que registre en un archivo json, la ultima vez que se logeo, puede ser una funcion de los services.
    }
});