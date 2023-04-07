const {showConfig: allConfig} = require("./../services");

//TODO: esto tambien podria ser un servicio, que te muestre todas las propiedades.
const showConfig = (req,res) => {
    res.send(allConfig());
}   

module.exports = {
    showConfig
}