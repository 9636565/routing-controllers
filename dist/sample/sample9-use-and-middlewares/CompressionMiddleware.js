"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompressionMiddleware = /** @class */ (function () {
    function CompressionMiddleware() {
    }
    CompressionMiddleware.prototype.use = function (request, response, next) {
        console.log("hello compression ...");
        next();
    };
    return CompressionMiddleware;
}());
exports.CompressionMiddleware = CompressionMiddleware;
//# sourceMappingURL=CompressionMiddleware.js.map