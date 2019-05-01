"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakeService = /** @class */ (function () {
    function FakeService() {
        this.fileMiddlewareCalled = false;
        this.videoMiddlewareCalled = false;
        this.questionMiddlewareCalled = false;
        this.questionErrorMiddlewareCalled = false;
        this.postMiddlewareCalled = false;
    }
    FakeService.prototype.fileMiddleware = function () {
        this.fileMiddlewareCalled = true;
        console.log("fake service!");
    };
    FakeService.prototype.videoMiddleware = function () {
        this.videoMiddlewareCalled = true;
        console.log("fake service!");
    };
    FakeService.prototype.questionMiddleware = function () {
        this.questionMiddlewareCalled = true;
        console.log("fake service!");
    };
    FakeService.prototype.questionErrorMiddleware = function () {
        this.questionErrorMiddlewareCalled = true;
        console.log("fake service!");
    };
    FakeService.prototype.postMiddleware = function () {
        this.postMiddlewareCalled = true;
        console.log("fake service!");
    };
    FakeService.prototype.reset = function () {
        this.fileMiddlewareCalled = false;
        this.videoMiddlewareCalled = false;
        this.questionMiddlewareCalled = false;
        this.questionErrorMiddlewareCalled = false;
        this.postMiddlewareCalled = false;
    };
    return FakeService;
}());
exports.FakeService = FakeService;
exports.defaultFakeService = new FakeService();
//# sourceMappingURL=FakeService.js.map