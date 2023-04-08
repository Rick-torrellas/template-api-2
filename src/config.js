const express = require("express");
const app = express();
const morgan = require("morgan");
const { join } = require("node:path");
const cors = require("cors");
require("dotenv").config();

//TODO: falta password mongo atlas o mongo local tambien.
const NAME = process.env.NAME || "Template";
const NODE_ENV = process.env.NODE_ENV || "development"; // development || production || test
const DEBUG = process.env.DEBUG || false;
const PORT_PROD = process.env.PORT_PROD || 3000;
const PORT_DEV = process.env.PORT_DEV || 4000;
const DOMAIN_PROD = process.env.DOMAIN_PROD || "http://localhost";
const DOMAIN_DEV = process.env.DOMAIN_DEV || "http://localhost";
const VIEWS_PROD = process.env.VIEWS_PROD || join(__dirname + "/views");
const VIEWS_DEV = process.env.VIEWS_DEV || join(__dirname + "/views");
const VIEW_ENGINE_PROD = process.env.VIEW_ENGINE_PROD || "ejs";
const VIEW_ENGINE_DEV = process.env.VIEW_ENGINE_DEV || "ejs";
const STATIC_PROD = process.env.STATIC_PROD || join(__dirname + "/public");
const STATIC_DEV = process.env.STATIC_DEV || join(__dirname + "/public");
const MONGO_NAME_PROD = process.env.DATABASE_NAME_PROD || "default";
const MONGO_NAME_DEV = process.env.DATABASE_NAME_DEV || "default-dev";
const MONGO_URL_PROD = process.env.MONGO_URL_PROD
  ? `${process.env.MONGO_URL_PROD}/${MONGO_NAME_PROD}`
  : `mongodb://127.0.0.1:27017/${MONGO_NAME_PROD}`;
const MONGO_URL_DEV = process.env.MONGO_URL_DEV
  ? `${process.env.MONGO_URL_DEV}/${MONGO_NAME_DEV}`
  : `mongodb://127.0.0.1:27017/${MONGO_NAME_DEV}`;
const BODY_PARSER_PROD = process.env.BODY_PARSER_PROD || "json"; // json || text || raw
const BODY_PARSER_DEV = process.env.BODY_PARSER_DEV || "json"; // json || text || raw
const REFRESH_SECRET_TOKEN_PROD =
  process.env.REFRESH_SECRET_TOKEN_PROD || "core";
const REFRESH_SECRET_TOKEN_DEV = process.env.REFRESH_SECRET_TOKEN_DEV || "core";
const SECRET_TOKEN_PROD = process.env.SECRET_TOKEN_PROD || "core";
const SECRET_TOKEN_DEV = process.env.SECRET_TOKEN_DEV || "core";

const VERBOSE_PROD = process.env.VERBOSE_PROD || false;
const VERBOSE_DEV = process.env.VERBOSE_DEV || true;
const URLENCODED_STATE_PROD = process.env.URLENCODED_STATE_PROD || true;
const URLENCODED_STATE_DEV = process.env.URLENCODED_STATE_DEV || true;
const BODY_PARSER_STATE_PROD = process.env.BODY_PARSER_PROD || true; // json || text || raw
const BODY_PARSER_STATE_DEV = process.env.BODY_PARSER_DEV || true;
const VIEWS_STATE_PROD = process.env.VIEWS_STATE_PROD || true;
const VIEWS_STATE_DEV = process.env.VIEWS_STATE_DEV || true;
const VIEW_ENGINE_STATE_PROD = process.env.VIEW_ENGINE_STATE_PROD || true;
const VIEW_ENGINE_STATE_DEV = process.env.VIEW_ENGINE_STATE_DEV || true;
const STATIC_STATE_PROD = process.env.STATIC_STATE_PROD || true;
const STATIC_STATE_DEV = process.env.STATIC_STATE_DEV || true;
const MONGO_STATE_PROD = process.env.DATABASE_STATE_PROD || true;
const MONGO_STATE_DEV = process.env.DATABASE_STATE_DEV || true;
const TOKEN_STATE_DEV = process.env.TOKEN_STATE_DEV || true;
const TOKEN_STATE_PROD = process.env.TOKEN_STATE_PROD || true;
const MORGAN_STATE_PROD = process.env.MORGAN_STATE_PROD || false;
const MORGAN_STATE_DEV = process.env.MORGAN_STATE_DEV || true;
const CORS_STATE_PROD = process.env.CORS_STATE_PROD || true;
const CORS_STATE_DEV = process.env.CORS_STATE_DEV || true;

app.set("name", NAME);
app.set("node env", NODE_ENV);
app.set("debug", DEBUG);

if (app.get("node env") == "production") {
  app.set("view engine state", VIEW_ENGINE_STATE_PROD);
  app.set("views state", VIEWS_STATE_PROD);
  app.set("static state", STATIC_STATE_PROD);
  app.set("mongo state", MONGO_STATE_PROD);
  app.set("urlencoded state", URLENCODED_STATE_PROD);
  app.set("body parser state", BODY_PARSER_STATE_PROD);
  app.set("token state", TOKEN_STATE_PROD);
  app.set("verbose", VERBOSE_PROD);
  app.set("morgan state", MORGAN_STATE_PROD);
  app.set("cors state", CORS_STATE_PROD);

  app.set("port", PORT_PROD);
  app.set("domain", DOMAIN_PROD);
  app.set("url", `${DOMAIN_PROD}:${PORT_PROD}`);
  if (app.get("token state")) app.set("secret token", SECRET_TOKEN_PROD);
  if (app.get("token state"))
    app.set("refresh secret token", REFRESH_SECRET_TOKEN_PROD);
  if (app.get("view engine state")) app.set("view engine", VIEW_ENGINE_PROD);
  if (app.get("static state")) app.set("static", STATIC_PROD);
  if (app.get("views state")) app.set("views", VIEWS_PROD);
  if (app.get("mongo state")) app.set("mongo url", MONGO_URL_PROD);
  if (app.get("mongo state")) app.set("mongo name", MONGO_NAME_PROD);
  if (app.get("body parser state")) app.set("body parser", BODY_PARSER_PROD);
} else {
  app.set("view engine state", VIEW_ENGINE_STATE_DEV);
  app.set("views state", VIEWS_STATE_DEV);
  app.set("static state", STATIC_STATE_DEV);
  app.set("mongo state", MONGO_STATE_DEV);
  app.set("body parser state", BODY_PARSER_STATE_DEV);
  app.set("token state", TOKEN_STATE_DEV);
  app.set("urlencoded state", URLENCODED_STATE_DEV);
  app.set("verbose", VERBOSE_DEV);
  app.set("morgan state", MORGAN_STATE_DEV);
  app.set("cors state", CORS_STATE_DEV);

  app.set("port", PORT_DEV);
  app.set("domain", DOMAIN_PROD);
  app.set("url", `${DOMAIN_DEV}:${PORT_DEV}`);
  if (app.get("token state")) app.set("secret token", SECRET_TOKEN_DEV);
  if (app.get("token state"))
    app.set("refresh secret token", REFRESH_SECRET_TOKEN_DEV);
  if (app.get("static state")) app.set("static", STATIC_DEV);
  if (app.get("view engine state")) app.set("view engine", VIEW_ENGINE_DEV);
  if (app.get("views state")) app.set("views", VIEWS_DEV);
  if (app.get("mongo state")) app.set("mongo url", MONGO_URL_DEV);
  if (app.get("mongo state")) app.set("mongo name", MONGO_NAME_DEV);
  if (app.get("body parser state")) app.set("body parser", BODY_PARSER_DEV);
}
//TODO: creo que no se como implementar los views
if (app.get("cors state")) app.use(cors());
if (app.get("static state")) app.use(express.static(app.get("static")));
if (app.get("body parser state")) {
  if (app.get("body parser") == "json") app.use(express.json());
  if (app.get("body parser") == "text") app.use(express.text());
  if (app.get("body parser") == "raw") app.use(express.raw());
}
if (app.get("urlencoded state"))
  app.use(express.urlencoded({ extended: true }));

if (
  (app.get("verbose") || app.get("morgan state")) &&
  app.get("node env") !== "test"
)
  app.use(morgan("dev"));

const config = {
  name: app.get("name"),
  node_env: app.get("node env"),
  debug: app.get("debug"),
  port: app.get("port"),
  domain: app.get("domain"),
  url: app.get("url"),
  views: app.get("views"),
  view_engine: app.get("view engine"),
  static_: app.get("static_"),
  body_parser: app.get("body parser"),
  verbose: app.get("verbose"),
  auth: {
    secret_token: app.get("secret token"),
    refresh_secret_token: app.get("refresh secret token"),
  },
  database: {
    mongo: {
      mongo_name: app.get("mongo name"),
      mongo_url: app.get("mongo url"),
    },
  },
  state: {
    urlencoded_state: app.get("urlencoded state"),
    body_parser_state: app.get("body parser state"),
    views_state: app.get("views state"),
    view_engine_state: app.get("view engine state"),
    static_state: app.get("static state"),
    mongo_state: app.get("mongo state"),
    token_state: app.get("token state"),
    morgan_state: app.get("morgan state"),
    cors_state: app.get("cors state"),
  },
};

module.exports = {
  app,
  config,
};
