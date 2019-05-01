"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
// base directory. we use it because file in "required" in another module
var baseDir = __dirname;
// koa is used just as an example here. you can also use express
// to do it simply use createExpressServer instead of createKoaServer
var app = index_1.createExpressServer({
    controllers: [baseDir + "/modules/**/controllers/*{.js,.ts}"],
    middlewares: [baseDir + "/modules/**/middlewares/*{.js,.ts}"]
});
app.listen(3001);
console.log("Koa server is running on port 3001. Open http://localhost:3001/blogs/");
//# sourceMappingURL=app.js.map