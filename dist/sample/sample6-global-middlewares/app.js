"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
require("./BlogController");
require("./CompressionMiddleware");
require("./LoggerMiddleware");
require("./StartTimerMiddleware");
require("./EndTimerMiddleware");
require("./AllErrorsHandler"); // same as: require("./BlogController");
// same as: require("./CompressionMiddleware");
// same as: require("./LoggerMiddleware");
// same as: require("./StartTimerMiddleware");
// same as: require("./EndTimerMiddleware");
// same as: require("./AllErrorsHandler");
var app = index_1.createExpressServer(); // register controller actions in express app
app.listen(3001); // run express app
console.log("Express server is running on port 3001. Open http://localhost:3001/blogs/");
//# sourceMappingURL=app.js.map