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
var JsonController_1 = require("../../src/decorator/JsonController");
var UserFilter_1 = require("./UserFilter");
var User_1 = require("./User");
var Get_1 = require("../../src/decorator/Get");
var Post_1 = require("../../src/decorator/Post");
var QueryParam_1 = require("../../src/decorator/QueryParam");
var Body_1 = require("../../src/decorator/Body");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAll = function (filter) {
        return filter.hasKeyword() ? "filter has long keyword" : "filter keyword is missing or too short";
    };
    UserController.prototype.post = function (user) {
        user.password = "1234abcd";
        console.log("Is photo url empty?: ", user.photo.isUrlEmpty());
        return user;
    };
    __decorate([
        Get_1.Get("/users"),
        __param(0, QueryParam_1.QueryParam("filter", { required: true, parse: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UserFilter_1.UserFilter]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "getAll", null);
    __decorate([
        Post_1.Post("/users"),
        __param(0, Body_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "post", null);
    UserController = __decorate([
        JsonController_1.JsonController()
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map