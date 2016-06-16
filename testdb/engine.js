/**
 * Created by paki on 2016/3/11.
 */
var fs = require('fs'),db,engine;

// load config
var cfg = JSON.parse(fs.readFileSync("./config.json"));

// load requestd engine and define engine-agnostic getDB function
if (cfg.app.engine=="mongodb") {
    engine = require("mongodb");
    module.exports.getDB = function () {
        if (!db) db = new engine.Db(cfg.mongo.db,
            new engine.Server(cfg.mongo.host, cfg.mongo.port, cfg.mongo.opts),
            {native_parser: false, safe:true});
        return db;
    }
} else {
    engine = require("tingodb")({});
    module.exports.getDB = function () {
        if (!db) db = new engine.Db(cfg.tingo.path, {});
        return db;
    }
}
// Depending on engine, this can be a different class
module.exports.ObjectID = engine.ObjectID;