"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserFilter = /** @class */ (function () {
    function UserFilter() {
    }
    UserFilter.prototype.hasKeyword = function () {
        return this.keyword && this.keyword.length > 2;
    };
    return UserFilter;
}());
exports.UserFilter = UserFilter;
//# sourceMappingURL=UserFilter.js.map