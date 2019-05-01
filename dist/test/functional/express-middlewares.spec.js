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
var UseBefore_1 = require("../../src/decorator/UseBefore");
var Middleware_1 = require("../../src/decorator/Middleware");
var UseAfter_1 = require("../../src/decorator/UseAfter");
var NotAcceptableError_1 = require("./../../src/http-error/NotAcceptableError");
var chakram = require("chakram");
var expect = chakram.expect;
describe("express middlewares", function () {
    var useBefore, useAfter, useCustom, useCustomWithError, useGlobalBeforeWithError, useGlobalBefore, useGlobalAfter, useCallOrder, useGlobalCallOrder;
    beforeEach(function () {
        useBefore = false;
        useAfter = undefined;
        useCustom = undefined;
        useCustomWithError = undefined;
        useGlobalBeforeWithError = undefined;
        useGlobalBefore = undefined;
        useGlobalAfter = undefined;
        useCallOrder = undefined;
    });
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var TestGlobalBeforeMidleware = /** @class */ (function () {
            function TestGlobalBeforeMidleware() {
            }
            TestGlobalBeforeMidleware.prototype.use = function (request, response, next) {
                useGlobalBefore = true;
                useGlobalCallOrder = "setFromGlobalBefore";
                next();
            };
            TestGlobalBeforeMidleware = __decorate([
                Middleware_1.Middleware({ type: "before" })
            ], TestGlobalBeforeMidleware);
            return TestGlobalBeforeMidleware;
        }());
        var TestGlobalAfterMidleware = /** @class */ (function () {
            function TestGlobalAfterMidleware() {
            }
            TestGlobalAfterMidleware.prototype.use = function (request, response, next) {
                useGlobalAfter = true;
                useGlobalCallOrder = "setFromGlobalAfter";
                next();
            };
            TestGlobalAfterMidleware = __decorate([
                Middleware_1.Middleware({ type: "after" })
            ], TestGlobalAfterMidleware);
            return TestGlobalAfterMidleware;
        }());
        var TestLoggerMiddleware = /** @class */ (function () {
            function TestLoggerMiddleware() {
            }
            TestLoggerMiddleware.prototype.use = function (request, response, next) {
                useCustom = true;
                next();
            };
            return TestLoggerMiddleware;
        }());
        var TestCustomMiddlewareWhichThrows = /** @class */ (function () {
            function TestCustomMiddlewareWhichThrows() {
            }
            TestCustomMiddlewareWhichThrows.prototype.use = function (request, response, next) {
                throw new NotAcceptableError_1.NotAcceptableError("TestCustomMiddlewareWhichThrows");
            };
            return TestCustomMiddlewareWhichThrows;
        }());
        var ExpressMiddlewareController = /** @class */ (function () {
            function ExpressMiddlewareController() {
            }
            ExpressMiddlewareController.prototype.blogs = function () {
                useGlobalCallOrder = "setFromController";
                return "1234";
            };
            ExpressMiddlewareController.prototype.questions = function () {
                return "1234";
            };
            ExpressMiddlewareController.prototype.users = function () {
                useCallOrder = "setFromController";
                return "1234";
            };
            ExpressMiddlewareController.prototype.photos = function () {
                useCallOrder = "setFromController";
                return "1234";
            };
            ExpressMiddlewareController.prototype.posts = function () {
                useCallOrder = "setFromController";
                return "1234";
            };
            ExpressMiddlewareController.prototype.customMiddlewareWichThrows = function () {
                return "1234";
            };
            __decorate([
                Get_1.Get("/blogs"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressMiddlewareController.prototype, "blogs", null);
            __decorate([
                Get_1.Get("/questions"),
                UseBefore_1.UseBefore(TestLoggerMiddleware),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressMiddlewareController.prototype, "questions", null);
            __decorate([
                Get_1.Get("/users"),
                UseBefore_1.UseBefore(function (request, response, next) {
                    useBefore = true;
                    useCallOrder = "setFromUseBefore";
                    next();
                }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressMiddlewareController.prototype, "users", null);
            __decorate([
                Get_1.Get("/photos"),
                UseAfter_1.UseAfter(function (request, response, next) {
                    useAfter = true;
                    useCallOrder = "setFromUseAfter";
                    next();
                }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressMiddlewareController.prototype, "photos", null);
            __decorate([
                Get_1.Get("/posts"),
                UseBefore_1.UseBefore(function (request, response, next) {
                    useBefore = true;
                    useCallOrder = "setFromUseBefore";
                    next();
                }),
                UseAfter_1.UseAfter(function (request, response, next) {
                    useAfter = true;
                    useCallOrder = "setFromUseAfter";
                    next();
                }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressMiddlewareController.prototype, "posts", null);
            __decorate([
                Get_1.Get("/customMiddlewareWichThrows"),
                UseBefore_1.UseBefore(TestCustomMiddlewareWhichThrows),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressMiddlewareController.prototype, "customMiddlewareWichThrows", null);
            ExpressMiddlewareController = __decorate([
                Controller_1.Controller()
            ], ExpressMiddlewareController);
            return ExpressMiddlewareController;
        }());
    });
    var app;
    before(function (done) { return app = index_1.createExpressServer().listen(3001, done); });
    after(function (done) { return app.close(done); });
    it("should call a global middlewares", function () {
        return chakram
            .get("http://127.0.0.1:3001/blogs")
            .then(function (response) {
            expect(useGlobalBefore).to.be.equal(true);
            expect(useGlobalAfter).to.be.equal(true);
            expect(useGlobalCallOrder).to.be.equal("setFromGlobalAfter");
            expect(response).to.have.status(200);
        });
    });
    it("should use a custom middleware when @UseBefore or @UseAfter is used", function () {
        return chakram
            .get("http://127.0.0.1:3001/questions")
            .then(function (response) {
            expect(useCustom).to.be.equal(true);
            expect(response).to.have.status(200);
        });
    });
    it("should call middleware and call it before controller action when @UseBefore is used", function () {
        return chakram
            .get("http://127.0.0.1:3001/users")
            .then(function (response) {
            expect(useBefore).to.be.equal(true);
            expect(useCallOrder).to.be.equal("setFromController");
            expect(response).to.have.status(200);
        });
    });
    it("should call middleware and call it after controller action when @UseAfter is used", function () {
        return chakram
            .get("http://127.0.0.1:3001/photos")
            .then(function (response) {
            expect(useAfter).to.be.equal(true);
            expect(useCallOrder).to.be.equal("setFromUseAfter");
            expect(response).to.have.status(200);
        });
    });
    it("should call before middleware and call after middleware when @UseAfter and @UseAfter are used", function () {
        return chakram
            .get("http://127.0.0.1:3001/posts")
            .then(function (response) {
            expect(useBefore).to.be.equal(true);
            expect(useAfter).to.be.equal(true);
            expect(useCallOrder).to.be.equal("setFromUseAfter");
            expect(response).to.have.status(200);
        });
    });
    it("should handle errors in custom middlewares", function () {
        return chakram
            .get("http://127.0.0.1:3001/customMiddlewareWichThrows")
            .then(function (response) {
            expect(response).to.have.status(406);
        });
    });
});
//# sourceMappingURL=express-middlewares.spec.js.map