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
var Param_1 = require("../../../../../src/decorator/Param");
var Post_1 = require("../../../../../src/decorator/Post");
var Req_1 = require("../../../../../src/decorator/Req");
var Put_1 = require("../../../../../src/decorator/Put");
var Patch_1 = require("../../../../../src/decorator/Patch");
var Delete_1 = require("../../../../../src/decorator/Delete");
var QuestionController = /** @class */ (function () {
    function QuestionController() {
    }
    QuestionController.prototype.getAll = function () {
        return this.createPromise([
            { id: 1, name: "Question 1!" },
            { id: 2, name: "Question 2!" },
        ], 3000);
    };
    QuestionController.prototype.getOne = function (id) {
        if (!id)
            return Promise.reject(new Error("No id is specified"));
        return this.createPromise({ id: 1, name: "Question 1!" }, 3000);
    };
    QuestionController.prototype.post = function (request) {
        var question = JSON.stringify(request.body);
        return this.createPromise("Question " + question + " !saved!", 3000);
    };
    QuestionController.prototype.put = function (request) {
        return this.createPromise("Question #" + request.params.id + " has been putted!", 3000);
    };
    QuestionController.prototype.patch = function (request) {
        return this.createPromise("Question #" + request.params.id + " has been patched!", 3000);
    };
    QuestionController.prototype.remove = function (request) {
        return this.createPromise("Question #" + request.params.id + " has been removed!", 3000);
    };
    QuestionController.prototype.createPromise = function (data, timeout) {
        return new Promise(function (ok, fail) {
            setTimeout(function () { return ok(data); }, timeout);
        });
    };
    __decorate([
        Get_1.Get("/questions"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], QuestionController.prototype, "getAll", null);
    __decorate([
        Get_1.Get("/questions/:id"),
        __param(0, Param_1.Param("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], QuestionController.prototype, "getOne", null);
    __decorate([
        Post_1.Post("/questions"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], QuestionController.prototype, "post", null);
    __decorate([
        Put_1.Put("/questions/:id"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], QuestionController.prototype, "put", null);
    __decorate([
        Patch_1.Patch("/questions/:id"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], QuestionController.prototype, "patch", null);
    __decorate([
        Delete_1.Delete("/questions/:id"),
        __param(0, Req_1.Req()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], QuestionController.prototype, "remove", null);
    QuestionController = __decorate([
        JsonController_1.JsonController()
    ], QuestionController);
    return QuestionController;
}());
exports.QuestionController = QuestionController;
//# sourceMappingURL=QuestionController.js.map