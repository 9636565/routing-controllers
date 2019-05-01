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
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var index_1 = require("../../src/index");
var Post_1 = require("../../src/decorator/Post");
var Put_1 = require("../../src/decorator/Put");
var Patch_1 = require("../../src/decorator/Patch");
var Delete_1 = require("../../src/decorator/Delete");
var ContentType_1 = require("../../src/decorator/ContentType");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function () {
        return [
            { id: 1, name: "First user!" },
            { id: 2, name: "Second user!" }
        ];
    };
    UserController.prototype.getOne = function (request) {
        return "User #" + request.params.id;
    };
    UserController.prototype.post = function (request) {
        var user = JSON.stringify(request.body); // probably you want to install body-parser for express
        return "User " + user + " !saved!";
    };
    UserController.prototype.put = function (request) {
        return "User #" + request.params.id + " has been putted!";
    };
    UserController.prototype.patch = function (request) {
        return "User #" + request.params.id + " has been patched!";
    };
    UserController.prototype.remove = function (request) {
        return "User #" + request.params.id + " has been removed!";
    };
    __decorate([
        Get_1.Get("/users"),
        ContentType_1.ContentType("application/json"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "getAll", null);
    __decorate([
        Get_1.Get("/users/:id"),
        __param(0, index_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "getOne", null);
    __decorate([
        Post_1.Post("/users"),
        __param(0, index_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "post", null);
    __decorate([
        Put_1.Put("/users/:id"),
        __param(0, index_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "put", null);
    __decorate([
        Patch_1.Patch("/users/:id"),
        __param(0, index_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "patch", null);
    __decorate([
        Delete_1.Delete("/users/:id"),
        __param(0, index_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "remove", null);
    UserController = __decorate([
        Controller_1.Controller()
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map