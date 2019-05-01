"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = require("express-session");
var convert = require("koa-convert");
var KoaSession = require("koa-session");
var SessionMiddleware = /** @class */ (function () {
    function SessionMiddleware() {
        this.expSession = session({
            secret: "19majkel94_helps_pleerock",
            resave: false,
            saveUninitialized: true,
        });
    }
    SessionMiddleware.prototype.use = function (requestOrContext, responseOrNext, next) {
        if (next) {
            return this.expSession(requestOrContext, responseOrNext, next);
        }
        else {
            if (!this.koaSession) {
                this.koaSession = convert(KoaSession(requestOrContext.app));
            }
            return this.koaSession(requestOrContext, responseOrNext);
        }
    };
    return SessionMiddleware;
}());
exports.SessionMiddleware = SessionMiddleware;
//# sourceMappingURL=SessionMiddleware.js.map