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
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var FakeService_1 = require("../fakes/global-options/FakeService");
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var chakram = require("chakram");
var expect = chakram.expect;
describe("controllers and middlewares bulk loading from directories", function () {
    describe("loading all controllers from the given directories", function () {
        before(function () { return index_1.getMetadataArgsStorage().reset(); });
        var serverOptions = {
            controllers: [
                __dirname + "/../fakes/global-options/first-controllers/**/*{.js,.ts}",
                __dirname + "/../fakes/global-options/second-controllers/*{.js,.ts}"
            ]
        };
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer(serverOptions).listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer(serverOptions).listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "posts", function (response) {
            expect(response.body).to.be.eql([{ id: 1, title: "#1" }, { id: 2, title: "#2" }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "questions", function (response) {
            expect(response.body).to.be.eql([{ id: 1, title: "#1" }, { id: 2, title: "#2" }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "answers", function (response) {
            expect(response.body).to.be.eql([{ id: 1, title: "#1" }, { id: 2, title: "#2" }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos", function (response) {
            expect(response.body).to.be.eql("Hello photos");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "videos", function (response) {
            expect(response.body).to.be.eql("Hello videos");
        });
    });
    describe("loading all express middlewares and error handlers from the given directories", function () {
        before(function () { return index_1.getMetadataArgsStorage().reset(); });
        before(function () {
            var ExpressMiddlewareDirectoriesController = /** @class */ (function () {
                function ExpressMiddlewareDirectoriesController() {
                }
                ExpressMiddlewareDirectoriesController.prototype.publications = function () {
                    return [];
                };
                ExpressMiddlewareDirectoriesController.prototype.articles = function () {
                    throw new Error("Cannot load articles");
                };
                __decorate([
                    Get_1.Get("/publications"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], ExpressMiddlewareDirectoriesController.prototype, "publications", null);
                __decorate([
                    Get_1.Get("/articles"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], ExpressMiddlewareDirectoriesController.prototype, "articles", null);
                ExpressMiddlewareDirectoriesController = __decorate([
                    Controller_1.Controller()
                ], ExpressMiddlewareDirectoriesController);
                return ExpressMiddlewareDirectoriesController;
            }());
        });
        var serverOptions = {
            middlewares: [
                __dirname + "/../fakes/global-options/express-middlewares/**/*{.js,.ts}"
            ],
        };
        var expressApp;
        before(function (done) { return expressApp = index_1.createExpressServer(serverOptions).listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        beforeEach(function () { return FakeService_1.defaultFakeService.reset(); });
        test_utils_1.assertRequest([3001], "get", "publications", function (response) {
            expect(response).to.have.status(200);
            expect(FakeService_1.defaultFakeService.postMiddlewareCalled).to.be.true;
            expect(FakeService_1.defaultFakeService.questionMiddlewareCalled).to.be.true;
            expect(FakeService_1.defaultFakeService.questionErrorMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.fileMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.videoMiddlewareCalled).to.be.false;
        });
        test_utils_1.assertRequest([3001], "get", "articles", function (response) {
            expect(response).to.have.status(500);
            expect(FakeService_1.defaultFakeService.postMiddlewareCalled).to.be.true;
            expect(FakeService_1.defaultFakeService.questionMiddlewareCalled).to.be.true;
            expect(FakeService_1.defaultFakeService.questionErrorMiddlewareCalled).to.be.true;
            expect(FakeService_1.defaultFakeService.fileMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.videoMiddlewareCalled).to.be.false;
        });
    });
    describe("loading all koa middlewares from the given directories", function () {
        before(function () { return index_1.getMetadataArgsStorage().reset(); });
        before(function () {
            var KoaMiddlewareDirectoriesController = /** @class */ (function () {
                function KoaMiddlewareDirectoriesController() {
                }
                KoaMiddlewareDirectoriesController.prototype.publications = function () {
                    return [];
                };
                KoaMiddlewareDirectoriesController.prototype.articles = function () {
                    throw new Error("Cannot load articles");
                };
                __decorate([
                    Get_1.Get("/publications"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], KoaMiddlewareDirectoriesController.prototype, "publications", null);
                __decorate([
                    Get_1.Get("/articles"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], KoaMiddlewareDirectoriesController.prototype, "articles", null);
                KoaMiddlewareDirectoriesController = __decorate([
                    Controller_1.Controller()
                ], KoaMiddlewareDirectoriesController);
                return KoaMiddlewareDirectoriesController;
            }());
        });
        var serverOptions = {
            middlewares: [
                __dirname + "/../fakes/global-options/koa-middlewares/**/*{.js,.ts}"
            ]
        };
        var koaApp;
        before(function (done) { return koaApp = index_1.createKoaServer(serverOptions).listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        beforeEach(function () { return FakeService_1.defaultFakeService.reset(); });
        test_utils_1.assertRequest([3002], "get", "publications", function (response) {
            expect(response).to.have.status(200);
            expect(FakeService_1.defaultFakeService.postMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.questionMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.questionErrorMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.fileMiddlewareCalled).to.be.true;
            expect(FakeService_1.defaultFakeService.videoMiddlewareCalled).to.be.true;
        });
        test_utils_1.assertRequest([3002], "get", "articles", function (response) {
            // expect(response).to.have.status(500);
            expect(FakeService_1.defaultFakeService.postMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.questionMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.questionErrorMiddlewareCalled).to.be.false;
            expect(FakeService_1.defaultFakeService.fileMiddlewareCalled).to.be.true;
            expect(FakeService_1.defaultFakeService.videoMiddlewareCalled).to.be.true;
        });
    });
});
/*
fakeContainer.services[(FakeService as any).name] = sinon.stub(new FakeService());
// container: fakeContainer*/
//# sourceMappingURL=load-from-directory.spec.js.map