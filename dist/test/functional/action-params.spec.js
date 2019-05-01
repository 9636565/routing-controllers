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
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var User_1 = require("../fakes/global-options/User");
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var Ctx_1 = require("../../src/decorator/Ctx");
var Req_1 = require("../../src/decorator/Req");
var Res_1 = require("../../src/decorator/Res");
var Param_1 = require("../../src/decorator/Param");
var Post_1 = require("../../src/decorator/Post");
var UseBefore_1 = require("../../src/decorator/UseBefore");
var Session_1 = require("../../src/decorator/Session");
var State_1 = require("../../src/decorator/State");
var QueryParam_1 = require("../../src/decorator/QueryParam");
var HeaderParam_1 = require("../../src/decorator/HeaderParam");
var CookieParam_1 = require("../../src/decorator/CookieParam");
var Body_1 = require("../../src/decorator/Body");
var BodyParam_1 = require("../../src/decorator/BodyParam");
var UploadedFile_1 = require("../../src/decorator/UploadedFile");
var UploadedFiles_1 = require("../../src/decorator/UploadedFiles");
var ContentType_1 = require("../../src/decorator/ContentType");
var JsonController_1 = require("../../src/decorator/JsonController");
var chakram = require("chakram");
var expect = chakram.expect;
describe("action parameters", function () {
    var paramUserId, paramFirstId, paramSecondId;
    var sessionTestElement;
    var queryParamSortBy, queryParamCount, queryParamLimit, queryParamShowAll, queryParamFilter;
    var headerParamToken, headerParamCount, headerParamLimit, headerParamShowAll, headerParamFilter;
    var cookieParamToken, cookieParamCount, cookieParamLimit, cookieParamShowAll, cookieParamFilter;
    var body;
    var bodyParamName, bodyParamAge, bodyParamIsActive;
    var uploadedFileName;
    var uploadedFilesFirstName;
    var uploadedFilesSecondName;
    var requestReq, requestRes;
    beforeEach(function () {
        paramUserId = undefined;
        paramFirstId = undefined;
        paramSecondId = undefined;
        sessionTestElement = undefined;
        queryParamSortBy = undefined;
        queryParamCount = undefined;
        queryParamLimit = undefined;
        queryParamShowAll = undefined;
        queryParamFilter = undefined;
        headerParamToken = undefined;
        headerParamCount = undefined;
        headerParamShowAll = undefined;
        headerParamLimit = undefined;
        headerParamFilter = undefined;
        cookieParamToken = undefined;
        cookieParamCount = undefined;
        cookieParamShowAll = undefined;
        cookieParamLimit = undefined;
        cookieParamFilter = undefined;
        body = undefined;
        bodyParamName = undefined;
        bodyParamAge = undefined;
        bodyParamIsActive = undefined;
        uploadedFileName = undefined;
        uploadedFilesFirstName = undefined;
        uploadedFilesSecondName = undefined;
        requestReq = undefined;
        requestRes = undefined;
    });
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var SetStateMiddleware = require("../fakes/global-options/koa-middlewares/SetStateMiddleware").SetStateMiddleware;
        var SessionMiddleware = require("../fakes/global-options/SessionMiddleware").SessionMiddleware;
        var UserActionParamsController = /** @class */ (function () {
            function UserActionParamsController() {
            }
            UserActionParamsController.prototype.getUsers = function (request, response) {
                requestReq = request;
                requestRes = response;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.getUsersDirect = function (response) {
                if (typeof response.send === "function")
                    return response.status(201).contentType("custom/x-sample").send("hi, I was written directly to the response");
                else {
                    response.status = 201;
                    response.type = "custom/x-sample; charset=utf-8";
                    response.body = "hi, I was written directly to the response";
                    return response;
                }
            };
            UserActionParamsController.prototype.getUsersDirectKoa = function (ctx) {
                ctx.response.status = 201;
                ctx.response.type = "custom/x-sample; charset=utf-8";
                ctx.response.body = "hi, I was written directly to the response using Koa Ctx";
                return ctx;
            };
            UserActionParamsController.prototype.getUser = function (userId) {
                paramUserId = userId;
                return "<html><body>" + userId + "</body></html>";
            };
            UserActionParamsController.prototype.getUserPhoto = function (firstId, secondId) {
                paramFirstId = firstId;
                paramSecondId = secondId;
                return "<html><body>" + firstId + "," + secondId + "</body></html>";
            };
            UserActionParamsController.prototype.addToSession = function (session) {
                session["testElement"] = "@Session test";
                session["fakeObject"] = {
                    name: "fake",
                    fake: true,
                    value: 666
                };
                return "<html><body>@Session</body></html>";
            };
            UserActionParamsController.prototype.loadFromSession = function (testElement) {
                sessionTestElement = testElement;
                return "<html><body>" + testElement + "</body></html>";
            };
            UserActionParamsController.prototype.notUseSession = function (testElement) {
                sessionTestElement = testElement;
                return "<html><body>" + testElement + "</body></html>";
            };
            UserActionParamsController.prototype.loadEmptyParamFromSession = function (emptyElement) {
                sessionTestElement = emptyElement;
                return "<html><body>" + (emptyElement === undefined) + "</body></html>";
            };
            UserActionParamsController.prototype.errorOnLoadEmptyParamFromSession = function (emptyElement) {
                sessionTestElement = emptyElement;
                return "<html><body>" + (emptyElement === undefined) + "</body></html>";
            };
            UserActionParamsController.prototype.getState = function (state) {
                return state;
            };
            UserActionParamsController.prototype.getUsernameFromState = function (username) {
                return "<html><body>" + username + "</body></html>";
            };
            UserActionParamsController.prototype.getPhotos = function (sortBy, count, limit, showAll) {
                queryParamSortBy = sortBy;
                queryParamCount = count;
                queryParamLimit = limit;
                queryParamShowAll = showAll;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.getPhotosWithIdRequired = function (limit) {
                queryParamLimit = limit;
                return "<html><body>" + limit + "</body></html>";
            };
            UserActionParamsController.prototype.getPhotosWithJsonParam = function (filter) {
                queryParamFilter = filter;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.getPosts = function (token, count, showAll) {
                headerParamToken = token;
                headerParamCount = count;
                headerParamShowAll = showAll;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.getPostsWithIdRequired = function (limit) {
                headerParamLimit = limit;
                return "<html><body>" + limit + "</body></html>";
            };
            UserActionParamsController.prototype.getPostsWithJsonParam = function (filter) {
                headerParamFilter = filter;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.getQuestions = function (token, count, showAll) {
                cookieParamToken = token;
                cookieParamCount = count;
                cookieParamShowAll = showAll;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.getQuestionsWithIdRequired = function (limit) {
                cookieParamLimit = limit;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.getQuestionsWithJsonParam = function (filter) {
                cookieParamFilter = filter;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.postQuestion = function (question) {
                body = question;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.postRequiredQuestion = function (question) {
                body = question;
                return "<html><body>hello</body></html>";
            };
            UserActionParamsController.prototype.postFile = function (file) {
                uploadedFileName = file.originalname;
                return "<html><body>" + uploadedFileName + "</body></html>";
            };
            UserActionParamsController.prototype.postFileWithBody = function (file, body) {
                uploadedFileName = file.originalname;
                return "<html><body>" + uploadedFileName + " - " + JSON.stringify(body) + "</body></html>";
            };
            UserActionParamsController.prototype.postFileWithBodyParam = function (file, p1) {
                uploadedFileName = file.originalname;
                return "<html><body>" + uploadedFileName + " - " + p1 + "</body></html>";
            };
            UserActionParamsController.prototype.postFileWithLimit = function (file) {
                return "<html><body>" + file.originalname + "</body></html>";
            };
            UserActionParamsController.prototype.postFileWithRequired = function (file) {
                return "<html><body>" + file.originalname + "</body></html>";
            };
            UserActionParamsController.prototype.postPhotos = function (files) {
                uploadedFilesFirstName = files[0].originalname;
                uploadedFilesSecondName = files[1].originalname;
                return "<html><body>" + uploadedFilesFirstName + " " + uploadedFilesSecondName + "</body></html>";
            };
            UserActionParamsController.prototype.postPhotosWithLimit = function (files) {
                return "<html><body>" + files[0].originalname + "</body></html>";
            };
            UserActionParamsController.prototype.postPhotosWithRequired = function (files) {
                return "<html><body>" + files[0].originalname + "</body></html>";
            };
            __decorate([
                Get_1.Get("/users"),
                __param(0, Req_1.Req()), __param(1, Res_1.Res()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object, Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "getUsers", null);
            __decorate([
                Get_1.Get("/users-direct"),
                __param(0, Res_1.Res()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "getUsersDirect", null);
            __decorate([
                Get_1.Get("/users-direct/ctx"),
                __param(0, Ctx_1.Ctx()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "getUsersDirectKoa", null);
            __decorate([
                Get_1.Get("/users/:userId"),
                __param(0, Param_1.Param("userId")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getUser", null);
            __decorate([
                Get_1.Get("/users/:firstId/photos/:secondId"),
                __param(0, Param_1.Param("firstId")),
                __param(1, Param_1.Param("secondId")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number, Number]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getUserPhoto", null);
            __decorate([
                Post_1.Post("/session/"),
                UseBefore_1.UseBefore(SessionMiddleware),
                __param(0, Session_1.Session()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "addToSession", null);
            __decorate([
                Get_1.Get("/session/"),
                UseBefore_1.UseBefore(SessionMiddleware),
                __param(0, Session_1.Session("testElement")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "loadFromSession", null);
            __decorate([
                Get_1.Get("/not-use-session/"),
                __param(0, Session_1.Session("testElement")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "notUseSession", null);
            __decorate([
                Get_1.Get("/session-param-empty/"),
                UseBefore_1.UseBefore(SessionMiddleware),
                __param(0, Session_1.Session("empty", { required: false })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "loadEmptyParamFromSession", null);
            __decorate([
                Get_1.Get("/session-param-empty-error/"),
                UseBefore_1.UseBefore(SessionMiddleware),
                __param(0, Session_1.Session("empty")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "errorOnLoadEmptyParamFromSession", null);
            __decorate([
                Get_1.Get("/state"),
                UseBefore_1.UseBefore(SetStateMiddleware),
                ContentType_1.ContentType("application/json"),
                __param(0, State_1.State()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [User_1.User]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getState", null);
            __decorate([
                Get_1.Get("/state/username"),
                UseBefore_1.UseBefore(SetStateMiddleware),
                __param(0, State_1.State("username")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getUsernameFromState", null);
            __decorate([
                Get_1.Get("/photos"),
                __param(0, QueryParam_1.QueryParam("sortBy")),
                __param(1, QueryParam_1.QueryParam("count")),
                __param(2, QueryParam_1.QueryParam("limit")),
                __param(3, QueryParam_1.QueryParam("showAll")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, String, Number, Boolean]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getPhotos", null);
            __decorate([
                Get_1.Get("/photos-with-required"),
                __param(0, QueryParam_1.QueryParam("limit", { required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getPhotosWithIdRequired", null);
            __decorate([
                Get_1.Get("/photos-with-json"),
                __param(0, QueryParam_1.QueryParam("filter", { parse: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getPhotosWithJsonParam", null);
            __decorate([
                Get_1.Get("/posts"),
                __param(0, HeaderParam_1.HeaderParam("token")),
                __param(1, HeaderParam_1.HeaderParam("count")),
                __param(2, HeaderParam_1.HeaderParam("showAll")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Number, Boolean]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getPosts", null);
            __decorate([
                Get_1.Get("/posts-with-required"),
                __param(0, HeaderParam_1.HeaderParam("limit", { required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getPostsWithIdRequired", null);
            __decorate([
                Get_1.Get("/posts-with-json"),
                __param(0, HeaderParam_1.HeaderParam("filter", { parse: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getPostsWithJsonParam", null);
            __decorate([
                Get_1.Get("/questions"),
                __param(0, CookieParam_1.CookieParam("token")),
                __param(1, CookieParam_1.CookieParam("count")),
                __param(2, CookieParam_1.CookieParam("showAll")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Number, Boolean]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getQuestions", null);
            __decorate([
                Get_1.Get("/questions-with-required"),
                __param(0, CookieParam_1.CookieParam("limit", { required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getQuestionsWithIdRequired", null);
            __decorate([
                Get_1.Get("/questions-with-json"),
                __param(0, CookieParam_1.CookieParam("filter", { parse: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "getQuestionsWithJsonParam", null);
            __decorate([
                Post_1.Post("/questions"),
                __param(0, Body_1.Body()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "postQuestion", null);
            __decorate([
                Post_1.Post("/questions-with-required"),
                __param(0, Body_1.Body({ required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], UserActionParamsController.prototype, "postRequiredQuestion", null);
            __decorate([
                Post_1.Post("/files"),
                __param(0, UploadedFile_1.UploadedFile("myfile")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postFile", null);
            __decorate([
                Post_1.Post("/files-with-body"),
                __param(0, UploadedFile_1.UploadedFile("myfile")), __param(1, Body_1.Body()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object, Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postFileWithBody", null);
            __decorate([
                Post_1.Post("/files-with-body-param"),
                __param(0, UploadedFile_1.UploadedFile("myfile")), __param(1, BodyParam_1.BodyParam("p1")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object, String]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postFileWithBodyParam", null);
            __decorate([
                Post_1.Post("/files-with-limit"),
                __param(0, UploadedFile_1.UploadedFile("myfile", { options: { limits: { fileSize: 2 } } })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postFileWithLimit", null);
            __decorate([
                Post_1.Post("/files-with-required"),
                __param(0, UploadedFile_1.UploadedFile("myfile", { required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postFileWithRequired", null);
            __decorate([
                Post_1.Post("/photos"),
                __param(0, UploadedFiles_1.UploadedFiles("photos")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postPhotos", null);
            __decorate([
                Post_1.Post("/photos-with-limit"),
                __param(0, UploadedFiles_1.UploadedFiles("photos", { options: { limits: { files: 1 } } })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postPhotosWithLimit", null);
            __decorate([
                Post_1.Post("/photos-with-required"),
                __param(0, UploadedFiles_1.UploadedFiles("photos", { required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", Object)
            ], UserActionParamsController.prototype, "postPhotosWithRequired", null);
            UserActionParamsController = __decorate([
                Controller_1.Controller()
            ], UserActionParamsController);
            return UserActionParamsController;
        }());
        var SecondUserActionParamsController = /** @class */ (function () {
            function SecondUserActionParamsController() {
            }
            SecondUserActionParamsController.prototype.postPost = function (question) {
                body = question;
                return body;
            };
            SecondUserActionParamsController.prototype.postRequiredPost = function (post) {
                body = post;
                return body;
            };
            SecondUserActionParamsController.prototype.getPhotosAfter = function (from) {
                return from.toISOString();
            };
            SecondUserActionParamsController.prototype.postUser = function (name, age, isActive) {
                bodyParamName = name;
                bodyParamAge = age;
                bodyParamIsActive = isActive;
                return null;
            };
            SecondUserActionParamsController.prototype.postUserWithRequired = function (name, age, isActive) {
                bodyParamName = name;
                bodyParamAge = age;
                bodyParamIsActive = isActive;
                return null;
            };
            __decorate([
                Post_1.Post("/posts"),
                __param(0, Body_1.Body()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], SecondUserActionParamsController.prototype, "postPost", null);
            __decorate([
                Post_1.Post("/posts-with-required"),
                __param(0, Body_1.Body({ required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], SecondUserActionParamsController.prototype, "postRequiredPost", null);
            __decorate([
                Get_1.Get("/posts-after"),
                __param(0, QueryParam_1.QueryParam("from", { required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Date]),
                __metadata("design:returntype", Object)
            ], SecondUserActionParamsController.prototype, "getPhotosAfter", null);
            __decorate([
                Post_1.Post("/users"),
                __param(0, BodyParam_1.BodyParam("name")),
                __param(1, BodyParam_1.BodyParam("age")),
                __param(2, BodyParam_1.BodyParam("isActive")),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Number, Boolean]),
                __metadata("design:returntype", Object)
            ], SecondUserActionParamsController.prototype, "postUser", null);
            __decorate([
                Post_1.Post("/users-with-required"),
                __param(0, BodyParam_1.BodyParam("name", { required: true })),
                __param(1, BodyParam_1.BodyParam("age", { required: true })),
                __param(2, BodyParam_1.BodyParam("isActive", { required: true })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Number, Boolean]),
                __metadata("design:returntype", Object)
            ], SecondUserActionParamsController.prototype, "postUserWithRequired", null);
            SecondUserActionParamsController = __decorate([
                JsonController_1.JsonController()
            ], SecondUserActionParamsController);
            return SecondUserActionParamsController;
        }());
    });
    var expressApp, koaApp;
    before(function (done) {
        expressApp = index_1.createExpressServer().listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    before(function (done) {
        koaApp = index_1.createKoaServer();
        koaApp.keys = ["koa-session-secret"];
        koaApp = koaApp.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("@Req and @Res should be provided as Request and Response objects", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users", function (response) {
            expect(requestReq).to.be.instanceOf(Object); // apply better check here
            expect(requestRes).to.be.instanceOf(Object); // apply better check here
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    describe("writing directly to the response using @Res should work", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users-direct", function (response) {
            expect(response).to.be.status(201);
            expect(response.body).to.be.equal("hi, I was written directly to the response");
            expect(response).to.have.header("content-type", "custom/x-sample; charset=utf-8");
        });
    });
    describe("writing directly to the response using @Ctx should work", function () {
        test_utils_1.assertRequest([3002], "get", "users-direct/ctx", function (response) {
            expect(response).to.be.status(201);
            expect(response.body).to.be.equal("hi, I was written directly to the response using Koa Ctx");
            expect(response).to.have.header("content-type", "custom/x-sample; charset=utf-8");
        });
    });
    describe("@Param should give a param from route", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users/1", function (response) {
            expect(paramUserId).to.be.equal(1);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>1</body></html>");
        });
    });
    describe("multiple @Param should give a proper values from route", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "users/23/photos/32", function (response) {
            expect(paramFirstId).to.be.equal(23);
            expect(paramSecondId).to.be.equal(32);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>23,32</body></html>");
        });
    });
    describe("@Session middleware not use", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "not-use-session", function (response) {
            expect(response).to.be.status(500);
        });
    });
    describe("@Session should return a value from session", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "session", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>@Session</body></html>");
            test_utils_1.assertRequest([3001, 3002], "get", "session", function (response) {
                expect(response).to.be.status(200);
                expect(response).to.have.header("content-type", "text/html; charset=utf-8");
                expect(response.body).to.be.equal("<html><body>@Session test</body></html>");
                expect(sessionTestElement).to.be.equal("@Session test");
            });
        });
    });
    describe("@Session(param) should allow to inject empty property", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "session-param-empty", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>true</body></html>");
            expect(sessionTestElement).to.be.undefined;
        });
    });
    // TODO: uncomment this after we get rid of calling `next(err)`
    // describe("@Session(param) should throw required error when param is empty", () => {
    //     assertRequest([3001, 3002], "get", "session-param-empty-error", response => {
    //         expect(response).to.be.status(400);
    //         // there should be a test for "ParamRequiredError" but chakram is the worst testing framework ever!!!
    //     });
    // });
    describe("@State should return a value from state", function () {
        test_utils_1.assertRequest([3001], "get", "state", function (response) {
            expect(response).to.be.status(500);
        });
        test_utils_1.assertRequest([3001], "get", "state/username", function (response) {
            expect(response).to.be.status(500);
        });
        test_utils_1.assertRequest([3002], "get", "state", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "application/json");
            expect(response.body.username).to.be.equal("pleerock");
        });
        test_utils_1.assertRequest([3002], "get", "state/username", function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>pleerock</body></html>");
        });
    });
    describe("@QueryParam should give a proper values from request query parameters", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "photos?sortBy=name&count=2&limit=10&showAll=true", function (response) {
            expect(queryParamSortBy).to.be.equal("name");
            expect(queryParamCount).to.be.equal("2");
            expect(queryParamLimit).to.be.equal(10);
            expect(queryParamShowAll).to.be.equal(true);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    describe("for @QueryParam when required is params must be provided and they should not be empty", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "photos-with-required/?limit=0", function (response) {
            expect(queryParamLimit).to.be.equal(0);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>0</body></html>");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos-with-required/?", function (response) {
            expect(response).to.be.status(400);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "photos-with-required/?limit", function (response) {
            expect(response).to.be.status(400);
        });
    });
    describe("for @QueryParam when the type is Date then it should be parsed", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts-after/?from=2017-01-01T00:00:00Z", function (response) {
            expect(response).to.be.status(200);
            expect(response.body).to.be.equal("2017-01-01T00:00:00.000Z");
        });
    });
    describe("for @QueryParam when the type is Date and it is invalid then the response should be a BadRequest error", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "posts-after/?from=InvalidDate", function (response) {
            expect(response).to.be.status(400);
            expect(response.body.name).to.be.equals("BadRequestError");
            expect(response.body.message).to.be.equals("from is invalid! It can't be parsed to date.");
        });
    });
    describe("for @QueryParam when parseJson flag is used query param must be converted to object", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "photos-with-json/?filter={\"keyword\": \"name\", \"limit\": 5}", function (response) {
            expect(queryParamFilter).to.be.eql({ keyword: "name", limit: 5 });
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    describe("@HeaderParam should give a proper values from request headers", function () {
        var requestOptions = {
            headers: {
                token: "31ds31das231sad12",
                count: 20,
                showAll: false
            }
        };
        test_utils_1.assertRequest([3001, 3002], "get", "posts", requestOptions, function (response) {
            expect(headerParamToken).to.be.equal("31ds31das231sad12");
            expect(headerParamCount).to.be.equal(20);
            expect(headerParamShowAll).to.be.equal(false);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    describe("for @HeaderParam when required is params must be provided and they should not be empty", function () {
        var validRequestOptions = {
            headers: {
                limit: 0
            }
        };
        var invalidRequestOptions = {
            headers: {
                filter: ""
            }
        };
        test_utils_1.assertRequest([3001, 3002], "get", "posts-with-required", validRequestOptions, function (response) {
            expect(headerParamLimit).to.be.equal(0);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts-with-required", invalidRequestOptions, function (response) {
            expect(response).to.be.status(400);
        });
        test_utils_1.assertRequest([3001, 3002], "get", "posts-with-required", function (response) {
            expect(response).to.be.status(400);
        });
    });
    describe("for @HeaderParam when parseJson flag is used query param must be converted to object", function () {
        var requestOptions = {
            headers: {
                filter: "{\"keyword\": \"name\", \"limit\": 5}"
            }
        };
        test_utils_1.assertRequest([3001, 3002], "get", "posts-with-json", requestOptions, function (response) {
            expect(headerParamFilter).to.be.eql({ keyword: "name", limit: 5 });
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    describe("@CookieParam should give a proper values from request headers", function () {
        var request = require("request");
        var jar = request.jar();
        var url2 = "http://127.0.0.1:3002/questions";
        jar.setCookie(request.cookie("token=31ds31das231sad12"), url2);
        jar.setCookie(request.cookie("count=20"), url2);
        jar.setCookie(request.cookie("showAll=false"), url2);
        var requestOptions = {
            jar: jar
        };
        test_utils_1.assertRequest([3001, 3002], "get", "questions", requestOptions, function (response) {
            expect(cookieParamToken).to.be.equal("31ds31das231sad12");
            expect(cookieParamCount).to.be.equal(20);
            expect(cookieParamShowAll).to.be.equal(false);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    describe("for @CookieParam when required is params must be provided and they should not be empty", function () {
        var request = require("request");
        var jar = request.jar();
        var url = "http://127.0.0.1:3001/questions-with-required";
        jar.setCookie(request.cookie("limit=20"), url);
        var validRequestOptions = { jar: jar };
        var invalidRequestOptions = { jar: request.jar() };
        test_utils_1.assertRequest([3001, 3002], "get", "questions-with-required", validRequestOptions, function (response) {
            expect(cookieParamLimit).to.be.equal(20);
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
        test_utils_1.assertRequest([3001, 3002], "get", "questions-with-required", invalidRequestOptions, function (response) {
            expect(response).to.be.status(400);
        });
    });
    describe("for @CookieParam when parseJson flag is used query param must be converted to object", function () {
        var request = require("request");
        var jar = request.jar();
        var url = "http://127.0.0.1:3001/questions-with-json";
        jar.setCookie(request.cookie("filter={\"keyword\": \"name\", \"limit\": 5}"), url);
        var requestOptions = { jar: jar };
        test_utils_1.assertRequest([3001, 3002], "get", "questions-with-json", requestOptions, function (response) {
            expect(cookieParamFilter).to.be.eql({ keyword: "name", limit: 5 });
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    describe("@Body should provide a request body", function () {
        var requestOptions = {
            headers: {
                "Content-type": "text/plain"
            },
            json: false
        };
        // todo: koa @Body with text bug. uncomment after fix https://github.com/koajs/bodyparser/issues/52
        test_utils_1.assertRequest([3001 /*, 3002*/], "post", "questions", "hello", requestOptions, function (response) {
            expect(body).to.be.equal("hello");
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
    });
    // todo: koa @Body with text bug. uncomment after fix https://github.com/koajs/bodyparser/issues/52
    describe("@Body should fail if required body was not provided", function () {
        var requestOptions = {
            headers: {
                "Content-type": "text/plain"
            },
            json: false
        };
        test_utils_1.assertRequest([3001 /*, 3002*/], "post", "questions-with-required", "0", requestOptions, function (response) {
            expect(body).to.be.equal("0");
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
        });
        test_utils_1.assertRequest([3001, 3002], "post", "questions-with-required", "", requestOptions, function (response) {
            expect(response).to.be.status(400);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "questions-with-required", undefined, requestOptions, function (response) {
            expect(response).to.be.status(400);
        });
    });
    describe("@Body should provide a json object for json-typed controllers and actions", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "posts", { hello: "world" }, function (response) {
            expect(body).to.be.eql({ hello: "world" });
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "application/json; charset=utf-8");
            expect(response.body).to.be.eql(body); // should we allow to return a text body for json controllers?
        });
    });
    describe("@Body should fail if required body was not provided for json-typed controllers and actions", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "posts-with-required", { hello: "" }, function (response) {
            expect(response).to.be.status(200);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "posts-with-required", undefined, function (response) {
            expect(response).to.be.status(400);
        });
    });
    describe("@BodyParam should provide a json object for json-typed controllers and actions", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "users", { name: "johny", age: 27, isActive: true }, function (response) {
            expect(bodyParamName).to.be.eql("johny");
            expect(bodyParamAge).to.be.eql(27);
            expect(bodyParamIsActive).to.be.eql(true);
            expect(response).to.be.status(204);
        });
    });
    describe("@BodyParam should fail if required body was not provided for json-typed controllers and actions", function () {
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", { name: "johny", age: 27, isActive: true }, function (response) {
            expect(response).to.be.status(204);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", undefined, function (response) {
            expect(response).to.be.status(400);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", { name: "", age: 27, isActive: false }, function (response) {
            expect(response).to.be.status(400);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", { name: "Johny", age: 0, isActive: false }, function (response) {
            expect(response).to.be.status(204);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", { name: "Johny", age: undefined, isActive: false }, function (response) {
            expect(response).to.be.status(400);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", { name: "Johny", age: 27, isActive: undefined }, function (response) {
            expect(response).to.be.status(400);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", { name: "Johny", age: 27, isActive: false }, function (response) {
            expect(response).to.be.status(204);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "users-with-required", { name: "Johny", age: 27, isActive: true }, function (response) {
            expect(response).to.be.status(204);
        });
    });
    describe("@UploadedFile should provide uploaded file with the given name", function () {
        var requestOptions = {
            formData: {
                myfile: {
                    value: "hello world",
                    options: {
                        filename: "hello-world.txt",
                        contentType: "image/text"
                    }
                }
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "files", undefined, requestOptions, function (response) {
            expect(uploadedFileName).to.be.eql("hello-world.txt");
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>hello-world.txt</body></html>");
        });
    });
    describe("@UploadedFile with @Body should return both the file and the body", function () {
        var requestOptions = {
            formData: {
                myfile: {
                    value: "hello world",
                    options: {
                        filename: "hello-world.txt",
                        contentType: "image/text"
                    }
                },
                anotherField: "hi",
                andOther: "hello",
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "files-with-body", undefined, requestOptions, function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>hello-world.txt - {\"anotherField\":\"hi\",\"andOther\":\"hello\"}</body></html>");
        });
    });
    describe("@UploadedFile with @BodyParam should return both the file and the body param", function () {
        var requestOptions = {
            formData: {
                myfile: {
                    value: "hello world",
                    options: {
                        filename: "hello-world.txt",
                        contentType: "image/text"
                    }
                },
                p1: "hi, i'm a param",
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "files-with-body-param", undefined, requestOptions, function (response) {
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>hello-world.txt - hi, i'm a param</body></html>");
        });
    });
    describe("@UploadedFile with passed uploading options (limit) should throw an error", function () {
        var validRequestOptions = {
            formData: {
                myfile: {
                    value: "a",
                    options: {
                        filename: "hello-world.txt",
                        contentType: "image/text"
                    }
                }
            }
        };
        var invalidRequestOptions = {
            formData: {
                myfile: {
                    value: "hello world",
                    options: {
                        filename: "hello-world.txt",
                        contentType: "image/text"
                    }
                }
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "files-with-limit", undefined, validRequestOptions, function (response) {
            expect(response).to.be.status(200);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "files-with-limit", undefined, invalidRequestOptions, function (response) {
            expect(response).to.be.status(500);
        });
    });
    describe("for @UploadedFile when required is used files must be provided", function () {
        var requestOptions = {
            formData: {
                myfile: {
                    value: "hello world",
                    options: {
                        filename: "hello-world.txt",
                        contentType: "image/text"
                    }
                }
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "files-with-required", undefined, requestOptions, function (response) {
            expect(response).to.be.status(200);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "files-with-required", undefined, {}, function (response) {
            expect(response).to.be.status(400);
        });
    });
    describe("@UploadedFiles should provide uploaded files with the given name", function () {
        var requestOptions = {
            formData: {
                photos: [{
                        value: "0110001",
                        options: {
                            filename: "me.jpg",
                            contentType: "image/jpg"
                        }
                    }, {
                        value: "10011010",
                        options: {
                            filename: "she.jpg",
                            contentType: "image/jpg"
                        }
                    }]
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "photos", undefined, requestOptions, function (response) {
            expect(uploadedFilesFirstName).to.be.eql("me.jpg");
            expect(uploadedFilesSecondName).to.be.eql("she.jpg");
            expect(response).to.be.status(200);
            expect(response).to.have.header("content-type", "text/html; charset=utf-8");
            expect(response.body).to.be.equal("<html><body>me.jpg she.jpg</body></html>");
        });
    });
    describe("@UploadedFiles with passed uploading options (limit) should throw an error", function () {
        var validRequestOptions = {
            formData: {
                photos: [{
                        value: "0110001",
                        options: {
                            filename: "me.jpg",
                            contentType: "image/jpg"
                        }
                    }]
            }
        };
        var invalidRequestOptions = {
            formData: {
                photos: [{
                        value: "0110001",
                        options: {
                            filename: "me.jpg",
                            contentType: "image/jpg"
                        }
                    }, {
                        value: "10011010",
                        options: {
                            filename: "she.jpg",
                            contentType: "image/jpg"
                        }
                    }]
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "photos-with-limit", undefined, validRequestOptions, function (response) {
            expect(response).to.be.status(200);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "photos-with-limit", undefined, invalidRequestOptions, function (response) {
            expect(response).to.be.status(500);
        });
    });
    describe("for @UploadedFiles when required is used files must be provided", function () {
        var requestOptions = {
            formData: {
                photos: [{
                        value: "0110001",
                        options: {
                            filename: "me.jpg",
                            contentType: "image/jpg"
                        }
                    }, {
                        value: "10011010",
                        options: {
                            filename: "she.jpg",
                            contentType: "image/jpg"
                        }
                    }]
            }
        };
        test_utils_1.assertRequest([3001, 3002], "post", "photos-with-required", undefined, requestOptions, function (response) {
            expect(response).to.be.status(200);
        });
        test_utils_1.assertRequest([3001, 3002], "post", "photos-with-required", undefined, {}, function (response) {
            expect(response).to.be.status(400);
        });
    });
});
//# sourceMappingURL=action-params.spec.js.map