"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var index_1 = require("../../src/index");
require("./BlogController"); // this can be require("./BlogController") actually
var app = express(); // create express server
index_1.useExpressServer(app); // register controllers routes in our express application
// controllerRunner.isLogErrorsEnabled = true; // enable error logging of exception error into console
// controllerRunner.isStackTraceEnabled = true; // enable adding of stack trace to response message
app.listen(3001); // run express app
console.log("Express server is running on port 3001. Open http://localhost:3001/blogs/");
//# sourceMappingURL=app.js.map