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
var chakram = require("chakram");
var expect = chakram.expect;
describe("custom express global before middleware error handling", function () {
    var CustomError = /** @class */ (function (_super) {
        __extends(CustomError, _super);
        function CustomError() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = "CustomError";
            _this.message = "custom error message!";
            return _this;
        }
        return CustomError;
    }(Error));
    var errorHandlerCalled;
    var errorHandlerName;
    beforeEach(function () {
        errorHandlerCalled = undefined;
        errorHandlerName = undefined;
    });
    before(function () {
        var GlobalBeforeMiddleware = /** @class */ (function () {
            function GlobalBeforeMiddleware() {
            }
            GlobalBeforeMiddleware.prototype.use = function (request, response, next) {
                throw new CustomError();
            };
            GlobalBeforeMiddleware = __decorate([
                Middleware_1.Middleware({ type: "before" })
            ], GlobalBeforeMiddleware);
            return GlobalBeforeMiddleware;
        }());
        var CustomErrorHandler = /** @class */ (function () {
            function CustomErrorHandler() {
            }
            CustomErrorHandler.prototype.error = function (error, req, res, next) {
                errorHandlerCalled = true;
                errorHandlerName = error.name;
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
            ExpressErrorHandlerController.prototype.answers = function () {
                return {
                    id: 1,
                    title: "My answer"
                };
            };
            __decorate([
                Get_1.Get("/answers"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressErrorHandlerController.prototype, "answers", null);
            ExpressErrorHandlerController = __decorate([
                JsonController_1.JsonController()
            ], ExpressErrorHandlerController);
            return ExpressErrorHandlerController;
        }());
    });
    var app;
    before(function (done) { return app = index_1.createExpressServer({ defaultErrorHandler: false }).listen(3001, done); });
    after(function (done) { return app.close(done); });
    it("should call global error handler middleware with CustomError", function () {
        return chakram
            .get("http://127.0.0.1:3001/answers")
            .then(function (response) {
            expect(errorHandlerCalled).to.be.true;
            expect(errorHandlerName).to.equals("CustomError");
            expect(response).to.have.status(500);
        });
    });
});
//# sourceMappingURL=express-global-before-error-handling.spec.js.map