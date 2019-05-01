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
var JsonController_1 = require("../../../../../src/decorator/JsonController");
var Get_1 = require("../../../../../src/decorator/Get");
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.getAll = function () {
        return [{
                id: 1,
                title: "#1"
            }, {
                id: 2,
                title: "#2"
            }];
    };
    __decorate([
        Get_1.Get("/posts"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PostController.prototype, "getAll", null);
    PostController = __decorate([
        JsonController_1.JsonController()
    ], PostController);
    return PostController;
}());
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map