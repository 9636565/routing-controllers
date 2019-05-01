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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var Param_1 = require("../../src/decorator/Param");
var Post_1 = require("../../src/decorator/Post");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var HttpCode_1 = require("../../src/decorator/HttpCode");
var ContentType_1 = require("../../src/decorator/ContentType");
var Header_1 = require("../../src/decorator/Header");
var Redirect_1 = require("../../src/decorator/Redirect");
var Location_1 = require("../../src/decorator/Location");
var OnUndefined_1 = require("../../src/decorator/OnUndefined");
var HttpError_1 = require("../../src/http-error/HttpError");
var JsonController_1 = require("../../src/decorator/JsonController");
var chakram = require("chakram");
var expect = chakram.expect;
describe("other controller decorators", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var QuestionNotFoundError = /** @class */ (function (_super) {
            __extends(QuestionNotFoundError, _super);
            function QuestionNotFoundError(action) {
                var _this = _super.call(this, 404, "Question was not found!") || this;
                Object.setPrototypeOf(_this, QuestionNotFoundError.prototype);
                return _this;
            }
            return QuestionNotFoundError;
        }(HttpError_1.HttpError));
        var OtherDectoratorsController = /** @class */ (function () {
            function OtherDectoratorsController() {
            }
            OtherDectoratorsController.prototype.getUsers = function () {
                return "<html><body>User has been created</body></html>";
            };
            OtherDectoratorsController.prototype.getAdmin = function () {
                return "<html><body>Access is denied</body></html>";
            };
            OtherDectoratorsController.prototype.getPost = function (id) {
                return new Promise(function (ok, fail) {
                    if (id === 1) {
                        ok("Post");
                    }
                    else if (id === 2) {
                        ok("");
                    }
                    else if (id === 3) {
                        ok(null);
                    }
                    else {
                        ok(undefined);
                    }
                });
            };
            OtherDectoratorsController.prototype.getPhoto = function (id) {
                if (id === 4) {
                    return undefined;
                }
                return new Promise(function (ok, fail) {
                    if (id === 1) {
                        ok("Photo");
                    }
                    else if (id === 2) {
                        ok("");
                    }
                    else if (id === 3) {
                        ok(null);
                    }
                    else {
                        ok(undefined);
                    }
                });
            };
            OtherDectoratorsController.prototype.getHomepage = function () {
                return "<html><body>Hello world</body></html>";
            };
            OtherDectoratorsController.prototype.getTextpage = function () {
                return "Hello text";
            };
            OtherDectoratorsController.prototype.getUserdash = function () {
                return "<html><body>Hello, User</body></html>";
            };
            OtherDectoratorsController.prototype.getToGithub = function () {
                return "<html><body>Hello, github</body></html>";
            };
            OtherDectoratorsController.prototype.goToGithub = function () {
                return "<html><body>Hello, github</body></html>";
            };
            __decorate([
                Post_1.Post("/users"),
                HttpCode_1.HttpCode(201),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getUsers", null);
            __decorate([
                Get_1.Get("/admin"),
                HttpCode_1.HttpCode(403),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getAdmin", null);
            __decorate([
                Get_1.Get("/posts/:id"),
                index_1.OnNull(404),
                __param(0, Param_1.Param("id")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getPost", null);
            __decorate([
                Get_1.Get("/photos/:id"),
                OnUndefined_1.OnUndefined(201),
                __param(0, Param_1.Param("id")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getPhoto", null);
            __decorate([
                Get_1.Get("/homepage"),
                ContentType_1.ContentType("text/html; charset=utf-8"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getHomepage", null);
            __decorate([
                Get_1.Get("/textpage"),
                ContentType_1.ContentType("text/plain; charset=utf-8"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getTextpage", null);
            __decorate([
                Get_1.Get("/userdash"),
                Header_1.Header("authorization", "Barer abcdefg"),
                Header_1.Header("development-mode", "enabled"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getUserdash", null);
            __decorate([
                Get_1.Get("/github"),
                Location_1.Location("http://github.com"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "getToGithub", null);
            __decorate([
                Get_1.Get("/github-redirect"),
                Redirect_1.Redirect("http://github.com"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], OtherDectoratorsController.prototype, "goToGithub", null);
            OtherDectoratorsController = __decorate([
                Controller_1.Controller()
            ], OtherDectoratorsController);
            return OtherDectoratorsController;
        }());
        var JsonOtherDectoratorsController = /** @class */ (function () {
            function JsonOtherDectoratorsController() {
            }
            JsonOtherDectoratorsController.prototype.getPosts = function (id) {
                return new Promise(function (ok, fail) {
                    if (id === 1) {
                        ok("Question");
                    }
                    else {
                        ok(undefined);
                    }
                });
            };
            __decorate([
                Get_1.Get("/questions/:id"),
                OnUndefined_1.OnUndefined(QuestionNotFoundError),
                __param(0, Param_1.Param("id")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], JsonOtherDectoratorsController.prototype, "getPosts", null);
            JsonOtherDectoratorsController = __decorate([
                JsonController_1.JsonController()
            ], JsonOtherDectoratorsController);
            return JsonOtherDectoratorsController;
        }());
    });
    var expressApp, koaApp;
    before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
    after(function (done) { return expressApp.close(done); });
    before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
    after(function (done) { return koaApp.close(done); });
    describe("should return httpCode set by @HttpCode decorator", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "users", { name: "Umed" }, function (response) {
            expect(response).to.have.status(201);
            expect(response.body).to.be.eql("<html><body>User has been created</body></html>");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "admin", function (response) {
            expect(response).to.have.status(403);
            expect(response.body).to.be.eql("<html><body>Access is denied</body></html>");
        });
    });
    describe("should return custom code when @OnNull", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts/1", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql("Post");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts/2", function (response) {
            expect(response).to.have.status(200);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts/3", function (response) {
            expect(response).to.have.status(404);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts/4", function (response) {
            expect(response).to.have.status(404); // this is expected because for undefined 404 is given by default
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts/5", function (response) {
            expect(response).to.have.status(404); // this is expected because for undefined 404 is given by default
        });
    });
    describe("should return custom error message and code when @OnUndefined is used with Error class", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "questions/1", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.equal("Question");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "questions/2", function (response) {
            expect(response).to.have.status(404);
            expect(response.body.name).to.be.equal("QuestionNotFoundError");
            expect(response.body.message).to.be.equal("Question was not found!");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "questions/3", function (response) {
            expect(response).to.have.status(404); // because of null
            expect(response.body.name).to.be.equal("QuestionNotFoundError");
            expect(response.body.message).to.be.equal("Question was not found!");
        });
    });
    describe("should return custom code when @OnUndefined", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "photos/1", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql("Photo");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos/2", function (response) {
            expect(response).to.have.status(200);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos/3", function (response) {
            expect(response).to.have.status(204); // because of null
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos/4", function (response) {
            expect(response).to.have.status(201);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos/5", function (response) {
            expect(response).to.have.status(201);
        });
    });
    describe("should return content-type in the response when @ContentType is used", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "homepage", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.eql("<html><body>Hello world</body></html>");
        });
    });
    describe("should return content-type in the response when @ContentType is used", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "textpage", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/plain; charset=utf-8");
            expect(response.body).to.be.eql("Hello text");
        });
    });
    describe("should return response with custom headers when @Header is used", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "userdash", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("authorization", "Barer abcdefg");
            expect(response).to.have.header("development-mode", "enabled");
            expect(response.body).to.be.eql("<html><body>Hello, User</body></html>");
        });
    });
    describe("should relocate to new location when @Location is used", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "github", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("location", "http://github.com");
        });
    });
});
//# sourceMappingURL=other-controller-decorators.spec.js.map