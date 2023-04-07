const { connect } = require("mongoose");
const {showConfig: {mongo_url, verbose, debug}} = require("./../services");

connect(mongo_url)
  .then(db => {
    if (verbose || debug ) console.log(`Database -${db.connection.name}- conected`);
  })
  .catch(err => console.error(err));