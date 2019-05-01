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
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var Post_1 = require("../../src/decorator/Post");
var Method_1 = require("../../src/decorator/Method");
var Head_1 = require("../../src/decorator/Head");
var Delete_1 = require("../../src/decorator/Delete");
var Patch_1 = require("../../src/decorator/Patch");
var Put_1 = require("../../src/decorator/Put");
var ContentType_1 = require("../../src/decorator/ContentType");
var JsonController_1 = require("../../src/decorator/JsonController");
var UnauthorizedError_1 = require("../../src/http-error/UnauthorizedError");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var chakram = require("chakram");
var expect = chakram.expect;
describe("controller methods", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var UserController = /** @class */ (function () {
            function UserController() {
            }
            UserController.prototype.getAll = function () {
                return "<html><body>All users</body></html>";
            };
            UserController.prototype.post = function () {
                return "<html><body>Posting user</body></html>";
            };
            UserController.prototype.put = function () {
                return "<html><body>Putting user</body></html>";
            };
            UserController.prototype.patch = function () {
                return "<html><body>Patching user</body></html>";
            };
            UserController.prototype.delete = function () {
                return "<html><body>Removing user</body></html>";
            };
            UserController.prototype.head = function () {
                return "<html><body>Removing user</body></html>";
            };
            UserController.prototype.postCategories = function () {
                return "<html><body>Posting categories</body></html>";
            };
            UserController.prototype.getCategories = function () {
                return "<html><body>Get categories</body></html>";
            };
            UserController.prototype.getUserById = function () {
                return "<html><body>One user</body></html>";
            };
            UserController.prototype.getCategoryById = function () {
                return "<html><body>One category</body></html>";
            };
            UserController.prototype.getPostById = function () {
                return "<html><body>One post</body></html>";
            };
            UserController.prototype.getPostFromDb = function () {
                return new Promise(function (ok, fail) {
                    setTimeout(function () {
                        ok("<html><body>resolved after half second</body></html>");
                    }, 500);
                });
            };
            UserController.prototype.getPostFromFailedDb = function () {
                return new Promise(function (ok, fail) {
                    setTimeout(function () {
                        fail("<html><body>cannot connect to a database</body></html>");
                    }, 500);
                });
            };
            __decorate([
                Get_1.Get("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getAll", null);
            __decorate([
                Post_1.Post("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "post", null);
            __decorate([
                Put_1.Put("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "put", null);
            __decorate([
                Patch_1.Patch("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "patch", null);
            __decorate([
                Delete_1.Delete("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "delete", null);
            __decorate([
                Head_1.Head("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "head", null);
            __decorate([
                Method_1.Method("post", "/categories"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "postCategories", null);
            __decorate([
                Method_1.Method("delete", "/categories"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getCategories", null);
            __decorate([
                Get_1.Get("/users/:id"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getUserById", null);
            __decorate([
                Get_1.Get(/\/categories\/[\d+]/),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getCategoryById", null);
            __decorate([
                Get_1.Get("/posts/:id(\\d+)"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getPostById", null);
            __decorate([
                Get_1.Get("/posts-from-db"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getPostFromDb", null);
            __decorate([
                Get_1.Get("/posts-from-failed-db"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], UserController.prototype, "getPostFromFailedDb", null);
            UserController = __decorate([
                Controller_1.Controller()
            ], UserController);
            return UserController;
        }());
        var ReturnJsonController = /** @class */ (function () {
            function ReturnJsonController() {
            }
            ReturnJsonController.prototype.returnUndefined = function () {
                return undefined;
            };
            ReturnJsonController.prototype.returnNull = function () {
                return null;
            };
            __decorate([
                Get_1.Get("/undefined"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ReturnJsonController.prototype, "returnUndefined", null);
            __decorate([
                Get_1.Get("/null"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ReturnJsonController.prototype, "returnNull", null);
            ReturnJsonController = __decorate([
                JsonController_1.JsonController("/return/json")
            ], ReturnJsonController);
            return ReturnJsonController;
        }());
        var ReturnNormalController = /** @class */ (function () {
            function ReturnNormalController() {
            }
            ReturnNormalController.prototype.returnUndefined = function () {
                return undefined;
            };
            ReturnNormalController.prototype.returnNull = function () {
                return null;
            };
            __decorate([
                Get_1.Get("/undefined"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ReturnNormalController.prototype, "returnUndefined", null);
            __decorate([
                Get_1.Get("/null"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ReturnNormalController.prototype, "returnNull", null);
            ReturnNormalController = __decorate([
                Controller_1.Controller("/return/normal")
            ], ReturnNormalController);
            return ReturnNormalController;
        }());
        var ContentTypeController = /** @class */ (function () {
            function ContentTypeController() {
            }
            ContentTypeController.prototype.returnHtml = function () {
                return "<html>Test</html>";
            };
            ContentTypeController.prototype.returnString = function () {
                return "Test";
            };
            ContentTypeController.prototype.textError = function () {
                throw new UnauthorizedError_1.UnauthorizedError();
            };
            ContentTypeController.prototype.jsonError = function () {
                throw new UnauthorizedError_1.UnauthorizedError();
            };
            __decorate([
                Get_1.Get("/text-html"),
                ContentType_1.ContentType("text/html"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", String)
            ], ContentTypeController.prototype, "returnHtml", null);
            __decorate([
                Get_1.Get("/text-plain"),
                ContentType_1.ContentType("text/plain"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", String)
            ], ContentTypeController.prototype, "returnString", null);
            __decorate([
                Get_1.Get("/text-plain-error"),
                ContentType_1.ContentType("text/plain"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ContentTypeController.prototype, "textError", null);
            __decorate([
                Get_1.Get("/json-error"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ContentTypeController.prototype, "jsonError", null);
            ContentTypeController = __decorate([
                JsonController_1.JsonController("/json-controller")
            ], ContentTypeController);
            return ContentTypeController;
        }());
    });
    var expressApp, koaApp;
    before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
    after(function (done) { return expressApp.close(done); });
    before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
    after(function (done) { return koaApp.close(done); });
    describe("get should respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>All users</body></html>");
        });
    });
    describe("post respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>Posting user</body></html>");
        });
    });
    describe("put respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "put", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>Putting user</body></html>");
        });
    });
    describe("patch respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "patch", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>Patching user</body></html>");
        });
    });
    describe("delete respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "delete", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>Removing user</body></html>");
        });
    });
    describe("head respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "head", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.undefined;
        });
    });
    describe("custom method (post) respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "categories", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>Posting categories</body></html>");
        });
    });
    describe("custom method (delete) respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "delete", "categories", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>Get categories</body></html>");
        });
    });
    describe("route should work with parameter", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users/umed", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>One user</body></html>");
        });
    });
    describe("route should work with regexp parameter", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "categories/1", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>One category</body></html>");
        });
    });
    describe("should respond with 404 when regexp does not match", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "categories/umed", function (response) {
            expect(response).to.have.status(404);
        });
    });
    describe("route should work with string regexp parameter", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts/1", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>One post</body></html>");
        });
    });
    describe("should respond with 404 when regexp does not match", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts/U", function (response) {
            expect(response).to.have.status(404);
        });
    });
    describe("should return result from a promise", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts-from-db", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>resolved after half second</body></html>");
        });
    });
    describe("should respond with 500 if promise failed", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts-from-failed-db", function (response) {
            expect(response).to.have.status(500);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>cannot connect to a database</body></html>");
        });
    });
    describe("should respond with 204 No Content when null returned in action", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "return/normal/null", function (response) {
            expect(response).to.have.status(204);
            expect(response).to.not.have.header("content-type");
            expect(response.body).to.not.exist;
        });
        test_utils_1.assertRequest([3001, 3002], "get", "return/json/null", function (response) {
            expect(response).to.have.status(204);
            expect(response).to.not.have.header("content-type");
            expect(response.body).to.not.exist;
        });
    });
    describe("should respond with 404 Not Found text when undefined returned in action", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "return/normal/undefined", function (response) {
            expect(response).to.have.status(404);
            expect(response).to.have.header("content-type", function (contentType) {
                expect(contentType).to.match(/text/);
            });
        });
    });
    describe("should respond with 404 Not Found JSON when undefined returned in action", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "return/json/undefined", function (response) {
            expect(response).to.have.status(404);
            expect(response).to.have.header("content-type", function (contentType) {
                expect(contentType).to.match(/application\/json/);
            });
        });
    });
    describe("should respond with 200 and text/html even in json controller's method", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "json-controller/text-html", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", function (contentType) {
                expect(contentType).to.match(/text\/html/);
            });
            expect(response.body).to.equals("<html>Test</html>");
        });
    });
    describe("should respond with 200 and text/plain even in json controller's method", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "json-controller/text-plain", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", function (contentType) {
                expect(contentType).to.match(/text\/plain/);
            });
            expect(response.body).to.equals("Test");
        });
    });
    describe("should respond with 401 and text/html when UnauthorizedError throwed even in json controller's method", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "json-controller/text-plain-error", function (response) {
            expect(response).to.have.status(401);
            expect(response).to.have.header("content-type", function (contentType) {
                expect(contentType).to.match(/text\/plain/);
            });
            expect(typeof response.body).to.equals("string");
            expect(response.body).to.match(/UnauthorizedError.HttpError/);
        });
    });
    describe("should respond with 401 and aplication/json when UnauthorizedError throwed in standard json controller's method", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "json-controller/json-error", function (response) {
            expect(response).to.have.status(401);
            expect(response).to.have.header("content-type", function (contentType) {
                expect(contentType).to.match(/application\/json/);
            });
            expect(typeof response.body).to.equals("object");
            expect(response.body.name).to.equals("UnauthorizedError");
        });
    });
});
//# sourceMappingURL=controller-methods.spec.js.map