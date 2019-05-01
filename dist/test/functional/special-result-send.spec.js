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
var fs_1 = require("fs");
var path = require("path");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var JsonController_1 = require("../../src/decorator/JsonController");
var Get_1 = require("../../src/decorator/Get");
var ContentType_1 = require("../../src/decorator/ContentType");
var chakram = require("chakram");
var expect = chakram.expect;
describe("special result value treatment", function () {
    var rawData = [0xFF, 0x66, 0xAA, 0xCC];
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var HandledController = /** @class */ (function () {
            function HandledController() {
            }
            HandledController.prototype.getStream = function () {
                return fs_1.createReadStream(path.resolve(__dirname, "../../../../test/resources/sample-text-file.txt"));
            };
            HandledController.prototype.getBuffer = function () {
                return new Buffer(rawData);
            };
            HandledController.prototype.getUIntArray = function () {
                return new Uint8Array(rawData);
            };
            __decorate([
                Get_1.Get("/stream"),
                ContentType_1.ContentType("text/plain"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], HandledController.prototype, "getStream", null);
            __decorate([
                Get_1.Get("/buffer"),
                ContentType_1.ContentType("application/octet-stream"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], HandledController.prototype, "getBuffer", null);
            __decorate([
                Get_1.Get("/array"),
                ContentType_1.ContentType("application/octet-stream"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], HandledController.prototype, "getUIntArray", null);
            HandledController = __decorate([
                JsonController_1.JsonController()
            ], HandledController);
            return HandledController;
        }());
    });
    var expressApp, koaApp;
    before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
    after(function (done) { return expressApp.close(done); });
    before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
    after(function (done) { return koaApp.close(done); });
    describe("should pipe stream to response", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "stream", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", function (contentType) {
                expect(contentType).to.match(/text\/plain/);
            });
            expect(response.body).to.be.equal("Hello World!");
        });
    });
    describe("should send raw binary data from Buffer", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "buffer", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "application/octet-stream");
            expect(response.body).to.be.equal(new Buffer(rawData).toString());
        });
    });
    describe("should send raw binary data from UIntArray", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "array", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "application/octet-stream");
            expect(response.body).to.be.equal(Buffer.from(rawData).toString());
        });
    });
});
//# sourceMappingURL=special-result-send.spec.js.map