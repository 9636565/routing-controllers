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
var JsonController_1 = require("../../src/decorator/JsonController");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var typedi_1 = require("typedi");
var container_1 = require("../../src/container");
var Get_1 = require("../../src/decorator/Get");
var chakram = require("chakram");
var expect = chakram.expect;
describe("container", function () {
    describe("using typedi container should be possible", function () {
        before(function () {
            var QuestionRepository = /** @class */ (function () {
                function QuestionRepository() {
                }
                QuestionRepository.prototype.findQuestions = function () {
                    return [{
                            id: 1,
                            title: "question #1"
                        }, {
                            id: 2,
                            title: "question #2"
                        }];
                };
                QuestionRepository = __decorate([
                    typedi_1.Service()
                ], QuestionRepository);
                return QuestionRepository;
            }());
            var PostRepository = /** @class */ (function () {
                function PostRepository() {
                }
                PostRepository.prototype.findPosts = function () {
                    return [{
                            id: 1,
                            title: "post #1"
                        }, {
                            id: 2,
                            title: "post #2"
                        }];
                };
                PostRepository = __decorate([
                    typedi_1.Service()
                ], PostRepository);
                return PostRepository;
            }());
            // reset metadata args storage
            container_1.useContainer(typedi_1.Container);
            index_1.getMetadataArgsStorage().reset();
            var TestContainerController = /** @class */ (function () {
                function TestContainerController(questionRepository, postRepository) {
                    this.questionRepository = questionRepository;
                    this.postRepository = postRepository;
                }
                TestContainerController.prototype.questions = function () {
                    return this.questionRepository.findQuestions();
                };
                TestContainerController.prototype.posts = function () {
                    return this.postRepository.findPosts();
                };
                __decorate([
                    Get_1.Get("/questions"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "questions", null);
                __decorate([
                    Get_1.Get("/posts"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "posts", null);
                TestContainerController = __decorate([
                    typedi_1.Service(),
                    JsonController_1.JsonController(),
                    __metadata("design:paramtypes", [QuestionRepository,
                        PostRepository])
                ], TestContainerController);
                return TestContainerController;
            }());
        });
        after(function () {
            container_1.useContainer(undefined);
        });
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "questions", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "question #1"
                }, {
                    id: 2,
                    title: "question #2"
                }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "post #1"
                }, {
                    id: 2,
                    title: "post #2"
                }]);
        });
    });
    describe("using custom container should be possible", function () {
        before(function () {
            var fakeContainer = {
                services: [],
                get: function (service) {
                    if (!this.services[service.name]) {
                        this.services[service.name] = new service();
                    }
                    return this.services[service.name];
                }
            };
            var QuestionRepository = /** @class */ (function () {
                function QuestionRepository() {
                }
                QuestionRepository.prototype.findQuestions = function () {
                    return [{
                            id: 1,
                            title: "question #1"
                        }, {
                            id: 2,
                            title: "question #2"
                        }];
                };
                return QuestionRepository;
            }());
            var PostRepository = /** @class */ (function () {
                function PostRepository() {
                }
                PostRepository.prototype.findPosts = function () {
                    return [{
                            id: 1,
                            title: "post #1"
                        }, {
                            id: 2,
                            title: "post #2"
                        }];
                };
                return PostRepository;
            }());
            // reset metadata args storage
            container_1.useContainer(fakeContainer);
            index_1.getMetadataArgsStorage().reset();
            var TestContainerController = /** @class */ (function () {
                function TestContainerController(questionRepository, postRepository) {
                    this.questionRepository = questionRepository;
                    this.postRepository = postRepository;
                }
                TestContainerController.prototype.questions = function () {
                    return this.questionRepository.findQuestions();
                };
                TestContainerController.prototype.posts = function () {
                    return this.postRepository.findPosts();
                };
                __decorate([
                    Get_1.Get("/questions"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "questions", null);
                __decorate([
                    Get_1.Get("/posts"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "posts", null);
                TestContainerController = __decorate([
                    JsonController_1.JsonController(),
                    __metadata("design:paramtypes", [QuestionRepository,
                        PostRepository])
                ], TestContainerController);
                return TestContainerController;
            }());
            var postRepository = new PostRepository();
            var questionRepository = new QuestionRepository();
            fakeContainer.services["TestContainerController"] = new TestContainerController(questionRepository, postRepository);
        });
        after(function () {
            container_1.useContainer(undefined);
        });
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "questions", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "question #1"
                }, {
                    id: 2,
                    title: "question #2"
                }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "post #1"
                }, {
                    id: 2,
                    title: "post #2"
                }]);
        });
    });
    describe("using custom container with fallback should be possible", function () {
        before(function () {
            var fakeContainer = {
                services: [],
                get: function (service) {
                    return this.services[service.name];
                }
            };
            var QuestionRepository = /** @class */ (function () {
                function QuestionRepository() {
                }
                QuestionRepository.prototype.findQuestions = function () {
                    return [{
                            id: 1,
                            title: "question #1"
                        }, {
                            id: 2,
                            title: "question #2"
                        }];
                };
                return QuestionRepository;
            }());
            var PostRepository = /** @class */ (function () {
                function PostRepository() {
                }
                PostRepository.prototype.findPosts = function () {
                    return [{
                            id: 1,
                            title: "post #1"
                        }, {
                            id: 2,
                            title: "post #2"
                        }];
                };
                return PostRepository;
            }());
            // reset metadata args storage
            container_1.useContainer(fakeContainer, { fallback: true });
            index_1.getMetadataArgsStorage().reset();
            var TestContainerController = /** @class */ (function () {
                function TestContainerController(questionRepository, postRepository) {
                    this.questionRepository = questionRepository;
                    this.postRepository = postRepository;
                }
                TestContainerController.prototype.questions = function () {
                    return this.questionRepository.findQuestions();
                };
                TestContainerController.prototype.posts = function () {
                    return this.postRepository.findPosts();
                };
                __decorate([
                    Get_1.Get("/questions"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "questions", null);
                __decorate([
                    Get_1.Get("/posts"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "posts", null);
                TestContainerController = __decorate([
                    JsonController_1.JsonController(),
                    __metadata("design:paramtypes", [QuestionRepository,
                        PostRepository])
                ], TestContainerController);
                return TestContainerController;
            }());
            var SecondTestContainerController = /** @class */ (function () {
                function SecondTestContainerController() {
                }
                SecondTestContainerController.prototype.photos = function () {
                    return [{
                            id: 1,
                            title: "photo #1"
                        }, {
                            id: 2,
                            title: "photo #2"
                        }];
                };
                __decorate([
                    Get_1.Get("/photos"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], SecondTestContainerController.prototype, "photos", null);
                SecondTestContainerController = __decorate([
                    JsonController_1.JsonController()
                ], SecondTestContainerController);
                return SecondTestContainerController;
            }());
            var postRepository = new PostRepository();
            var questionRepository = new QuestionRepository();
            fakeContainer.services["TestContainerController"] = new TestContainerController(questionRepository, postRepository);
        });
        after(function () {
            container_1.useContainer(undefined);
        });
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "questions", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "question #1"
                }, {
                    id: 2,
                    title: "question #2"
                }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "post #1"
                }, {
                    id: 2,
                    title: "post #2"
                }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "photo #1"
                }, {
                    id: 2,
                    title: "photo #2"
                }]);
        });
    });
    describe("using custom container with fallback and fallback on throw error should be possible", function () {
        before(function () {
            var fakeContainer = {
                services: [],
                get: function (service) {
                    if (!this.services[service.name])
                        throw new Error("Provider was not found for " + service.name);
                    return this.services[service.name];
                }
            };
            var QuestionRepository = /** @class */ (function () {
                function QuestionRepository() {
                }
                QuestionRepository.prototype.findQuestions = function () {
                    return [{
                            id: 1,
                            title: "question #1"
                        }, {
                            id: 2,
                            title: "question #2"
                        }];
                };
                return QuestionRepository;
            }());
            var PostRepository = /** @class */ (function () {
                function PostRepository() {
                }
                PostRepository.prototype.findPosts = function () {
                    return [{
                            id: 1,
                            title: "post #1"
                        }, {
                            id: 2,
                            title: "post #2"
                        }];
                };
                return PostRepository;
            }());
            // reset metadata args storage
            container_1.useContainer(fakeContainer, { fallback: true, fallbackOnErrors: true });
            index_1.getMetadataArgsStorage().reset();
            var TestContainerController = /** @class */ (function () {
                function TestContainerController(questionRepository, postRepository) {
                    this.questionRepository = questionRepository;
                    this.postRepository = postRepository;
                }
                TestContainerController.prototype.questions = function () {
                    return this.questionRepository.findQuestions();
                };
                TestContainerController.prototype.posts = function () {
                    return this.postRepository.findPosts();
                };
                __decorate([
                    Get_1.Get("/questions"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "questions", null);
                __decorate([
                    Get_1.Get("/posts"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], TestContainerController.prototype, "posts", null);
                TestContainerController = __decorate([
                    JsonController_1.JsonController(),
                    __metadata("design:paramtypes", [QuestionRepository,
                        PostRepository])
                ], TestContainerController);
                return TestContainerController;
            }());
            var SecondTestContainerController = /** @class */ (function () {
                function SecondTestContainerController() {
                }
                SecondTestContainerController.prototype.photos = function () {
                    return [{
                            id: 1,
                            title: "photo #1"
                        }, {
                            id: 2,
                            title: "photo #2"
                        }];
                };
                __decorate([
                    Get_1.Get("/photos"),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", Array)
                ], SecondTestContainerController.prototype, "photos", null);
                SecondTestContainerController = __decorate([
                    JsonController_1.JsonController()
                ], SecondTestContainerController);
                return SecondTestContainerController;
            }());
            var postRepository = new PostRepository();
            var questionRepository = new QuestionRepository();
            fakeContainer.services["TestContainerController"] = new TestContainerController(questionRepository, postRepository);
        });
        after(function () {
            container_1.useContainer(undefined);
        });
        var expressApp, koaApp;
        before(function (done) { return expressApp = index_1.createExpressServer().listen(3001, done); });
        after(function (done) { return expressApp.close(done); });
        before(function (done) { return koaApp = index_1.createKoaServer().listen(3002, done); });
        after(function (done) { return koaApp.close(done); });
        test_utils_1.assertRequest([3001, 3002], "get", "questions", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "question #1"
                }, {
                    id: 2,
                    title: "question #2"
                }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "post #1"
                }, {
                    id: 2,
                    title: "post #2"
                }]);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.be.eql([{
                    id: 1,
                    title: "photo #1"
                }, {
                    id: 2,
                    title: "photo #2"
                }]);
        });
    });
});
//# sourceMappingURL=container.spec.js.map