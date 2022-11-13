"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "chalkLogger", {
    enumerable: true,
    get: function() {
        return chalkLogger;
    }
});
var _chalk = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function chalkLogger() {
    return {
        log: function(message) {
            return console.log(_chalk.default.green(message));
        },
        error: function(message) {
            return console.log(_chalk.default.red(message));
        },
        warn: function(message) {
            return console.log(_chalk.default.yellow(message));
        },
        info: function(message) {
            return console.log(_chalk.default.blue(message));
        }
    };
}
