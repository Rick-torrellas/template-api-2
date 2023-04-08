const {config} = require("./../config.js");

//TODO: esto tambien podria ser un servicio, que te muestre todas las propiedades.
const showConfig = (req,res) => {
    res.send(config);
}   

module.exports = {
    showConfig
}