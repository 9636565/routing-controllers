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
var index_1 = require("../../src/index");
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var QueryParam_1 = require("../../src/decorator/QueryParam");
var OnUndefined_1 = require("../../src/decorator/OnUndefined");
var test_utils_1 = require("./test-utils");
var chakram = require("chakram");
var expect = chakram.expect;
describe("defaults", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var ExpressController = /** @class */ (function () {
            function ExpressController() {
            }
            ExpressController.prototype.voidfunc = function () { };
            ExpressController.prototype.promisevoidfunc = function () {
                return Promise.resolve();
            };
            ExpressController.prototype.paramfunc = function (x) {
                return { foo: "bar" };
            };
            ExpressController.prototype.nullfunc = function () {
                return null;
            };
            ExpressController.prototype.overridefunc = function () { };
            ExpressController.prototype.overrideparamfunc = function (x) {
                return { foo: "bar" };
            };
            __decorate([
                Get_1.Get("/voidfunc"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressController.prototype, "voidfunc", null);
            __decorate([
                Get_1.Get("/promisevoidfunc"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressController.prototype, "promisevoidfunc", null);
            __decorate([
                Get_1.Get("/paramfunc"),
                __param(0, QueryParam_1.QueryParam("x")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], ExpressController.prototype, "paramfunc", null);
            __decorate([
                Get_1.Get("/nullfunc"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", String)
            ], ExpressController.prototype, "nullfunc", null);
            __decorate([
                Get_1.Get("/overridefunc"),
                OnUndefined_1.OnUndefined(404),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], ExpressController.prototype, "overridefunc", null);
            __decorate([
                Get_1.Get("/overrideparamfunc"),
                __param(0, QueryParam_1.QueryParam("x", { required: false })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], ExpressController.prototype, "overrideparamfunc", null);
            ExpressController = __decorate([
                Controller_1.Controller()
            ], ExpressController);
            return ExpressController;
        }());
    });
    var defaultUndefinedResultCode = 204;
    var defaultNullResultCode = 404;
    var expressApp;
    var kuaApp;
    before(function (done) { return expressApp = index_1.createExpressServer({
        defaults: {
            nullResultCode: defaultNullResultCode,
            undefinedResultCode: defaultUndefinedResultCode,
            paramOptions: {
                required: true
            }
        }
    }).listen(3001, done); });
    before(function (done) { return kuaApp = index_1.createKoaServer({
        defaults: {
            nullResultCode: defaultNullResultCode,
            undefinedResultCode: defaultUndefinedResultCode,
            paramOptions: {
                required: true
            }
        }
    }).listen(3002, done); });
    after(function (done) { return expressApp.close(done); });
    after(function (done) { return kuaApp.close(done); });
    it("should return undefinedResultCode from defaults config for void function", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "voidfunc", function (res) {
            expect(res).to.have.status(defaultUndefinedResultCode);
        });
    });
    it("should return undefinedResultCode from defaults config for promise void function", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "promisevoidfunc", function (res) {
            expect(res).to.have.status(defaultUndefinedResultCode);
        });
    });
    it("should return 400 from required paramOptions", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "paramfunc", function (res) {
            expect(res).to.have.status(400);
        });
    });
    it("should return nullResultCode from defaults config", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "nullfunc", function (res) {
            expect(res).to.have.status(defaultNullResultCode);
        });
    });
    it("should return status code from OnUndefined annotation", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "overridefunc", function (res) {
            expect(res).to.have.status(404);
        });
    });
    it("should mark arg optional from QueryParam annotation", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "overrideparamfunc", function (res) {
            expect(res).to.have.status(200);
        });
    });
});
//# sourceMappingURL=defaults.spec.js.map