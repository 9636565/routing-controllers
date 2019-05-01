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
var Get_1 = require("../../src/decorator/Get");
var Param_1 = require("../../src/decorator/Param");
var CompressionMiddleware_1 = require("./CompressionMiddleware");
var AllControllerActionsMiddleware_1 = require("./AllControllerActionsMiddleware");
var UseBefore_1 = require("../../src/decorator/UseBefore");
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
        return { id: id, firstName: "First", secondName: "blog" };
    };
    __decorate([
        Get_1.Get("/blogs"),
        UseBefore_1.UseBefore(CompressionMiddleware_1.CompressionMiddleware),
        UseBefore_1.UseBefore(function (request, response, next) {
            console.log("wow middleware");
            next();
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BlogController.prototype, "getAll", null);
    __decorate([
        Get_1.Get("/blogs/:id"),
        __param(0, Param_1.Param("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], BlogController.prototype, "getOne", null);
    BlogController = __decorate([
        JsonController_1.JsonController(),
        UseBefore_1.UseBefore(AllControllerActionsMiddleware_1.AllControllerActionsMiddleware)
    ], BlogController);
    return BlogController;
}());
exports.BlogController = BlogController;
//# sourceMappingURL=BlogController.js.map