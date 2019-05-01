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
var Controller_1 = require("../../src/decorator/Controller");
var Get_1 = require("../../src/decorator/Get");
var Res_1 = require("../../src/decorator/Res");
var index_1 = require("../../src/index");
var test_utils_1 = require("./test-utils");
var Render_1 = require("../../src/decorator/Render");
var chakram = require("chakram");
var expect = chakram.expect;
describe("template rendering", function () {
    before(function () {
        // reset metadata args storage
        index_1.getMetadataArgsStorage().reset();
        var RenderController = /** @class */ (function () {
            function RenderController() {
            }
            RenderController.prototype.index = function () {
                return {
                    name: "Routing-controllers"
                };
            };
            RenderController.prototype.locals = function (res) {
                res.locals.myVariable = "my-variable";
                return {
                    name: "Routing-controllers"
                };
            };
            __decorate([
                Get_1.Get("/index"),
                Render_1.Render("render-test-spec.html"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], RenderController.prototype, "index", null);
            __decorate([
                Get_1.Get("/locals"),
                Render_1.Render("render-test-locals-spec.html"),
                __param(0, Res_1.Res()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], RenderController.prototype, "locals", null);
            RenderController = __decorate([
                Controller_1.Controller()
            ], RenderController);
            return RenderController;
        }());
    });
    var expressApp;
    before(function (done) {
        var path = __dirname + "/../../../../test/resources";
        var server = index_1.createExpressServer();
        var mustacheExpress = require("mustache-express");
        server.engine("html", mustacheExpress());
        server.set("view engine", "html");
        server.set("views", path);
        server.use(require("express").static(path));
        expressApp = server.listen(3001, done);
    });
    after(function (done) { return expressApp.close(done); });
    var koaApp;
    before(function (done) {
        var path = __dirname + "/../../../../test/resources";
        var server = index_1.createKoaServer();
        var koaViews = require("koa-views");
        server.use(koaViews(path, { map: { html: "handlebars" } }));
        koaApp = server.listen(3002, done);
    });
    after(function (done) { return koaApp.close(done); });
    describe("should render a template and use given variables", function () {
        test_utils_1.assertRequest([3001, 3002], "get", "index", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.contain("<html>");
            expect(response.body).to.contain("<body>");
            expect(response.body).to.contain("Routing-controllers");
            expect(response.body).to.contain("</body>");
            expect(response.body).to.contain("</html>");
        });
    });
    describe("Express should render a template with given variables and locals variables", function () {
        test_utils_1.assertRequest([3001], "get", "locals", function (response) {
            expect(response).to.have.status(200);
            expect(response.body).to.contain("<html>");
            expect(response.body).to.contain("<body>");
            expect(response.body).to.contain("Routing-controllers");
            expect(response.body).to.contain("my-variable");
            expect(response.body).to.contain("</body>");
            expect(response.body).to.contain("</html>");
        });
    });
});
//# sourceMappingURL=render-decorator.spec.js.map