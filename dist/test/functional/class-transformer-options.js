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
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var class_transformer_1 = require("class-transformer");
var storage_1 = require("class-transformer/storage");
var Get_1 = require("../../src/decorator/Get");
var QueryParam_1 = require("../../src/decorator/QueryParam");
var ResponseClassTransformOptions_1 = require("../../src/decorator/ResponseClassTransformOptions");
var chakram = require("chakram");
var expect = chakram.expect;
describe("class transformer options", function () {
    var UserFilter = /** @class */ (function () {
        function UserFilter() {
        }
        return UserFilter;
    }());
    var UserModel = /** @class */ (function () {
        function UserModel() {
        }
        Object.defineProperty(UserModel.prototype, "name", {
            get: function () {
                return this._firstName + " " + this._lastName;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            class_transformer_1.Expose(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UserModel.prototype, "name", null);
        return UserModel;
    }());
    after(function () {
        storage_1.defaultMetadataStorage.clear();
    });
    describe("should not use any options if not set", function () {
        var requestFilter;
        beforeEach(function () {
            requestFilter = undefined;
        });
        before(function () {
            index_1.getMetadataArgsStorage().reset();
            var UserController = /** @class */ (function () {
                function UserController() {
                }
                UserController.prototype.getUsers = function (filter) {
                    requestFilter = filter;
                    var user = new UserModel();
                    user.id = 1;
                    user._firstName = "Umed";
                    user._lastName = "Khudoiberdiev";
                    return user;
                };
                __decorate([
                    Get_1.Get("/user"),
                    __param(0, QueryParam_1.QueryParam("filter")),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [UserFilter]),
                    __metadata("design:returntype", Object)
                ], UserController.prototype, "getUsers", null);
                UserController = __decorate([
                    JsonController_1.JsonController()
                ], UserController);
                return UserController;
            }());
        });
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "user?filter={\"keyword\": \"Um\", \"__somethingPrivate\": \"blablabla\"}", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql({
                id: 1,
                _firstName: "Umed",
                _lastName: "Khudoiberdiev",
                name: "Umed Khudoiberdiev"
            });
            expect(requestFilter).to.be.instanceOf(UserFilter);
            expect(requestFilter).to.be.eql({
                keyword: "Um",
                __somethingPrivate: "blablabla",
            });
        });
    });
    describe("should apply global options", function () {
        var requestFilter;
        beforeEach(function () {
            requestFilter = undefined;
        });
        before(function () {
            index_1.getMetadataArgsStorage().reset();
            var ClassTransformUserController = /** @class */ (function () {
                function ClassTransformUserController() {
                }
                ClassTransformUserController.prototype.getUsers = function (filter) {
                    requestFilter = filter;
                    var user = new UserModel();
                    user.id = 1;
                    user._firstName = "Umed";
                    user._lastName = "Khudoiberdiev";
                    return user;
                };
                __decorate([
                    Get_1.Get("/user"),
                    __param(0, QueryParam_1.QueryParam("filter")),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [UserFilter]),
                    __metadata("design:returntype", Object)
                ], ClassTransformUserController.prototype, "getUsers", null);
                ClassTransformUserController = __decorate([
                    JsonController_1.JsonController()
                ], ClassTransformUserController);
                return ClassTransformUserController;
            }());
        });
        var options = {
            classToPlainTransformOptions: {
                excludePrefixes: ["_"]
            },
            plainToClassTransformOptions: {
                excludePrefixes: ["__"]
            }
        };
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer(options).listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer(options).listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "user?filter={\"keyword\": \"Um\", \"__somethingPrivate\": \"blablabla\"}", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql({
                id: 1,
                name: "Umed Khudoiberdiev"
            });
            expect(requestFilter).to.be.instanceOf(UserFilter);
            expect(requestFilter).to.be.eql({
                keyword: "Um"
            });
        });
    });
    describe("should apply local options", function () {
        var requestFilter;
        beforeEach(function () {
            requestFilter = undefined;
        });
        before(function () {
            index_1.getMetadataArgsStorage().reset();
            var ClassTransformUserController = /** @class */ (function () {
                function ClassTransformUserController() {
                }
                ClassTransformUserController.prototype.getUsers = function (filter) {
                    requestFilter = filter;
                    var user = new UserModel();
                    user.id = 1;
                    user._firstName = "Umed";
                    user._lastName = "Khudoiberdiev";
                    return user;
                };
                __decorate([
                    Get_1.Get("/user"),
                    ResponseClassTransformOptions_1.ResponseClassTransformOptions({ excludePrefixes: ["_"] }),
                    __param(0, QueryParam_1.QueryParam("filter", { transform: { excludePrefixes: ["__"] } })),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [UserFilter]),
                    __metadata("design:returntype", Object)
                ], ClassTransformUserController.prototype, "getUsers", null);
                ClassTransformUserController = __decorate([
                    JsonController_1.JsonController()
                ], ClassTransformUserController);
                return ClassTransformUserController;
            }());
        });
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "user?filter={\"keyword\": \"Um\", \"__somethingPrivate\": \"blablabla\"}", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql({
                id: 1,
                name: "Umed Khudoiberdiev"
            });
            expect(requestFilter).to.be.instanceOf(UserFilter);
            expect(requestFilter).to.be.eql({
                keyword: "Um"
            });
        });
    });
});
//# sourceMappingURL=class-transformer-options.js.map