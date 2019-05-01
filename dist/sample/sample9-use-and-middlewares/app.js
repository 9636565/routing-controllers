"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
require("./BlogController"); // same as: require("./BlogController");
var app = index_1.createExpressServer(); // register controller actions in express app
app.listen(3001); // run express app
console.log("Express server is running on port 3001. Open http://localhost:3001/blogs/");
//# sourceMappingURL=app.js.map