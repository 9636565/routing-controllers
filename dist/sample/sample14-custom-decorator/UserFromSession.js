"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../src/index");
var User_1 = require("./User");
/**
 * Simple decorator - re-implementation of CurrentUser decorator.
 */
function UserFromSession(options) {
    return index_1.createParamDecorator({
        required: options && options.required ? true : false,
        value: function (action) {
            // perform queries based on token from request headers
            // const token = action.request.headers["authorization"];
            // return database.findUserByToken(token);
            return new User_1.User(1, "Johny", "Cage");
        }
    });
}
exports.UserFromSession = UserFromSession;
//# sourceMappingURL=UserFromSession.js.map