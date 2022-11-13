#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _api = require("./utils/api");
var _argv = /*#__PURE__*/ _interopRequireDefault(require("argv"));
var _logger = require("./utils/logger");
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) { len = arr.length; }
    for(var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; }
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) { return arr; }
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this;
        var args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _interopRequireDefault(obj) {
    return obj?.__esModule ? obj : {
        default: obj
    };
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) { return; }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s;
    var _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) { break; }
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) { _i["return"](); }
        } finally{
            if (_d) { throw _e; }
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) { return; }
    if (typeof o === "string") { return _arrayLikeToArray(o, minLen); }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) { n = o.constructor.name; }
    if (n === "Map" || n === "Set") { return Array.from(n); }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) { return _arrayLikeToArray(o, minLen); }
}
var __generator = (void 0) && (void 0).__generator || function(thisArg, body) {
    var f;
    var y;
    var t;
    var g;
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) { throw t[1]; }
            return t[1];
        },
        trys: [],
        ops: []
    };
    return(g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g);
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) { throw new TypeError("Generator is already executing."); }
        while(_) { try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) { return t; }
            if (y = 0, t) { op = [
                op[0] & 2,
                t.value
            ]; }
            switch(op[0]){
                case 0:
                case 1: {
                    t = op;
                    break;
                }
                case 4: {
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                }
                case 5: {
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                }
                case 7: {
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) { _.ops.pop(); }
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        } }
        if (op[0] & 5) { throw op[1]; }
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var logger = (0, _logger.chalkLogger)();
var main = function() {
    var _ref = _asyncToGenerator(function() {
        var args;
        var _args_targets;
        var directusURL;
        var directusToken;
        var outputPath;
        var directus;
        var types;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0: {
                    args = _argv.default.option([
                        {
                            name: "directusURL",
                            short: "u",
                            type: "string"
                        },
                        {
                            name: "directusToken",
                            short: "t",
                            type: "string"
                        },
                        {
                            name: "outputPath",
                            short: "o",
                            type: "string"
                        }
                    ]).run();
                    _args_targets = _slicedToArray(args.targets, 3), directusURL = _args_targets[0], directusToken = _args_targets[1], outputPath = _args_targets[2];
                    if (!directusURL) {
                        logger.error("❌ directusURL is required (-u) ");
                        return [
                            2,
                            process.exit(1)
                        ];
                    }
                    if (!directusToken) {
                        logger.error("❌ directusToken is required (-t)");
                    }
                    directus = new _api.Directus(directusURL, directusToken);
                    return [
                        4,
                        directus.testToken()
                    ];
                }
                case 1: {
                    _state.sent();
                    return [
                        4,
                        directus.generateFile(outputPath)
                    ];
                }
                case 2: {
                    types = _state.sent();
                    logger.info("✅ Done");
                    return [
                        2
                    ];
                }
            }
        });
    });
    return function main() {
        return _ref.apply(this, arguments);
    };
}();
main();
