const { connect } = require("mongoose");
const app = require("./../config");

const url = app.get("mongo url");
const env = app.get("env");

if (env == "production" || env == "test") {
    connect(url)
    .catch(err => console.log(err));
} else {
  connect(url)
  .then(db => console.log(`Database -${db.connection.name}- conected`))
  .catch(err => console.log(err));
}