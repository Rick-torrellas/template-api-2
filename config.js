const express = require("express");
const app = express();
const morgan = require('morgan')
const process = require("node:process");
const cors = require('cors')
require('dotenv').config();

const NAME = process.env.NAME || "Template";
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || "http://localhost";
const URL = `${DOMAIN}:${PORT}`;
const ENV = process.env.ENV || "dev";
const VIEWS = process.env.VIEWS || "views";
const VIEW_ENGINE = process.env.VIEW_ENGINE || "ejs";
const STATIC = process.env.STATIC || "public";

app.set('name', NAME);
app.set('env', ENV);
app.set('port', PORT);
app.set('url', URL);

app.set('views', VIEWS);
app.set('view engine', VIEW_ENGINE);
app.set('static', STATIC)

app.use(cors());
app.use(express.static(app.get('static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
if (ENV == "dev") {
    app.use(morgan('dev'));
}


module.exports = app;