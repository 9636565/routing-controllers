"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
var QuestionController_1 = require("./QuestionController");
index_1.createExpressServer({
    controllers: [QuestionController_1.QuestionController]
}).listen(3001);
console.log("Express server is running on port 3001. Open http://localhost:3001/questions/");
//# sourceMappingURL=app.js.map