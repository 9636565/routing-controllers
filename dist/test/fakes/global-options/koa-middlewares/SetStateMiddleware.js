"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../User");
var SetStateMiddleware = /** @class */ (function () {
    function SetStateMiddleware() {
    }
    SetStateMiddleware.prototype.use = function (context, next) {
        var user = new User_1.User();
        user.username = "pleerock";
        user.location = "Dushanbe, Tajikistan";
        user.twitter = "https://twitter.com/pleerock";
        context.state = user;
        return next();
    };
    return SetStateMiddleware;
}());
exports.SetStateMiddleware = SetStateMiddleware;
//# sourceMappingURL=SetStateMiddleware.js.map