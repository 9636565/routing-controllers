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
var JsonController_1 = require("../../src/decorator/JsonController");
var Get_1 = require("../../src/decorator/Get");
var index_1 = require("../../src/index");
var NotFoundError_1 = require("../../src/http-error/NotFoundError");
var Middleware_1 = require("../../src/decorator/Middleware");
var chakram = require("chakram");
var expect = chakram.expect;
describe("custom express error handling", function () {
    var errorHandlerCalled;
    beforeEach(function () {
        errorHandlerCalled = undefined;
    });
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var CustomErrorHandler = /** @class */ (function () {
            function CustomErrorHandler() {
            }
            CustomErrorHandler.prototype.error = function (error, req, res, next) {
                errorHandlerCalled = true;
                res.status(error.httpCode).send(error.message);
            };
            CustomErrorHandler = __decorate([
                Middleware_1.Middleware({ type: "after" })
            ], CustomErrorHandler);
            return CustomErrorHandler;
        }());
        var ExpressErrorHandlerController = /** @class */ (function () {
            function ExpressErrorHandlerController() {
            }
            ExpressErrorHandlerController.prototype.blogs = function () {
                return {
                    id: 1,
                    title: "About me"
                };
            };
            ExpressErrorHandlerController.prototype.videos = function () {
                throw new NotFoundError_1.NotFoundError("Videos were not found.");
            };
            __decorate([
                Get_1.Get("/blogs"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "blogs", null);
            __decorate([
                Get_1.Get("/videos"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "videos", null);
            ExpressErrorHandlerController = __decorate([
                JsonController_1.JsonController()
            ], ExpressErrorHandlerController);
            return ExpressErrorHandlerController;
        }());
    });
    var app;
    before(function (done) { return app = index_1.createExpressServer({ defaultErrorHandler: false }).listen(3001, done); });
    after(function (done) { return app.close(done); });
    it("should not call global error handler middleware if there was no errors", function () {
        return chakram
            .get("http://127.0.0.1:3001/blogs")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.empty;
            expect(response).to.have.status(200);
        });
    });
    it("should call global error handler middleware", function () {
        return chakram
            .get("http://127.0.0.1:3001/videos")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.true;
            expect(response).to.have.status(404);
        });
    });
    it("should be able to send response", function () {
        return chakram
            .get("http://127.0.0.1:3001/videos")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.true;
            expect(response).to.have.status(404);
            expect(response.body).to.equals("Videos were not found.");
        });
    });
});
//# sourceMappingURL=express-custom-error-handling.spec.js.map