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
var test_utils_1 = require("./test-utils");
var Interceptor_1 = require("../../src/decorator/Interceptor");
var UseInterceptor_1 = require("../../src/decorator/UseInterceptor");
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var chakram = require("chakram");
var expect = chakram.expect;
describe("interceptor", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var NumbersInterceptor = /** @class */ (function () {
            function NumbersInterceptor() {
            }
            NumbersInterceptor.prototype.intercept = function (action, result) {
                return result.replace(/[0-9]/gi, "");
            };
            NumbersInterceptor = __decorate([
                Interceptor_1.Interceptor()
            ], NumbersInterceptor);
            return NumbersInterceptor;
        }());
        var ByeWordInterceptor = /** @class */ (function () {
            function ByeWordInterceptor() {
            }
            ByeWordInterceptor.prototype.intercept = function (action, result) {
                return result.replace(/bye/gi, "hello");
            };
            return ByeWordInterceptor;
        }());
        var BadWordsInterceptor = /** @class */ (function () {
            function BadWordsInterceptor() {
            }
            BadWordsInterceptor.prototype.intercept = function (action, result) {
                return result.replace(/damn/gi, "***");
            };
            return BadWordsInterceptor;
        }());
        var AsyncInterceptor = /** @class */ (function () {
            function AsyncInterceptor() {
            }
            AsyncInterceptor.prototype.intercept = function (action, result) {
                return new Promise(function (ok) {
                    setTimeout(function () {
                        ok(result.replace(/hello/gi, "bye"));
                    }, 1000);
                });
            };
            return AsyncInterceptor;
        }());
        var HandledController = /** @class */ (function () {
            function HandledController() {
            }
            HandledController.prototype.getUsers = function () {
                return "<html><body>damn hello</body></html>";
            };
            HandledController.prototype.posts = function () {
                return "<html><body>this post contains damn bad words</body></html>";
            };
            HandledController.prototype.questions = function () {
                return "<html><body>bye world</body></html>";
            };
            HandledController.prototype.files = function () {
                return "<html><body>hello1234567890 world</body></html>";
            };
            HandledController.prototype.photos = function () {
                return "<html><body>hello world</body></html>";
            };
            __decorate([
                Get_1.Get("/users"),
                UseInterceptor_1.UseInterceptor(function (action, result) {
                    return result.replace(/hello/gi, "hello world");
                }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", Object)
            ], HandledController.prototype, "getUsers", null);
            __decorate([
                Get_1.Get("/posts"),
                UseInterceptor_1.UseInterceptor(BadWordsInterceptor),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", Object)
            ], HandledController.prototype, "posts", null);
            __decorate([
                Get_1.Get("/questions"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", Object)
            ], HandledController.prototype, "questions", null);
            __decorate([
                Get_1.Get("/files"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", Object)
            ], HandledController.prototype, "files", null);
            __decorate([
                Get_1.Get("/photos"),
                UseInterceptor_1.UseInterceptor(AsyncInterceptor),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", Object)
            ], HandledController.prototype, "photos", null);
            HandledController = __decorate([
                Controller_1.Controller(),
                UseInterceptor_1.UseInterceptor(ByeWordInterceptor)
            ], HandledController);
            return HandledController;
        }());
    });
    var expressApp, koaApp;
    before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
    after(function (done) { return expressApp.close(done); });
    before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
    after(function (done) { return koaApp.close(done); });
    describe("custom interceptor function should replace returned content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>damn hello world</body></html>");
        });
    });
    describe("custom interceptor class should replace returned content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>this post contains *** bad words</body></html>");
        });
    });
    describe("custom interceptor class used on the whole controller should replace returned content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "questions", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>hello world</body></html>");
        });
    });
    describe("global interceptor class should replace returned content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "files", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>hello world</body></html>");
        });
    });
    describe("interceptors should support promises", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "photos", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>bye world</body></html>");
        });
    });
});
//# sourceMappingURL=interceptors.spec.js.map