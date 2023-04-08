const { connect } = require("mongoose");
const {config: {database: {mongo: {mongo_url}}, verbose,debug, state: {mongo_state}}} = require("./../config.js");

if (mongo_state) connect(mongo_url)
  .then(db => {
    //TODO: crear una funcion hello para la database :D
    if (verbose || debug ) console.log(`Database -${db.connection.name}- conected`);
  })
  .catch(err => console.error(err));