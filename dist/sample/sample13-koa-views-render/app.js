"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Koa = require("koa");
var index_1 = require("../../src/index");
require("./BlogController");
var koa = new Koa();
var app = index_1.useKoaServer(koa);
var path = __dirname + "/../../../../sample/sample13-koa-views-render";
var koaViews = require("koa-views");
app.use(koaViews(path, { map: { html: "handlebars" } }));
app.listen(3001); // run koa app
console.log("Koa server is running on port 3001. Open http://localhost:3001/");
//# sourceMappingURL=app.js.map