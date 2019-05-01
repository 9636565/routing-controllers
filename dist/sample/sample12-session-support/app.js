"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
var express = require("express");
var session = require("express-session");
require("./UserController");
var app = express();
app.use(session()); // use session middleware
index_1.useExpressServer(app); // register controllers routes in our express application
app.listen(3001); // run express app
console.log("Express server is running on port 3001. Open http://localhost:3001/users/");
//# sourceMappingURL=app.js.map