"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Directus", {
    enumerable: true,
    get: function() {
        return Directus;
    }
});
var _axios = /*#__PURE__*/ _interopRequireDefault(require("axios"));
var _logger = require("./logger");
var _fs = /*#__PURE__*/ _interopRequireDefault(require("fs"));
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
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
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
    return obj?.__esModule ? obj : {
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
function pascalCase(str) {
    return str.split(" ").flatMap(function(x) {
        return x.split("_");
    }).flatMap(function(y) {
        return y.split("-");
    }).map(function(x) {
        return x.charAt(0).toUpperCase() + x.slice(1);
    }).join("");
}
function getType(field) {
    var useIntersectionTypes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var type;
    if ([
        "integer",
        "bigInteger",
        "float",
        "decimal"
    ].includes(field.type)) {
        type = "number";
    } else if ([
        "boolean"
    ].includes(field.type)) {
        type = "boolean";
    } else if ([
        "json",
        "csv"
    ].includes(field.type)) {
        type = "unknown";
    } else {
        type = "string";
    }
    if (field.relation) {
        type += " ".concat(useIntersectionTypes ? "&" : "|", " ").concat(field.relation.collection ? pascalCase(field.relation.collection) : "any").concat(field.relation.type === "many" ? "[]" : "");
    }
    return type;
}
var Directus = /*#__PURE__*/ function() {
    "use strict";
    function Directus(baseURL, token) {
        _classCallCheck(this, Directus);
        this.collectionsMap = {};
        var _this = this;
        this.getCollections = /*#__PURE__*/ _asyncToGenerator(function() {
            var data;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.api.get("/collections?limit=-1")
                        ];
                    case 1: {
                        data = _state.sent().data;
                        return [
                            2,
                            data.data
                        ];
                    }
                }
            });
        });
        var _this1 = this;
        this.prepareCollections = /*#__PURE__*/ _asyncToGenerator(function() {
            var collections;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this1.getCollections()
                        ];
                    case 1: {
                        collections = _state.sent();
                        _this1.collectionsMap = collections.reduce(function(acc, collection) {
                            acc[collection.collection] = _objectSpreadProps(_objectSpread({}, collection), {
                                fields: []
                            });
                            return acc;
                        }, {});
                        return [
                            2
                        ];
                    }
                }
            });
        });
        var _this2 = this;
        this.checkFields = /*#__PURE__*/ _asyncToGenerator(function() {
            var fields;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this2.getFields()
                        ];
                    case 1: {
                        fields = _state.sent();
                        fields.forEach(function(field) {
                            if (!_this2.collectionsMap[field.collection]) {
                                logger.warn("⚠️ ".concat(field.collection, " is not found"));
                                return;
                            }
                            _this2.collectionsMap[field.collection].fields.push(field);
                        });
                        return [
                            2
                        ];
                    }
                }
            });
        });
        if (!baseURL) {
            throw new Error("baseURL is required");
        }
        if (!token) {
            throw new Error("token is required");
        }
        this.api = _axios.default.create({
            baseURL: baseURL,
            headers: {
                Authorization: "Bearer ".concat(token)
            }
        });
    }
    var _proto = Directus.prototype;
    _proto.testToken = function testToken() {
        var _this = this;
        return _asyncToGenerator(function() {
            var data;
            var error;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0: {
                        _state.trys.push([
                            0,
                            2, undefined
                            ,
                            3
                        ]);
                        return [
                            4,
                            _this.api.get("/users/me")
                        ];
                    }
                    case 1: {
                        data = _state.sent().data;
                        logger.info("✅ Token is valid for user ".concat(data.data.email));
                        return [
                            2,
                            data.data
                        ];
                    }
                    case 2: {
                        error = _state.sent();
                        logger.error("❌ Token is invalid");
                        process.exit(1);
                        return [
                            3,
                            3
                        ];
                    }
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.getFields = function getFields() {
        var _this = this;
        return _asyncToGenerator(function() {
            var data;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.api.get("/fields?limit=-1")
                        ];
                    case 1: {
                        data = _state.sent().data;
                        return [
                            2,
                            data.data
                        ];
                    }
                }
            });
        })();
    };
    _proto.getRelations = function getRelations() {
        var _this = this;
        return _asyncToGenerator(function() {
            var data;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.api.get("/relations?limit=-1")
                        ];
                    case 1: {
                        data = _state.sent().data;
                        return [
                            2,
                            data.data
                        ];
                    }
                }
            });
        })();
    };
    _proto.collections = function collections() {
        var _this = this;
        return _asyncToGenerator(function() {
            var relations;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.prepareCollections()
                        ];
                    case 1: {
                        _state.sent();
                        return [
                            4,
                            _this.checkFields()
                        ];
                    }
                    case 2: {
                        _state.sent();
                        return [
                            4,
                            _this.getRelations()
                        ];
                    }
                    case 3: {
                        relations = _state.sent();
                        relations.forEach(function(relation) {
                            var _relation_meta;
                            var _this_collectionsMap_;
                            var _relation_meta1;
                            var _this_collectionsMap_1;
                            var oneField = (_this_collectionsMap_ = _this.collectionsMap[(_relation_meta = relation.meta) === null || _relation_meta === void 0 ? void 0 : _relation_meta.one_collection]) === null || _this_collectionsMap_ === void 0 ? void 0 : _this_collectionsMap_.fields.find(function(field) {
                                var _relation_meta;
                                return field.field === ((_relation_meta = relation.meta) === null || _relation_meta === void 0 ? void 0 : _relation_meta.one_field);
                            });
                            var manyField = (_this_collectionsMap_1 = _this.collectionsMap[(_relation_meta1 = relation.meta) === null || _relation_meta1 === void 0 ? void 0 : _relation_meta1.many_collection]) === null || _this_collectionsMap_1 === void 0 ? void 0 : _this_collectionsMap_1.fields.find(function(field) {
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
                            _this.collectionsMap
                        ];
                    }
                }
            });
        })();
    };
    _proto.generate = function generate() {
        var useIntersectionTypes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        var _this = this;
        return _asyncToGenerator(function() {
            var collections;
            var ret;
            var types;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.collections()
                        ];
                    case 1: {
                        collections = _state.sent();
                        ret = "";
                        types = [];
                        Object.values(collections).forEach(function(collection) {
                            var collectionName = collection.collection;
                            var typeName = pascalCase(collectionName);
                            types.push("".concat(collectionName, ": ").concat(typeName));
                            ret += "export type ".concat(typeName, " = {\n");
                            collection.fields.forEach(function(field) {
                                var _field_meta;
                                var _field_meta_interface;
                                var _field_schema;
                                if ((_field_meta = field.meta) === null || _field_meta === void 0 ? void 0 : (_field_meta_interface = _field_meta.interface) === null || _field_meta_interface === void 0 ? void 0 : _field_meta_interface.startsWith("presentation-")) {
                                    return;
                                }
                                ret += "  ".concat(field.field.includes("-") ? '"'.concat(field.field, '"') : field.field).concat(((_field_schema = field.schema) === null || _field_schema === void 0 ? void 0 : _field_schema.is_nullable) ? "?" : "", ": ").concat(getType(field, useIntersectionTypes), ";\n");
                            });
                            ret += "};\n\n";
                        });
                        ret += "export type DirectusTypes = {\n" + types.map(function(x) {
                            return "  ".concat(x, ";");
                        }).join("\n") + "\n};";
                        ret += "\n";
                        return [
                            2,
                            ret
                        ];
                    }
                }
            });
        })();
    };
    _proto.generateFile = function generateFile() {
        var path = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "./directus-types.ts";
        var _this = this;
        return _asyncToGenerator(function() {
            var types;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0: {
                        logger.info("\uD83D\uDE80 Generating types...");
                        return [
                            4,
                            _this.generate(false)
                        ];
                    }
                    case 1: {
                        types = _state.sent();
                        logger.info("\uD83D\uDE80 Writing types to file...");
                        _fs.default.writeFileSync(path, types);
                        return [
                            2,
                            types
                        ];
                    }
                }
            });
        })();
    };
    return Directus;
}();
