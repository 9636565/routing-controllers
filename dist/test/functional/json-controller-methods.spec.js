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
var Post_1 = require("../../src/decorator/Post");
var Method_1 = require("../../src/decorator/Method");
var Head_1 = require("../../src/decorator/Head");
var Delete_1 = require("../../src/decorator/Delete");
var Patch_1 = require("../../src/decorator/Patch");
var Put_1 = require("../../src/decorator/Put");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var chakram = require("chakram");
var expect = chakram.expect;
describe("json-controller methods", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var JsonUserController = /** @class */ (function () {
            function JsonUserController() {
            }
            JsonUserController.prototype.getAll = function () {
                return [{
                        id: 1,
                        name: "Umed"
                    }, {
                        id: 2,
                        name: "Bakha"
                    }];
            };
            JsonUserController.prototype.post = function () {
                return {
                    status: "saved"
                };
            };
            JsonUserController.prototype.put = function () {
                return {
                    status: "updated"
                };
            };
            JsonUserController.prototype.patch = function () {
                return {
                    status: "patched"
                };
            };
            JsonUserController.prototype.delete = function () {
                return {
                    status: "removed"
                };
            };
            JsonUserController.prototype.head = function () {
                return {
                    thisWillNot: "beSent"
                };
            };
            JsonUserController.prototype.postCategories = function () {
                return {
                    status: "posted"
                };
            };
            JsonUserController.prototype.getCategories = function () {
                return {
                    status: "removed"
                };
            };
            JsonUserController.prototype.getUserById = function () {
                return {
                    id: 1,
                    name: "Umed"
                };
            };
            JsonUserController.prototype.getCategoryById = function () {
                return {
                    id: 1,
                    name: "People"
                };
            };
            JsonUserController.prototype.getPostById = function () {
                return {
                    id: 1,
                    title: "About People"
                };
            };
            JsonUserController.prototype.getPostFromDb = function () {
                return new Promise(function (ok, fail) {
                    setTimeout(function () {
                        ok({
                            id: 1,
                            title: "Hello database post"
                        });
                    }, 500);
                });
            };
            JsonUserController.prototype.getPostFromFailedDb = function () {
                return new Promise(function (ok, fail) {
                    setTimeout(function () {
                        fail({
                            code: 10954,
                            message: "Cannot connect to db"
                        });
                    }, 500);
                });
            };
            __decorate([
                Get_1.Get("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "getAll", null);
            __decorate([
                Post_1.Post("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "post", null);
            __decorate([
                Put_1.Put("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "put", null);
            __decorate([
                Patch_1.Patch("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "patch", null);
            __decorate([
                Delete_1.Delete("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "delete", null);
            __decorate([
                Head_1.Head("/users"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "head", null);
            __decorate([
                Method_1.Method("post", "/categories"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "postCategories", null);
            __decorate([
                Method_1.Method("delete", "/categories"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "getCategories", null);
            __decorate([
                Get_1.Get("/users/:id"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "getUserById", null);
            __decorate([
                Get_1.Get(/\/categories\/[\d+]/),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "getCategoryById", null);
            __decorate([
                Get_1.Get("/posts/:id(\\d+)"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "getPostById", null);
            __decorate([
                Get_1.Get("/posts-from-db"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "getPostFromDb", null);
            __decorate([
                Get_1.Get("/posts-from-failed-db"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], JsonUserController.prototype, "getPostFromFailedDb", null);
            JsonUserController = __decorate([
                JsonController_1.JsonController()
            ], JsonUserController);
            return JsonUserController;
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
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.instanceOf(Array);
            expect(response.body).to.be.eql([{
                    id: 1,
                    name: "Umed"
                }, {
                    id: 2,
                    name: "Bakha"
                }]);
        });
    });
    describe("post respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                status: "saved"
            });
        });
    });
    describe("put respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "put", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                status: "updated"
            });
        });
    });
    describe("patch respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "patch", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                status: "patched"
            });
        });
    });
    describe("delete respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "delete", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                status: "removed"
            });
        });
    });
    describe("head respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "head", "users", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.undefined;
        });
    });
    describe("custom method (post) respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "categories", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                status: "posted"
            });
        });
    });
    describe("custom method (delete) respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "delete", "categories", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                status: "removed"
            });
        });
    });
    describe("route should work with parameter", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users/umed", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                id: 1,
                name: "Umed"
            });
        });
    });
    describe("route should work with regexp parameter", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "categories/1", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                id: 1,
                name: "People"
            });
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
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                id: 1,
                title: "About People"
            });
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
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                id: 1,
                title: "Hello database post"
            });
        });
    });
    describe("should respond with 500 if promise failed", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts-from-failed-db", function (response) {
            expect(response).to.have.status(500);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql({
                code: 10954,
                message: "Cannot connect to db"
            });
        });
    });
});
//# sourceMappingURL=json-controller-methods.spec.js.map