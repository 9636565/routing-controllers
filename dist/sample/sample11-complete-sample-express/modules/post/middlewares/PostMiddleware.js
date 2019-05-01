"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PostMiddleware = /** @class */ (function () {
    function PostMiddleware() {
    }
    PostMiddleware.prototype.use = function (request, response, next) {
        console.log("logging request from post middleware...");
        next();
    };
    return PostMiddleware;
}());
exports.PostMiddleware = PostMiddleware;
//# sourceMappingURL=PostMiddleware.js.map