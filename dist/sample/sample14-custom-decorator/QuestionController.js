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
var Get_1 = require("../../src/decorator/Get");
var JsonController_1 = require("../../src/decorator/JsonController");
var UserFromSession_1 = require("./UserFromSession");
var User_1 = require("./User");
var QuestionController = /** @class */ (function () {
    function QuestionController() {
    }
    QuestionController.prototype.all = function (user) {
        return [{
                id: 1,
                title: "Question created by " + user.firstName
            }];
    };
    __decorate([
        Get_1.Get("/questions"),
        __param(0, UserFromSession_1.UserFromSession({ required: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User]),
        __metadata("design:returntype", void 0)
    ], QuestionController.prototype, "all", null);
    QuestionController = __decorate([
        JsonController_1.JsonController()
    ], QuestionController);
    return QuestionController;
}());
exports.QuestionController = QuestionController;
//# sourceMappingURL=QuestionController.js.map