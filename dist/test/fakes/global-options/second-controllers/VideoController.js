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
var Controller_1 = require("../../../../src/decorator/Controller");
var Get_1 = require("../../../../src/decorator/Get");
var VideoController = /** @class */ (function () {
    function VideoController() {
    }
    VideoController.prototype.getAll = function () {
        return "Hello videos";
    };
    __decorate([
        Get_1.Get("/videos"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VideoController.prototype, "getAll", null);
    VideoController = __decorate([
        Controller_1.Controller()
    ], VideoController);
    return VideoController;
}());
exports.VideoController = VideoController;
//# sourceMappingURL=VideoController.js.map