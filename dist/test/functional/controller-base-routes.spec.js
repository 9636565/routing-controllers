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
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var expect = require("chakram").expect;
describe("controller > base routes functionality", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var PostController = /** @class */ (function () {
            function PostController() {
            }
            PostController.prototype.getAll = function () {
                return "<html><body>All posts</body></html>";
            };
            PostController.prototype.getUserById = function () {
                return "<html><body>One post</body></html>";
            };
            PostController.prototype.getCategoryById = function () {
                return "<html><body>One post category</body></html>";
            };
            PostController.prototype.getPostById = function () {
                return "<html><body>One user</body></html>";
            };
            __decorate([
                Get_1.Get("/"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], PostController.prototype, "getAll", null);
            __decorate([
                Get_1.Get("/:id(\\d+)"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], PostController.prototype, "getUserById", null);
            __decorate([
                Get_1.Get(/\/categories\/(\d+)/),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], PostController.prototype, "getCategoryById", null);
            __decorate([
                Get_1.Get("/:postId(\\d+)/users/:userId(\\d+)"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], PostController.prototype, "getPostById", null);
            PostController = __decorate([
                Controller_1.Controller("/posts")
            ], PostController);
            return PostController;
        }());
    });
    var expressApp, koaApp;
    before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
    after(function (done) { return expressApp.close(done); });
    before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
    after(function (done) { return koaApp.close(done); });
    describe("get should respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>All posts</body></html>");
        });
    });
    describe("get should respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts/1", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>One post</body></html>");
        });
    });
    describe("get should respond with proper status code, headers and body content", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts/1/users/2", function (response) {
            expect(response).to.have.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>One user</body></html>");
        });
    });
    describe("wrong route should respond with 404 error", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "1/users/1", function (response) {
            expect(response).to.have.status(404);
        });
    });
    describe("wrong route should respond with 404 error", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "categories/1", function (response) {
            expect(response).to.have.status(404);
        });
    });
    describe("wrong route should respond with 404 error", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users/1", function (response) {
            expect(response).to.have.status(404);
        });
    });
});
//# sourceMappingURL=controller-base-routes.spec.js.map