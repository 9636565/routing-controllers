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
var Redirect_1 = require("../../src/decorator/Redirect");
var JsonController_1 = require("../../src/decorator/JsonController");
var Param_1 = require("../../src/decorator/Param");
var chakram = require("chakram");
var expect = chakram.expect;
describe("dynamic redirect", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var TestController = /** @class */ (function () {
            function TestController() {
            }
            TestController.prototype.getOne = function (id) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, {
                                login: id
                            }];
                    });
                });
            };
            __decorate([
                Get_1.Get("/:id"),
                __param(0, Param_1.Param("id")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", Promise)
            ], TestController.prototype, "getOne", null);
            TestController = __decorate([
                JsonController_1.JsonController("/users")
            ], TestController);
            return TestController;
        }());
        var RedirectController = /** @class */ (function () {
            function RedirectController() {
            }
            RedirectController.prototype.template = function () {
                return { owner: "pleerock", repo: "routing-controllers" };
            };
            RedirectController.prototype.original = function () {
            };
            RedirectController.prototype.override = function () {
                return "/users/pleerock";
            };
            __decorate([
                Get_1.Get("/template"),
                Redirect_1.Redirect("/users/:owner"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], RedirectController.prototype, "template", null);
            __decorate([
                Get_1.Get("/original"),
                Redirect_1.Redirect("/users/pleerock"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], RedirectController.prototype, "original", null);
            __decorate([
                Get_1.Get("/override"),
                Redirect_1.Redirect("https://api.github.com"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], RedirectController.prototype, "override", null);
            RedirectController = __decorate([
                JsonController_1.JsonController()
            ], RedirectController);
            return RedirectController;
        }());
    });
    var expressApp;
    before(function (done) {
        var server = index_1.createExpressServer();
        expressApp = server.listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    var koaApp;
    before(function (done) {
        var server = index_1.createKoaServer();
        koaApp = server.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("using template", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "template", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).has.property("login", "pleerock");
        });
    });
    describe("using override", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "override", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).has.property("login", "pleerock");
        });
    });
    describe("using original", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "original", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).has.property("login", "pleerock");
        });
    });
});
//# sourceMappingURL=redirect-decorator.spec.js.map