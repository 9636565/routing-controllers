"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var HttpError_1 = require("../../src/http-error/HttpError");
var BadRequestError_1 = require("../../src/http-error/BadRequestError");
describe("using Error subclasses should be possible,", function () {
    describe("HttpError", function () {
        it("should be instance of HttpError and Error", function () {
            var error = new HttpError_1.HttpError(418, "Error message");
            chai_1.expect(error.httpCode).to.equals(418);
            chai_1.expect(error.message).to.equals("Error message");
            chai_1.expect(error).to.be.instanceOf(HttpError_1.HttpError);
            chai_1.expect(error).to.be.instanceOf(Error);
        });
    });
    describe("BadRequestError", function () {
        it("should be instance of BadRequestError, HttpError and Error", function () {
            var error = new BadRequestError_1.BadRequestError("Error message");
            chai_1.expect(error.httpCode).to.equals(400);
            chai_1.expect(error.message).to.equals("Error message");
            chai_1.expect(error).to.be.instanceOf(BadRequestError_1.BadRequestError);
            chai_1.expect(error).to.be.instanceOf(HttpError_1.HttpError);
            chai_1.expect(error).to.be.instanceOf(Error);
        });
    });
});
//# sourceMappingURL=error-subclasses.spec.js.map