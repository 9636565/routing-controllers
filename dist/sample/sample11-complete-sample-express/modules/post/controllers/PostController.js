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
var JsonController_1 = require("../../../../../src/decorator/JsonController");
var Get_1 = require("../../../../../src/decorator/Get");
var Post_1 = require("../../../../../src/decorator/Post");
var Put_1 = require("../../../../../src/decorator/Put");
var Req_1 = require("../../../../../src/decorator/Req");
var Patch_1 = require("../../../../../src/decorator/Patch");
var Delete_1 = require("../../../../../src/decorator/Delete");
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.getAll = function () {
        return this.createPromise([
            { id: 1, name: "Post 1!" },
            { id: 2, name: "Post 2!" },
        ], 3000);
    };
    PostController.prototype.getOne = function () {
        return this.createPromise({ id: 1, name: "Post 1!" }, 3000);
    };
    PostController.prototype.post = function (request) {
        var post = JSON.stringify(request.body);
        return this.createPromise("Post " + post + " !saved!", 3000);
    };
    PostController.prototype.put = function (request) {
        return this.createPromise("Post #" + request.params.id + " has been putted!", 3000);
    };
    PostController.prototype.patch = function (request) {
        return this.createPromise("Post #" + request.params.id + " has been patched!", 3000);
    };
    PostController.prototype.remove = function (request) {
        return this.createPromise("Post #" + request.params.id + " has been removed!", 3000);
    };
    PostController.prototype.createPromise = function (data, timeout) {
        return new Promise(function (ok, fail) {
            setTimeout(function () { return ok(data); }, timeout);
        });
    };
    __decorate([
        Get_1.Get("/posts"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostController.prototype, "getAll", null);
    __decorate([
        Get_1.Get("/posts/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostController.prototype, "getOne", null);
    __decorate([
        Post_1.Post("/posts"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PostController.prototype, "post", null);
    __decorate([
        Put_1.Put("/posts/:id"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PostController.prototype, "put", null);
    __decorate([
        Patch_1.Patch("/posts/:id"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PostController.prototype, "patch", null);
    __decorate([
        Delete_1.Delete("/posts/:id"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PostController.prototype, "remove", null);
    PostController = __decorate([
        JsonController_1.JsonController()
    ], PostController);
    return PostController;
}());
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map