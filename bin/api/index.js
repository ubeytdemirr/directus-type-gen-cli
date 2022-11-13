"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCollections", {
    enumerable: true,
    get: function() {
        return getCollections;
    }
});
var _axios = /*#__PURE__*/ _interopRequireDefault(require("axios"));
var _logger = require("../utils/logger");
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
        var self = this, args = arguments;
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
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var __generator = (void 0) && (void 0).__generator || function(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
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
                    if (t[2]) _.ops.pop();
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
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var logger = (0, _logger.chalkLogger)();
var _process_env = process.env, DIRECTUS_URL = _process_env.DIRECTUS_URL, DIRECTUS_TOKEN = _process_env.DIRECTUS_TOKEN;
var api = _axios.default.create({
    baseURL: DIRECTUS_URL,
    headers: {
        Authorization: "Bearer ".concat(DIRECTUS_TOKEN)
    }
});
function getCollections() {
    return _getCollections.apply(this, arguments);
}
function _getCollections() {
    _getCollections = _asyncToGenerator(function() {
        var collectionsRes, rawCollections, collections, fieldsRes, fields, relationsRes, relations;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        api.get("/collections?limit=-1")
                    ];
                case 1:
                    collectionsRes = _state.sent();
                    rawCollections = collectionsRes.data.data;
                    collections = {};
                    rawCollections.forEach(function(collection) {
                        return collections[collection.collection] = _objectSpreadProps(_objectSpread({}, collection), {
                            fields: []
                        });
                    });
                    return [
                        4,
                        api.get("/fields?limit=-1")
                    ];
                case 2:
                    fieldsRes = _state.sent();
                    fields = fieldsRes.data.data;
                    fields.forEach(function(field) {
                        if (!collections[field.collection]) {
                            logger.warn("".concat(field.collection, " not found"));
                            return;
                        }
                        collections[field.collection].fields.push(field);
                    });
                    return [
                        4,
                        api.get("/relations?limit=-1")
                    ];
                case 3:
                    relationsRes = _state.sent();
                    relations = relationsRes.data.data;
                    relations.forEach(function(relation) {
                        var _relation_meta, _collections_, _relation_meta1, _collections_1;
                        var oneField = (_collections_ = collections[(_relation_meta = relation.meta) === null || _relation_meta === void 0 ? void 0 : _relation_meta.one_collection]) === null || _collections_ === void 0 ? void 0 : _collections_.fields.find(function(field) {
                            var _relation_meta;
                            return field.field === ((_relation_meta = relation.meta) === null || _relation_meta === void 0 ? void 0 : _relation_meta.one_field);
                        });
                        var manyField = (_collections_1 = collections[(_relation_meta1 = relation.meta) === null || _relation_meta1 === void 0 ? void 0 : _relation_meta1.many_collection]) === null || _collections_1 === void 0 ? void 0 : _collections_1.fields.find(function(field) {
                            var _relation_meta;
                            return field.field === ((_relation_meta = relation.meta) === null || _relation_meta === void 0 ? void 0 : _relation_meta.many_field);
                        });
                        if (oneField) {
                            var _relation_meta2;
                            oneField.relation = {
                                type: "many",
                                collection: (_relation_meta2 = relation.meta) === null || _relation_meta2 === void 0 ? void 0 : _relation_meta2.many_collection
                            };
                        }
                        if (manyField) {
                            var _relation_meta3;
                            manyField.relation = {
                                type: "one",
                                collection: (_relation_meta3 = relation.meta) === null || _relation_meta3 === void 0 ? void 0 : _relation_meta3.one_collection
                            };
                        }
                    });
                    return [
                        2,
                        collections
                    ];
            }
        });
    });
    return _getCollections.apply(this, arguments);
}
