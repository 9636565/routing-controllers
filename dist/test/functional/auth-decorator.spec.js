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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Get_1 = require("../../src/decorator/Get");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var JsonController_1 = require("../../src/decorator/JsonController");
var Authorized_1 = require("../../src/decorator/Authorized");
var chakram = require("chakram");
var expect = chakram.expect;
var sleep = function (time) { return new Promise(function (resolve) { return setTimeout(resolve, time); }); };
describe("Controller responds with value when Authorization succeeds (async)", function () {
    var _this = this;
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var AuthController = /** @class */ (function () {
            function AuthController() {
            }
            AuthController.prototype.auth1 = function () {
                return { test: "auth1" };
            };
            AuthController.prototype.auth2 = function () {
                return { test: "auth2" };
            };
            AuthController.prototype.auth3 = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sleep(10)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, { test: "auth3" }];
                        }
                    });
                });
            };
            __decorate([
                Authorized_1.Authorized(),
                Get_1.Get("/auth1"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth1", null);
            __decorate([
                Authorized_1.Authorized(["role1"]),
                Get_1.Get("/auth2"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth2", null);
            __decorate([
                Authorized_1.Authorized(),
                Get_1.Get("/auth3"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", Promise)
            ], AuthController.prototype, "auth3", null);
            AuthController = __decorate([
                JsonController_1.JsonController()
            ], AuthController);
            return AuthController;
        }());
    });
    var serverOptions = {
        authorizationChecker: function (action, roles) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep(10)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        }); }
    };
    var expressApp;
    before(function (done) {
        var server = index_1.createExpressServer(serverOptions);
        expressApp = server.listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    var koaApp;
    before(function (done) {
        var server = index_1.createKoaServer(serverOptions);
        koaApp = server.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("without roles", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth1", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.eql({ test: "auth1" });
        });
    });
    describe("with roles", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth2", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.eql({ test: "auth2" });
        });
    });
    describe("async", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth3", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.eql({ test: "auth3" });
        });
    });
});
describe("Controller responds with value when Authorization succeeds (sync)", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var AuthController = /** @class */ (function () {
            function AuthController() {
            }
            AuthController.prototype.auth1 = function () {
                return { test: "auth1" };
            };
            AuthController.prototype.auth2 = function () {
                return { test: "auth2" };
            };
            AuthController.prototype.auth3 = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sleep(10)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, { test: "auth3" }];
                        }
                    });
                });
            };
            __decorate([
                Authorized_1.Authorized(),
                Get_1.Get("/auth1"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth1", null);
            __decorate([
                Authorized_1.Authorized(["role1"]),
                Get_1.Get("/auth2"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth2", null);
            __decorate([
                Authorized_1.Authorized(),
                Get_1.Get("/auth3"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", Promise)
            ], AuthController.prototype, "auth3", null);
            AuthController = __decorate([
                JsonController_1.JsonController()
            ], AuthController);
            return AuthController;
        }());
    });
    var serverOptions = {
        authorizationChecker: function (action, roles) {
            return true;
        }
    };
    var expressApp;
    before(function (done) {
        var server = index_1.createExpressServer(serverOptions);
        expressApp = server.listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    var koaApp;
    before(function (done) {
        var server = index_1.createKoaServer(serverOptions);
        koaApp = server.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("without roles", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth1", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.eql({ test: "auth1" });
        });
    });
    describe("with roles", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth2", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.eql({ test: "auth2" });
        });
    });
    describe("async", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth3", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.eql({ test: "auth3" });
        });
    });
});
describe("Authorized Decorators Http Status Code", function () {
    var _this = this;
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var AuthController = /** @class */ (function () {
            function AuthController() {
            }
            AuthController.prototype.auth1 = function () {
                return { test: "auth1" };
            };
            AuthController.prototype.auth2 = function () {
                return { test: "auth2" };
            };
            __decorate([
                Authorized_1.Authorized(),
                Get_1.Get("/auth1"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth1", null);
            __decorate([
                Authorized_1.Authorized(["role1"]),
                Get_1.Get("/auth2"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth2", null);
            AuthController = __decorate([
                JsonController_1.JsonController()
            ], AuthController);
            return AuthController;
        }());
    });
    var serverOptions = {
        authorizationChecker: function (action, roles) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        }); }
    };
    var expressApp;
    before(function (done) {
        var server = index_1.createExpressServer(serverOptions);
        expressApp = server.listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    var koaApp;
    before(function (done) {
        var server = index_1.createKoaServer(serverOptions);
        koaApp = server.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("without roles", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth1", function (response) {
            expect(response).to.have.status(401);
        });
    });
    describe("with roles", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth2", function (response) {
            expect(response).to.have.status(403);
        });
    });
});
describe("Authorization checker allows to throw (async)", function () {
    var _this = this;
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var AuthController = /** @class */ (function () {
            function AuthController() {
            }
            AuthController.prototype.auth1 = function () {
                return { test: "auth1" };
            };
            __decorate([
                Authorized_1.Authorized(),
                Get_1.Get("/auth1"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth1", null);
            AuthController = __decorate([
                JsonController_1.JsonController()
            ], AuthController);
            return AuthController;
        }());
    });
    var serverOptions = {
        authorizationChecker: function (action, roles) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new index_1.NotAcceptableError("Custom Error");
            });
        }); },
    };
    var expressApp;
    before(function (done) {
        var server = index_1.createExpressServer(serverOptions);
        expressApp = server.listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    var koaApp;
    before(function (done) {
        var server = index_1.createKoaServer(serverOptions);
        koaApp = server.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("custom errors", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth1", function (response) {
            expect(response).to.have.status(406);
            expect(response.body).to.have.property("name", "NotAcceptableError");
            expect(response.body).to.have.property("message", "Custom Error");
        });
    });
});
describe("Authorization checker allows to throw (sync)", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var AuthController = /** @class */ (function () {
            function AuthController() {
            }
            AuthController.prototype.auth1 = function () {
                return { test: "auth1" };
            };
            __decorate([
                Authorized_1.Authorized(),
                Get_1.Get("/auth1"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], AuthController.prototype, "auth1", null);
            AuthController = __decorate([
                JsonController_1.JsonController()
            ], AuthController);
            return AuthController;
        }());
    });
    var serverOptions = {
        authorizationChecker: function (action, roles) {
            throw new index_1.NotAcceptableError("Custom Error");
        },
    };
    var expressApp;
    before(function (done) {
        var server = index_1.createExpressServer(serverOptions);
        expressApp = server.listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    var koaApp;
    before(function (done) {
        var server = index_1.createKoaServer(serverOptions);
        koaApp = server.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("custom errors", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "auth1", function (response) {
            expect(response).to.have.status(406);
            expect(response.body).to.have.property("name", "NotAcceptableError");
            expect(response.body).to.have.property("message", "Custom Error");
        });
    });
});
//# sourceMappingURL=auth-decorator.spec.js.map