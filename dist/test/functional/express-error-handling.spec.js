"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var JsonController_1 = require("../../src/decorator/JsonController");
var index_1 = require("../../src/index");
var Get_1 = require("../../src/decorator/Get");
var Middleware_1 = require("../../src/decorator/Middleware");
var UseAfter_1 = require("../../src/decorator/UseAfter");
var NotFoundError_1 = require("../../src/http-error/NotFoundError");
var HttpError_1 = require("../../src/http-error/HttpError");
var chakram = require("chakram");
var expect = chakram.expect;
describe("express error handling", function () {
    var errorHandlerCalled, errorHandledSpecifically;
    beforeEach(function () {
        errorHandlerCalled = undefined;
        errorHandledSpecifically = undefined;
    });
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var AllErrorsHandler = /** @class */ (function () {
            function AllErrorsHandler() {
            }
            AllErrorsHandler.prototype.error = function (error, request, response, next) {
                errorHandlerCalled = true;
                // ERROR HANDLED GLOBALLY
                next(error);
            };
            AllErrorsHandler = __decorate([
                Middleware_1.Middleware({ type: "after" })
            ], AllErrorsHandler);
            return AllErrorsHandler;
        }());
        var SpecificErrorHandler = /** @class */ (function () {
            function SpecificErrorHandler() {
            }
            SpecificErrorHandler.prototype.error = function (error, request, response, next) {
                errorHandledSpecifically = true;
                // ERROR HANDLED SPECIFICALLY
                next(error);
            };
            return SpecificErrorHandler;
        }());
        var SoftErrorHandler = /** @class */ (function () {
            function SoftErrorHandler() {
            }
            SoftErrorHandler.prototype.error = function (error, request, response, next) {
                // ERROR WAS IGNORED
                next();
            };
            return SoftErrorHandler;
        }());
        var ToJsonError = /** @class */ (function (_super) {
            __extends(ToJsonError, _super);
            function ToJsonError(httpCode, publicMsg, privateMsg) {
                var _this = _super.call(this, httpCode) || this;
                Object.setPrototypeOf(_this, ToJsonError.prototype);
                _this.publicData = publicMsg || "public";
                _this.secretData = privateMsg || "secret";
                return _this;
            }
            ToJsonError.prototype.toJSON = function () {
                return {
                    status: this.httpCode,
                    publicData: this.publicData + " (" + this.httpCode + ")"
                };
            };
            return ToJsonError;
        }(HttpError_1.HttpError));
        var ExpressErrorHandlerController = /** @class */ (function () {
            function ExpressErrorHandlerController() {
            }
            ExpressErrorHandlerController.prototype.blogs = function () {
                return {
                    id: 1,
                    title: "About me"
                };
            };
            ExpressErrorHandlerController.prototype.posts = function () {
                throw new Error("System error, cannot retrieve posts");
            };
            ExpressErrorHandlerController.prototype.videos = function () {
                throw new NotFoundError_1.NotFoundError("Videos were not found.");
            };
            ExpressErrorHandlerController.prototype.questions = function () {
                throw new Error("Something is wrong... Cannot load questions");
            };
            ExpressErrorHandlerController.prototype.files = function () {
                throw new Error("Something is wrong... Cannot load files");
            };
            /*@UseAfter(function (error: any, request: any, response: any, next: Function) {
                useAfter = true;
                useCallOrder = "setFromUseAfter";
                next();
            })*/
            ExpressErrorHandlerController.prototype.photos = function () {
                return "1234";
            };
            ExpressErrorHandlerController.prototype.stories = function () {
                throw new ToJsonError(503, "sorry, try it again later", "impatient user");
            };
            __decorate([
                Get_1.Get("/blogs"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "blogs", null);
            __decorate([
                Get_1.Get("/posts"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "posts", null);
            __decorate([
                Get_1.Get("/videos"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "videos", null);
            __decorate([
                Get_1.Get("/questions"),
                UseAfter_1.UseAfter(SpecificErrorHandler),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "questions", null);
            __decorate([
                Get_1.Get("/files"),
                UseAfter_1.UseAfter(SoftErrorHandler),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "files", null);
            __decorate([
                Get_1.Get("/photos")
                /*@UseAfter(function (error: any, request: any, response: any, next: Function) {
                    useAfter = true;
                    useCallOrder = "setFromUseAfter";
                    next();
                })*/
                ,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "photos", null);
            __decorate([
                Get_1.Get("/stories"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "stories", null);
            ExpressErrorHandlerController = __decorate([
                JsonController_1.JsonController()
            ], ExpressErrorHandlerController);
            return ExpressErrorHandlerController;
        }());
    });
    var app;
    before(function (done) { return app = index_1.createExpressServer().listen(3001, done); });
    after(function (done) { return app.close(done); });
    it("should not call global error handler middleware if there was no errors", function () {
        return chakram
            .get("http://127.0.0.1:3001/blogs")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.empty;
            expect(errorHandledSpecifically).to.be.empty;
            expect(response).to.have.status(200);
        });
    });
    it("should call global error handler middleware", function () {
        return chakram
            .get("http://127.0.0.1:3001/posts")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.true;
            expect(errorHandledSpecifically).to.be.empty;
            expect(response).to.have.status(500);
        });
    });
    it("should call global error handler middleware", function () {
        return chakram
            .get("http://127.0.0.1:3001/videos")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.true;
            expect(errorHandledSpecifically).to.be.empty;
            expect(response).to.have.status(404);
        });
    });
    it("should call error handler middleware if used", function () {
        return chakram
            .get("http://127.0.0.1:3001/questions")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.true;
            expect(errorHandledSpecifically).to.be.true;
            expect(response).to.have.status(500);
        });
    });
    it("should not execute next middleware if soft error handled specifically and stopped error bubbling", function () {
        return chakram
            .get("http://127.0.0.1:3001/files")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.empty;
            expect(errorHandledSpecifically).to.be.empty;
            expect(response).to.have.status(500);
        });
    });
    it("should process JsonErrors by their toJSON method if it exists", function () {
        return chakram
            .get("http://127.0.0.1:3001/stories")
            .then(function (response) {
            expect(response).to.have.status(503);
            expect(response.body).to.have.property("status").and.equals(503);
            expect(response.body).to.have.property("publicData").and.equals("sorry, try it again later (503)");
            expect(response.body).to.not.have.property("secretData");
        });
    });
});
//# sourceMappingURL=express-error-handling.spec.js.map