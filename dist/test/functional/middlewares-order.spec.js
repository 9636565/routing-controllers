"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var Middleware_1 = require("../../src/decorator/Middleware");
var chakram = require("chakram");
var expect = chakram.expect;
describe("order of middlewares", function () {
    describe("loaded direct from array", function () {
        var middlewaresOrder;
        beforeEach(function () {
            middlewaresOrder = [];
        });
        var app;
        before(function (done) {
            // reset metadata args storage
            index_1.getMetadataArgsStorage().reset();
            var ThirdAfterMiddleware = /** @class */ (function () {
                function ThirdAfterMiddleware() {
                }
                ThirdAfterMiddleware.prototype.use = function (request, response, next) {
                    middlewaresOrder.push(3);
                    next();
                };
                ThirdAfterMiddleware = __decorate([
                    Middleware_1.Middleware({ type: "after" })
                ], ThirdAfterMiddleware);
                return ThirdAfterMiddleware;
            }());
            var FirstAfterMiddleware = /** @class */ (function () {
                function FirstAfterMiddleware() {
                }
                FirstAfterMiddleware.prototype.use = function (request, response, next) {
                    middlewaresOrder.push(1);
                    next();
                };
                FirstAfterMiddleware = __decorate([
                    Middleware_1.Middleware({ type: "after" })
                ], FirstAfterMiddleware);
                return FirstAfterMiddleware;
            }());
            var SecondAfterMiddleware = /** @class */ (function () {
                function SecondAfterMiddleware() {
                }
                SecondAfterMiddleware.prototype.use = function (request, response, next) {
                    middlewaresOrder.push(2);
                    next();
                };
                SecondAfterMiddleware = __decorate([
                    Middleware_1.Middleware({ type: "after" })
                ], SecondAfterMiddleware);
                return SecondAfterMiddleware;
            }());
            var ExpressMiddlewareController = /** @class */ (function () {
                function ExpressMiddlewareController() {
                }
                ExpressMiddlewareController.prototype.test = function () {
                    return "OK";
                };
                __decorate([
                    Get_1.Get("/test"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], ExpressMiddlewareController.prototype, "test", null);
                ExpressMiddlewareController = __decorate([
                    Controller_1.Controller()
                ], ExpressMiddlewareController);
                return ExpressMiddlewareController;
            }());
            app = index_1.createExpressServer({
                middlewares: [FirstAfterMiddleware, SecondAfterMiddleware, ThirdAfterMiddleware]
            }).listen(3001, done);
        });
        after(function (done) { return app.close(done); });
        it("should call middlewares in order defined by items order", function () {
            return chakram
                .get("http://127.0.0.1:3001/test")
                .then(function (response) {
                expect(response).to.have.status(200);
                expect(middlewaresOrder[0]).to.equal(1);
                expect(middlewaresOrder[1]).to.equal(2);
                expect(middlewaresOrder[2]).to.equal(3);
            });
        });
    });
    describe("specified by priority option", function () {
        var middlewaresOrder;
        beforeEach(function () {
            middlewaresOrder = [];
        });
        var app;
        before(function (done) {
            // reset metadata args storage
            index_1.getMetadataArgsStorage().reset();
            var ThirdAfterMiddleware = /** @class */ (function () {
                function ThirdAfterMiddleware() {
                }
                ThirdAfterMiddleware.prototype.use = function (request, response, next) {
                    middlewaresOrder.push(3);
                    next();
                };
                ThirdAfterMiddleware = __decorate([
                    Middleware_1.Middleware({ type: "after", priority: 0 })
                ], ThirdAfterMiddleware);
                return ThirdAfterMiddleware;
            }());
            var FirstAfterMiddleware = /** @class */ (function () {
                function FirstAfterMiddleware() {
                }
                FirstAfterMiddleware.prototype.use = function (request, response, next) {
                    middlewaresOrder.push(1);
                    next();
                };
                FirstAfterMiddleware = __decorate([
                    Middleware_1.Middleware({ type: "after", priority: 8 })
                ], FirstAfterMiddleware);
                return FirstAfterMiddleware;
            }());
            var SecondAfterMiddleware = /** @class */ (function () {
                function SecondAfterMiddleware() {
                }
                SecondAfterMiddleware.prototype.use = function (request, response, next) {
                    middlewaresOrder.push(2);
                    next();
                };
                SecondAfterMiddleware = __decorate([
                    Middleware_1.Middleware({ type: "after", priority: 4 })
                ], SecondAfterMiddleware);
                return SecondAfterMiddleware;
            }());
            var ExpressMiddlewareController = /** @class */ (function () {
                function ExpressMiddlewareController() {
                }
                ExpressMiddlewareController.prototype.test = function () {
                    return "OK";
                };
                __decorate([
                    Get_1.Get("/test"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], ExpressMiddlewareController.prototype, "test", null);
                ExpressMiddlewareController = __decorate([
                    Controller_1.Controller()
                ], ExpressMiddlewareController);
                return ExpressMiddlewareController;
            }());
            app = index_1.createExpressServer({
                middlewares: [SecondAfterMiddleware, ThirdAfterMiddleware, FirstAfterMiddleware]
            }).listen(3001, done);
        });
        after(function (done) { return app.close(done); });
        it("should call middlewares in order defined by priority parameter of decorator", function () {
            return chakram
                .get("http://127.0.0.1:3001/test")
                .then(function (response) {
                expect(response).to.have.status(200);
                expect(middlewaresOrder[0]).to.equal(1);
                expect(middlewaresOrder[1]).to.equal(2);
                expect(middlewaresOrder[2]).to.equal(3);
            });
        });
    });
});
//# sourceMappingURL=middlewares-order.spec.js.map