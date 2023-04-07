const app = require("./../config.js");


function hello(name,port,url,mode) {
    console.log(`Server -${name}- mode: -${mode}- | on port ${port} - ${url}`);
}

function helloDebug () {
    return "Debug activated";
}

const showConfig = () => {
    const name = app.get('name');
    const node_env = app.get('node env');
    const debug = app.get("debug");
    const domain = app.get('domain');
    const port = app.get('port');
    const url = app.get('url');
    const views = app.get('views');
    const view_engine = app.get('view engine');
    const static_ = app.get('static');
    const mongo_name = app.get('mongo name');
    const mongo_url = app.get("mongo url");
    const body_parser = app.get("body parser");
    const verbose = app.get("verbose");
    const secret_token = app.get("secret token");
    const refresh_secret_token = app.get("refresh secret token");

    const urlencoded_state = app.get("urlencoded state");
    const body_parser_state = app.get("body parser state");
    const views_state = app.get("views state");
    const view_engine_state = app.get("view engine state");
    const static_state = app.get("static state");
    const mongo_state = app.get("mongo state");
    const token_state = app.get("token state");
    const morgan_state = app.get("morgan state");
    const cors_state = app.get("cors state");
    return {
        name,
        node_env,
        debug,
        port,
        domain,
        url,
        views,
        view_engine,
        static_,
        body_parser,
        verbose,
        auth: {
            secret_token,
            refresh_secret_token,
        },
        database: {
            mongo: {
                mongo_name,
                mongo_url
            }
        },
        state: {
            urlencoded_state,
            body_parser_state,
            views_state,
            view_engine_state,
            static_state,
            mongo_state,
            token_state,
            morgan_state,
            cors_state
        }
    }
}   

module.exports = {
    hello,
    showConfig,
    helloDebug
}