const express = require("express");
const app = express();
const morgan = require('morgan')
const {join} = require("node:path");
const cors = require('cors')
require('dotenv').config();

//TODO: crear una variable para habilitar y desabilitar el uso de views,view_engine,static,database,json,urlencoded
//TODO: definir dos tipos de bases de datos, una que se use en produccion y otra para debug test y dev.
const NAME = process.env.NAME || "Template";
const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || "http://localhost";
const URL = `${DOMAIN}:${PORT}`;
const NODE_ENV = process.env.NODE_ENV || "development"; // development || production || debug || test
const VIEWS = process.env.VIEWS || join(__dirname + "/views");
const VIEW_ENGINE = process.env.VIEW_ENGINE || "ejs";
const STATIC = process.env.STATIC || join(__dirname + "/public");
const DATABASE_NAME_PROD = process.env.DATABASE_NAME_PROD || "default";
const DATABASE_NAME_DEV = process.env.DATABASE_NAME_DEV || "default-dev";
const MONGO_URL_PROD = process.env.MONGO_URL_PROD ? `${process.env.MONGO_URL_PROD}/${DATABASE_NAME_PROD}` : `mongodb://127.0.0.1:27017/${DATABASE_NAME_PROD}`;
const MONGO_URL_DEV = process.env.MONGO_URL_DEV ? `${process.env.MONGO_URL_DEV}/${DATABASE_NAME_DEV}` : `mongodb://127.0.0.1:27017/${DATABASE_NAME_DEV}`;

app.set('name', NAME);
app.set('env', NODE_ENV);
app.set('port', PORT);
app.set('url', URL);
if (NODE_ENV == "production") {
    app.set('mongo url', MONGO_URL_PROD);
    app.set('database name', DATABASE_NAME_PROD);
} else {
    app.set('mongo url', MONGO_URL_DEV);
    app.set('database name', DATABASE_NAME_DEV);
}

app.set('views', VIEWS);
app.set('view engine', VIEW_ENGINE);
app.set('static', STATIC)

app.use(cors());
app.use(express.static(app.get('static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
if (NODE_ENV == "development") {
    app.use(morgan('dev'));
}

module.exports = app;