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
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var Render_1 = require("../../src/decorator/Render");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.blog = function () {
        return {
            title: "My Blog",
            posts: [
                {
                    title: "Welcome to my blog",
                    content: "This is my new blog built with Koa, routing-controllers and koa-views"
                },
                {
                    title: "Hello World",
                    content: "Hello world from Koa and routing-controllers"
                }
            ]
        };
    };
    __decorate([
        Get_1.Get("/"),
        Render_1.Render("blog.html"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "blog", null);
    UserController = __decorate([
        Controller_1.Controller()
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=BlogController.js.map