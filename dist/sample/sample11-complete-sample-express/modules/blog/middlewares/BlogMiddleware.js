"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlogMiddleware = /** @class */ (function () {
    function BlogMiddleware() {
    }
    BlogMiddleware.prototype.use = function (request, response, next) {
        console.log("logging request from blog middleware...");
        next("ERROR IN BLOG MIDDLEWARE");
        // console.log("extra logging request from blog middleware...");
    };
    return BlogMiddleware;
}());
exports.BlogMiddleware = BlogMiddleware;
//# sourceMappingURL=BlogMiddleware.js.map