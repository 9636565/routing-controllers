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
var ForbiddenError_1 = require("../../src/http-error/ForbiddenError");
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var Param_1 = require("../../src/decorator/Param");
var ContentType_1 = require("../../src/decorator/ContentType");
var BlogController = /** @class */ (function () {
    function BlogController() {
    }
    BlogController.prototype.getAll = function () {
        console.log("hello blog");
        return [
            { id: 1, firstName: "First", secondName: "blog" },
            { id: 2, firstName: "Second", secondName: "blog" }
        ];
    };
    BlogController.prototype.getOne = function (id) {
        if (!id)
            throw new ForbiddenError_1.ForbiddenError();
        return "THIS STRING will BE not SO BIG";
    };
    __decorate([
        Get_1.Get("/blogs"),
        ContentType_1.ContentType("application/json"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BlogController.prototype, "getAll", null);
    __decorate([
        Get_1.Get("/blogs/:id"),
        ContentType_1.ContentType("application/json"),
        __param(0, Param_1.Param("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], BlogController.prototype, "getOne", null);
    BlogController = __decorate([
        Controller_1.Controller()
    ], BlogController);
    return BlogController;
}());
exports.BlogController = BlogController;
//# sourceMappingURL=BlogController.js.map