"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AllControllerActionsMiddleware = /** @class */ (function () {
    function AllControllerActionsMiddleware() {
    }
    AllControllerActionsMiddleware.prototype.use = function (request, response, next) {
        console.log("controller action run");
        next();
    };
    return AllControllerActionsMiddleware;
}());
exports.AllControllerActionsMiddleware = AllControllerActionsMiddleware;
//# sourceMappingURL=AllControllerActionsMiddleware.js.map