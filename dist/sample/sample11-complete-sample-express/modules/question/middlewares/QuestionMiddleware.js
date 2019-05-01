"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionMiddleware = /** @class */ (function () {
    function QuestionMiddleware() {
    }
    QuestionMiddleware.prototype.use = function (request, response, next) {
        console.log("logging request from question middleware...");
        next();
    };
    return QuestionMiddleware;
}());
exports.QuestionMiddleware = QuestionMiddleware;
//# sourceMappingURL=QuestionMiddleware.js.map