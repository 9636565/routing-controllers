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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var JsonController_1 = require("../../src/decorator/JsonController");
var Post_1 = require("../../src/decorator/Post");
var Body_1 = require("../../src/decorator/Body");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var chakram = require("chakram");
var expect = chakram.expect;
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.getName = function () {
        return this.firstName + " " + this.lastName;
    };
    return User;
}());
exports.User = User;
describe("routing-controllers global options", function () {
    var initializedUser;
    beforeEach(function () {
        initializedUser = undefined;
    });
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var TestUserController = /** @class */ (function () {
            function TestUserController() {
            }
            TestUserController.prototype.postUsers = function (user) {
                initializedUser = user;
                return "";
            };
            TestUserController.prototype.postUsersWithRegex = function (user) {
                initializedUser = user;
                return "";
            };
            __decorate([
                Post_1.Post("/users"),
                __param(0, Body_1.Body()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [User]),
                __metadata("design:returntype", void 0)
            ], TestUserController.prototype, "postUsers", null);
            __decorate([
                Post_1.Post(new RegExp("/(prefix|regex)/users")),
                __param(0, Body_1.Body()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [User]),
                __metadata("design:returntype", void 0)
            ], TestUserController.prototype, "postUsersWithRegex", null);
            TestUserController = __decorate([
                JsonController_1.JsonController()
            ], TestUserController);
            return TestUserController;
        }());
    });
    describe("useClassTransformer by default must be set to true", function () {
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "post", "users", { firstName: "Umed", lastName: "Khudoiberdiev" }, function (response) {
            expect(initializedUser).to.be.instanceOf(User);
            expect(response).to.have.status(200);
        });
    });
    describe("when useClassTransformer is set to true", function () {
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer({ classTransformer: true }).listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer({ classTransformer: true }).listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "post", "users", { firstName: "Umed", lastName: "Khudoiberdiev" }, function (response) {
            expect(initializedUser).to.be.instanceOf(User);
            expect(response).to.have.status(200);
        });
    });
    describe("when useClassTransformer is not set", function () {
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer({ classTransformer: false }).listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer({ classTransformer: false }).listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "post", "users", { firstName: "Umed", lastName: "Khudoiberdiev" }, function (response) {
            expect(initializedUser).not.to.be.instanceOf(User);
            expect(response).to.have.status(200);
        });
    });
    describe("when routePrefix is used all controller routes should be appended by it", function () {
        var apps = [];
        before(function (done) { return apps.push(index_1.createExpressServer({ routePrefix: "/api" }).listen(3001, done)); });
        before(function (done) { return apps.push(index_1.createExpressServer({ routePrefix: "api" }).listen(3002, done)); });
        before(function (done) { return apps.push(index_1.createKoaServer({ routePrefix: "/api" }).listen(3003, done)); });
        before(function (done) { return apps.push(index_1.createKoaServer({ routePrefix: "api" }).listen(3004, done)); });
        after(function (done) { apps.forEach(function (app) { return app.close(); }); done(); });
        test_utils_1.assertRequest([3001, 3002, 3003, 3004], "post", "api/users", { firstName: "Umed", lastName: "Khudoiberdiev" }, function (response) {
            expect(initializedUser).to.be.instanceOf(User);
            expect(response).to.have.status(200);
        });
        test_utils_1.assertRequest([3001, 3002, 3003, 3004], "post", "api/regex/users", { firstName: "Umed", lastName: "Khudoiberdiev" }, function (response) {
            expect(initializedUser).to.be.instanceOf(User);
            expect(response).to.have.status(200);
        });
    });
});
//# sourceMappingURL=global-options.spec.js.map