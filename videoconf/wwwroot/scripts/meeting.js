(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// We don't actually ever use the API being polyfilled, we always use the polyfill because
// it's a very new API right now.
// Not exported from index.
/** @private */
var AbortController = /** @class */ (function () {
    function AbortController() {
        this.isAborted = false;
        this.onabort = null;
    }
    AbortController.prototype.abort = function () {
        if (!this.isAborted) {
            this.isAborted = true;
            if (this.onabort) {
                this.onabort();
            }
        }
    };
    Object.defineProperty(AbortController.prototype, "signal", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbortController.prototype, "aborted", {
        get: function () {
            return this.isAborted;
        },
        enumerable: true,
        configurable: true
    });
    return AbortController;
}());
exports.AbortController = AbortController;
//# sourceMappingURL=AbortController.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\AbortController.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var FetchHttpClient_1 = require("./FetchHttpClient");
var HttpClient_1 = require("./HttpClient");
var Utils_1 = require("./Utils");
var XhrHttpClient_1 = require("./XhrHttpClient");
/** Default implementation of {@link @microsoft/signalr.HttpClient}. */
var DefaultHttpClient = /** @class */ (function (_super) {
    __extends(DefaultHttpClient, _super);
    /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
    function DefaultHttpClient(logger) {
        var _this = _super.call(this) || this;
        if (typeof fetch !== "undefined" || Utils_1.Platform.isNode) {
            _this.httpClient = new FetchHttpClient_1.FetchHttpClient(logger);
        }
        else if (typeof XMLHttpRequest !== "undefined") {
            _this.httpClient = new XhrHttpClient_1.XhrHttpClient(logger);
        }
        else {
            throw new Error("No usable HttpClient found.");
        }
        return _this;
    }
    /** @inheritDoc */
    DefaultHttpClient.prototype.send = function (request) {
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new Errors_1.AbortError());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return this.httpClient.send(request);
    };
    DefaultHttpClient.prototype.getCookieString = function (url) {
        return this.httpClient.getCookieString(url);
    };
    return DefaultHttpClient;
}(HttpClient_1.HttpClient));
exports.DefaultHttpClient = DefaultHttpClient;
//# sourceMappingURL=DefaultHttpClient.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\DefaultHttpClient.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./Errors":4,"./FetchHttpClient":5,"./HttpClient":7,"./Utils":20,"./XhrHttpClient":22,"buffer":25,"e/U+97":27}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// 0, 2, 10, 30 second delays before reconnect attempts.
var DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2000, 10000, 30000, null];
/** @private */
var DefaultReconnectPolicy = /** @class */ (function () {
    function DefaultReconnectPolicy(retryDelays) {
        this.retryDelays = retryDelays !== undefined ? retryDelays.concat([null]) : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
    }
    DefaultReconnectPolicy.prototype.nextRetryDelayInMilliseconds = function (retryContext) {
        return this.retryDelays[retryContext.previousRetryCount];
    };
    return DefaultReconnectPolicy;
}());
exports.DefaultReconnectPolicy = DefaultReconnectPolicy;
//# sourceMappingURL=DefaultReconnectPolicy.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\DefaultReconnectPolicy.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** Error thrown when an HTTP request fails. */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    function HttpError(errorMessage, statusCode) {
        var _newTarget = this.constructor;
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        _this.statusCode = statusCode;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
/** Error thrown when a timeout elapses. */
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function TimeoutError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "A timeout occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
/** Error thrown when an action is aborted. */
var AbortError = /** @class */ (function (_super) {
    __extends(AbortError, _super);
    /** Constructs a new instance of {@link AbortError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function AbortError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "An abort occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return AbortError;
}(Error));
exports.AbortError = AbortError;
//# sourceMappingURL=Errors.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\Errors.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var HttpClient_1 = require("./HttpClient");
var ILogger_1 = require("./ILogger");
var Utils_1 = require("./Utils");
var FetchHttpClient = /** @class */ (function (_super) {
    __extends(FetchHttpClient, _super);
    function FetchHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        if (typeof fetch === "undefined") {
            // In order to ignore the dynamic require in webpack builds we need to do this magic
            // @ts-ignore: TS doesn't know about these names
            var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
            // Cookies aren't automatically handled in Node so we need to add a CookieJar to preserve cookies across requests
            _this.jar = new (requireFunc("tough-cookie")).CookieJar();
            _this.fetchType = requireFunc("node-fetch");
            // node-fetch doesn't have a nice API for getting and setting cookies
            // fetch-cookie will wrap a fetch implementation with a default CookieJar or a provided one
            _this.fetchType = requireFunc("fetch-cookie")(_this.fetchType, _this.jar);
            // Node needs EventListener methods on AbortController which our custom polyfill doesn't provide
            _this.abortControllerType = requireFunc("abort-controller");
        }
        else {
            _this.fetchType = fetch.bind(self);
            _this.abortControllerType = AbortController;
        }
        return _this;
    }
    /** @inheritDoc */
    FetchHttpClient.prototype.send = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var abortController, error, timeoutId, msTimeout, response, e_1, content, payload;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check that abort was not signaled before calling send
                        if (request.abortSignal && request.abortSignal.aborted) {
                            throw new Errors_1.AbortError();
                        }
                        if (!request.method) {
                            throw new Error("No method defined.");
                        }
                        if (!request.url) {
                            throw new Error("No url defined.");
                        }
                        abortController = new this.abortControllerType();
                        // Hook our abortSignal into the abort controller
                        if (request.abortSignal) {
                            request.abortSignal.onabort = function () {
                                abortController.abort();
                                error = new Errors_1.AbortError();
                            };
                        }
                        timeoutId = null;
                        if (request.timeout) {
                            msTimeout = request.timeout;
                            timeoutId = setTimeout(function () {
                                abortController.abort();
                                _this.logger.log(ILogger_1.LogLevel.Warning, "Timeout from HTTP request.");
                                error = new Errors_1.TimeoutError();
                            }, msTimeout);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.fetchType(request.url, {
                                body: request.content,
                                cache: "no-cache",
                                credentials: request.withCredentials === true ? "include" : "same-origin",
                                headers: __assign({ "Content-Type": "text/plain;charset=UTF-8", "X-Requested-With": "XMLHttpRequest" }, request.headers),
                                method: request.method,
                                mode: "cors",
                                redirect: "manual",
                                signal: abortController.signal,
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        if (error) {
                            throw error;
                        }
                        this.logger.log(ILogger_1.LogLevel.Warning, "Error from HTTP request. " + e_1 + ".");
                        throw e_1;
                    case 4:
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        if (request.abortSignal) {
                            request.abortSignal.onabort = null;
                        }
                        return [7 /*endfinally*/];
                    case 5:
                        if (!response.ok) {
                            throw new Errors_1.HttpError(response.statusText, response.status);
                        }
                        content = deserializeContent(response, request.responseType);
                        return [4 /*yield*/, content];
                    case 6:
                        payload = _a.sent();
                        return [2 /*return*/, new HttpClient_1.HttpResponse(response.status, response.statusText, payload)];
                }
            });
        });
    };
    FetchHttpClient.prototype.getCookieString = function (url) {
        var cookies = "";
        if (Utils_1.Platform.isNode && this.jar) {
            // @ts-ignore: unused variable
            this.jar.getCookies(url, function (e, c) { return cookies = c.join("; "); });
        }
        return cookies;
    };
    return FetchHttpClient;
}(HttpClient_1.HttpClient));
exports.FetchHttpClient = FetchHttpClient;
function deserializeContent(response, responseType) {
    var content;
    switch (responseType) {
        case "arraybuffer":
            content = response.arrayBuffer();
            break;
        case "text":
            content = response.text();
            break;
        case "blob":
        case "document":
        case "json":
            throw new Error(responseType + " is not supported.");
        default:
            content = response.text();
            break;
    }
    return content;
}
//# sourceMappingURL=FetchHttpClient.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\FetchHttpClient.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./Errors":4,"./HttpClient":7,"./ILogger":12,"./Utils":20,"buffer":25,"e/U+97":27}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var TextMessageFormat_1 = require("./TextMessageFormat");
var Utils_1 = require("./Utils");
/** @private */
var HandshakeProtocol = /** @class */ (function () {
    function HandshakeProtocol() {
    }
    // Handshake request is always JSON
    HandshakeProtocol.prototype.writeHandshakeRequest = function (handshakeRequest) {
        return TextMessageFormat_1.TextMessageFormat.write(JSON.stringify(handshakeRequest));
    };
    HandshakeProtocol.prototype.parseHandshakeResponse = function (data) {
        var responseMessage;
        var messageData;
        var remainingData;
        if (Utils_1.isArrayBuffer(data) || (typeof Buffer !== "undefined" && data instanceof Buffer)) {
            // Format is binary but still need to read JSON text from handshake response
            var binaryData = new Uint8Array(data);
            var separatorIndex = binaryData.indexOf(TextMessageFormat_1.TextMessageFormat.RecordSeparatorCode);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = String.fromCharCode.apply(null, binaryData.slice(0, responseLength));
            remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
        }
        else {
            var textData = data;
            var separatorIndex = textData.indexOf(TextMessageFormat_1.TextMessageFormat.RecordSeparator);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = textData.substring(0, responseLength);
            remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
        }
        // At this point we should have just the single handshake message
        var messages = TextMessageFormat_1.TextMessageFormat.parse(messageData);
        var response = JSON.parse(messages[0]);
        if (response.type) {
            throw new Error("Expected a handshake response from the server.");
        }
        responseMessage = response;
        // multiple messages could have arrived with handshake
        // return additional data to be parsed as usual, or null if all parsed
        return [remainingData, responseMessage];
    };
    return HandshakeProtocol;
}());
exports.HandshakeProtocol = HandshakeProtocol;
//# sourceMappingURL=HandshakeProtocol.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\HandshakeProtocol.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./TextMessageFormat":19,"./Utils":20,"buffer":25,"e/U+97":27}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Represents an HTTP response. */
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, statusText, content) {
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.content = content;
    }
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
/** Abstraction over an HTTP client.
 *
 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url, options) {
        return this.send(__assign({}, options, { method: "GET", url: url }));
    };
    HttpClient.prototype.post = function (url, options) {
        return this.send(__assign({}, options, { method: "POST", url: url }));
    };
    HttpClient.prototype.delete = function (url, options) {
        return this.send(__assign({}, options, { method: "DELETE", url: url }));
    };
    /** Gets all cookies that apply to the specified URL.
     *
     * @param url The URL that the cookies are valid for.
     * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
     */
    // @ts-ignore
    HttpClient.prototype.getCookieString = function (url) {
        return "";
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\HttpClient.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultHttpClient_1 = require("./DefaultHttpClient");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var LongPollingTransport_1 = require("./LongPollingTransport");
var ServerSentEventsTransport_1 = require("./ServerSentEventsTransport");
var Utils_1 = require("./Utils");
var WebSocketTransport_1 = require("./WebSocketTransport");
var MAX_REDIRECTS = 100;
/** @private */
var HttpConnection = /** @class */ (function () {
    function HttpConnection(url, options) {
        if (options === void 0) { options = {}; }
        this.features = {};
        this.negotiateVersion = 1;
        Utils_1.Arg.isRequired(url, "url");
        this.logger = Utils_1.createLogger(options.logger);
        this.baseUrl = this.resolveUrl(url);
        options = options || {};
        options.logMessageContent = options.logMessageContent === undefined ? false : options.logMessageContent;
        if (typeof options.withCredentials === "boolean" || options.withCredentials === undefined) {
            options.withCredentials = options.withCredentials === undefined ? true : options.withCredentials;
        }
        else {
            throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
        }
        var webSocketModule = null;
        var eventSourceModule = null;
        if (Utils_1.Platform.isNode && typeof require !== "undefined") {
            // In order to ignore the dynamic require in webpack builds we need to do this magic
            // @ts-ignore: TS doesn't know about these names
            var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
            webSocketModule = requireFunc("ws");
            eventSourceModule = requireFunc("eventsource");
        }
        if (!Utils_1.Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
            options.WebSocket = WebSocket;
        }
        else if (Utils_1.Platform.isNode && !options.WebSocket) {
            if (webSocketModule) {
                options.WebSocket = webSocketModule;
            }
        }
        if (!Utils_1.Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
            options.EventSource = EventSource;
        }
        else if (Utils_1.Platform.isNode && !options.EventSource) {
            if (typeof eventSourceModule !== "undefined") {
                options.EventSource = eventSourceModule;
            }
        }
        this.httpClient = options.httpClient || new DefaultHttpClient_1.DefaultHttpClient(this.logger);
        this.connectionState = "Disconnected" /* Disconnected */;
        this.connectionStarted = false;
        this.options = options;
        this.onreceive = null;
        this.onclose = null;
    }
    HttpConnection.prototype.start = function (transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var message, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transferFormat = transferFormat || ITransport_1.TransferFormat.Binary;
                        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
                        this.logger.log(ILogger_1.LogLevel.Debug, "Starting connection with transfer format '" + ITransport_1.TransferFormat[transferFormat] + "'.");
                        if (this.connectionState !== "Disconnected" /* Disconnected */) {
                            return [2 /*return*/, Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."))];
                        }
                        this.connectionState = "Connecting" /* Connecting */;
                        this.startInternalPromise = this.startInternal(transferFormat);
                        return [4 /*yield*/, this.startInternalPromise];
                    case 1:
                        _a.sent();
                        if (!(this.connectionState === "Disconnecting" /* Disconnecting */)) return [3 /*break*/, 3];
                        message = "Failed to start the HttpConnection before stop() was called.";
                        this.logger.log(ILogger_1.LogLevel.Error, message);
                        // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                        return [4 /*yield*/, this.stopPromise];
                    case 2:
                        // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                        _a.sent();
                        return [2 /*return*/, Promise.reject(new Error(message))];
                    case 3:
                        if (this.connectionState !== "Connected" /* Connected */) {
                            message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
                            this.logger.log(ILogger_1.LogLevel.Error, message);
                            return [2 /*return*/, Promise.reject(new Error(message))];
                        }
                        _a.label = 4;
                    case 4:
                        this.connectionStarted = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.send = function (data) {
        if (this.connectionState !== "Connected" /* Connected */) {
            return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
        }
        if (!this.sendQueue) {
            this.sendQueue = new TransportSendQueue(this.transport);
        }
        // Transport will not be null if state is connected
        return this.sendQueue.send(data);
    };
    HttpConnection.prototype.stop = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connectionState === "Disconnected" /* Disconnected */) {
                            this.logger.log(ILogger_1.LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnected state.");
                            return [2 /*return*/, Promise.resolve()];
                        }
                        if (this.connectionState === "Disconnecting" /* Disconnecting */) {
                            this.logger.log(ILogger_1.LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
                            return [2 /*return*/, this.stopPromise];
                        }
                        this.connectionState = "Disconnecting" /* Disconnecting */;
                        this.stopPromise = new Promise(function (resolve) {
                            // Don't complete stop() until stopConnection() completes.
                            _this.stopPromiseResolver = resolve;
                        });
                        // stopInternal should never throw so just observe it.
                        return [4 /*yield*/, this.stopInternal(error)];
                    case 1:
                        // stopInternal should never throw so just observe it.
                        _a.sent();
                        return [4 /*yield*/, this.stopPromise];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.stopInternal = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set error as soon as possible otherwise there is a race between
                        // the transport closing and providing an error and the error from a close message
                        // We would prefer the close message error.
                        this.stopError = error;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startInternalPromise];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.transport) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.transport.stop()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Error, "HttpConnection.transport.stop() threw error '" + e_2 + "'.");
                        this.stopConnection();
                        return [3 /*break*/, 8];
                    case 8:
                        this.transport = undefined;
                        return [3 /*break*/, 10];
                    case 9:
                        this.logger.log(ILogger_1.LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
                        this.stopConnection();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.startInternal = function (transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var url, negotiateResponse, redirects, _loop_1, this_1, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl;
                        this.accessTokenFactory = this.options.accessTokenFactory;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        if (!this.options.skipNegotiation) return [3 /*break*/, 5];
                        if (!(this.options.transport === ITransport_1.HttpTransportType.WebSockets)) return [3 /*break*/, 3];
                        // No need to add a connection ID in this case
                        this.transport = this.constructTransport(ITransport_1.HttpTransportType.WebSockets);
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        return [4 /*yield*/, this.startTransport(url, transferFormat)];
                    case 2:
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        negotiateResponse = null;
                        redirects = 0;
                        _loop_1 = function () {
                            var accessToken_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.getNegotiationResponse(url)];
                                    case 1:
                                        negotiateResponse = _a.sent();
                                        // the user tries to stop the connection when it is being started
                                        if (this_1.connectionState === "Disconnecting" /* Disconnecting */ || this_1.connectionState === "Disconnected" /* Disconnected */) {
                                            throw new Error("The connection was stopped during negotiation.");
                                        }
                                        if (negotiateResponse.error) {
                                            throw new Error(negotiateResponse.error);
                                        }
                                        if (negotiateResponse.ProtocolVersion) {
                                            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
                                        }
                                        if (negotiateResponse.url) {
                                            url = negotiateResponse.url;
                                        }
                                        if (negotiateResponse.accessToken) {
                                            accessToken_1 = negotiateResponse.accessToken;
                                            this_1.accessTokenFactory = function () { return accessToken_1; };
                                        }
                                        redirects++;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 6;
                    case 6: return [5 /*yield**/, _loop_1()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (negotiateResponse.url && redirects < MAX_REDIRECTS) return [3 /*break*/, 6];
                        _a.label = 9;
                    case 9:
                        if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                            throw new Error("Negotiate redirection limit exceeded.");
                        }
                        return [4 /*yield*/, this.createTransport(url, this.options.transport, negotiateResponse, transferFormat)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.transport instanceof LongPollingTransport_1.LongPollingTransport) {
                            this.features.inherentKeepAlive = true;
                        }
                        if (this.connectionState === "Connecting" /* Connecting */) {
                            // Ensure the connection transitions to the connected state prior to completing this.startInternalPromise.
                            // start() will handle the case when stop was called and startInternal exits still in the disconnecting state.
                            this.logger.log(ILogger_1.LogLevel.Debug, "The HttpConnection connected successfully.");
                            this.connectionState = "Connected" /* Connected */;
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        e_3 = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Error, "Failed to start the connection: " + e_3);
                        this.connectionState = "Disconnected" /* Disconnected */;
                        this.transport = undefined;
                        return [2 /*return*/, Promise.reject(e_3)];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.getNegotiationResponse = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, token, _a, name, value, negotiateUrl, response, negotiateResponse, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {};
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _b.sent();
                        if (token) {
                            headers["Authorization"] = "Bearer " + token;
                        }
                        _b.label = 2;
                    case 2:
                        _a = Utils_1.getUserAgentHeader(), name = _a[0], value = _a[1];
                        headers[name] = value;
                        negotiateUrl = this.resolveNegotiateUrl(url);
                        this.logger.log(ILogger_1.LogLevel.Debug, "Sending negotiation request: " + negotiateUrl + ".");
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.httpClient.post(negotiateUrl, {
                                content: "",
                                headers: __assign({}, headers, this.options.headers),
                                withCredentials: this.options.withCredentials,
                            })];
                    case 4:
                        response = _b.sent();
                        if (response.statusCode !== 200) {
                            return [2 /*return*/, Promise.reject(new Error("Unexpected status code returned from negotiate '" + response.statusCode + "'"))];
                        }
                        negotiateResponse = JSON.parse(response.content);
                        if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
                            // Negotiate version 0 doesn't use connectionToken
                            // So we set it equal to connectionId so all our logic can use connectionToken without being aware of the negotiate version
                            negotiateResponse.connectionToken = negotiateResponse.connectionId;
                        }
                        return [2 /*return*/, negotiateResponse];
                    case 5:
                        e_4 = _b.sent();
                        this.logger.log(ILogger_1.LogLevel.Error, "Failed to complete negotiation with the server: " + e_4);
                        return [2 /*return*/, Promise.reject(e_4)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.createConnectUrl = function (url, connectionToken) {
        if (!connectionToken) {
            return url;
        }
        return url + (url.indexOf("?") === -1 ? "?" : "&") + ("id=" + connectionToken);
    };
    HttpConnection.prototype.createTransport = function (url, requestedTransport, negotiateResponse, requestedTransferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var connectUrl, transportExceptions, transports, negotiate, _i, transports_1, endpoint, transportOrError, ex_1, ex_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionToken);
                        if (!this.isITransport(requestedTransport)) return [3 /*break*/, 2];
                        this.logger.log(ILogger_1.LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
                        this.transport = requestedTransport;
                        return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                    case 1:
                        _a.sent();
                        this.connectionId = negotiateResponse.connectionId;
                        return [2 /*return*/];
                    case 2:
                        transportExceptions = [];
                        transports = negotiateResponse.availableTransports || [];
                        negotiate = negotiateResponse;
                        _i = 0, transports_1 = transports;
                        _a.label = 3;
                    case 3:
                        if (!(_i < transports_1.length)) return [3 /*break*/, 13];
                        endpoint = transports_1[_i];
                        transportOrError = this.resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat);
                        if (!(transportOrError instanceof Error)) return [3 /*break*/, 4];
                        // Store the error and continue, we don't want to cause a re-negotiate in these cases
                        transportExceptions.push(endpoint.transport + " failed: " + transportOrError);
                        return [3 /*break*/, 12];
                    case 4:
                        if (!this.isITransport(transportOrError)) return [3 /*break*/, 12];
                        this.transport = transportOrError;
                        if (!!negotiate) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getNegotiationResponse(url)];
                    case 6:
                        negotiate = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(ex_1)];
                    case 8:
                        connectUrl = this.createConnectUrl(url, negotiate.connectionToken);
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                    case 10:
                        _a.sent();
                        this.connectionId = negotiate.connectionId;
                        return [2 /*return*/];
                    case 11:
                        ex_2 = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Error, "Failed to start the transport '" + endpoint.transport + "': " + ex_2);
                        negotiate = undefined;
                        transportExceptions.push(endpoint.transport + " failed: " + ex_2);
                        if (this.connectionState !== "Connecting" /* Connecting */) {
                            message = "Failed to select transport before stop() was called.";
                            this.logger.log(ILogger_1.LogLevel.Debug, message);
                            return [2 /*return*/, Promise.reject(new Error(message))];
                        }
                        return [3 /*break*/, 12];
                    case 12:
                        _i++;
                        return [3 /*break*/, 3];
                    case 13:
                        if (transportExceptions.length > 0) {
                            return [2 /*return*/, Promise.reject(new Error("Unable to connect to the server with any of the available transports. " + transportExceptions.join(" ")))];
                        }
                        return [2 /*return*/, Promise.reject(new Error("None of the transports supported by the client are supported by the server."))];
                }
            });
        });
    };
    HttpConnection.prototype.constructTransport = function (transport) {
        switch (transport) {
            case ITransport_1.HttpTransportType.WebSockets:
                if (!this.options.WebSocket) {
                    throw new Error("'WebSocket' is not supported in your environment.");
                }
                return new WebSocketTransport_1.WebSocketTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.WebSocket, this.options.headers || {});
            case ITransport_1.HttpTransportType.ServerSentEvents:
                if (!this.options.EventSource) {
                    throw new Error("'EventSource' is not supported in your environment.");
                }
                return new ServerSentEventsTransport_1.ServerSentEventsTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.EventSource, this.options.withCredentials, this.options.headers || {});
            case ITransport_1.HttpTransportType.LongPolling:
                return new LongPollingTransport_1.LongPollingTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.withCredentials, this.options.headers || {});
            default:
                throw new Error("Unknown transport: " + transport + ".");
        }
    };
    HttpConnection.prototype.startTransport = function (url, transferFormat) {
        var _this = this;
        this.transport.onreceive = this.onreceive;
        this.transport.onclose = function (e) { return _this.stopConnection(e); };
        return this.transport.connect(url, transferFormat);
    };
    HttpConnection.prototype.resolveTransportOrError = function (endpoint, requestedTransport, requestedTransferFormat) {
        var transport = ITransport_1.HttpTransportType[endpoint.transport];
        if (transport === null || transport === undefined) {
            this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
            return new Error("Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
        }
        else {
            if (transportMatches(requestedTransport, transport)) {
                var transferFormats = endpoint.transferFormats.map(function (s) { return ITransport_1.TransferFormat[s]; });
                if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                    if ((transport === ITransport_1.HttpTransportType.WebSockets && !this.options.WebSocket) ||
                        (transport === ITransport_1.HttpTransportType.ServerSentEvents && !this.options.EventSource)) {
                        this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + ITransport_1.HttpTransportType[transport] + "' because it is not supported in your environment.'");
                        return new Error("'" + ITransport_1.HttpTransportType[transport] + "' is not supported in your environment.");
                    }
                    else {
                        this.logger.log(ILogger_1.LogLevel.Debug, "Selecting transport '" + ITransport_1.HttpTransportType[transport] + "'.");
                        try {
                            return this.constructTransport(transport);
                        }
                        catch (ex) {
                            return ex;
                        }
                    }
                }
                else {
                    this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + ITransport_1.HttpTransportType[transport] + "' because it does not support the requested transfer format '" + ITransport_1.TransferFormat[requestedTransferFormat] + "'.");
                    return new Error("'" + ITransport_1.HttpTransportType[transport] + "' does not support " + ITransport_1.TransferFormat[requestedTransferFormat] + ".");
                }
            }
            else {
                this.logger.log(ILogger_1.LogLevel.Debug, "Skipping transport '" + ITransport_1.HttpTransportType[transport] + "' because it was disabled by the client.");
                return new Error("'" + ITransport_1.HttpTransportType[transport] + "' is disabled by the client.");
            }
        }
    };
    HttpConnection.prototype.isITransport = function (transport) {
        return transport && typeof (transport) === "object" && "connect" in transport;
    };
    HttpConnection.prototype.stopConnection = function (error) {
        var _this = this;
        this.logger.log(ILogger_1.LogLevel.Debug, "HttpConnection.stopConnection(" + error + ") called while in state " + this.connectionState + ".");
        this.transport = undefined;
        // If we have a stopError, it takes precedence over the error from the transport
        error = this.stopError || error;
        this.stopError = undefined;
        if (this.connectionState === "Disconnected" /* Disconnected */) {
            this.logger.log(ILogger_1.LogLevel.Debug, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is already in the disconnected state.");
            return;
        }
        if (this.connectionState === "Connecting" /* Connecting */) {
            this.logger.log(ILogger_1.LogLevel.Warning, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is still in the connecting state.");
            throw new Error("HttpConnection.stopConnection(" + error + ") was called while the connection is still in the connecting state.");
        }
        if (this.connectionState === "Disconnecting" /* Disconnecting */) {
            // A call to stop() induced this call to stopConnection and needs to be completed.
            // Any stop() awaiters will be scheduled to continue after the onclose callback fires.
            this.stopPromiseResolver();
        }
        if (error) {
            this.logger.log(ILogger_1.LogLevel.Error, "Connection disconnected with error '" + error + "'.");
        }
        else {
            this.logger.log(ILogger_1.LogLevel.Information, "Connection disconnected.");
        }
        if (this.sendQueue) {
            this.sendQueue.stop().catch(function (e) {
                _this.logger.log(ILogger_1.LogLevel.Error, "TransportSendQueue.stop() threw error '" + e + "'.");
            });
            this.sendQueue = undefined;
        }
        this.connectionId = undefined;
        this.connectionState = "Disconnected" /* Disconnected */;
        if (this.connectionStarted) {
            this.connectionStarted = false;
            try {
                if (this.onclose) {
                    this.onclose(error);
                }
            }
            catch (e) {
                this.logger.log(ILogger_1.LogLevel.Error, "HttpConnection.onclose(" + error + ") threw error '" + e + "'.");
            }
        }
    };
    HttpConnection.prototype.resolveUrl = function (url) {
        // startsWith is not supported in IE
        if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
            return url;
        }
        if (!Utils_1.Platform.isBrowser || !window.document) {
            throw new Error("Cannot resolve '" + url + "'.");
        }
        // Setting the url to the href propery of an anchor tag handles normalization
        // for us. There are 3 main cases.
        // 1. Relative path normalization e.g "b" -> "http://localhost:5000/a/b"
        // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
        // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
        var aTag = window.document.createElement("a");
        aTag.href = url;
        this.logger.log(ILogger_1.LogLevel.Information, "Normalizing '" + url + "' to '" + aTag.href + "'.");
        return aTag.href;
    };
    HttpConnection.prototype.resolveNegotiateUrl = function (url) {
        var index = url.indexOf("?");
        var negotiateUrl = url.substring(0, index === -1 ? url.length : index);
        if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
            negotiateUrl += "/";
        }
        negotiateUrl += "negotiate";
        negotiateUrl += index === -1 ? "" : url.substring(index);
        if (negotiateUrl.indexOf("negotiateVersion") === -1) {
            negotiateUrl += index === -1 ? "?" : "&";
            negotiateUrl += "negotiateVersion=" + this.negotiateVersion;
        }
        return negotiateUrl;
    };
    return HttpConnection;
}());
exports.HttpConnection = HttpConnection;
function transportMatches(requestedTransport, actualTransport) {
    return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
}
/** @private */
var TransportSendQueue = /** @class */ (function () {
    function TransportSendQueue(transport) {
        this.transport = transport;
        this.buffer = [];
        this.executing = true;
        this.sendBufferedData = new PromiseSource();
        this.transportResult = new PromiseSource();
        this.sendLoopPromise = this.sendLoop();
    }
    TransportSendQueue.prototype.send = function (data) {
        this.bufferData(data);
        if (!this.transportResult) {
            this.transportResult = new PromiseSource();
        }
        return this.transportResult.promise;
    };
    TransportSendQueue.prototype.stop = function () {
        this.executing = false;
        this.sendBufferedData.resolve();
        return this.sendLoopPromise;
    };
    TransportSendQueue.prototype.bufferData = function (data) {
        if (this.buffer.length && typeof (this.buffer[0]) !== typeof (data)) {
            throw new Error("Expected data to be of type " + typeof (this.buffer) + " but was of type " + typeof (data));
        }
        this.buffer.push(data);
        this.sendBufferedData.resolve();
    };
    TransportSendQueue.prototype.sendLoop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transportResult, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.sendBufferedData.promise];
                    case 1:
                        _a.sent();
                        if (!this.executing) {
                            if (this.transportResult) {
                                this.transportResult.reject("Connection stopped.");
                            }
                            return [3 /*break*/, 6];
                        }
                        this.sendBufferedData = new PromiseSource();
                        transportResult = this.transportResult;
                        this.transportResult = undefined;
                        data = typeof (this.buffer[0]) === "string" ?
                            this.buffer.join("") :
                            TransportSendQueue.concatBuffers(this.buffer);
                        this.buffer.length = 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.transport.send(data)];
                    case 3:
                        _a.sent();
                        transportResult.resolve();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        transportResult.reject(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 0];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TransportSendQueue.concatBuffers = function (arrayBuffers) {
        var totalLength = arrayBuffers.map(function (b) { return b.byteLength; }).reduce(function (a, b) { return a + b; });
        var result = new Uint8Array(totalLength);
        var offset = 0;
        for (var _i = 0, arrayBuffers_1 = arrayBuffers; _i < arrayBuffers_1.length; _i++) {
            var item = arrayBuffers_1[_i];
            result.set(new Uint8Array(item), offset);
            offset += item.byteLength;
        }
        return result.buffer;
    };
    return TransportSendQueue;
}());
exports.TransportSendQueue = TransportSendQueue;
var PromiseSource = /** @class */ (function () {
    function PromiseSource() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            var _a;
            return _a = [resolve, reject], _this.resolver = _a[0], _this.rejecter = _a[1], _a;
        });
    }
    PromiseSource.prototype.resolve = function () {
        this.resolver();
    };
    PromiseSource.prototype.reject = function (reason) {
        this.rejecter(reason);
    };
    return PromiseSource;
}());
//# sourceMappingURL=HttpConnection.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\HttpConnection.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./DefaultHttpClient":2,"./ILogger":12,"./ITransport":13,"./LongPollingTransport":16,"./ServerSentEventsTransport":17,"./Utils":20,"./WebSocketTransport":21,"buffer":25,"e/U+97":27}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var HandshakeProtocol_1 = require("./HandshakeProtocol");
var IHubProtocol_1 = require("./IHubProtocol");
var ILogger_1 = require("./ILogger");
var Subject_1 = require("./Subject");
var Utils_1 = require("./Utils");
var DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
var DEFAULT_PING_INTERVAL_IN_MS = 15 * 1000;
/** Describes the current state of the {@link HubConnection} to the server. */
var HubConnectionState;
(function (HubConnectionState) {
    /** The hub connection is disconnected. */
    HubConnectionState["Disconnected"] = "Disconnected";
    /** The hub connection is connecting. */
    HubConnectionState["Connecting"] = "Connecting";
    /** The hub connection is connected. */
    HubConnectionState["Connected"] = "Connected";
    /** The hub connection is disconnecting. */
    HubConnectionState["Disconnecting"] = "Disconnecting";
    /** The hub connection is reconnecting. */
    HubConnectionState["Reconnecting"] = "Reconnecting";
})(HubConnectionState = exports.HubConnectionState || (exports.HubConnectionState = {}));
/** Represents a connection to a SignalR Hub. */
var HubConnection = /** @class */ (function () {
    function HubConnection(connection, logger, protocol, reconnectPolicy) {
        var _this = this;
        Utils_1.Arg.isRequired(connection, "connection");
        Utils_1.Arg.isRequired(logger, "logger");
        Utils_1.Arg.isRequired(protocol, "protocol");
        this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
        this.keepAliveIntervalInMilliseconds = DEFAULT_PING_INTERVAL_IN_MS;
        this.logger = logger;
        this.protocol = protocol;
        this.connection = connection;
        this.reconnectPolicy = reconnectPolicy;
        this.handshakeProtocol = new HandshakeProtocol_1.HandshakeProtocol();
        this.connection.onreceive = function (data) { return _this.processIncomingData(data); };
        this.connection.onclose = function (error) { return _this.connectionClosed(error); };
        this.callbacks = {};
        this.methods = {};
        this.closedCallbacks = [];
        this.reconnectingCallbacks = [];
        this.reconnectedCallbacks = [];
        this.invocationId = 0;
        this.receivedHandshakeResponse = false;
        this.connectionState = HubConnectionState.Disconnected;
        this.connectionStarted = false;
        this.cachedPingMessage = this.protocol.writeMessage({ type: IHubProtocol_1.MessageType.Ping });
    }
    /** @internal */
    // Using a public static factory method means we can have a private constructor and an _internal_
    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
    // public parameter-less constructor.
    HubConnection.create = function (connection, logger, protocol, reconnectPolicy) {
        return new HubConnection(connection, logger, protocol, reconnectPolicy);
    };
    Object.defineProperty(HubConnection.prototype, "state", {
        /** Indicates the state of the {@link HubConnection} to the server. */
        get: function () {
            return this.connectionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HubConnection.prototype, "connectionId", {
        /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
         *  in the disconnected state or if the negotiation step was skipped.
         */
        get: function () {
            return this.connection ? (this.connection.connectionId || null) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HubConnection.prototype, "baseUrl", {
        /** Indicates the url of the {@link HubConnection} to the server. */
        get: function () {
            return this.connection.baseUrl || "";
        },
        /**
         * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
         * Reconnecting states.
         * @param {string} url The url to connect to.
         */
        set: function (url) {
            if (this.connectionState !== HubConnectionState.Disconnected && this.connectionState !== HubConnectionState.Reconnecting) {
                throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
            }
            if (!url) {
                throw new Error("The HubConnection url must be a valid url.");
            }
            this.connection.baseUrl = url;
        },
        enumerable: true,
        configurable: true
    });
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    HubConnection.prototype.start = function () {
        this.startPromise = this.startWithStateTransitions();
        return this.startPromise;
    };
    HubConnection.prototype.startWithStateTransitions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connectionState !== HubConnectionState.Disconnected) {
                            return [2 /*return*/, Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."))];
                        }
                        this.connectionState = HubConnectionState.Connecting;
                        this.logger.log(ILogger_1.LogLevel.Debug, "Starting HubConnection.");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startInternal()];
                    case 2:
                        _a.sent();
                        this.connectionState = HubConnectionState.Connected;
                        this.connectionStarted = true;
                        this.logger.log(ILogger_1.LogLevel.Debug, "HubConnection connected successfully.");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.connectionState = HubConnectionState.Disconnected;
                        this.logger.log(ILogger_1.LogLevel.Debug, "HubConnection failed to start successfully because of error '" + e_1 + "'.");
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.startInternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handshakePromise, handshakeRequest, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.stopDuringStartError = undefined;
                        this.receivedHandshakeResponse = false;
                        handshakePromise = new Promise(function (resolve, reject) {
                            _this.handshakeResolver = resolve;
                            _this.handshakeRejecter = reject;
                        });
                        return [4 /*yield*/, this.connection.start(this.protocol.transferFormat)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        handshakeRequest = {
                            protocol: this.protocol.name,
                            version: this.protocol.version,
                        };
                        this.logger.log(ILogger_1.LogLevel.Debug, "Sending handshake request.");
                        return [4 /*yield*/, this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];
                    case 3:
                        _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Information, "Using HubProtocol '" + this.protocol.name + "'.");
                        // defensively cleanup timeout in case we receive a message from the server before we finish start
                        this.cleanupTimeout();
                        this.resetTimeoutPeriod();
                        this.resetKeepAliveInterval();
                        return [4 /*yield*/, handshakePromise];
                    case 4:
                        _a.sent();
                        // It's important to check the stopDuringStartError instead of just relying on the handshakePromise
                        // being rejected on close, because this continuation can run after both the handshake completed successfully
                        // and the connection was closed.
                        if (this.stopDuringStartError) {
                            // It's important to throw instead of returning a rejected promise, because we don't want to allow any state
                            // transitions to occur between now and the calling code observing the exceptions. Returning a rejected promise
                            // will cause the calling continuation to get scheduled to run later.
                            throw this.stopDuringStartError;
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        e_2 = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Debug, "Hub handshake failed with error '" + e_2 + "' during start(). Stopping HubConnection.");
                        this.cleanupTimeout();
                        this.cleanupPingTimer();
                        // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                        // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                        return [4 /*yield*/, this.connection.stop(e_2)];
                    case 6:
                        // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                        // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                        _a.sent();
                        throw e_2;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    HubConnection.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startPromise, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startPromise = this.startPromise;
                        this.stopPromise = this.stopInternal();
                        return [4 /*yield*/, this.stopPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        // Awaiting undefined continues immediately
                        return [4 /*yield*/, startPromise];
                    case 3:
                        // Awaiting undefined continues immediately
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.stopInternal = function (error) {
        if (this.connectionState === HubConnectionState.Disconnected) {
            this.logger.log(ILogger_1.LogLevel.Debug, "Call to HubConnection.stop(" + error + ") ignored because it is already in the disconnected state.");
            return Promise.resolve();
        }
        if (this.connectionState === HubConnectionState.Disconnecting) {
            this.logger.log(ILogger_1.LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
            return this.stopPromise;
        }
        this.connectionState = HubConnectionState.Disconnecting;
        this.logger.log(ILogger_1.LogLevel.Debug, "Stopping HubConnection.");
        if (this.reconnectDelayHandle) {
            // We're in a reconnect delay which means the underlying connection is currently already stopped.
            // Just clear the handle to stop the reconnect loop (which no one is waiting on thankfully) and
            // fire the onclose callbacks.
            this.logger.log(ILogger_1.LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
            clearTimeout(this.reconnectDelayHandle);
            this.reconnectDelayHandle = undefined;
            this.completeClose();
            return Promise.resolve();
        }
        this.cleanupTimeout();
        this.cleanupPingTimer();
        this.stopDuringStartError = error || new Error("The connection was stopped before the hub handshake could complete.");
        // HttpConnection.stop() should not complete until after either HttpConnection.start() fails
        // or the onclose callback is invoked. The onclose callback will transition the HubConnection
        // to the disconnected state if need be before HttpConnection.stop() completes.
        return this.connection.stop(error);
    };
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    HubConnection.prototype.stream = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var invocationDescriptor = this.createStreamInvocation(methodName, args, streamIds);
        var promiseQueue;
        var subject = new Subject_1.Subject();
        subject.cancelCallback = function () {
            var cancelInvocation = _this.createCancelInvocation(invocationDescriptor.invocationId);
            delete _this.callbacks[invocationDescriptor.invocationId];
            return promiseQueue.then(function () {
                return _this.sendWithProtocol(cancelInvocation);
            });
        };
        this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
            if (error) {
                subject.error(error);
                return;
            }
            else if (invocationEvent) {
                // invocationEvent will not be null when an error is not passed to the callback
                if (invocationEvent.type === IHubProtocol_1.MessageType.Completion) {
                    if (invocationEvent.error) {
                        subject.error(new Error(invocationEvent.error));
                    }
                    else {
                        subject.complete();
                    }
                }
                else {
                    subject.next((invocationEvent.item));
                }
            }
        };
        promiseQueue = this.sendWithProtocol(invocationDescriptor)
            .catch(function (e) {
            subject.error(e);
            delete _this.callbacks[invocationDescriptor.invocationId];
        });
        this.launchStreams(streams, promiseQueue);
        return subject;
    };
    HubConnection.prototype.sendMessage = function (message) {
        this.resetKeepAliveInterval();
        return this.connection.send(message);
    };
    /**
     * Sends a js object to the server.
     * @param message The js object to serialize and send.
     */
    HubConnection.prototype.sendWithProtocol = function (message) {
        return this.sendMessage(this.protocol.writeMessage(message));
    };
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    HubConnection.prototype.send = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var sendPromise = this.sendWithProtocol(this.createInvocation(methodName, args, true, streamIds));
        this.launchStreams(streams, sendPromise);
        return sendPromise;
    };
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    HubConnection.prototype.invoke = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var invocationDescriptor = this.createInvocation(methodName, args, false, streamIds);
        var p = new Promise(function (resolve, reject) {
            // invocationId will always have a value for a non-blocking invocation
            _this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                if (error) {
                    reject(error);
                    return;
                }
                else if (invocationEvent) {
                    // invocationEvent will not be null when an error is not passed to the callback
                    if (invocationEvent.type === IHubProtocol_1.MessageType.Completion) {
                        if (invocationEvent.error) {
                            reject(new Error(invocationEvent.error));
                        }
                        else {
                            resolve(invocationEvent.result);
                        }
                    }
                    else {
                        reject(new Error("Unexpected message type: " + invocationEvent.type));
                    }
                }
            };
            var promiseQueue = _this.sendWithProtocol(invocationDescriptor)
                .catch(function (e) {
                reject(e);
                // invocationId will always have a value for a non-blocking invocation
                delete _this.callbacks[invocationDescriptor.invocationId];
            });
            _this.launchStreams(streams, promiseQueue);
        });
        return p;
    };
    /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
    HubConnection.prototype.on = function (methodName, newMethod) {
        if (!methodName || !newMethod) {
            return;
        }
        methodName = methodName.toLowerCase();
        if (!this.methods[methodName]) {
            this.methods[methodName] = [];
        }
        // Preventing adding the same handler multiple times.
        if (this.methods[methodName].indexOf(newMethod) !== -1) {
            return;
        }
        this.methods[methodName].push(newMethod);
    };
    HubConnection.prototype.off = function (methodName, method) {
        if (!methodName) {
            return;
        }
        methodName = methodName.toLowerCase();
        var handlers = this.methods[methodName];
        if (!handlers) {
            return;
        }
        if (method) {
            var removeIdx = handlers.indexOf(method);
            if (removeIdx !== -1) {
                handlers.splice(removeIdx, 1);
                if (handlers.length === 0) {
                    delete this.methods[methodName];
                }
            }
        }
        else {
            delete this.methods[methodName];
        }
    };
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    HubConnection.prototype.onclose = function (callback) {
        if (callback) {
            this.closedCallbacks.push(callback);
        }
    };
    /** Registers a handler that will be invoked when the connection starts reconnecting.
     *
     * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
     */
    HubConnection.prototype.onreconnecting = function (callback) {
        if (callback) {
            this.reconnectingCallbacks.push(callback);
        }
    };
    /** Registers a handler that will be invoked when the connection successfully reconnects.
     *
     * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
     */
    HubConnection.prototype.onreconnected = function (callback) {
        if (callback) {
            this.reconnectedCallbacks.push(callback);
        }
    };
    HubConnection.prototype.processIncomingData = function (data) {
        this.cleanupTimeout();
        if (!this.receivedHandshakeResponse) {
            data = this.processHandshakeResponse(data);
            this.receivedHandshakeResponse = true;
        }
        // Data may have all been read when processing handshake response
        if (data) {
            // Parse the messages
            var messages = this.protocol.parseMessages(data, this.logger);
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                switch (message.type) {
                    case IHubProtocol_1.MessageType.Invocation:
                        this.invokeClientMethod(message);
                        break;
                    case IHubProtocol_1.MessageType.StreamItem:
                    case IHubProtocol_1.MessageType.Completion:
                        var callback = this.callbacks[message.invocationId];
                        if (callback) {
                            if (message.type === IHubProtocol_1.MessageType.Completion) {
                                delete this.callbacks[message.invocationId];
                            }
                            callback(message);
                        }
                        break;
                    case IHubProtocol_1.MessageType.Ping:
                        // Don't care about pings
                        break;
                    case IHubProtocol_1.MessageType.Close:
                        this.logger.log(ILogger_1.LogLevel.Information, "Close message received from server.");
                        var error = message.error ? new Error("Server returned an error on close: " + message.error) : undefined;
                        if (message.allowReconnect === true) {
                            // It feels wrong not to await connection.stop() here, but processIncomingData is called as part of an onreceive callback which is not async,
                            // this is already the behavior for serverTimeout(), and HttpConnection.Stop() should catch and log all possible exceptions.
                            // tslint:disable-next-line:no-floating-promises
                            this.connection.stop(error);
                        }
                        else {
                            // We cannot await stopInternal() here, but subsequent calls to stop() will await this if stopInternal() is still ongoing.
                            this.stopPromise = this.stopInternal(error);
                        }
                        break;
                    default:
                        this.logger.log(ILogger_1.LogLevel.Warning, "Invalid message type: " + message.type + ".");
                        break;
                }
            }
        }
        this.resetTimeoutPeriod();
    };
    HubConnection.prototype.processHandshakeResponse = function (data) {
        var _a;
        var responseMessage;
        var remainingData;
        try {
            _a = this.handshakeProtocol.parseHandshakeResponse(data), remainingData = _a[0], responseMessage = _a[1];
        }
        catch (e) {
            var message = "Error parsing handshake response: " + e;
            this.logger.log(ILogger_1.LogLevel.Error, message);
            var error = new Error(message);
            this.handshakeRejecter(error);
            throw error;
        }
        if (responseMessage.error) {
            var message = "Server returned handshake error: " + responseMessage.error;
            this.logger.log(ILogger_1.LogLevel.Error, message);
            var error = new Error(message);
            this.handshakeRejecter(error);
            throw error;
        }
        else {
            this.logger.log(ILogger_1.LogLevel.Debug, "Server handshake complete.");
        }
        this.handshakeResolver();
        return remainingData;
    };
    HubConnection.prototype.resetKeepAliveInterval = function () {
        var _this = this;
        if (this.connection.features.inherentKeepAlive) {
            return;
        }
        this.cleanupPingTimer();
        this.pingServerHandle = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.connectionState === HubConnectionState.Connected)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendMessage(this.cachedPingMessage)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        // We don't care about the error. It should be seen elsewhere in the client.
                        // The connection is probably in a bad or closed state now, cleanup the timer so it stops triggering
                        this.cleanupPingTimer();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, this.keepAliveIntervalInMilliseconds);
    };
    HubConnection.prototype.resetTimeoutPeriod = function () {
        var _this = this;
        if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
            // Set the timeout timer
            this.timeoutHandle = setTimeout(function () { return _this.serverTimeout(); }, this.serverTimeoutInMilliseconds);
        }
    };
    HubConnection.prototype.serverTimeout = function () {
        // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
        // Terminate the connection, but we don't need to wait on the promise. This could trigger reconnecting.
        // tslint:disable-next-line:no-floating-promises
        this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
    };
    HubConnection.prototype.invokeClientMethod = function (invocationMessage) {
        var _this = this;
        var methods = this.methods[invocationMessage.target.toLowerCase()];
        if (methods) {
            try {
                methods.forEach(function (m) { return m.apply(_this, invocationMessage.arguments); });
            }
            catch (e) {
                this.logger.log(ILogger_1.LogLevel.Error, "A callback for the method " + invocationMessage.target.toLowerCase() + " threw error '" + e + "'.");
            }
            if (invocationMessage.invocationId) {
                // This is not supported in v1. So we return an error to avoid blocking the server waiting for the response.
                var message = "Server requested a response, which is not supported in this version of the client.";
                this.logger.log(ILogger_1.LogLevel.Error, message);
                // We don't want to wait on the stop itself.
                this.stopPromise = this.stopInternal(new Error(message));
            }
        }
        else {
            this.logger.log(ILogger_1.LogLevel.Warning, "No client method with the name '" + invocationMessage.target + "' found.");
        }
    };
    HubConnection.prototype.connectionClosed = function (error) {
        this.logger.log(ILogger_1.LogLevel.Debug, "HubConnection.connectionClosed(" + error + ") called while in state " + this.connectionState + ".");
        // Triggering this.handshakeRejecter is insufficient because it could already be resolved without the continuation having run yet.
        this.stopDuringStartError = this.stopDuringStartError || error || new Error("The underlying connection was closed before the hub handshake could complete.");
        // If the handshake is in progress, start will be waiting for the handshake promise, so we complete it.
        // If it has already completed, this should just noop.
        if (this.handshakeResolver) {
            this.handshakeResolver();
        }
        this.cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
        this.cleanupTimeout();
        this.cleanupPingTimer();
        if (this.connectionState === HubConnectionState.Disconnecting) {
            this.completeClose(error);
        }
        else if (this.connectionState === HubConnectionState.Connected && this.reconnectPolicy) {
            // tslint:disable-next-line:no-floating-promises
            this.reconnect(error);
        }
        else if (this.connectionState === HubConnectionState.Connected) {
            this.completeClose(error);
        }
        // If none of the above if conditions were true were called the HubConnection must be in either:
        // 1. The Connecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail it.
        // 2. The Reconnecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail the current reconnect attempt
        //    and potentially continue the reconnect() loop.
        // 3. The Disconnected state in which case we're already done.
    };
    HubConnection.prototype.completeClose = function (error) {
        var _this = this;
        if (this.connectionStarted) {
            this.connectionState = HubConnectionState.Disconnected;
            this.connectionStarted = false;
            try {
                this.closedCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
            }
            catch (e) {
                this.logger.log(ILogger_1.LogLevel.Error, "An onclose callback called with error '" + error + "' threw error '" + e + "'.");
            }
        }
    };
    HubConnection.prototype.reconnect = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var reconnectStartTime, previousReconnectAttempts, retryError, nextRetryDelay, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reconnectStartTime = Date.now();
                        previousReconnectAttempts = 0;
                        retryError = error !== undefined ? error : new Error("Attempting to reconnect due to a unknown error.");
                        nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
                        if (nextRetryDelay === null) {
                            this.logger.log(ILogger_1.LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
                            this.completeClose(error);
                            return [2 /*return*/];
                        }
                        this.connectionState = HubConnectionState.Reconnecting;
                        if (error) {
                            this.logger.log(ILogger_1.LogLevel.Information, "Connection reconnecting because of error '" + error + "'.");
                        }
                        else {
                            this.logger.log(ILogger_1.LogLevel.Information, "Connection reconnecting.");
                        }
                        if (this.onreconnecting) {
                            try {
                                this.reconnectingCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
                            }
                            catch (e) {
                                this.logger.log(ILogger_1.LogLevel.Error, "An onreconnecting callback called with error '" + error + "' threw error '" + e + "'.");
                            }
                            // Exit early if an onreconnecting callback called connection.stop().
                            if (this.connectionState !== HubConnectionState.Reconnecting) {
                                this.logger.log(ILogger_1.LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 1;
                    case 1:
                        if (!(nextRetryDelay !== null)) return [3 /*break*/, 7];
                        this.logger.log(ILogger_1.LogLevel.Information, "Reconnect attempt number " + previousReconnectAttempts + " will start in " + nextRetryDelay + " ms.");
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
                            })];
                    case 2:
                        _a.sent();
                        this.reconnectDelayHandle = undefined;
                        if (this.connectionState !== HubConnectionState.Reconnecting) {
                            this.logger.log(ILogger_1.LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.startInternal()];
                    case 4:
                        _a.sent();
                        this.connectionState = HubConnectionState.Connected;
                        this.logger.log(ILogger_1.LogLevel.Information, "HubConnection reconnected successfully.");
                        if (this.onreconnected) {
                            try {
                                this.reconnectedCallbacks.forEach(function (c) { return c.apply(_this, [_this.connection.connectionId]); });
                            }
                            catch (e) {
                                this.logger.log(ILogger_1.LogLevel.Error, "An onreconnected callback called with connectionId '" + this.connection.connectionId + "; threw error '" + e + "'.");
                            }
                        }
                        return [2 /*return*/];
                    case 5:
                        e_4 = _a.sent();
                        this.logger.log(ILogger_1.LogLevel.Information, "Reconnect attempt failed because of error '" + e_4 + "'.");
                        if (this.connectionState !== HubConnectionState.Reconnecting) {
                            this.logger.log(ILogger_1.LogLevel.Debug, "Connection left the reconnecting state during reconnect attempt. Done reconnecting.");
                            return [2 /*return*/];
                        }
                        retryError = e_4 instanceof Error ? e_4 : new Error(e_4.toString());
                        nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7:
                        this.logger.log(ILogger_1.LogLevel.Information, "Reconnect retries have been exhausted after " + (Date.now() - reconnectStartTime) + " ms and " + previousReconnectAttempts + " failed attempts. Connection disconnecting.");
                        this.completeClose();
                        return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.getNextRetryDelay = function (previousRetryCount, elapsedMilliseconds, retryReason) {
        try {
            return this.reconnectPolicy.nextRetryDelayInMilliseconds({
                elapsedMilliseconds: elapsedMilliseconds,
                previousRetryCount: previousRetryCount,
                retryReason: retryReason,
            });
        }
        catch (e) {
            this.logger.log(ILogger_1.LogLevel.Error, "IRetryPolicy.nextRetryDelayInMilliseconds(" + previousRetryCount + ", " + elapsedMilliseconds + ") threw error '" + e + "'.");
            return null;
        }
    };
    HubConnection.prototype.cancelCallbacksWithError = function (error) {
        var callbacks = this.callbacks;
        this.callbacks = {};
        Object.keys(callbacks)
            .forEach(function (key) {
            var callback = callbacks[key];
            callback(null, error);
        });
    };
    HubConnection.prototype.cleanupPingTimer = function () {
        if (this.pingServerHandle) {
            clearTimeout(this.pingServerHandle);
        }
    };
    HubConnection.prototype.cleanupTimeout = function () {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    };
    HubConnection.prototype.createInvocation = function (methodName, args, nonblocking, streamIds) {
        if (nonblocking) {
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    streamIds: streamIds,
                    target: methodName,
                    type: IHubProtocol_1.MessageType.Invocation,
                };
            }
            else {
                return {
                    arguments: args,
                    target: methodName,
                    type: IHubProtocol_1.MessageType.Invocation,
                };
            }
        }
        else {
            var invocationId = this.invocationId;
            this.invocationId++;
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    streamIds: streamIds,
                    target: methodName,
                    type: IHubProtocol_1.MessageType.Invocation,
                };
            }
            else {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    target: methodName,
                    type: IHubProtocol_1.MessageType.Invocation,
                };
            }
        }
    };
    HubConnection.prototype.launchStreams = function (streams, promiseQueue) {
        var _this = this;
        if (streams.length === 0) {
            return;
        }
        // Synchronize stream data so they arrive in-order on the server
        if (!promiseQueue) {
            promiseQueue = Promise.resolve();
        }
        var _loop_1 = function (streamId) {
            streams[streamId].subscribe({
                complete: function () {
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId)); });
                },
                error: function (err) {
                    var message;
                    if (err instanceof Error) {
                        message = err.message;
                    }
                    else if (err && err.toString) {
                        message = err.toString();
                    }
                    else {
                        message = "Unknown error";
                    }
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId, message)); });
                },
                next: function (item) {
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createStreamItemMessage(streamId, item)); });
                },
            });
        };
        // We want to iterate over the keys, since the keys are the stream ids
        // tslint:disable-next-line:forin
        for (var streamId in streams) {
            _loop_1(streamId);
        }
    };
    HubConnection.prototype.replaceStreamingParams = function (args) {
        var streams = [];
        var streamIds = [];
        for (var i = 0; i < args.length; i++) {
            var argument = args[i];
            if (this.isObservable(argument)) {
                var streamId = this.invocationId;
                this.invocationId++;
                // Store the stream for later use
                streams[streamId] = argument;
                streamIds.push(streamId.toString());
                // remove stream from args
                args.splice(i, 1);
            }
        }
        return [streams, streamIds];
    };
    HubConnection.prototype.isObservable = function (arg) {
        // This allows other stream implementations to just work (like rxjs)
        return arg && arg.subscribe && typeof arg.subscribe === "function";
    };
    HubConnection.prototype.createStreamInvocation = function (methodName, args, streamIds) {
        var invocationId = this.invocationId;
        this.invocationId++;
        if (streamIds.length !== 0) {
            return {
                arguments: args,
                invocationId: invocationId.toString(),
                streamIds: streamIds,
                target: methodName,
                type: IHubProtocol_1.MessageType.StreamInvocation,
            };
        }
        else {
            return {
                arguments: args,
                invocationId: invocationId.toString(),
                target: methodName,
                type: IHubProtocol_1.MessageType.StreamInvocation,
            };
        }
    };
    HubConnection.prototype.createCancelInvocation = function (id) {
        return {
            invocationId: id,
            type: IHubProtocol_1.MessageType.CancelInvocation,
        };
    };
    HubConnection.prototype.createStreamItemMessage = function (id, item) {
        return {
            invocationId: id,
            item: item,
            type: IHubProtocol_1.MessageType.StreamItem,
        };
    };
    HubConnection.prototype.createCompletionMessage = function (id, error, result) {
        if (error) {
            return {
                error: error,
                invocationId: id,
                type: IHubProtocol_1.MessageType.Completion,
            };
        }
        return {
            invocationId: id,
            result: result,
            type: IHubProtocol_1.MessageType.Completion,
        };
    };
    return HubConnection;
}());
exports.HubConnection = HubConnection;
//# sourceMappingURL=HubConnection.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\HubConnection.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./HandshakeProtocol":6,"./IHubProtocol":11,"./ILogger":12,"./Subject":18,"./Utils":20,"buffer":25,"e/U+97":27}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultReconnectPolicy_1 = require("./DefaultReconnectPolicy");
var HttpConnection_1 = require("./HttpConnection");
var HubConnection_1 = require("./HubConnection");
var ILogger_1 = require("./ILogger");
var JsonHubProtocol_1 = require("./JsonHubProtocol");
var Loggers_1 = require("./Loggers");
var Utils_1 = require("./Utils");
// tslint:disable:object-literal-sort-keys
var LogLevelNameMapping = {
    trace: ILogger_1.LogLevel.Trace,
    debug: ILogger_1.LogLevel.Debug,
    info: ILogger_1.LogLevel.Information,
    information: ILogger_1.LogLevel.Information,
    warn: ILogger_1.LogLevel.Warning,
    warning: ILogger_1.LogLevel.Warning,
    error: ILogger_1.LogLevel.Error,
    critical: ILogger_1.LogLevel.Critical,
    none: ILogger_1.LogLevel.None,
};
function parseLogLevel(name) {
    // Case-insensitive matching via lower-casing
    // Yes, I know case-folding is a complicated problem in Unicode, but we only support
    // the ASCII strings defined in LogLevelNameMapping anyway, so it's fine -anurse.
    var mapping = LogLevelNameMapping[name.toLowerCase()];
    if (typeof mapping !== "undefined") {
        return mapping;
    }
    else {
        throw new Error("Unknown log level: " + name);
    }
}
/** A builder for configuring {@link @microsoft/signalr.HubConnection} instances. */
var HubConnectionBuilder = /** @class */ (function () {
    function HubConnectionBuilder() {
    }
    HubConnectionBuilder.prototype.configureLogging = function (logging) {
        Utils_1.Arg.isRequired(logging, "logging");
        if (isLogger(logging)) {
            this.logger = logging;
        }
        else if (typeof logging === "string") {
            var logLevel = parseLogLevel(logging);
            this.logger = new Utils_1.ConsoleLogger(logLevel);
        }
        else {
            this.logger = new Utils_1.ConsoleLogger(logging);
        }
        return this;
    };
    HubConnectionBuilder.prototype.withUrl = function (url, transportTypeOrOptions) {
        Utils_1.Arg.isRequired(url, "url");
        Utils_1.Arg.isNotEmpty(url, "url");
        this.url = url;
        // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
        // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
        if (typeof transportTypeOrOptions === "object") {
            this.httpConnectionOptions = __assign({}, this.httpConnectionOptions, transportTypeOrOptions);
        }
        else {
            this.httpConnectionOptions = __assign({}, this.httpConnectionOptions, { transport: transportTypeOrOptions });
        }
        return this;
    };
    /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
     */
    HubConnectionBuilder.prototype.withHubProtocol = function (protocol) {
        Utils_1.Arg.isRequired(protocol, "protocol");
        this.protocol = protocol;
        return this;
    };
    HubConnectionBuilder.prototype.withAutomaticReconnect = function (retryDelaysOrReconnectPolicy) {
        if (this.reconnectPolicy) {
            throw new Error("A reconnectPolicy has already been set.");
        }
        if (!retryDelaysOrReconnectPolicy) {
            this.reconnectPolicy = new DefaultReconnectPolicy_1.DefaultReconnectPolicy();
        }
        else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
            this.reconnectPolicy = new DefaultReconnectPolicy_1.DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
        }
        else {
            this.reconnectPolicy = retryDelaysOrReconnectPolicy;
        }
        return this;
    };
    /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
     */
    HubConnectionBuilder.prototype.build = function () {
        // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
        // provided to configureLogger
        var httpConnectionOptions = this.httpConnectionOptions || {};
        // If it's 'null', the user **explicitly** asked for null, don't mess with it.
        if (httpConnectionOptions.logger === undefined) {
            // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
            httpConnectionOptions.logger = this.logger;
        }
        // Now create the connection
        if (!this.url) {
            throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
        }
        var connection = new HttpConnection_1.HttpConnection(this.url, httpConnectionOptions);
        return HubConnection_1.HubConnection.create(connection, this.logger || Loggers_1.NullLogger.instance, this.protocol || new JsonHubProtocol_1.JsonHubProtocol(), this.reconnectPolicy);
    };
    return HubConnectionBuilder;
}());
exports.HubConnectionBuilder = HubConnectionBuilder;
function isLogger(logger) {
    return logger.log !== undefined;
}
//# sourceMappingURL=HubConnectionBuilder.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\HubConnectionBuilder.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./DefaultReconnectPolicy":3,"./HttpConnection":8,"./HubConnection":9,"./ILogger":12,"./JsonHubProtocol":14,"./Loggers":15,"./Utils":20,"buffer":25,"e/U+97":27}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/** Defines the type of a Hub Message. */
var MessageType;
(function (MessageType) {
    /** Indicates the message is an Invocation message and implements the {@link @microsoft/signalr.InvocationMessage} interface. */
    MessageType[MessageType["Invocation"] = 1] = "Invocation";
    /** Indicates the message is a StreamItem message and implements the {@link @microsoft/signalr.StreamItemMessage} interface. */
    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
    /** Indicates the message is a Completion message and implements the {@link @microsoft/signalr.CompletionMessage} interface. */
    MessageType[MessageType["Completion"] = 3] = "Completion";
    /** Indicates the message is a Stream Invocation message and implements the {@link @microsoft/signalr.StreamInvocationMessage} interface. */
    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
    /** Indicates the message is a Cancel Invocation message and implements the {@link @microsoft/signalr.CancelInvocationMessage} interface. */
    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
    /** Indicates the message is a Ping message and implements the {@link @microsoft/signalr.PingMessage} interface. */
    MessageType[MessageType["Ping"] = 6] = "Ping";
    /** Indicates the message is a Close message and implements the {@link @microsoft/signalr.CloseMessage} interface. */
    MessageType[MessageType["Close"] = 7] = "Close";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
//# sourceMappingURL=IHubProtocol.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\IHubProtocol.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
/** Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
var LogLevel;
(function (LogLevel) {
    /** Log level for very low severity diagnostic messages. */
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    /** Log level for low severity diagnostic messages. */
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    /** Log level for informational diagnostic messages. */
    LogLevel[LogLevel["Information"] = 2] = "Information";
    /** Log level for diagnostic messages that indicate a non-fatal problem. */
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    /** Log level for diagnostic messages that indicate a failure in the current operation. */
    LogLevel[LogLevel["Error"] = 4] = "Error";
    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
    LogLevel[LogLevel["None"] = 6] = "None";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=ILogger.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\ILogger.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// This will be treated as a bit flag in the future, so we keep it using power-of-two values.
/** Specifies a specific HTTP transport type. */
var HttpTransportType;
(function (HttpTransportType) {
    /** Specifies no transport preference. */
    HttpTransportType[HttpTransportType["None"] = 0] = "None";
    /** Specifies the WebSockets transport. */
    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
    /** Specifies the Server-Sent Events transport. */
    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
    /** Specifies the Long Polling transport. */
    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
})(HttpTransportType = exports.HttpTransportType || (exports.HttpTransportType = {}));
/** Specifies the transfer format for a connection. */
var TransferFormat;
(function (TransferFormat) {
    /** Specifies that only text data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Text"] = 1] = "Text";
    /** Specifies that binary data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
})(TransferFormat = exports.TransferFormat || (exports.TransferFormat = {}));
//# sourceMappingURL=ITransport.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\ITransport.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var IHubProtocol_1 = require("./IHubProtocol");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Loggers_1 = require("./Loggers");
var TextMessageFormat_1 = require("./TextMessageFormat");
var JSON_HUB_PROTOCOL_NAME = "json";
/** Implements the JSON Hub Protocol. */
var JsonHubProtocol = /** @class */ (function () {
    function JsonHubProtocol() {
        /** @inheritDoc */
        this.name = JSON_HUB_PROTOCOL_NAME;
        /** @inheritDoc */
        this.version = 1;
        /** @inheritDoc */
        this.transferFormat = ITransport_1.TransferFormat.Text;
    }
    /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    JsonHubProtocol.prototype.parseMessages = function (input, logger) {
        // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
        if (typeof input !== "string") {
            throw new Error("Invalid input for JSON hub protocol. Expected a string.");
        }
        if (!input) {
            return [];
        }
        if (logger === null) {
            logger = Loggers_1.NullLogger.instance;
        }
        // Parse the messages
        var messages = TextMessageFormat_1.TextMessageFormat.parse(input);
        var hubMessages = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var parsedMessage = JSON.parse(message);
            if (typeof parsedMessage.type !== "number") {
                throw new Error("Invalid payload.");
            }
            switch (parsedMessage.type) {
                case IHubProtocol_1.MessageType.Invocation:
                    this.isInvocationMessage(parsedMessage);
                    break;
                case IHubProtocol_1.MessageType.StreamItem:
                    this.isStreamItemMessage(parsedMessage);
                    break;
                case IHubProtocol_1.MessageType.Completion:
                    this.isCompletionMessage(parsedMessage);
                    break;
                case IHubProtocol_1.MessageType.Ping:
                    // Single value, no need to validate
                    break;
                case IHubProtocol_1.MessageType.Close:
                    // All optional values, no need to validate
                    break;
                default:
                    // Future protocol changes can add message types, old clients can ignore them
                    logger.log(ILogger_1.LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                    continue;
            }
            hubMessages.push(parsedMessage);
        }
        return hubMessages;
    };
    /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    JsonHubProtocol.prototype.writeMessage = function (message) {
        return TextMessageFormat_1.TextMessageFormat.write(JSON.stringify(message));
    };
    JsonHubProtocol.prototype.isInvocationMessage = function (message) {
        this.assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
        if (message.invocationId !== undefined) {
            this.assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
        }
    };
    JsonHubProtocol.prototype.isStreamItemMessage = function (message) {
        this.assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
        if (message.item === undefined) {
            throw new Error("Invalid payload for StreamItem message.");
        }
    };
    JsonHubProtocol.prototype.isCompletionMessage = function (message) {
        if (message.result && message.error) {
            throw new Error("Invalid payload for Completion message.");
        }
        if (!message.result && message.error) {
            this.assertNotEmptyString(message.error, "Invalid payload for Completion message.");
        }
        this.assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
    };
    JsonHubProtocol.prototype.assertNotEmptyString = function (value, errorMessage) {
        if (typeof value !== "string" || value === "") {
            throw new Error(errorMessage);
        }
    };
    return JsonHubProtocol;
}());
exports.JsonHubProtocol = JsonHubProtocol;
//# sourceMappingURL=JsonHubProtocol.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\JsonHubProtocol.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./IHubProtocol":11,"./ILogger":12,"./ITransport":13,"./Loggers":15,"./TextMessageFormat":19,"buffer":25,"e/U+97":27}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
/** A logger that does nothing when log messages are sent to it. */
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    /** @inheritDoc */
    // tslint:disable-next-line
    NullLogger.prototype.log = function (_logLevel, _message) {
    };
    /** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
    NullLogger.instance = new NullLogger();
    return NullLogger;
}());
exports.NullLogger = NullLogger;
//# sourceMappingURL=Loggers.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\Loggers.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbortController_1 = require("./AbortController");
var Errors_1 = require("./Errors");
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Utils_1 = require("./Utils");
// Not exported from 'index', this type is internal.
/** @private */
var LongPollingTransport = /** @class */ (function () {
    function LongPollingTransport(httpClient, accessTokenFactory, logger, logMessageContent, withCredentials, headers) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.pollAbort = new AbortController_1.AbortController();
        this.logMessageContent = logMessageContent;
        this.withCredentials = withCredentials;
        this.headers = headers;
        this.running = false;
        this.onreceive = null;
        this.onclose = null;
    }
    Object.defineProperty(LongPollingTransport.prototype, "pollAborted", {
        // This is an internal type, not exported from 'index' so this is really just internal.
        get: function () {
            return this.pollAbort.aborted;
        },
        enumerable: true,
        configurable: true
    });
    LongPollingTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, value, headers, pollOptions, token, pollUrl, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        Utils_1.Arg.isRequired(url, "url");
                        Utils_1.Arg.isRequired(transferFormat, "transferFormat");
                        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
                        this.url = url;
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Connecting.");
                        // Allow binary format on Node and Browsers that support binary content (indicated by the presence of responseType property)
                        if (transferFormat === ITransport_1.TransferFormat.Binary &&
                            (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
                            throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
                        }
                        _b = Utils_1.getUserAgentHeader(), name = _b[0], value = _b[1];
                        headers = __assign((_a = {}, _a[name] = value, _a), this.headers);
                        pollOptions = {
                            abortSignal: this.pollAbort.signal,
                            headers: headers,
                            timeout: 100000,
                            withCredentials: this.withCredentials,
                        };
                        if (transferFormat === ITransport_1.TransferFormat.Binary) {
                            pollOptions.responseType = "arraybuffer";
                        }
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        token = _c.sent();
                        this.updateHeaderToken(pollOptions, token);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 2:
                        response = _c.sent();
                        if (response.statusCode !== 200) {
                            this.logger.log(ILogger_1.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Mark running as false so that the poll immediately ends and runs the close logic
                            this.closeError = new Errors_1.HttpError(response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            this.running = true;
                        }
                        this.receiving = this.poll(this.url, pollOptions);
                        return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    LongPollingTransport.prototype.updateHeaderToken = function (request, token) {
        if (!request.headers) {
            request.headers = {};
        }
        if (token) {
            // tslint:disable-next-line:no-string-literal
            request.headers["Authorization"] = "Bearer " + token;
            return;
        }
        // tslint:disable-next-line:no-string-literal
        if (request.headers["Authorization"]) {
            // tslint:disable-next-line:no-string-literal
            delete request.headers["Authorization"];
        }
    };
    LongPollingTransport.prototype.poll = function (url, pollOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var token, pollUrl, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 8, 9]);
                        _a.label = 1;
                    case 1:
                        if (!this.running) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getAccessToken()];
                    case 2:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 4:
                        response = _a.sent();
                        if (response.statusCode === 204) {
                            this.logger.log(ILogger_1.LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
                            this.running = false;
                        }
                        else if (response.statusCode !== 200) {
                            this.logger.log(ILogger_1.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Unexpected status code
                            this.closeError = new Errors_1.HttpError(response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            // Process the response
                            if (response.content) {
                                this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) data received. " + Utils_1.getDataDetail(response.content, this.logMessageContent) + ".");
                                if (this.onreceive) {
                                    this.onreceive(response.content);
                                }
                            }
                            else {
                                // This is another way timeout manifest.
                                this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (!this.running) {
                            // Log but disregard errors that occur after stopping
                            this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Poll errored after shutdown: " + e_1.message);
                        }
                        else {
                            if (e_1 instanceof Errors_1.TimeoutError) {
                                // Ignore timeouts and reissue the poll.
                                this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                            else {
                                // Close the connection with the error as the result.
                                this.closeError = e_1;
                                this.running = false;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Polling complete.");
                        // We will reach here with pollAborted==false when the server returned a response causing the transport to stop.
                        // If pollAborted==true then client initiated the stop and the stop method will raise the close event after DELETE is sent.
                        if (!this.pollAborted) {
                            this.raiseOnClose();
                        }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.running) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Utils_1.sendMessage(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
            });
        });
    };
    LongPollingTransport.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, _a, name_1, value, deleteOptions, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Stopping polling.");
                        // Tell receiving loop to stop, abort any current request, and then wait for it to finish
                        this.running = false;
                        this.pollAbort.abort();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 5, 6]);
                        return [4 /*yield*/, this.receiving];
                    case 2:
                        _b.sent();
                        // Send DELETE to clean up long polling on the server
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) sending DELETE request to " + this.url + ".");
                        headers = {};
                        _a = Utils_1.getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                        headers[name_1] = value;
                        deleteOptions = {
                            headers: __assign({}, headers, this.headers),
                            withCredentials: this.withCredentials,
                        };
                        return [4 /*yield*/, this.getAccessToken()];
                    case 3:
                        token = _b.sent();
                        this.updateHeaderToken(deleteOptions, token);
                        return [4 /*yield*/, this.httpClient.delete(this.url, deleteOptions)];
                    case 4:
                        _b.sent();
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) DELETE request sent.");
                        return [3 /*break*/, 6];
                    case 5:
                        this.logger.log(ILogger_1.LogLevel.Trace, "(LongPolling transport) Stop finished.");
                        // Raise close event here instead of in polling
                        // It needs to happen after the DELETE request is sent
                        this.raiseOnClose();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.raiseOnClose = function () {
        if (this.onclose) {
            var logMessage = "(LongPolling transport) Firing onclose event.";
            if (this.closeError) {
                logMessage += " Error: " + this.closeError;
            }
            this.logger.log(ILogger_1.LogLevel.Trace, logMessage);
            this.onclose(this.closeError);
        }
    };
    return LongPollingTransport;
}());
exports.LongPollingTransport = LongPollingTransport;
//# sourceMappingURL=LongPollingTransport.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\LongPollingTransport.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./AbortController":1,"./Errors":4,"./ILogger":12,"./ITransport":13,"./Utils":20,"buffer":25,"e/U+97":27}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Utils_1 = require("./Utils");
/** @private */
var ServerSentEventsTransport = /** @class */ (function () {
    function ServerSentEventsTransport(httpClient, accessTokenFactory, logger, logMessageContent, eventSourceConstructor, withCredentials, headers) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.logMessageContent = logMessageContent;
        this.withCredentials = withCredentials;
        this.eventSourceConstructor = eventSourceConstructor;
        this.headers = headers;
        this.onreceive = null;
        this.onclose = null;
    }
    ServerSentEventsTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Utils_1.Arg.isRequired(url, "url");
                        Utils_1.Arg.isRequired(transferFormat, "transferFormat");
                        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
                        this.logger.log(ILogger_1.LogLevel.Trace, "(SSE transport) Connecting.");
                        // set url before accessTokenFactory because this.url is only for send and we set the auth header instead of the query string for send
                        this.url = url;
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var opened = false;
                            if (transferFormat !== ITransport_1.TransferFormat.Text) {
                                reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                                return;
                            }
                            var eventSource;
                            if (Utils_1.Platform.isBrowser || Utils_1.Platform.isWebWorker) {
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials });
                            }
                            else {
                                // Non-browser passes cookies via the dictionary
                                var cookies = _this.httpClient.getCookieString(url);
                                var headers = {};
                                headers.Cookie = cookies;
                                var _a = Utils_1.getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                                headers[name_1] = value;
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials, headers: __assign({}, headers, _this.headers) });
                            }
                            try {
                                eventSource.onmessage = function (e) {
                                    if (_this.onreceive) {
                                        try {
                                            _this.logger.log(ILogger_1.LogLevel.Trace, "(SSE transport) data received. " + Utils_1.getDataDetail(e.data, _this.logMessageContent) + ".");
                                            _this.onreceive(e.data);
                                        }
                                        catch (error) {
                                            _this.close(error);
                                            return;
                                        }
                                    }
                                };
                                eventSource.onerror = function (e) {
                                    var error = new Error(e.data || "Error occurred");
                                    if (opened) {
                                        _this.close(error);
                                    }
                                    else {
                                        reject(error);
                                    }
                                };
                                eventSource.onopen = function () {
                                    _this.logger.log(ILogger_1.LogLevel.Information, "SSE connected to " + _this.url);
                                    _this.eventSource = eventSource;
                                    opened = true;
                                    resolve();
                                };
                            }
                            catch (e) {
                                reject(e);
                                return;
                            }
                        })];
                }
            });
        });
    };
    ServerSentEventsTransport.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.eventSource) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, Utils_1.sendMessage(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
            });
        });
    };
    ServerSentEventsTransport.prototype.stop = function () {
        this.close();
        return Promise.resolve();
    };
    ServerSentEventsTransport.prototype.close = function (e) {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = undefined;
            if (this.onclose) {
                this.onclose(e);
            }
        }
    };
    return ServerSentEventsTransport;
}());
exports.ServerSentEventsTransport = ServerSentEventsTransport;
//# sourceMappingURL=ServerSentEventsTransport.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\ServerSentEventsTransport.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./ILogger":12,"./ITransport":13,"./Utils":20,"buffer":25,"e/U+97":27}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
/** Stream implementation to stream items to the server. */
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.next = function (item) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.next(item);
        }
    };
    Subject.prototype.error = function (err) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.error) {
                observer.error(err);
            }
        }
    };
    Subject.prototype.complete = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.complete) {
                observer.complete();
            }
        }
    };
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        return new Utils_1.SubjectSubscription(this, observer);
    };
    return Subject;
}());
exports.Subject = Subject;
//# sourceMappingURL=Subject.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\Subject.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./Utils":20,"buffer":25,"e/U+97":27}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
// Not exported from index
/** @private */
var TextMessageFormat = /** @class */ (function () {
    function TextMessageFormat() {
    }
    TextMessageFormat.write = function (output) {
        return "" + output + TextMessageFormat.RecordSeparator;
    };
    TextMessageFormat.parse = function (input) {
        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
            throw new Error("Message is incomplete.");
        }
        var messages = input.split(TextMessageFormat.RecordSeparator);
        messages.pop();
        return messages;
    };
    TextMessageFormat.RecordSeparatorCode = 0x1e;
    TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
    return TextMessageFormat;
}());
exports.TextMessageFormat = TextMessageFormat;
//# sourceMappingURL=TextMessageFormat.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\TextMessageFormat.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"buffer":25,"e/U+97":27}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("./ILogger");
var Loggers_1 = require("./Loggers");
// Version token that will be replaced by the prepack command
/** The version of the SignalR client. */
exports.VERSION = "5.0.5";
/** @private */
var Arg = /** @class */ (function () {
    function Arg() {
    }
    Arg.isRequired = function (val, name) {
        if (val === null || val === undefined) {
            throw new Error("The '" + name + "' argument is required.");
        }
    };
    Arg.isNotEmpty = function (val, name) {
        if (!val || val.match(/^\s*$/)) {
            throw new Error("The '" + name + "' argument should not be empty.");
        }
    };
    Arg.isIn = function (val, values, name) {
        // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
        if (!(val in values)) {
            throw new Error("Unknown " + name + " value: " + val + ".");
        }
    };
    return Arg;
}());
exports.Arg = Arg;
/** @private */
var Platform = /** @class */ (function () {
    function Platform() {
    }
    Object.defineProperty(Platform, "isBrowser", {
        get: function () {
            return typeof window === "object";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform, "isWebWorker", {
        get: function () {
            return typeof self === "object" && "importScripts" in self;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform, "isNode", {
        get: function () {
            return !this.isBrowser && !this.isWebWorker;
        },
        enumerable: true,
        configurable: true
    });
    return Platform;
}());
exports.Platform = Platform;
/** @private */
function getDataDetail(data, includeContent) {
    var detail = "";
    if (isArrayBuffer(data)) {
        detail = "Binary data of length " + data.byteLength;
        if (includeContent) {
            detail += ". Content: '" + formatArrayBuffer(data) + "'";
        }
    }
    else if (typeof data === "string") {
        detail = "String data of length " + data.length;
        if (includeContent) {
            detail += ". Content: '" + data + "'";
        }
    }
    return detail;
}
exports.getDataDetail = getDataDetail;
/** @private */
function formatArrayBuffer(data) {
    var view = new Uint8Array(data);
    // Uint8Array.map only supports returning another Uint8Array?
    var str = "";
    view.forEach(function (num) {
        var pad = num < 16 ? "0" : "";
        str += "0x" + pad + num.toString(16) + " ";
    });
    // Trim of trailing space.
    return str.substr(0, str.length - 1);
}
exports.formatArrayBuffer = formatArrayBuffer;
// Also in signalr-protocol-msgpack/Utils.ts
/** @private */
function isArrayBuffer(val) {
    return val && typeof ArrayBuffer !== "undefined" &&
        (val instanceof ArrayBuffer ||
            // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
            (val.constructor && val.constructor.name === "ArrayBuffer"));
}
exports.isArrayBuffer = isArrayBuffer;
/** @private */
function sendMessage(logger, transportName, httpClient, url, accessTokenFactory, content, logMessageContent, withCredentials, defaultHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, headers, token, _b, name, value, responseType, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    headers = {};
                    if (!accessTokenFactory) return [3 /*break*/, 2];
                    return [4 /*yield*/, accessTokenFactory()];
                case 1:
                    token = _c.sent();
                    if (token) {
                        headers = (_a = {},
                            _a["Authorization"] = "Bearer " + token,
                            _a);
                    }
                    _c.label = 2;
                case 2:
                    _b = getUserAgentHeader(), name = _b[0], value = _b[1];
                    headers[name] = value;
                    logger.log(ILogger_1.LogLevel.Trace, "(" + transportName + " transport) sending data. " + getDataDetail(content, logMessageContent) + ".");
                    responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
                    return [4 /*yield*/, httpClient.post(url, {
                            content: content,
                            headers: __assign({}, headers, defaultHeaders),
                            responseType: responseType,
                            withCredentials: withCredentials,
                        })];
                case 3:
                    response = _c.sent();
                    logger.log(ILogger_1.LogLevel.Trace, "(" + transportName + " transport) request complete. Response status: " + response.statusCode + ".");
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendMessage = sendMessage;
/** @private */
function createLogger(logger) {
    if (logger === undefined) {
        return new ConsoleLogger(ILogger_1.LogLevel.Information);
    }
    if (logger === null) {
        return Loggers_1.NullLogger.instance;
    }
    if (logger.log) {
        return logger;
    }
    return new ConsoleLogger(logger);
}
exports.createLogger = createLogger;
/** @private */
var SubjectSubscription = /** @class */ (function () {
    function SubjectSubscription(subject, observer) {
        this.subject = subject;
        this.observer = observer;
    }
    SubjectSubscription.prototype.dispose = function () {
        var index = this.subject.observers.indexOf(this.observer);
        if (index > -1) {
            this.subject.observers.splice(index, 1);
        }
        if (this.subject.observers.length === 0 && this.subject.cancelCallback) {
            this.subject.cancelCallback().catch(function (_) { });
        }
    };
    return SubjectSubscription;
}());
exports.SubjectSubscription = SubjectSubscription;
/** @private */
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
        this.outputConsole = console;
    }
    ConsoleLogger.prototype.log = function (logLevel, message) {
        if (logLevel >= this.minimumLogLevel) {
            switch (logLevel) {
                case ILogger_1.LogLevel.Critical:
                case ILogger_1.LogLevel.Error:
                    this.outputConsole.error("[" + new Date().toISOString() + "] " + ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
                case ILogger_1.LogLevel.Warning:
                    this.outputConsole.warn("[" + new Date().toISOString() + "] " + ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
                case ILogger_1.LogLevel.Information:
                    this.outputConsole.info("[" + new Date().toISOString() + "] " + ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
                default:
                    // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                    this.outputConsole.log("[" + new Date().toISOString() + "] " + ILogger_1.LogLevel[logLevel] + ": " + message);
                    break;
            }
        }
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
/** @private */
function getUserAgentHeader() {
    var userAgentHeaderName = "X-SignalR-User-Agent";
    if (Platform.isNode) {
        userAgentHeaderName = "User-Agent";
    }
    return [userAgentHeaderName, constructUserAgent(exports.VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
}
exports.getUserAgentHeader = getUserAgentHeader;
/** @private */
function constructUserAgent(version, os, runtime, runtimeVersion) {
    // Microsoft SignalR/[Version] ([Detailed Version]; [Operating System]; [Runtime]; [Runtime Version])
    var userAgent = "Microsoft SignalR/";
    var majorAndMinor = version.split(".");
    userAgent += majorAndMinor[0] + "." + majorAndMinor[1];
    userAgent += " (" + version + "; ";
    if (os && os !== "") {
        userAgent += os + "; ";
    }
    else {
        userAgent += "Unknown OS; ";
    }
    userAgent += "" + runtime;
    if (runtimeVersion) {
        userAgent += "; " + runtimeVersion;
    }
    else {
        userAgent += "; Unknown Runtime Version";
    }
    userAgent += ")";
    return userAgent;
}
exports.constructUserAgent = constructUserAgent;
function getOsName() {
    if (Platform.isNode) {
        switch (process.platform) {
            case "win32":
                return "Windows NT";
            case "darwin":
                return "macOS";
            case "linux":
                return "Linux";
            default:
                return process.platform;
        }
    }
    else {
        return "";
    }
}
function getRuntimeVersion() {
    if (Platform.isNode) {
        return process.versions.node;
    }
    return undefined;
}
function getRuntime() {
    if (Platform.isNode) {
        return "NodeJS";
    }
    else {
        return "Browser";
    }
}
//# sourceMappingURL=Utils.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\Utils.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./ILogger":12,"./Loggers":15,"buffer":25,"e/U+97":27}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("./ILogger");
var ITransport_1 = require("./ITransport");
var Utils_1 = require("./Utils");
/** @private */
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
        this.logger = logger;
        this.accessTokenFactory = accessTokenFactory;
        this.logMessageContent = logMessageContent;
        this.webSocketConstructor = webSocketConstructor;
        this.httpClient = httpClient;
        this.onreceive = null;
        this.onclose = null;
        this.headers = headers;
    }
    WebSocketTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Utils_1.Arg.isRequired(url, "url");
                        Utils_1.Arg.isRequired(transferFormat, "transferFormat");
                        Utils_1.Arg.isIn(transferFormat, ITransport_1.TransferFormat, "transferFormat");
                        this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) Connecting.");
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            url = url.replace(/^http/, "ws");
                            var webSocket;
                            var cookies = _this.httpClient.getCookieString(url);
                            var opened = false;
                            if (Utils_1.Platform.isNode) {
                                var headers = {};
                                var _a = Utils_1.getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                                headers[name_1] = value;
                                if (cookies) {
                                    headers["Cookie"] = "" + cookies;
                                }
                                // Only pass headers when in non-browser environments
                                webSocket = new _this.webSocketConstructor(url, undefined, {
                                    headers: __assign({}, headers, _this.headers),
                                });
                            }
                            if (!webSocket) {
                                // Chrome is not happy with passing 'undefined' as protocol
                                webSocket = new _this.webSocketConstructor(url);
                            }
                            if (transferFormat === ITransport_1.TransferFormat.Binary) {
                                webSocket.binaryType = "arraybuffer";
                            }
                            // tslint:disable-next-line:variable-name
                            webSocket.onopen = function (_event) {
                                _this.logger.log(ILogger_1.LogLevel.Information, "WebSocket connected to " + url + ".");
                                _this.webSocket = webSocket;
                                opened = true;
                                resolve();
                            };
                            webSocket.onerror = function (event) {
                                var error = null;
                                // ErrorEvent is a browser only type we need to check if the type exists before using it
                                if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                    error = event.error;
                                }
                                else {
                                    error = new Error("There was an error with the transport.");
                                }
                                reject(error);
                            };
                            webSocket.onmessage = function (message) {
                                _this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) data received. " + Utils_1.getDataDetail(message.data, _this.logMessageContent) + ".");
                                if (_this.onreceive) {
                                    try {
                                        _this.onreceive(message.data);
                                    }
                                    catch (error) {
                                        _this.close(error);
                                        return;
                                    }
                                }
                            };
                            webSocket.onclose = function (event) {
                                // Don't call close handler if connection was never established
                                // We'll reject the connect call instead
                                if (opened) {
                                    _this.close(event);
                                }
                                else {
                                    var error = null;
                                    // ErrorEvent is a browser only type we need to check if the type exists before using it
                                    if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                        error = event.error;
                                    }
                                    else {
                                        error = new Error("There was an error with the transport.");
                                    }
                                    reject(error);
                                }
                            };
                        })];
                }
            });
        });
    };
    WebSocketTransport.prototype.send = function (data) {
        if (this.webSocket && this.webSocket.readyState === this.webSocketConstructor.OPEN) {
            this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) sending data. " + Utils_1.getDataDetail(data, this.logMessageContent) + ".");
            this.webSocket.send(data);
            return Promise.resolve();
        }
        return Promise.reject("WebSocket is not in the OPEN state");
    };
    WebSocketTransport.prototype.stop = function () {
        if (this.webSocket) {
            // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
            // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
            this.close(undefined);
        }
        return Promise.resolve();
    };
    WebSocketTransport.prototype.close = function (event) {
        // webSocket will be null if the transport did not start successfully
        if (this.webSocket) {
            // Clear websocket handlers because we are considering the socket closed now
            this.webSocket.onclose = function () { };
            this.webSocket.onmessage = function () { };
            this.webSocket.onerror = function () { };
            this.webSocket.close();
            this.webSocket = undefined;
        }
        this.logger.log(ILogger_1.LogLevel.Trace, "(WebSockets transport) socket closed.");
        if (this.onclose) {
            if (this.isCloseEvent(event) && (event.wasClean === false || event.code !== 1000)) {
                this.onclose(new Error("WebSocket closed with status code: " + event.code + " (" + event.reason + ")."));
            }
            else if (event instanceof Error) {
                this.onclose(event);
            }
            else {
                this.onclose();
            }
        }
    };
    WebSocketTransport.prototype.isCloseEvent = function (event) {
        return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
    };
    return WebSocketTransport;
}());
exports.WebSocketTransport = WebSocketTransport;
//# sourceMappingURL=WebSocketTransport.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\WebSocketTransport.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./ILogger":12,"./ITransport":13,"./Utils":20,"buffer":25,"e/U+97":27}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var HttpClient_1 = require("./HttpClient");
var ILogger_1 = require("./ILogger");
var XhrHttpClient = /** @class */ (function (_super) {
    __extends(XhrHttpClient, _super);
    function XhrHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    /** @inheritDoc */
    XhrHttpClient.prototype.send = function (request) {
        var _this = this;
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new Errors_1.AbortError());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);
            xhr.withCredentials = request.withCredentials === undefined ? true : request.withCredentials;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            // Explicitly setting the Content-Type header for React Native on Android platform.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            var headers = request.headers;
            if (headers) {
                Object.keys(headers)
                    .forEach(function (header) {
                    xhr.setRequestHeader(header, headers[header]);
                });
            }
            if (request.responseType) {
                xhr.responseType = request.responseType;
            }
            if (request.abortSignal) {
                request.abortSignal.onabort = function () {
                    xhr.abort();
                    reject(new Errors_1.AbortError());
                };
            }
            if (request.timeout) {
                xhr.timeout = request.timeout;
            }
            xhr.onload = function () {
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new HttpClient_1.HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                }
                else {
                    reject(new Errors_1.HttpError(xhr.statusText, xhr.status));
                }
            };
            xhr.onerror = function () {
                _this.logger.log(ILogger_1.LogLevel.Warning, "Error from HTTP request. " + xhr.status + ": " + xhr.statusText + ".");
                reject(new Errors_1.HttpError(xhr.statusText, xhr.status));
            };
            xhr.ontimeout = function () {
                _this.logger.log(ILogger_1.LogLevel.Warning, "Timeout from HTTP request.");
                reject(new Errors_1.TimeoutError());
            };
            xhr.send(request.content || "");
        });
    };
    return XhrHttpClient;
}(HttpClient_1.HttpClient));
exports.XhrHttpClient = XhrHttpClient;
//# sourceMappingURL=XhrHttpClient.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\XhrHttpClient.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./Errors":4,"./HttpClient":7,"./ILogger":12,"buffer":25,"e/U+97":27}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
exports.AbortError = Errors_1.AbortError;
exports.HttpError = Errors_1.HttpError;
exports.TimeoutError = Errors_1.TimeoutError;
var HttpClient_1 = require("./HttpClient");
exports.HttpClient = HttpClient_1.HttpClient;
exports.HttpResponse = HttpClient_1.HttpResponse;
var DefaultHttpClient_1 = require("./DefaultHttpClient");
exports.DefaultHttpClient = DefaultHttpClient_1.DefaultHttpClient;
var HubConnection_1 = require("./HubConnection");
exports.HubConnection = HubConnection_1.HubConnection;
exports.HubConnectionState = HubConnection_1.HubConnectionState;
var HubConnectionBuilder_1 = require("./HubConnectionBuilder");
exports.HubConnectionBuilder = HubConnectionBuilder_1.HubConnectionBuilder;
var IHubProtocol_1 = require("./IHubProtocol");
exports.MessageType = IHubProtocol_1.MessageType;
var ILogger_1 = require("./ILogger");
exports.LogLevel = ILogger_1.LogLevel;
var ITransport_1 = require("./ITransport");
exports.HttpTransportType = ITransport_1.HttpTransportType;
exports.TransferFormat = ITransport_1.TransferFormat;
var Loggers_1 = require("./Loggers");
exports.NullLogger = Loggers_1.NullLogger;
var JsonHubProtocol_1 = require("./JsonHubProtocol");
exports.JsonHubProtocol = JsonHubProtocol_1.JsonHubProtocol;
var Subject_1 = require("./Subject");
exports.Subject = Subject_1.Subject;
var Utils_1 = require("./Utils");
exports.VERSION = Utils_1.VERSION;
//# sourceMappingURL=index.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs\\index.js","/..\\..\\node_modules\\@microsoft\\signalr\\dist\\cjs")
},{"./DefaultHttpClient":2,"./Errors":4,"./HttpClient":7,"./HubConnection":9,"./HubConnectionBuilder":10,"./IHubProtocol":11,"./ILogger":12,"./ITransport":13,"./JsonHubProtocol":14,"./Loggers":15,"./Subject":18,"./Utils":20,"buffer":25,"e/U+97":27}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\base64-js\\lib\\b64.js","/..\\..\\node_modules\\base64-js\\lib")
},{"buffer":25,"e/U+97":27}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\buffer\\index.js","/..\\..\\node_modules\\buffer")
},{"base64-js":24,"buffer":25,"e/U+97":27,"ieee754":26}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\ieee754\\index.js","/..\\..\\node_modules\\ieee754")
},{"buffer":25,"e/U+97":27}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\node_modules\\process\\browser.js","/..\\..\\node_modules\\process")
},{"buffer":25,"e/U+97":27}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskDialog = exports.AskDialogProps = void 0;
var random_1 = require("../util/random");
var AskDialogProps = /** @class */ (function () {
    function AskDialogProps() {
    }
    return AskDialogProps;
}());
exports.AskDialogProps = AskDialogProps;
var AskDialog = /** @class */ (function () {
    function AskDialog(props) {
        this.props = props;
    }
    AskDialog.prototype.show = function () {
        var _this = this;
        var allowButtonId = "allow-" + random_1.randomSessonId();
        var denyButtonId = "deny-" + random_1.randomSessonId();
        var content = this.props.message + "\n            <p>\n                <a href=\"#\" id=\"" + allowButtonId + "\" class=\"btn btn-sm\">Accept</button>\n                <a href=\"#\" id=\"" + denyButtonId + "\" class=\"btn btn-sm\">Deny</button>\n            </p>";
        $.toast({
            heading: this.props.title,
            text: content,
            showHideTransition: 'slide',
            hideAfter: false,
            bgColor: this.props.isWarning ? "#800000" : "#164157",
            icon: this.props.icon,
            stack: 5,
            loader: false,
            afterShown: function () {
                _this.allowButtonElement = document.getElementById(allowButtonId);
                _this.denyButtonElement = document.getElementById(denyButtonId);
                _this.root = $(_this.allowButtonElement).closest(".jq-toast-single")[0];
                _this.attachHandlers();
            }
        });
    };
    AskDialog.prototype.attachHandlers = function () {
        var _this = this;
        this.allowButtonElement.addEventListener('click', function () {
            if (typeof _this.props.allowCallback === "function")
                _this.props.allowCallback(_this.props.param);
            (_this.root).remove();
        });
        this.denyButtonElement.addEventListener('click', function () {
            if (typeof _this.props.denyCallback === "function") {
                _this.props.denyCallback(_this.props.param);
            }
            $(_this.root).remove();
        });
    };
    return AskDialog;
}());
exports.AskDialog = AskDialog;
//# sourceMappingURL=AskDialog.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\AskDialog.js","/components")
},{"../util/random":54,"buffer":25,"e/U+97":27}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattingWidget = exports.ChattingPanelProps = void 0;
var FileReceiver_1 = require("../file/FileReceiver");
var FileSender_1 = require("../file/FileSender");
var random_1 = require("../util/random");
var snippet_1 = require("../util/snippet");
var TimeUtil_1 = require("../util/TimeUtil");
var ChattingPanelProps = /** @class */ (function () {
    function ChattingPanelProps() {
    }
    return ChattingPanelProps;
}());
exports.ChattingPanelProps = ChattingPanelProps;
var ChattingWidget = /** @class */ (function () {
    function ChattingWidget() {
        this.unreadCount = 0;
        this.isPrivate = false;
        this.nameColors = [];
        this.remainColors = [];
        this.fileSendingPool = new Map();
        this.fileReceivingPool = new Map();
    }
    ChattingWidget.prototype.init = function (props) {
        this.props = props;
        this.root = document.getElementById("sideToolbarContainer");
        this.closeButton = document.querySelector(".chat-close-button");
        this.inputField = document.querySelector("#chat-input #usermsg");
        this.sendButton = document.querySelector(".send-button");
        this.filesendButton = document.querySelector(".file-share-button");
        this.fileElement = document.getElementById("file-selector");
        this.fileSendingPanel = document.getElementById("file-sending");
        this.privatePanel = document.querySelector("#chat-recipient");
        this.privateLabelElement = $(this.privatePanel).find(">span")[0];
        this.privateCloseElement = $(this.privatePanel).find(">div")[0];
        this.nameColors.push("#00bfff"); //deepskyblue
        this.nameColors.push("#9acd32"); //yellowgreen
        this.nameColors.push("#d2691e"); //chocolate
        this.nameColors.push("#ee82ee"); //violet
        this.nameColors.push("#6495ed"); //cornflowerblue
        this.nameColors.push("#ffd700"); //gold
        this.nameColors.push("#808000"); //olive
        this.nameColors.push("#cd853f"); //peru
        this.remainColors = __spreadArray([], this.nameColors);
        this.nameColorMap = new Map();
        this.attachEventHandlers();
        this.open(this.opened);
    };
    ChattingWidget.prototype.attachEventHandlers = function () {
        var _this_1 = this;
        $(this.closeButton).on('click', function () {
            _this_1.open(false);
        });
        $(this.inputField).keypress(function (e) {
            if ((e.keyCode || e.which) == 13) { //Enter keycode
                if (!e.shiftKey) {
                    e.preventDefault();
                    _this_1.onSend();
                }
            }
        });
        $(this.sendButton).on('click', function () {
            _this_1.onSend();
        });
        var _this = this;
        $(".smileyContainer").click(function () {
            var id = $(this).attr("id");
            var imoname = _this.idToEmoname(id);
            console.log(imoname);
            var sendel = $("#usermsg");
            var sms = sendel.val();
            sms += imoname;
            sendel.val(sms);
            //var el = $(".smileys-panel");
            //el.removeClass("show-smileys");
            //el.addClass("hide-smileys");
            sendel.focus();
        });
        $("#smileys").click(function () {
            var el = $(".smileys-panel");
            if (el.hasClass("hide-smileys")) {
                el.removeClass("hide-smileys");
                el.addClass("show-smileys");
            }
            else {
                el.removeClass("show-smileys");
                el.addClass("hide-smileys");
            }
        });
        $(this.privateCloseElement).click(function (_) {
            _this_1.clearPrivateState();
        });
        $(this.filesendButton).click(function (_) {
            $(_this_1.fileElement).click();
        });
        $(this.fileElement).on("change", function (_) {
            _this_1.sendFile();
        });
    };
    ChattingWidget.prototype.open = function (opened) {
        if (opened) {
            $("#video-panel").addClass("shift-right");
            $("#new-toolbox").addClass("shift-right");
            $(this.root).removeClass("invisible");
            $(this.inputField).focus();
            //$(".toolbox-icon", this.props.chatOpenButton).addClass("toggled");
        }
        else {
            $("#video-panel").removeClass("shift-right");
            $("#new-toolbox").removeClass("shift-right");
            $(this.root).addClass("invisible");
            //$(".toolbox-icon", this.props.chatOpenButton).removeClass("toggled");
        }
        this.unreadCount = 0;
        this.props.showUnreadBadge(false);
        this.opened = opened;
        this.props.openCallback();
    };
    ChattingWidget.prototype.clearInput = function () {
        $(this.inputField).val('');
    };
    ChattingWidget.prototype.toggleOpen = function () {
        this.opened = !this.opened;
        this.open(this.opened);
    };
    ChattingWidget.prototype.onSend = function () {
        var msg = $(this.inputField).val().toString().trim();
        this.clearInput();
        if (!msg)
            return;
        msg = this.emonameToEmoicon(msg);
        var time = TimeUtil_1.getCurTime();
        var privateClass = this.isPrivate ? "private" : "";
        var privateDetail = "";
        if (this.isPrivate) {
            privateDetail = "<div style=\"color:#778899\">private: " + this.privateSenderName + "</div>";
        }
        var el = $(".smileys-panel");
        el.removeClass("show-smileys");
        el.addClass("hide-smileys");
        var sel = $("#chatconversation div.chat-message-group:last-child");
        if (sel.hasClass("local")) {
            sel.find(".timestamp").remove();
            sel.append("<div class= \"chatmessage-wrapper\" >                            <div class=\"chatmessage " + privateClass + "\">                                <div class=\"replywrapper\">                                    <div class=\"messagecontent\">                                        <div class=\"usermessage\"> " + msg + " </div>                                        " + privateDetail + "\n                                    </div>                                </div>                            </div>                            <div class=\"timestamp\"> " + time + " </div>                        </div >");
        }
        else {
            $("#chatconversation").append("<div class=\"chat-message-group local\">                     <div class= \"chatmessage-wrapper\" >                        <div class=\"chatmessage " + privateClass + "\">                            <div class=\"replywrapper\">                                <div class=\"messagecontent\">                                    <div class=\"usermessage\"> " + msg + " </div>                                    " + privateDetail + "\n                                </div>                            </div>                        </div>                        <div class=\"timestamp\"> " + time + " </div>                    </div >                </div>");
        }
        this.scrollToBottom();
        if (this.isPrivate) {
            this.props.sendPrivateChat(this.privateSenderId, msg);
        }
        else {
            this.props.sendChat(msg);
        }
    };
    //chat
    ChattingWidget.prototype.receiveMessage = function (id, username, message, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        //update unread count
        if (!this.opened) {
            this.unreadCount++;
            this.props.setUnreadCount(this.unreadCount);
            this.props.showUnreadBadge(true);
        }
        //update ui
        var emoMessage = this.emonameToEmoicon(message);
        var nameColor = this.getNameColor(username);
        var privateClass = isPrivate ? "private" : "";
        var replyElem = "";
        if (isPrivate) {
            replyElem = "\n                <span class=\"jitsi-icon\" jitsi-id=\"" + id + "\" jitsi-name=\"" + username + "\">\n                    <svg height=\"22\" width=\"22\" viewBox=\"0 0 36 36\">\n                        <path d=\"M30,29a1,1,0,0,1-.81-.41l-2.12-2.92A18.66,18.66,0,0,0,15,18.25V22a1,1,0,0,1-1.6.8l-12-9a1,1,0,0,1,0-1.6l12-9A1,1,0,0,1,15,4V8.24A19,19,0,0,1,31,27v1a1,1,0,0,1-.69.95A1.12,1.12,0,0,1,30,29ZM14,16.11h.1A20.68,20.68,0,0,1,28.69,24.5l.16.21a17,17,0,0,0-15-14.6,1,1,0,0,1-.89-1V6L3.67,13,13,20V17.11a1,1,0,0,1,.33-.74A1,1,0,0,1,14,16.11Z\"></path>\n                    </svg>\n                </span>";
        }
        var $chatitem = $("<div class=\"chat-message-group remote\">         <div class= \"chatmessage-wrapper\" >                <div class=\"chatmessage " + privateClass + "\">                    <div class=\"replywrapper\">                        <div class=\"messagecontent\">                            <div class=\"display-name\" style=\"color:" + nameColor + "\">" + username + replyElem + '</div>\
                            <div class="usermessage">' + emoMessage + '</div>\
                        </div>\
                    </div>\
                </div>\
                <div class="timestamp">' + TimeUtil_1.getCurTime() + '</div>\
            </div >\
        </div>');
        $("#chatconversation").append($chatitem);
        if (isPrivate) {
            var _this_2 = this;
            $chatitem.find(".jitsi-icon").click(function (e) {
                var id = $(this).attr("jitsi-id");
                var name = $(this).attr("jitsi-name");
                _this_2.setPrivateState(id, name);
            });
        }
        this.scrollToBottom();
        if (isPrivate)
            this.setPrivateState(id, username);
    };
    ChattingWidget.prototype.scrollToBottom = function () {
        var overheight = 0;
        $(".chat-message-group").each(function () {
            overheight += $(this).height();
        });
        var limit = $('#chatconversation').height();
        var pos = overheight - limit;
        $("#chatconversation").animate({ scrollTop: pos }, 200);
    };
    ChattingWidget.prototype.idToEmoname = function (id) {
        if (id == 'smiley1')
            return '😃';
        if (id == 'smiley2')
            return '😦';
        if (id == 'smiley3')
            return '😄';
        if (id == 'smiley4')
            return '👍';
        if (id == 'smiley5')
            return '😛';
        if (id == 'smiley6')
            return '👋';
        if (id == 'smiley7')
            return '😊';
        if (id == 'smiley8')
            return '🙂';
        if (id == 'smiley9')
            return '😱';
        if (id == 'smiley10')
            return '😗';
        if (id == 'smiley11')
            return '👎';
        if (id == 'smiley12')
            return '🔍';
        if (id == 'smiley13')
            return '❤️';
        if (id == 'smiley14')
            return '😇';
        if (id == 'smiley15')
            return '😠';
        if (id == 'smiley16')
            return '👼';
        if (id == 'smiley17')
            return '😭';
        if (id == 'smiley18')
            return '👏';
        if (id == 'smiley19')
            return '😉';
        if (id == 'smiley20')
            return '🍺';
    };
    ChattingWidget.prototype.emonameToEmoicon = function (sms) {
        var smsout = sms;
        smsout = smsout.replace(':)', '<span class="smiley" style="width: 20px; height:20px;">😃</span>');
        smsout = smsout.replace(':(', '<span class="smiley">😦</span>');
        smsout = smsout.replace(':D', '<span class="smiley">😄</span>');
        smsout = smsout.replace(':+1:', '<span class="smiley">👍</span>');
        smsout = smsout.replace(':P', '<span class="smiley">😛</span>');
        smsout = smsout.replace(':wave:', '<span class="smiley">👋</span>');
        smsout = smsout.replace(':blush:', '<span class="smiley">😊</span>');
        smsout = smsout.replace(':slightly_smiling_face:', '<span class="smiley">🙂</span>');
        smsout = smsout.replace(':scream:', '<span class="smiley">😱</span>');
        smsout = smsout.replace(':*', '<span class="smiley">😗</span>');
        smsout = smsout.replace(':-1:', '<span class="smiley">👎</span>');
        smsout = smsout.replace(':mag:', '<span class="smiley">🔍</span>');
        smsout = smsout.replace(':heart:', '<span class="smiley">❤️</span>');
        smsout = smsout.replace(':innocent:', '<span class="smiley">😇</span>');
        smsout = smsout.replace(':angry:', '<span class="smiley">😠</span>');
        smsout = smsout.replace(':angel:', '<span class="smiley">👼</span>');
        smsout = smsout.replace(';(', '<span class="smiley">😭</span>');
        smsout = smsout.replace(':clap:', '<span class="smiley">👏</span>');
        smsout = smsout.replace(';)', '<span class="smiley">😉</span>');
        smsout = smsout.replace(':beer:', '<span class="smiley">🍺</span>');
        return smsout;
    };
    ChattingWidget.prototype.getNameColor = function (name) {
        if (this.nameColorMap.has(name))
            return this.nameColorMap.get(name);
        if (this.remainColors.length <= 0)
            this.remainColors = __spreadArray([], this.nameColors);
        //[min, max)
        var randIndex = snippet_1.random(0, this.remainColors.length);
        var randomColor = this.remainColors[randIndex];
        this.remainColors.splice(randIndex, 1);
        this.nameColorMap.set(name, randomColor);
        return randomColor;
    };
    ChattingWidget.prototype.setPrivateState = function (jitsiId, name) {
        this.isPrivate = true;
        this.privateSenderId = jitsiId;
        this.privateSenderName = name;
        this.privatePanel.style.display = "flex";
        this.privateLabelElement.innerHTML = "Private message to " + name;
    };
    ChattingWidget.prototype.clearPrivateState = function () {
        this.isPrivate = false;
        this.privateSenderId = null;
        this.privatePanel.style.display = "none";
    };
    ChattingWidget.prototype.sendFile = function () {
        var props = new FileSender_1.FileSenderProps();
        props.fileElement = this.fileElement;
        props.fileSendingPanel = this.fileSendingPanel;
        props.sessionId = random_1.randomSessonId();
        props.onError = this.props.onFileSendErrror;
        props.onFinished = this.props.onFileSendFinished;
        props.sendFileData = this.props.sendFileData;
        props.sendFileMeta = this.props.sendFileMeta;
        //props.addChatItem = this.onSend.bind(this); //added matvey
        var fileSender = new FileSender_1.FileSender(props);
        fileSender.sendFile();
    };
    ChattingWidget.prototype.onFileMeta = function (sessionId, meta, senderId, senderName) {
        var props = new FileReceiver_1.FileReceiverProps();
        props.meta = meta;
        props.senderId = senderId;
        props.senderName = senderName;
        props.onFinished = this.onFileReceiveFinished.bind(this);
        props.onError = this.onFileReceiveError.bind(this);
        props.addChatItem = this.receiveMessage.bind(this);
        var receiver = new FileReceiver_1.FileReceiver(props);
        this.fileReceivingPool.set(sessionId, receiver);
        receiver.show();
    };
    ChattingWidget.prototype.onFileData = function (sessionId, data) {
        var receiver = this.fileReceivingPool.get(sessionId);
        if (receiver)
            receiver.readFileData(data);
    };
    ChattingWidget.prototype.onFileReceiveError = function (sessionId, filename, message) {
        this.fileReceivingPool.delete(sessionId);
        this.props.onFileReceiveError(filename, message);
    };
    ChattingWidget.prototype.onFileReceiveFinished = function (sessionId, filename, message) {
        this.fileReceivingPool.delete(sessionId);
        this.props.onFileReceiveFinished(filename, message);
    };
    ChattingWidget.prototype.openPrivateChat = function (jitsiId, name) {
        this.open(true);
        this.setPrivateState(jitsiId, name);
    };
    return ChattingWidget;
}());
exports.ChattingWidget = ChattingWidget;
//# sourceMappingURL=ChattingPanel.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\ChattingPanel.js","/components")
},{"../file/FileReceiver":42,"../file/FileSender":43,"../util/TimeUtil":53,"../util/random":54,"../util/snippet":55,"buffer":25,"e/U+97":27}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingDescriptionWidget = void 0;
var MeetingDescriptionWidget = /** @class */ (function () {
    function MeetingDescriptionWidget() {
        //state
        this.firstUpdate = true;
        this.time = "";
        this.subject = "";
        this.root = document.querySelector(".subject");
        this.subjectElement = document.querySelector(".subject-text");
        this.timestampElement = document.querySelector(".subject-timer");
    }
    MeetingDescriptionWidget.prototype.updateTime = function (time) {
        this.time = time.trim();
        this.timestampElement.innerHTML = this.time;
        this.showOnInit();
    };
    MeetingDescriptionWidget.prototype.setSubject = function (subject, hostName) {
        this.subject = subject.trim();
        var subjectLabel = this.subject;
        if (hostName && hostName.trim().length > 0)
            subjectLabel += "(" + hostName.trim() + ")";
        this.subjectElement.innerHTML = subjectLabel;
        this.showOnInit();
    };
    MeetingDescriptionWidget.prototype.showOnInit = function () {
        if (this.firstUpdate && this.time.length > 0 && this.subject.length > 0) {
            this.firstUpdate = false;
            this.fadeIn();
        }
    };
    MeetingDescriptionWidget.prototype.fadeIn = function () {
        $(this.root).addClass("visible");
    };
    MeetingDescriptionWidget.prototype.fadeOut = function () {
        $(this.root).removeClass("visible");
    };
    return MeetingDescriptionWidget;
}());
exports.MeetingDescriptionWidget = MeetingDescriptionWidget;
//# sourceMappingURL=MeetingDescriptionWidget.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\MeetingDescriptionWidget.js","/components")
},{"buffer":25,"e/U+97":27}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantListWidget = exports.ParticipantListPanelProps = void 0;
var snippet_1 = require("../util/snippet");
var vector_icon_1 = require("./vector_icon");
var ParticipantItemProps = /** @class */ (function () {
    function ParticipantItemProps() {
    }
    return ParticipantItemProps;
}());
var ParticipantItem = /** @class */ (function () {
    function ParticipantItem(props) {
        this.props = props;
        this.muteCamera = this.props.muteCamera;
        this.muteMic = this.props.muteMic;
        this.init();
    }
    ParticipantItem.prototype.init = function () {
        var _this = this;
        var body = '';
        if (!this.props.isMicDisable) {
            body = "\n                <div class=\"jitsi-participant\">\n                    <div class=\"participant-avatar\">\n                        <div class=\"avatar  userAvatar w-40px h-40px\" style=\"background-color: rgba(234, 255, 128, 0.4);\">\n                            <svg class=\"avatar-svg\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <text dominant-baseline=\"central\" fill=\"rgba(255,255,255,.6)\" font-size=\"40pt\" text-anchor=\"middle\" x=\"50\" y=\"50\">?</text>\n                            </svg>\n                        </div>\n                    </div>\n                    <div class=\"participant-content\">\n                        <span class=\"name\" class=\"fs-2 fw-bolder\">?</span>\n                        <span class=\"spacer\"></span>\n                        <div class=\"jitsi-icon camera-toggle-button\">\n                            <svg id=\"camera-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                        <div class=\"jitsi-icon mic-toggle-button\">\n                            <svg id=\"mic-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                    </div>\n                </div>\n            ";
        }
        else {
            body = "\n                <div class=\"jitsi-participant\">\n                    <div class=\"participant-avatar\">\n                        <div class=\"avatar  userAvatar w-40px h-40px\" style=\"background-color: rgba(234, 255, 128, 0.4);\">\n                            <svg class=\"avatar-svg\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <text dominant-baseline=\"central\" fill=\"rgba(255,255,255,.6)\" font-size=\"40pt\" text-anchor=\"middle\" x=\"50\" y=\"50\">?</text>\n                            </svg>\n                        </div>\n                    </div>\n                    <div class=\"participant-content\">\n                        <span class=\"name\" class=\"fs-2 fw-bolder\">?</span>\n                        <span class=\"spacer\"></span>\n                        <div class=\"jitsi-icon camera-toggle-button\" style=\"pointer-events: none; opacity: 30%;\">\n                            <svg id=\"camera-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                        <div class=\"jitsi-icon mic-toggle-button\" style=\"pointer-events: none; opacity: 30%;\">\n                            <svg id=\"mic-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                    </div>\n                </div>\n            ";
        }
        if (this.props.me && this.props.isControl && this.props.isSetHost) {
            body = "\n                <div class=\"jitsi-participant\">\n                    <div class=\"participant-avatar\">\n                        <div class=\"avatar  userAvatar w-40px h-40px\" style=\"background-color: rgba(234, 255, 128, 0.4);\">\n                            <svg class=\"avatar-svg\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <text dominant-baseline=\"central\" fill=\"rgba(255,255,255,.6)\" font-size=\"40pt\" text-anchor=\"middle\" x=\"50\" y=\"50\">?</text>\n                            </svg>\n                        </div>\n                    </div>\n                    <div class=\"participant-content\">\n                        <span class=\"name\" class=\"fs-2 fw-bolder\">?</span>\n                        <span class=\"spacer\"></span>\n                        <div class=\"jitsi-icon camera-toggle-button cameraowner\">\n                            <svg id=\"camera-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                        <div class=\"jitsi-icon mic-toggle-button micowner\">\n                            <svg id=\"mic-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                    </div>\n                </div>\n            ";
        }
        var $root = $(body);
        this.rootElement = $root[0];
        this.avatarElement = $root.find(".avatar")[0];
        this.avatarTextElement = $(this.avatarElement).find("text")[0];
        this.nameElement = $root.find(".name")[0];
        this.cameraButtonElement = $root.find(".camera-toggle-button")[0];
        this.micButtonElement = $root.find(".mic-toggle-button")[0];
        this.micForHostElement = $root.find(".micowner")[0];
        this.cameraForHostElement = $root.find(".cameraowner")[0];
        this.cameraIconElement = $(this.cameraButtonElement).find("path")[0];
        this.micIconElement = $(this.micButtonElement).find("path")[0];
        this.micIconForHostElement = $(this.micForHostElement).find("path")[0];
        this.cameraIconForHostElement = $(this.cameraForHostElement).find("path")[0];
        //avatar
        this.avatarTextElement.innerHTML = snippet_1.avatarName(this.props.name);
        var avatarColors = [
            "rgba(234, 255, 128, 0.4)",
            "rgba(114, 91, 60, 1.0)",
            "rgba(63, 65, 113, 1.0)",
            "rgba(56, 105, 91, 1.0)"
        ];
        $(this.avatarElement).css("background-color", avatarColors[snippet_1.random(0, avatarColors.length)]);
        //name
        if (this.props.me)
            $(this.nameElement).html(this.props.name + " (Me)");
        else
            $(this.nameElement).html(this.props.name);
        //icon
        this.updateCameraIcon();
        this.updateMicIcon();
        $(this.cameraButtonElement).on('click', function (_) {
            _this.onToggleCamera();
        });
        $(this.micButtonElement).on('click', function (_) {
            _this.onToggleMic();
        });
    };
    ParticipantItem.prototype.element = function () {
        return this.rootElement;
    };
    ParticipantItem.prototype.removeSelf = function () {
        $(this.rootElement).remove();
    };
    ParticipantItem.prototype.onToggleCamera = function () {
        if (this.props.isControl) {
            if (this.isHost && !this.props.me) {
                //alert("2");
                this.muteCamera = !this.muteCamera;
                this.updateCameraIcon();
                this.isPermissionCamera = !this.isPermissionCamera;
                this.props.givePermissionCamera(this.props.jitsiId, this.isPermissionCamera);
            }
            else {
                if (this.props.me && this.props.isSetHost) {
                    this.isSetHostControlCamera = true;
                    this.props.setHostControlCamera(this.props.jitsiId, true);
                }
                else {
                    this.isSetHostControlCamera = false;
                    this.props.setHostControlCamera(this.props.jitsiId, false);
                }
                this.props.onMuteCamera(this.props.jitsiId, !this.muteCamera, this.isHost);
            }
        }
        else {
            this.props.onMuteCamera(this.props.jitsiId, !this.muteCamera, this.isHost);
        }
    };
    ParticipantItem.prototype.onToggleMic = function () {
        if (this.props.isControl) {
            if (this.isHost && !this.props.me) {
                this.muteMic = !this.muteMic;
                this.updateMicIcon();
                this.isPermissionMic = !this.isPermissionMic;
                this.props.givePermissionMic(this.props.jitsiId, this.isPermissionMic);
            }
            else {
                if (this.props.me && this.props.isSetHost) {
                    this.isSetHostControlMic = true;
                    this.props.setHostControlMic(this.props.jitsiId, true);
                }
                else {
                    this.isSetHostControlMic = false;
                    this.props.setHostControlMic(this.props.jitsiId, false);
                }
                this.props.onMuteMic(this.props.jitsiId, !this.muteMic, this.isHost);
            }
        }
        else {
            //if (!this.isHost)
            //    return;
            this.props.onMuteMic(this.props.jitsiId, !this.muteMic, this.isHost);
        }
    };
    ParticipantItem.prototype.blockMic = function () {
        if (!this.muteMic)
            this.onToggleMic();
    };
    ParticipantItem.prototype.setMuteAudio = function (use) {
        this.muteMic = use;
        this.updateMicIcon();
    };
    ParticipantItem.prototype.setMuteVideo = function (use) {
        this.muteCamera = use;
        this.updateCameraIcon();
    };
    ParticipantItem.prototype.setRole = function (isHost) {
        this.isHost = isHost;
    };
    ParticipantItem.prototype.setPermissionMic = function (permisssion) {
        this.isPermissionMic = permisssion;
    };
    ParticipantItem.prototype.setPermissionCamera = function (permisssion) {
        this.isPermissionCamera = permisssion;
    };
    ParticipantItem.prototype.updateCameraIcon = function () {
        if (this.props.isHostForPermission && this.props.isControl && !this.props.me) {
            var icon = vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON;
            $(this.cameraIconElement).attr("d", icon);
            var color = this.muteCamera ? "#eb1717a6" : "#09eb1a78";
            $(this.cameraButtonElement).css("background-color", color);
            $(this.cameraButtonElement).css("border-radius", "20%");
        }
        else {
            var icon = this.muteCamera ? vector_icon_1.VectorIcon.VIDEO_MUTE_ICON : vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON;
            $(this.cameraIconElement).attr("d", icon);
        }
    };
    ParticipantItem.prototype.updateMicIcon = function () {
        if (this.props.isHostForPermission && this.props.isControl && !this.props.me) {
            var icon = vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON;
            $(this.micIconElement).attr("d", icon);
            var color = this.muteMic ? "#eb1717a6" : "#09eb1a78";
            $(this.micButtonElement).css("background-color", color);
            $(this.micButtonElement).css("border-radius", "20%");
        }
        else {
            var icon = this.muteMic ? vector_icon_1.VectorIcon.AUDIO_MUTE_ICON : vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON;
            $(this.micIconElement).attr("d", icon);
        }
    };
    ParticipantItem.prototype.updateMicIconForHost = function () {
        var icon = this.muteMic ? vector_icon_1.VectorIcon.AUDIO_MUTE_ICON : vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON;
        $(this.micIconForHostElement).attr("d", icon);
    };
    ParticipantItem.prototype.updateCameraIconForHost = function () {
        var icon = this.muteCamera ? vector_icon_1.VectorIcon.VIDEO_MUTE_ICON : vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON;
        $(this.cameraIconForHostElement).attr("d", icon);
    };
    return ParticipantItem;
}());
var ParticipantListPanelProps = /** @class */ (function () {
    function ParticipantListPanelProps() {
    }
    return ParticipantListPanelProps;
}());
exports.ParticipantListPanelProps = ParticipantListPanelProps;
var ParticipantListWidget = /** @class */ (function () {
    function ParticipantListWidget() {
        //states
        this.participantItemMap = new Map();
        this.isHost = false;
        this.isSetHostControlMic = false;
        this.isSetHostControlCamera = false;
        this.isSetHostControlSelfMic = false;
        this.isSetHostControlSelfCamera = false;
        this.isPermissionMic = false;
        this.isPermissionCamera = false;
        this.rootElement = document.getElementById("participants-list");
        var $root = $(this.rootElement);
        this.participantCountElement = $root.find("#participant-count")[0];
        this.participantListElement = $root.find("#participants-list-body")[0];
        this.muteAllButtonElement = $root.find("#participants-list-footer>.btn")[0];
        this.toggleCopyJoiningInfoElement = document.querySelector("#copy-joining-info");
        this.joiningInfoElement = document.querySelector("#joining-info");
    }
    ParticipantListWidget.prototype.init = function (props) {
        this.props = props;
        this.updateParticipantCount();
        this.attachHandlers();
    };
    ParticipantListWidget.prototype.attachHandlers = function () {
        var _this = this;
        $(this.muteAllButtonElement).on('click', function () {
            /*
            if (this.isHost)
            this.participantItemMap.forEach((participantItem, key) => {
                participantItem.blockMic();
            });
            */
            /*
            if (this.isControl)
                this.props.onMuteAll();
            else {
                if (this.isHost)
                    this.participantItemMap.forEach((participantItem, key) => {
                            participantItem.blockMic();
                    });
            }
            */
            _this.props.onMuteAll();
        });
        $(this.toggleCopyJoiningInfoElement).on('click', function (_) {
            _this.props.toggleCopyJoiningInfo();
        });
    };
    ParticipantListWidget.prototype.addParticipant = function (jitsiId, name, me, isMicDisable, isVideoDiable, muteCamera, muteMic) {
        if (this.participantItemMap.has(jitsiId)) {
            this.removeParticipant(jitsiId);
        }
        var props = new ParticipantItemProps();
        props.jitsiId = jitsiId;
        props.name = name;
        props.me = me;
        props.isMicDisable = isMicDisable;
        props.isHostForPermission = this.isHost;
        props.isControl = this.isControl;
        props.isSetHost = this.isSetHost;
        props.isVideoDisable = isVideoDiable;
        props.muteCamera = muteCamera;
        props.muteMic = muteMic;
        props.onMuteCamera = this.props.onMuteCamera;
        props.onMuteMic = this.props.onMuteMic;
        props.onMuteAll = this.props.onMuteAll;
        props.givePermissionMic = this.props.givePermissionMic;
        props.givePermissionCamera = this.props.givePermissionCamera;
        props.setHostControlMic = this.props.setHostControlMic;
        props.setHostControlCamera = this.props.setHostControlCamera;
        var item = new ParticipantItem(props);
        item.setRole(this.isHost);
        item.setPermissionMic(this.isPermissionMic);
        item.setPermissionCamera(this.isPermissionCamera);
        this.participantItemMap.set(jitsiId, item);
        this.updateParticipantCount();
        if (me && (isMicDisable || isVideoDiable)) {
            //if (me) {
            $(this.participantListElement).prepend(item.element());
        }
        else {
            $(this.participantListElement).append(item.element());
        }
    };
    ParticipantListWidget.prototype.removeParticipant = function (jitsiId) {
        if (!this.participantItemMap.has(jitsiId))
            return;
        this.participantItemMap.get(jitsiId).removeSelf();
        this.participantItemMap.delete(jitsiId);
        this.updateParticipantCount();
    };
    ParticipantListWidget.prototype.updateJoiningInfo = function (info) {
        this.joiningInfoElement.innerHTML = info;
    };
    ParticipantListWidget.prototype.updateParticipantCount = function () {
        this.participantCountElement.innerHTML = "" + this.participantItemMap.size;
    };
    ParticipantListWidget.prototype.setMuteCamera = function (jitsiId, muteCamera) {
        var item = this.participantItemMap.get(jitsiId);
        if (this.isControl) {
            if (item && !this.isHost)
                item.setMuteVideo(muteCamera);
            else if (this.isSetHostControlSelfCamera) {
                item.muteCamera = muteCamera;
                item.updateCameraIconForHost();
            }
        }
        else {
            if (item)
                item.setMuteVideo(muteCamera);
        }
    };
    ParticipantListWidget.prototype.setMuteMic = function (jitsiId, muteMic) {
        var item = this.participantItemMap.get(jitsiId);
        if (this.isControl) {
            if (item && !this.isHost)
                item.setMuteAudio(muteMic);
            else if (this.isSetHostControlSelfMic) {
                //alert("1");
                //item.setMuteAudio(muteMic);
                item.muteMic = muteMic;
                //item.updateMicIcon();
                item.updateMicIconForHost();
            }
        }
        else {
            if (item)
                item.setMuteAudio(muteMic);
        }
    };
    ParticipantListWidget.prototype.updatePermissionMic = function (permission) {
        this.isPermissionMic = permission;
        this.participantItemMap.forEach(function (participantItem, key) {
            participantItem.setPermissionMic(permission);
        });
        //alert("this.isPermissionMic3: " + this.isPermissionMic);
    };
    ParticipantListWidget.prototype.updatePermissionCamera = function (permission) {
        this.isPermissionCamera = permission;
        this.participantItemMap.forEach(function (participantItem, key) {
            participantItem.setPermissionCamera(permission);
        });
        //alert("this.isPermissionMic3: " + this.isPermissionMic);
    };
    ParticipantListWidget.prototype.updateByRole = function (isHost) {
        this.isHost = isHost;
        if (isHost)
            $(this.rootElement).addClass("is-host");
        else
            $(this.rootElement).removeClass("is-host");
        this.muteAllButtonElement.style.visibility = this.isHost ? "visible" : "hidden";
        this.participantItemMap.forEach(function (participantItem, key) {
            participantItem.setRole(isHost);
        });
    };
    ParticipantListWidget.prototype.setIscontrolAllowed = function (isControl) {
        this.isControl = isControl;
    };
    ParticipantListWidget.prototype.setHost = function (isSetHost) {
        this.isSetHost = isSetHost;
    };
    ParticipantListWidget.prototype.setIsHostControlSelfMic = function (isSetHostControlSelfMic) {
        this.isSetHostControlSelfMic = isSetHostControlSelfMic;
    };
    ParticipantListWidget.prototype.setIsHostControlSelfCamera = function (isSetHostControlSelfCamera) {
        this.isSetHostControlSelfCamera = isSetHostControlSelfCamera;
    };
    return ParticipantListWidget;
}());
exports.ParticipantListWidget = ParticipantListWidget;
//# sourceMappingURL=ParticipantListPanel.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\ParticipantListPanel.js","/components")
},{"../util/snippet":55,"./vector_icon":36,"buffer":25,"e/U+97":27}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingDialog = exports.SettingDialogProps = void 0;
var MediaType_1 = require("../enum/MediaType");
var ActiveDevices_1 = require("../model/ActiveDevices");
var SettingDialogProps = /** @class */ (function () {
    function SettingDialogProps() {
    }
    return SettingDialogProps;
}());
exports.SettingDialogProps = SettingDialogProps;
var SettingDialog = /** @class */ (function () {
    function SettingDialog() {
        this.JitsiMeetJS = window.JitsiMeetJS;
        this.audioTrackError = null;
        this.videoTrackError = null;
        this.activeCameraDeviceId = null;
        this.activeMicDeviceId = null;
        this.activeSpeakerDeviceId = null;
        this.localTracks = [];
    }
    SettingDialog.prototype.init = function (props) {
        this.props = props;
        this.dialog = document.querySelector(".setting-dialog-wrapper");
        this.showButton = document.querySelector(".setting-dialog-wrapper>button");
        $(this.dialog).addClass("d-none");
        this.okButton = document.querySelector("#setting-dialog-ok-button");
        this.closeButton = document.querySelector("#setting-dialog-cancel-button");
        this.videoPreviewElem = document.getElementById("camera-preview");
        this.audioPreviewElem = document.getElementById("mic-preview");
        this.cameraListElem = document.getElementById("camera-list");
        this.micListElem = document.getElementById("mic-list");
        this.speakerListElem = document.getElementById("speaker-list");
        this.attachEventHandlers();
        this.refreshDeviceList();
    };
    SettingDialog.prototype.show = function () {
        $(this.dialog).removeClass("d-none");
        $(this.showButton).trigger("click");
    };
    SettingDialog.prototype.attachEventHandlers = function () {
        var _this_1 = this;
        var _this = this;
        $(this.cameraListElem).off('change').on('change', function () {
            _this.onCameraChanged($(this).val());
        });
        $(this.micListElem).off('change').on('change', function () {
            _this.onMicChanged($(this).val());
        });
        $(this.speakerListElem).off('change').on('change', function () {
            _this.onSpeakerChanged($(this).val());
        });
        $(this.okButton).off('click').on('click', function () {
            _this_1.onOK();
        });
    };
    SettingDialog.prototype.refreshDeviceList = function () {
        var _this_1 = this;
        this.JitsiMeetJS.mediaDevices.enumerateDevices(function (devices) {
            _this_1.cameraList = devices.filter(function (d) { return d.kind === 'videoinput'; });
            _this_1.micList = devices.filter(function (d) { return d.kind === 'audioinput'; });
            _this_1.speakerList = devices.filter(function (d) { return d.kind === 'audiooutput'; });
            _this_1.renderDevices();
        });
    };
    SettingDialog.prototype.renderDevices = function () {
        var _this_1 = this;
        this.activeCameraDeviceId = this.props.curDevices.cameraId;
        this.activeMicDeviceId = this.props.curDevices.micId;
        this.activeSpeakerDeviceId = this.props.curDevices.speakerId;
        this.clearDOMElement(this.cameraListElem);
        this.cameraList.forEach(function (camera) {
            var selected = (_this_1.activeCameraDeviceId && camera.deviceId === _this_1.activeCameraDeviceId)
                ? "selected" : "";
            $(_this_1.cameraListElem).append("<option value=\"" + camera.deviceId + "\" " + selected + ">" + camera.label + "</option>");
        });
        this.clearDOMElement(this.micListElem);
        this.micList.forEach(function (mic) {
            var selected = (_this_1.activeMicDeviceId && mic.deviceId === _this_1.activeMicDeviceId)
                ? "selected" : "";
            $(_this_1.micListElem).append("<option value=\"" + mic.deviceId + "\" " + selected + ">" + mic.label + "</option>");
        });
        this.clearDOMElement(this.speakerListElem);
        this.speakerList.forEach(function (speaker) {
            var selected = (_this_1.activeSpeakerDeviceId && speaker.deviceId === _this_1.activeSpeakerDeviceId)
                ? "selected" : "";
            $(_this_1.speakerListElem).append("<option value=\"" + speaker.deviceId + "\" " + selected + ">" + speaker.label + "</option>");
        });
        $(".form-select").select2();
        this.createLocalTracks(this.activeCameraDeviceId, this.activeMicDeviceId)
            .then(function (tracks) {
            tracks.forEach(function (t) {
                if (t.getType() === MediaType_1.MediaType.VIDEO) {
                    t.attach(_this_1.videoPreviewElem);
                }
                else if (t.getType() === MediaType_1.MediaType.AUDIO) {
                    t.attach(_this_1.audioPreviewElem);
                }
            });
            _this_1.localTracks = tracks;
        });
    };
    SettingDialog.prototype.initCurrentDevices = function () {
        var _this_1 = this;
        var _this = this;
        $("option", this.cameraListElem).each(function (_) {
            if ($(_this_1).val() === _this.props.curDevices.micId)
                $(_this_1).attr("selected", "selected");
        });
    };
    SettingDialog.prototype.clearDOMElement = function (elem) {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    };
    SettingDialog.prototype.createLocalTracks = function (cameraDeviceId, micDeviceId) {
        var _this_1 = this;
        this.videoTrackError = null;
        this.audioTrackError = null;
        if (cameraDeviceId != null && micDeviceId != null) {
            return this.JitsiMeetJS.createLocalTracks({
                devices: ['audio', 'video'],
                cameraDeviceId: cameraDeviceId,
                micDeviceId: micDeviceId
            }).catch(function () { return Promise.all([
                _this_1.createAudioTrack(micDeviceId).then(function (_a) {
                    var stream = _a[0];
                    return stream;
                }),
                _this_1.createVideoTrack(cameraDeviceId).then(function (_a) {
                    var stream = _a[0];
                    return stream;
                })
            ]); }).then(function (tracks) {
                if (_this_1.audioTrackError) {
                    //display error
                }
                if (_this_1.videoTrackError) {
                    //display error
                }
                return tracks.filter(function (t) { return typeof t !== 'undefined'; });
            });
        }
        else if (cameraDeviceId != null) {
            return this.createVideoTrack(cameraDeviceId);
        }
        else if (micDeviceId != null) {
            return this.createAudioTrack(micDeviceId);
        }
        return Promise.resolve([]);
    };
    SettingDialog.prototype.createVideoTrack = function (cameraDeviceId) {
        var _this_1 = this;
        return this.JitsiMeetJS.createLocalTracks({
            devices: ['video'],
            cameraDeviceId: cameraDeviceId,
            micDeviceId: null
        })
            .catch(function (error) {
            _this_1.videoTrackError = error;
            return Promise.resolve([]);
        });
    };
    SettingDialog.prototype.createAudioTrack = function (micDeviceId) {
        var _this_1 = this;
        return (this.JitsiMeetJS.createLocalTracks({
            devices: ['audio'],
            cameraDeviceId: null,
            micDeviceId: micDeviceId
        })
            .catch(function (error) {
            _this_1.audioTrackError = error;
            return Promise.resolve([]);
        }));
    };
    SettingDialog.prototype.onCameraChanged = function (cameraDeviceId) {
        var _this_1 = this;
        this.activeCameraDeviceId = cameraDeviceId;
        this.createLocalTracks(this.activeCameraDeviceId, null)
            .then(function (tracks) {
            var newTrack = tracks.find(function (t) { return t.getType() === MediaType_1.MediaType.VIDEO; });
            //remove existing track
            var oldTrack = _this_1.localTracks.find(function (t) { return t.getType() === MediaType_1.MediaType.VIDEO; });
            if (oldTrack) {
                oldTrack.dispose();
                _this_1.localTracks.splice(_this_1.localTracks.indexOf(oldTrack), 1);
            }
            if (newTrack) {
                _this_1.localTracks.push(newTrack);
                newTrack.attach(_this_1.videoPreviewElem);
            }
        });
    };
    SettingDialog.prototype.onMicChanged = function (micDeviceId) {
        var _this_1 = this;
        this.activeMicDeviceId = micDeviceId;
        this.createLocalTracks(null, this.activeMicDeviceId)
            .then(function (tracks) {
            var newTrack = tracks.find(function (t) { return t.getType() === MediaType_1.MediaType.AUDIO; });
            //remove existing track
            var oldTrack = _this_1.localTracks.find(function (t) { return t.getType() === MediaType_1.MediaType.AUDIO; });
            if (oldTrack) {
                oldTrack.dispose();
                _this_1.localTracks.splice(_this_1.localTracks.indexOf(oldTrack), 1);
            }
            if (newTrack) {
                _this_1.localTracks.push(newTrack);
                newTrack.attach(_this_1.audioPreviewElem);
            }
        });
    };
    SettingDialog.prototype.onSpeakerChanged = function (speakerDeviceId) {
        this.activeSpeakerDeviceId = speakerDeviceId;
        if (this.activeSpeakerDeviceId && this.JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
            this.JitsiMeetJS.mediaDevices.setAudioOutputDevice(this.activeSpeakerDeviceId);
        }
        ;
    };
    SettingDialog.prototype.onOK = function () {
        this.closeDialog();
        var newDevices = new ActiveDevices_1.ActiveDevices();
        newDevices.cameraId = this.activeCameraDeviceId;
        newDevices.micId = this.activeMicDeviceId;
        newDevices.speakerId = this.activeSpeakerDeviceId;
        this.props.onDeviceChange(newDevices);
    };
    SettingDialog.prototype.closeDialog = function () {
        $(this.closeButton).trigger("click");
        this.localTracks.forEach(function (track) {
            track.dispose();
        });
    };
    return SettingDialog;
}());
exports.SettingDialog = SettingDialog;
//# sourceMappingURL=SettingDialog.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\SettingDialog.js","/components")
},{"../enum/MediaType":38,"../model/ActiveDevices":47,"buffer":25,"e/U+97":27}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolBar = exports.ToolBarProps = void 0;
var MediaType_1 = require("../enum/MediaType");
var vector_icon_1 = require("./vector_icon");
var ToolBarProps = /** @class */ (function () {
    function ToolBarProps() {
    }
    return ToolBarProps;
}());
exports.ToolBarProps = ToolBarProps;
var ToolBar = /** @class */ (function () {
    function ToolBar(props) {
        this.root = null;
        this.props = props;
        this.root = document.getElementById("new-toolbox");
        this.toolbarTileViewButtonElement = document.querySelector("#tileview");
        this.toolbarMuteAllButtonElement = document.querySelector("#muteall");
        this.toolbarMuteAllVideoButtonElement = document.querySelector("#muteallvideo");
        this.toolbarAudioButtonElement = document.querySelector("#mic-enable");
        this.toolbarVideoButtonElement = document.querySelector("#camera-enable");
        this.toolbarDesktopShareButtonElement = document.querySelector("#share");
        this.toolbarDesktopShareMenuButtonElement = document.querySelector("#sharescreen");
        this.toolbarRecordButtonElement = document.querySelector("#record");
        this.toolbarHandRaiseButtonElement = document.querySelector("#handraise");
        this.toolbarChatButtonElement = document.querySelector("#chat");
        this.toolbarLeaveButtonElement = document.querySelector("#leave");
        this.toolbarSettingButtonElement = document.querySelector("#setting");
        this.chattingUnreadBadge = document.querySelector(".chat-badge");
        this.attachHandlers();
    }
    ToolBar.prototype.attachHandlers = function () {
        var _this = this;
        $(this.toolbarTileViewButtonElement).on('click', function () {
            _this.props.toggleTileView();
        });
        $(this.toolbarMuteAllButtonElement).on('click', function () {
            _this.props.toggleMuteAll();
        });
        $(this.toolbarMuteAllVideoButtonElement).on('click', function () {
            _this.props.toggleMuteAllVideo();
        });
        $(this.toolbarVideoButtonElement).on('click', function () {
            _this.props.toggleVideoMute();
        });
        $(this.toolbarAudioButtonElement).on('click', function () {
            _this.props.toggleAudioMute();
        });
        $(this.toolbarChatButtonElement).on('click', function (_) {
            _this.props.openChatting(true);
        });
        $(this.toolbarDesktopShareButtonElement).on("click", function () {
            _this.props.toggleScreenShare();
        });
        $(this.toolbarDesktopShareMenuButtonElement).on("click", function () {
            _this.props.toggleScreenShare();
        });
        $(this.toolbarRecordButtonElement).on('click', function () {
            _this.props.toggleRecording();
        });
        $(this.toolbarHandRaiseButtonElement).on('click', function () {
            _this.props.toggleHandRaise();
        });
        $(this.toolbarSettingButtonElement).on('click', function () {
            _this.props.openSetting();
        });
        $(this.toolbarLeaveButtonElement).click(function () {
            _this.props.leaveMeeting();
        });
    };
    ToolBar.prototype.update = function (userInfo, localTracks) {
        var audioMuted = false, videoMuted = false;
        var hasAudioTrack = false, hasVideoTrack = false;
        localTracks.forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO) {
                hasVideoTrack = true;
                if (track.isMuted())
                    videoMuted = true;
            }
            else if (track.getType() === MediaType_1.MediaType.AUDIO) {
                hasAudioTrack = true;
                if (track.isMuted())
                    audioMuted = true;
            }
        });
        this.toolbarVideoButtonElement.style.display = hasVideoTrack ? "inline-block" : "";
        this.toolbarDesktopShareButtonElement.style.display = hasVideoTrack ? "inline-block" : "";
        this.toolbarAudioButtonElement.style.display = hasAudioTrack ? "inline-block" : "";
        if (audioMuted) {
            $(this.toolbarAudioButtonElement).find("path").attr("d", vector_icon_1.VectorIcon.AUDIO_MUTE_ICON);
            $(this.toolbarAudioButtonElement).addClass("muted");
        }
        else {
            $(this.toolbarAudioButtonElement).find("path").attr("d", vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON);
            $(this.toolbarAudioButtonElement).removeClass("muted");
        }
        if (videoMuted) {
            $(this.toolbarVideoButtonElement).find("path").attr("d", vector_icon_1.VectorIcon.VIDEO_MUTE_ICON);
            $(this.toolbarVideoButtonElement).addClass("muted");
        }
        else {
            $(this.toolbarVideoButtonElement).find("path").attr("d", vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON);
            $(this.toolbarVideoButtonElement).removeClass("muted");
        }
    };
    ToolBar.prototype.setScreenShare = function (on) {
        if (on) {
            $(".toolbox-icon", this.toolbarDesktopShareButtonElement).addClass("toggled");
        }
        else {
            $(".toolbox-icon", this.toolbarDesktopShareButtonElement).removeClass("toggled");
        }
    };
    ToolBar.prototype.setRecording = function (on) {
        if (on) {
            $(this.toolbarRecordButtonElement).addClass("live");
        }
        else {
            $(this.toolbarRecordButtonElement).removeClass("live");
        }
    };
    ToolBar.prototype.fadeIn = function () {
        $(this.root).addClass("visible");
    };
    ToolBar.prototype.fadeOut = function () {
        $(this.root).removeClass("visible");
    };
    ToolBar.prototype.showUnreadBadge = function (show) {
        this.chattingUnreadBadge.style.display = !!show ? "flex" : "none";
    };
    ToolBar.prototype.setUnreadCount = function (count) {
        this.chattingUnreadBadge.innerHTML = "" + count;
    };
    ToolBar.prototype.updateByRole = function (isHost) {
        this.toolbarHandRaiseButtonElement.style.display = isHost ? "none" : "inline-block";
        this.toolbarMuteAllButtonElement.style.display = !isHost ? "none" : "block";
        this.toolbarMuteAllVideoButtonElement.style.display = !isHost ? "none" : "block";
    };
    return ToolBar;
}());
exports.ToolBar = ToolBar;
//# sourceMappingURL=ToolBar.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\ToolBar.js","/components")
},{"../enum/MediaType":38,"./vector_icon":36,"buffer":25,"e/U+97":27}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPanel = exports.VideoPanelProps = void 0;
var MediaType_1 = require("../enum/MediaType");
var UserProperty_1 = require("../enum/UserProperty");
var snippet_1 = require("../util/snippet");
var vector_icon_1 = require("./vector_icon");
var VideoPanelProps = /** @class */ (function () {
    function VideoPanelProps() {
    }
    return VideoPanelProps;
}());
exports.VideoPanelProps = VideoPanelProps;
var DISCO_REMOTE_CONTROL_FEATURE = 'http://jitsi.org/meet/remotecontrol';
var VideoPanel = /** @class */ (function () {
    function VideoPanel(props) {
        this.videoElementClass = "video-element";
        this.moderatorClass = "moderator-icon";
        this.audioMuteClass = "audioMuted";
        this.videoMuteClass = "videoMuted";
        this.userNameClass = "displayname";
        this.shortNameClass = "avatar-container";
        this.activeSpeakerClass = "active-speaker";
        this.privateChatClass = "private-chat";
        this.popupMenuButtonClass = "remotevideomenu";
        this.props = props;
        this.panelClass = this.props.panelClass;
        this.fullscreenClass = this.props.fullscreenClass;
        this.popupMenuClass = this.props.popupMenuClass;
        this.Id = ++VideoPanel.nPanelInstanceId;
        this.root = this.create();
        this.videoElem = $("video", this.root)[0];
        this.audioElem = $("audio", this.root)[0];
        this.nameElem = $("." + this.userNameClass, this.root)[0];
        this.avatarNameElem = $("." + this.shortNameClass, this.root)[0];
        //white small icons at the bottom of panel
        this.audioMuteIconElem = $("." + this.audioMuteClass, this.root)[0];
        this.videoMuteIconElem = $("." + this.videoMuteClass, this.root)[0];
        this.moderatorIconElem = $("." + this.moderatorClass, this.root)[0];
        //menu items 
        this.grantModeratorMenuItem = $("li.grant-moderator", this.root)[0];
        this.audioMuteMenuItem = $("li.audio-mute", this.root)[0];
        this.videoMuteMenuItem = $("li.video-mute", this.root)[0];
        this.fullscreenMuteItem = $("li.fullscreen", this.root)[0];
        this.kickParticipantMenuItem = $("li.kick-participant", this.root)[0];
        this.remoteControlMenuItem = $("li.remote-control", this.root)[0];
        //this.attachHandlers();
    }
    VideoPanel.prototype.attachHandlers = function () {
        var _this = this;
        this.tileIcon = document.querySelector("#tileview");
        $(this.root)
            .on('click', "." + _this.popupMenuButtonClass, function (e) {
            $("." + _this.popupMenuClass).removeClass("visible");
            $(this).find("." + _this.popupMenuClass).addClass("visible").focus();
            e.stopPropagation();
        })
            .on('click', 'li.overflow-menu-item', function (e) {
            $(this).closest("." + _this.popupMenuClass).removeClass("visible");
            e.stopPropagation();
        })
            .on('click', '.fullscreen', function (e) {
            $(_this.root).toggleClass(_this.fullscreenClass);
            _this.props.refreshGrid();
            var label = $(this).find(".label");
            if ($(_this.root).hasClass(_this.fullscreenClass)) {
                label.html("Exit full screen");
            }
            else {
                label.html("View full screen");
            }
        })
            .on('mouseover', function () {
            $(this).removeClass("display-video");
            $(this).addClass("display-name-on-video");
        })
            .on('mouseout', function () {
            $(this).removeClass("display-name-on-video");
            $(this).addClass("display-video");
        })
            .on('dblclick', function (e) {
            $(this).find(".fullscreen").trigger("click");
        });
        $(this.tileIcon).on('click', function () {
            $(_this.root).toggleClass(_this.fullscreenClass);
            _this.props.refreshGrid();
        });
    };
    VideoPanel.prototype.setShotnameVisible = function (show) {
        this.avatarNameElem.style.display = show ? "block" : "none";
        this.videoElem.style.visibility = show ? "hidden" : "visible";
    };
    VideoPanel.prototype.setUserName = function (name) {
        this.nameElem.innerHTML = name;
        $("text", this.avatarNameElem).html(snippet_1.avatarName(name));
    };
    VideoPanel.prototype.showModeratorIcon = function (show) {
        this.moderatorIconElem.style.display = show ? "block" : "none";
    };
    VideoPanel.prototype.setHighlight = function (h) {
        if (h)
            $(this.root).addClass(this.activeSpeakerClass);
        else
            $(this.root).removeClass(this.activeSpeakerClass);
    };
    VideoPanel.prototype.updatePanelOnJitsiUser = function (myInfo, jitsiUser) {
        var _this_1 = this;
        //set name
        this.setUserName(jitsiUser.getDisplayName());
        //hide shotname if exist visible video track
        var isVisibleVideo = false;
        jitsiUser.getTracks().forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO && !track.isMuted()) {
                isVisibleVideo = true;
            }
        });
        this.setShotnameVisible(!isVisibleVideo);
        //bottom small icons
        this.videoMuteIconElem.style.display = jitsiUser.isVideoMuted() ? "block" : "none";
        this.audioMuteIconElem.style.display = jitsiUser.isAudioMuted() ? "block" : "none";
        this.moderatorIconElem.style.display = jitsiUser.getProperty(UserProperty_1.UserProperty.IsHost) ? "block" : "none";
        //popup menu
        if (myInfo.IsHost) {
            var userHaveCamera_1 = false, userHaveMicrophone_1 = false;
            jitsiUser.getTracks().forEach(function (track) {
                if (track.getType() === MediaType_1.MediaType.VIDEO)
                    userHaveCamera_1 = true;
                else if (track.getType() === MediaType_1.MediaType.AUDIO)
                    userHaveMicrophone_1 = true;
            });
            this.videoMuteMenuItem.style.display = userHaveCamera_1 ? "flex" : "none";
            this.audioMuteMenuItem.style.display = userHaveMicrophone_1 ? "flex" : "none";
            this.grantModeratorMenuItem.style.display = "flex";
            this.kickParticipantMenuItem.style.display = "flex";
            this.remoteControlMenuItem.style.display = "none";
            jitsiUser.getFeatures()
                .then(function (features) {
                /**/
                var b = features.has(DISCO_REMOTE_CONTROL_FEATURE);
                if (b)
                    _this_1.remoteControlMenuItem.style.display = "flex";
                console.log("-------------user:" + b);
                console.log(jitsiUser);
            });
        }
        else {
            this.videoMuteMenuItem.style.display = "none";
            this.audioMuteMenuItem.style.display = "none";
            this.grantModeratorMenuItem.style.display = "none";
            this.kickParticipantMenuItem.style.display = "none";
            this.remoteControlMenuItem.style.display = "none";
        }
        if (jitsiUser.getProperty(UserProperty_1.UserProperty.IsHost)) {
            this.grantModeratorMenuItem.style.display = "none";
            this.kickParticipantMenuItem.style.display = "none";
            this.remoteControlMenuItem.style.display = "none";
        }
        //popup menu audio icon/label change
        if (this.audioMuteMenuItem.style.display === 'flex') {
            if (jitsiUser.isAudioMuted()) {
                $(this.audioMuteMenuItem).find(".label").html("Unmute Audio");
                $(this.audioMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.AUDIO_MUTE_ICON);
            }
            else {
                $(this.audioMuteMenuItem).find(".label").html("Mute Audio");
                $(this.audioMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON);
            }
        }
        if (this.videoMuteMenuItem.style.display === 'flex') {
            if (jitsiUser.isVideoMuted()) {
                $(this.videoMuteMenuItem).find(".label").html("Unmute Video");
                $(this.videoMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.VIDEO_MUTE_ICON);
            }
            else {
                $(this.videoMuteMenuItem).find(".label").html("Mute Video");
                $(this.videoMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON);
            }
        }
        //popup menu handlers
        if (myInfo.IsHost) {
            $(this.grantModeratorMenuItem).unbind('click').on('click', function () {
                _this_1.props.grantModeratorRole(jitsiUser.getId());
            });
            $(this.audioMuteMenuItem).unbind('click').on('click', function () {
                _this_1.props.muteUserAudio(jitsiUser.getId(), !jitsiUser.isAudioMuted());
            });
            $(this.videoMuteMenuItem).unbind('click').on('click', function () {
                _this_1.props.muteUserVideo(jitsiUser.getId(), !jitsiUser.isVideoMuted());
            });
            $(this.kickParticipantMenuItem).unbind('click').on('click', function () {
                _this_1.props.kickParticipantOut(jitsiUser.getId());
            });
            $(this.remoteControlMenuItem).unbind('click').on('click', function () {
                _this_1.props.sendRemoteControlReply('permissions', {}, jitsiUser.getId());
            });
        }
        //private chat handler
        $(this.root).find("." + this.privateChatClass).unbind('click').on('click', function () {
            _this_1.props.openPrivateChat(jitsiUser.getId(), jitsiUser.getDisplayName());
        });
        //active speaker(blue border)
        $(this.root).removeClass(this.activeSpeakerClass);
        var _this = this;
        $(this.root).on('mousedown', function (e) {
            //e.preventDefault();
            e.stopPropagation();
            if (e.which === 3) {
                e.preventDefault();
            }
            var ae = {
                button: e.button + 1,
                x: e.offsetX,
                y: e.offsetY
            };
            _this.props.sendRemoteControlReply('mousedown', ae, jitsiUser.getId());
        });
        $(this.root).on('mouseup', function (e) {
            //e.preventDefault();
            e.stopPropagation();
            if (e.which === 3)
                e.preventDefault();
            var ae = {
                button: e.button + 1,
                x: e.offsetX,
                y: e.offsetY
            };
            _this.props.sendRemoteControlReply('mouseup', ae, jitsiUser.getId());
        });
        var enableHandler = true;
        $(this.root).on('mousemove', function (e) {
            if (enableHandler) {
                e.stopPropagation();
                var ae = {
                    button: e.button + 1,
                    x: e.offsetX / this.offsetWidth,
                    y: e.offsetY / this.offsetHeight
                };
                _this.props.sendRemoteControlReply('mousemove', ae, jitsiUser.getId());
                enableHandler = false;
            }
        });
        var timer = window.setInterval(function () {
            enableHandler = true;
        }, 200);
        $(window).unbind().on('keydown', function (e) {
            var modifiers = [];
            if (e.shiftKey) {
                modifiers.push('shift');
            }
            if (e.ctrlKey) {
                modifiers.push('control');
            }
            if (e.altKey) {
                modifiers.push('alt');
            }
            if (e.metaKey) {
                modifiers.push('command');
            }
            var ae = {
                modifiers: modifiers,
                key: e.keyCode,
            };
            _this.props.sendRemoteControlReply('keydown', ae, jitsiUser.getId());
        });
        $(window).on('keyup', function (e) {
            var modifiers = [];
            if (e.shiftKey) {
                modifiers.push('shift');
            }
            if (e.ctrlKey) {
                modifiers.push('control');
            }
            if (e.altKey) {
                modifiers.push('alt');
            }
            if (e.metaKey) {
                modifiers.push('command');
            }
            var ae = {
                modifiers: modifiers,
                key: e.keyCode,
            };
            _this.props.sendRemoteControlReply('keyup', ae, jitsiUser.getId());
        });
    };
    VideoPanel.prototype.updatePanelOnMyBGUser = function (myInfo, localTracks) {
        var _this_1 = this;
        var audioMuted = true, videoMuted = true;
        localTracks.forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO && !track.isMuted())
                videoMuted = false;
            else if (track.getType() === MediaType_1.MediaType.AUDIO && !track.isMuted())
                audioMuted = false;
        });
        //name
        this.setUserName(myInfo.Name);
        var isVisibleVideo = false;
        localTracks.forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO && !track.isMuted()) {
                isVisibleVideo = true;
            }
        });
        this.setShotnameVisible(!isVisibleVideo);
        //bottom small icons
        this.videoMuteIconElem.style.display = videoMuted ? "block" : "none";
        this.audioMuteIconElem.style.display = audioMuted ? "block" : "none";
        this.moderatorIconElem.style.display = myInfo.IsHost ? "block" : "none";
        //popup menu
        if (myInfo.IsHost) {
            this.videoMuteMenuItem.style.display = myInfo.mediaPolicy.useCamera ? "flex" : "none";
            this.audioMuteMenuItem.style.display = myInfo.mediaPolicy.useMic ? "flex" : "none";
        }
        else {
            this.videoMuteMenuItem.style.display = "none";
            this.audioMuteMenuItem.style.display = "none";
        }
        this.grantModeratorMenuItem.style.display = "none";
        this.kickParticipantMenuItem.style.display = "none";
        this.remoteControlMenuItem.style.display = "none";
        //popup menu audio icon/label change
        if (this.audioMuteMenuItem.style.display === 'flex') {
            if (audioMuted) {
                $(this.audioMuteMenuItem).find(".label").html("Unmute Audio");
                $(this.audioMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.AUDIO_MUTE_ICON);
            }
            else {
                $(this.audioMuteMenuItem).find(".label").html("Mute Audio");
                $(this.audioMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON);
            }
        }
        if (this.videoMuteMenuItem.style.display === 'flex') {
            if (videoMuted) {
                $(this.videoMuteMenuItem).find(".label").html("Unmute Video");
                $(this.videoMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.VIDEO_MUTE_ICON);
            }
            else {
                $(this.videoMuteMenuItem).find(".label").html("Mute Video");
                $(this.videoMuteMenuItem).find("path").attr("d", vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON);
            }
        }
        //popup menu handlers
        if (myInfo.IsHost) {
            $(this.audioMuteMenuItem).unbind('click').on('click', function () {
                _this_1.props.muteMyAudio(!audioMuted);
            });
            $(this.videoMuteMenuItem).unbind('click').on('click', function () {
                _this_1.props.muteMyVideo(!videoMuted);
            });
        }
        //hide private-chat item
        $(this.root).find("." + this.privateChatClass).hide();
        //active speaker(blue border)
        $(this.root).addClass(this.activeSpeakerClass);
    };
    VideoPanel.prototype.create = function () {
        var videoTag = "<video autoplay playsinline style='object-fit:cover; '  class='" + this.videoElementClass + "' id='remoteVideo_" + this.Id + "'></video>";
        var audioTag = "<audio autoplay=\"\" id=\"remoteAudio_" + this.Id + "\"></audio>";
        var avatarVisible = 'visible';
        var cameraStatus = '<div class="indicator-container videoMuted"> \
                        <div> \
                            <span class="indicator-icon-container  toolbar-icon" id=""> \
                                <div class="jitsi-icon "> \
                                    <svg height="13" id="camera-disabled" width="13" viewBox="0 0 32 32"> \
                                        <path d="M4.375 2.688L28 26.313l-1.688 1.688-4.25-4.25c-.188.125-.5.25-.75.25h-16c-.75 0-1.313-.563-1.313-1.313V9.313c0-.75.563-1.313 1.313-1.313h1L2.687 4.375zm23.625 6v14.25L13.062 8h8.25c.75 0 1.375.563 1.375 1.313v4.688z"></path> \
                                    </svg> \
                                </div> \
                            </span> \
                        </div> \
                    </div>';
        var micStatus = '<div class="indicator-container audioMuted"> \
                            <div> \
                                <span class="indicator-icon-container  toolbar-icon" id=""> \
                                    <div class="jitsi-icon "> \
                                        <svg height="13" id="mic-disabled" width="13" viewBox="0 0 32 32"> \
                                            <path d="M5.688 4l22.313 22.313-1.688 1.688-5.563-5.563c-1 .625-2.25 1-3.438 1.188v4.375h-2.625v-4.375c-4.375-.625-8-4.375-8-8.938h2.25c0 4 3.375 6.75 7.063 6.75 1.063 0 2.125-.25 3.063-.688l-2.188-2.188c-.25.063-.563.125-.875.125-2.188 0-4-1.813-4-4v-1l-8-8zM20 14.875l-8-7.938v-.25c0-2.188 1.813-4 4-4s4 1.813 4 4v8.188zm5.313-.187a8.824 8.824 0 01-1.188 4.375L22.5 17.375c.375-.813.563-1.688.563-2.688h2.25z"></path> \
                                        </svg> \
                                    </div> \
                                </span> \
                            </div> \
                        </div>';
        var moderatorStatus = '<div class="moderator-icon right"> \
                                <div class="indicator-container"> \
                                    <div> \
                                        <span class="indicator-icon-container focusindicator toolbar-icon" id=""> \
                                            <div class="jitsi-icon "> \
                                                <svg height="13" width="13" viewBox="0 0 32 32"> \
                                                    <path d="M16 20.563l5 3-1.313-5.688L24.125 14l-5.875-.5L16 8.125 13.75 13.5l-5.875.5 4.438 3.875L11 23.563zm13.313-8.25l-7.25 6.313 2.188 9.375-8.25-5-8.25 5 2.188-9.375-7.25-6.313 9.563-.813 3.75-8.813 3.75 8.813z"></path> \
                                                </svg> \
                                            </div> \
                                        </span> \
                                    </div> \
                                </div> \
                            </div>';
        var panelHtml = "\n        <span class=\"" + this.panelClass + " display-video\" onContextMenu = \"return false;\">\n            \n            " + videoTag + " \n            " + audioTag + "\n            \n            <div class=\"videocontainer__toolbar\">\n                <div> " + cameraStatus + " " + micStatus + " " + moderatorStatus + "</div>\n            </div>\n            <div class=\"videocontainer__hoverOverlay\"></div>\n            <div class=\"displayNameContainer\"><span class=\"displayname\" id=\"localDisplayName\">Name</span>\n            \n            </div>\n            <div class=\"avatar-container " + avatarVisible + "\" style=\"height: 105.5px; width: 105.5px;\">\n                <div class=\"avatar  userAvatar\" style=\"background-color: rgba(234, 255, 128, 0.4); font-size: 180%; height: 100%; width: 100%;\">\n                    <svg class=\"avatar-svg\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <text dominant-baseline=\"central\" fill=\"rgba(255,255,255,.6)\" font-size=\"40pt\" text-anchor=\"middle\" x=\"50\" y=\"50\">Name</text>\n                    </svg>\n                </div>\n            </div >\n            <span class=\"" + this.popupMenuButtonClass + "\">\n                <div class=\"\" id=\"\">\n                    <span class=\"popover-trigger remote-video-menu-trigger\">\n                        <div class=\"jitsi-icon\">\n                            <svg height=\"1em\" width=\"1em\" viewBox=\"0 0 24 24\">\n                                <path d=\"M12 15.984c1.078 0 2.016.938 2.016 2.016s-.938 2.016-2.016 2.016S9.984 19.078 9.984 18s.938-2.016 2.016-2.016zm0-6c1.078 0 2.016.938 2.016 2.016s-.938 2.016-2.016 2.016S9.984 13.078 9.984 12 10.922 9.984 12 9.984zm0-1.968c-1.078 0-2.016-.938-2.016-2.016S10.922 3.984 12 3.984s2.016.938 2.016 2.016S13.078 8.016 12 8.016z\"></path>                             </svg>\n                        </div>\n                    </span>\n                </div>\n                <div class=\"" + this.popupMenuClass + "\" tabIndex=-1 style=\"position: relative; right: 168px;  top: 25px; width: 175px;\">\n                    <ul aria-label=\"More actions menu\" class=\"overflow-menu\">\n                        <li aria-label=\"Grant Moderator\" class=\"overflow-menu-item grant-moderator\" tabindex=\"0\" role=\"button\">\n                            <span class=\"overflow-menu-item-icon\">\n                                <div class=\"jitsi-icon \">\n                                    <svg height=\"22\" width=\"22\" viewBox=\"0 0 24 24\">\n                                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 4a2 2 0 01-1.298 1.873l1.527 4.07.716 1.912c.062.074.126.074.165.035l1.444-1.444 2.032-2.032a2 2 0 111.248.579L19 19a2 2 0 01-2 2H7a2 2 0 01-2-2L4.166 8.993a2 2 0 111.248-.579l2.033 2.033L8.89 11.89c.087.042.145.016.165-.035l.716-1.912 1.527-4.07A2 2 0 1114 4zM6.84 17l-.393-4.725 1.029 1.03a2.1 2.1 0 003.451-.748L12 9.696l1.073 2.86a2.1 2.1 0 003.451.748l1.03-1.03L17.16 17H6.84z\"></path>                                     </svg>\n                                </div>\n                            </span>\n                            <span class=\"label\">Grant Moderator</span>\n                        </li>\n                        <li aria-label=\"Mute\" class=\"overflow-menu-item audio-mute\" tabindex=\"0\" role=\"button\">\n                            <span class=\"overflow-menu-item-icon\">\n                                <div class=\"jitsi-icon \">\n                                    <svg fill=\"none\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n                                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.333 8.65V11a3.668 3.668 0 002.757 3.553.928.928 0 00-.007.114v1.757A5.501 5.501 0 015.5 11a.917.917 0 10-1.833 0c0 3.74 2.799 6.826 6.416 7.277v.973a.917.917 0 001.834 0v-.973a7.297 7.297 0 003.568-1.475l3.091 3.092a.932.932 0 101.318-1.318l-3.091-3.091.01-.013-1.311-1.311-.01.013-1.325-1.325.008-.014-1.395-1.395a1.24 1.24 0 01-.004.018l-3.61-3.609v-.023L7.334 5.993v.023l-3.909-3.91a.932.932 0 10-1.318 1.318L7.333 8.65zm1.834 1.834V11a1.833 1.833 0 002.291 1.776l-2.291-2.292zm3.682 3.683c-.29.17-.606.3-.94.386a.928.928 0 01.008.114v1.757a5.47 5.47 0 002.257-.932l-1.325-1.325zm1.818-3.476l-1.834-1.834V5.5a1.833 1.833 0 00-3.644-.287l-1.43-1.43A3.666 3.666 0 0114.667 5.5v5.19zm1.665 1.665l1.447 1.447c.357-.864.554-1.81.554-2.803a.917.917 0 10-1.833 0c0 .468-.058.922-.168 1.356z\"></path>                                     </svg>\n                                </div>\n                            </span>\n                            <span class=\"label\">Mute</span>\n                        </li>\n                        <li aria-label=\"Disable camera\" class=\"overflow-menu-item video-mute\" tabindex=\"0\" role=\"button\">\n                            <span class=\"overflow-menu-item-icon\">\n                                <div class=\"jitsi-icon\">\n                                    <svg fill=\"none\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n                                        <path clip-rule=\"evenodd\" d=\"M6.84 5.5h-.022L3.424 2.106a.932.932 0 10-1.318 1.318L4.182 5.5h-.515c-1.013 0-1.834.82-1.834 1.833v7.334c0 1.012.821 1.833 1.834 1.833H13.75c.404 0 .777-.13 1.08-.352l3.746 3.746a.932.932 0 101.318-1.318l-4.31-4.31v-.024L13.75 12.41v.023l-5.1-5.099h.024L6.841 5.5zm6.91 4.274V7.333h-2.44L9.475 5.5h4.274c1.012 0 1.833.82 1.833 1.833v.786l3.212-1.835a.917.917 0 011.372.796v7.84c0 .344-.19.644-.47.8l-3.736-3.735 2.372 1.356V8.659l-2.75 1.571v1.377L13.75 9.774zM3.667 7.334h2.349l7.333 7.333H3.667V7.333z\"></path>                                     </svg>\n                                </div>\n                            </span>\n                            <span class=\"label\">Disable camera</span>\n                        </li>\n                        <li aria-label=\"Toggle full screen\" class=\"overflow-menu-item fullscreen\">\n                            <span class=\"overflow-menu-item-icon\">\n                                <div class=\"jitsi-icon \">\n                                    <svg fill=\"none\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n                                        <path clip-rule=\"evenodd\" d=\"M8.25 2.75H3.667a.917.917 0 00-.917.917V8.25h1.833V4.583H8.25V2.75zm5.5 1.833V2.75h4.583c.507 0 .917.41.917.917V8.25h-1.833V4.583H13.75zm0 12.834h3.667V13.75h1.833v4.583c0 .507-.41.917-.917.917H13.75v-1.833zM4.583 13.75v3.667H8.25v1.833H3.667a.917.917 0 01-.917-.917V13.75h1.833z\"></path>                                     </svg>\n                                </div>\n                            </span>\n                            <span class=\"label overflow-menu-item-text\">View full screen</span>\n                        </li>\n                        <li aria-label=\"\" class=\"overflow-menu-item " + this.privateChatClass + "\">\n                            <span class=\"overflow-menu-item-icon\">\n                                <div class=\"jitsi-icon \">\n                                    <svg fill=\"none\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n                                        <path clip-rule=\"evenodd\" d=\"M19,8H18V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V17a1,1,0,0,0,.62.92A.84.84,0,0,0,3,18a1,1,0,0,0,.71-.29l2.81-2.82H8v1.44a3,3,0,0,0,3,3h6.92l2.37,2.38A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V11A3,3,0,0,0,19,8ZM8,11v1.89H6.11a1,1,0,0,0-.71.29L4,14.59V5A1,1,0,0,1,5,4H15a1,1,0,0,1,1,1V8H11A3,3,0,0,0,8,11Zm12,7.59-1-1a1,1,0,0,0-.71-.3H11a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1Z\"></path>                                     </svg>\n                                </div>\n                            </span>\n                            <span class=\"label overflow-menu-item-text\">Private chat</span>\n                        </li>\n                        <li aria-label=\"\" class=\"overflow-menu-item kick-participant\">\n                            <span class=\"overflow-menu-item-icon\">\n                                <div class=\"jitsi-icon \">\n                                    <svg height=\"20\" width=\"20\" viewBox=\"0 0 20 20\">\n                                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 16.667a6.667 6.667 0 100-13.334 6.667 6.667 0 000 13.334zm0 1.666a8.333 8.333 0 110-16.666 8.333 8.333 0 010 16.666zm0-9.512l2.357-2.357a.833.833 0 111.179 1.179L11.179 10l2.357 2.357a.833.833 0 11-1.179 1.179L10 11.178l-2.357 2.357a.833.833 0 01-1.178-1.179L8.822 10 6.465 7.643a.833.833 0 111.178-1.179L10 8.821z\"></path>\n                                    </svg>\n                                </div>\n                            </span>\n                            <span class=\"label overflow-menu-item-text\">Kick out</span>\n                        </li>\n                        <li aria-label=\"\" class=\"overflow-menu-item remote-control\">\n                            <span class=\"overflow-menu-item-icon\">\n                                <div class=\"jitsi-icon \">\n                                    <svg height=\"22\" width=\"22\" viewBox=\"0 0 22 28\">\n                                        <path d=\"M21.625 14.484L.875 26.015c-.484.266-.875.031-.875-.516v-23c0-.547.391-.781.875-.516l20.75 11.531c.484.266.484.703 0 .969z\"></path>\n                                    </svg>\n                                </div>\n                            </span>\n                            <span class=\"label overflow-menu-item-text\">Remote Control</span>\n                        </li>\n                    </ul>\n                </div>\n            </span>\n        </span >";
        return $(panelHtml)[0];
    };
    VideoPanel.nPanelInstanceId = 0; //increased when add new, but not decreased when remove panel
    return VideoPanel;
}());
exports.VideoPanel = VideoPanel;
//# sourceMappingURL=VideoPanel.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\VideoPanel.js","/components")
},{"../enum/MediaType":38,"../enum/UserProperty":40,"../util/snippet":55,"./vector_icon":36,"buffer":25,"e/U+97":27}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPanelGrid = exports.VideoPanelGridProps = void 0;
var VideoPanel_1 = require("./VideoPanel");
var VideoPanelGridProps = /** @class */ (function () {
    function VideoPanelGridProps() {
    }
    return VideoPanelGridProps;
}());
exports.VideoPanelGridProps = VideoPanelGridProps;
var VideoPanelGrid = /** @class */ (function () {
    function VideoPanelGrid(props) {
        this.root = null;
        this.videoPanelMap = new Map();
        this.panelClass = "videocontainer";
        this.fullscreenClass = "video-fullscreen";
        this.popupMenuClass = "popup-menu";
        this.props = props;
        this.root = document.getElementById("video-grid");
        this.attachHandlers();
    }
    VideoPanelGrid.prototype.attachHandlers = function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            var inside = $(e.target).closest("." + _this.popupMenuClass).length > 0;
            if (!inside) {
                $("." + _this.popupMenuClass).removeClass("visible");
            }
        });
        $(document).ready(function () {
            _this.redrawGrid();
        });
        $(window).resize(function () {
            _this.redrawGrid();
        });
    };
    VideoPanelGrid.prototype.getNewVideoPanel = function () {
        var props = new VideoPanel_1.VideoPanelProps();
        props.refreshGrid = this.redrawGrid.bind(this);
        props.grantModeratorRole = this.props.grantModeratorRole;
        props.kickParticipantOut = this.props.kickParticipantOut;
        props.sendRemoteControlReply = this.props.sendRemoteControlReply;
        props.muteUserVideo = this.props.muteUserVideo;
        props.muteUserAudio = this.props.muteUserAudio;
        props.muteMyVideo = this.props.muteMyVideo;
        props.muteMyAudio = this.props.muteMyAudio;
        props.openPrivateChat = this.props.openPrivateChat;
        props.panelClass = this.panelClass;
        props.fullscreenClass = this.fullscreenClass;
        props.popupMenuClass = this.popupMenuClass;
        var videoPanel = new VideoPanel_1.VideoPanel(props);
        $(this.root).append(videoPanel.root);
        videoPanel.attachHandlers();
        //add to map
        this.videoPanelMap.set(videoPanel.Id, videoPanel);
        //refresh layout
        this.redrawGrid();
        return videoPanel;
    };
    VideoPanelGrid.prototype.freeVideoPanel = function (Id) {
        var videoPanel = this.videoPanelMap.get(Id);
        if (videoPanel) {
            $(videoPanel.root).remove();
            this.videoPanelMap.delete(Id);
            this.redrawGrid();
        }
    };
    VideoPanelGrid.prototype.redrawGrid = function () {
        //margin
        var gutter = 40;
        var width = $("#content").width() - gutter;
        var height = $("#content").height() - gutter;
        //number of video panels
        var panelCount = $("." + this.panelClass).length;
        //chatting dialog
        var chattingWidth = 315;
        if ($(this.root).hasClass("shift-right")) {
            width -= chattingWidth;
        }
        //width, height of each video panel
        var w, h;
        //if fullscreen mode, hide other video panels
        if ($("." + this.panelClass).hasClass(this.fullscreenClass)) {
            $("." + this.panelClass).css("display", "none");
            $("." + this.fullscreenClass).css("display", "inline-block").css("height", height + gutter - 6).css("width", width + gutter);
            return;
        }
        //show all video panels
        $("." + this.panelClass).css("display", "inline-block");
        var columnCount = 1;
        var rowCount = 1;
        var SM = 576;
        var MD = 768;
        var LG = 992;
        var XL = 1200;
        var XXL = 1400;
        if (width < SM) {
            columnCount = 1;
        }
        else if (width < LG) {
            if (panelCount <= 1)
                columnCount = 1;
            else
                columnCount = 2;
        }
        else {
            if (panelCount == 1) {
                if (width < XXL)
                    columnCount = 1;
                else
                    columnCount = 2;
            }
            else if (panelCount <= 4)
                columnCount = 2;
            else if (panelCount <= 9)
                columnCount = 3;
            else if (panelCount <= 16)
                columnCount = 4;
            else if (panelCount <= 20)
                columnCount = 5;
            else
                columnCount = 6;
        }
        rowCount = Math.floor((panelCount - 1) / columnCount) + 1;
        if (width < 576) {
            w = width;
            h = w * 9 / 16;
        }
        else {
            // 
            if (width * rowCount * 9 > height * columnCount * 16) {
                h = height / rowCount;
                w = h * 16 / 9;
            }
            //
            else {
                w = width / columnCount;
                h = w * 9 / 16;
            }
        }
        $("." + this.panelClass)
            .css("width", w)
            .css("height", h)
            .find(".avatar-container")
            .css("width", h / 2)
            .css("height", h / 2);
    };
    VideoPanelGrid.prototype.hightlightPanel = function (targetId) {
        this.videoPanelMap.forEach(function (panel, Id) {
            panel.setHighlight(targetId === Id);
        });
    };
    return VideoPanelGrid;
}());
exports.VideoPanelGrid = VideoPanelGrid;
//# sourceMappingURL=VideoPanelGrid.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\VideoPanelGrid.js","/components")
},{"./VideoPanel":34,"buffer":25,"e/U+97":27}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorIcon = void 0;
var VectorIcon = /** @class */ (function () {
    function VectorIcon() {
    }
    VectorIcon.AUDIO_MUTE_ICON = "M7.333 8.65V11a3.668 3.668 0 002.757 3.553.928.928 0 00-.007.114v1.757A5.501 5.501 0 015.5 11a.917.917 0 10-1.833 0c0 3.74 2.799 6.826 6.416 7.277v.973a.917.917 0 001.834 0v-.973a7.297 7.297 0 003.568-1.475l3.091 3.092a.932.932 0 101.318-1.318l-3.091-3.091.01-.013-1.311-1.311-.01.013-1.325-1.325.008-.014-1.395-1.395a1.24 1.24 0 01-.004.018l-3.61-3.609v-.023L7.334 5.993v.023l-3.909-3.91a.932.932 0 10-1.318 1.318L7.333 8.65zm1.834 1.834V11a1.833 1.833 0 002.291 1.776l-2.291-2.292zm3.682 3.683c-.29.17-.606.3-.94.386a.928.928 0 01.008.114v1.757a5.47 5.47 0 002.257-.932l-1.325-1.325zm1.818-3.476l-1.834-1.834V5.5a1.833 1.833 0 00-3.644-.287l-1.43-1.43A3.666 3.666 0 0114.667 5.5v5.19zm1.665 1.665l1.447 1.447c.357-.864.554-1.81.554-2.803a.917.917 0 10-1.833 0c0 .468-.058.922-.168 1.356z";
    VectorIcon.AUDIO_UNMUTE_ICON = "M16 6a4 4 0 00-8 0v6a4.002 4.002 0 003.008 3.876c-.005.04-.008.082-.008.124v1.917A6.002 6.002 0 016 12a1 1 0 10-2 0 8.001 8.001 0 007 7.938V21a1 1 0 102 0v-1.062A8.001 8.001 0 0020 12a1 1 0 10-2 0 6.002 6.002 0 01-5 5.917V16c0-.042-.003-.083-.008-.124A4.002 4.002 0 0016 12V6zm-4-2a2 2 0 00-2 2v6a2 2 0 104 0V6a2 2 0 00-2-2z";
    VectorIcon.VIDEO_MUTE_ICON = "M 6.84 5.5 h -0.022 L 3.424 2.106 a 0.932 0.932 0 1 0 -1.318 1.318 L 4.182 5.5 h -0.515 c -1.013 0 -1.834 0.82 -1.834 1.833 v 7.334 c 0 1.012 0.821 1.833 1.834 1.833 H 13.75 c 0.404 0 0.777 -0.13 1.08 -0.352 l 3.746 3.746 a 0.932 0.932 0 1 0 1.318 -1.318 l -4.31 -4.31 v -0.024 L 13.75 12.41 v 0.023 l -5.1 -5.099 h 0.024 L 6.841 5.5 Z m 6.91 4.274 V 7.333 h -2.44 L 9.475 5.5 h 4.274 c 1.012 0 1.833 0.82 1.833 1.833 v 0.786 l 3.212 -1.835 a 0.917 0.917 0 0 1 1.372 0.796 v 7.84 c 0 0.344 -0.19 0.644 -0.47 0.8 l -3.736 -3.735 l 2.372 1.356 V 8.659 l -2.75 1.571 v 1.377 L 13.75 9.774 Z M 3.667 7.334 h 2.349 l 7.333 7.333 H 3.667 V 7.333 Z";
    VectorIcon.VIDEO_UNMUTE_ICON = "M13.75 5.5H3.667c-1.013 0-1.834.82-1.834 1.833v7.334c0 1.012.821 1.833 1.834 1.833H13.75c1.012 0 1.833-.82 1.833-1.833v-.786l3.212 1.835a.916.916 0 001.372-.796V7.08a.917.917 0 00-1.372-.796l-3.212 1.835v-.786c0-1.012-.82-1.833-1.833-1.833zm0 3.667v5.5H3.667V7.333H13.75v1.834zm4.583 4.174l-2.75-1.572v-1.538l2.75-1.572v4.682z";
    VectorIcon.GRANT_MODERATOR_ICON = "M14 4a2 2 0 01-1.298 1.873l1.527 4.07.716 1.912c.062.074.126.074.165.035l1.444-1.444 2.032-2.032a2 2 0 111.248.579L19 19a2 2 0 01-2 2H7a2 2 0 01-2-2L4.166 8.993a2 2 0 111.248-.579l2.033 2.033L8.89 11.89c.087.042.145.016.165-.035l.716-1.912 1.527-4.07A2 2 0 1114 4zM6.84 17l-.393-4.725 1.029 1.03a2.1 2.1 0 003.451-.748L12 9.696l1.073 2.86a2.1 2.1 0 003.451.748l1.03-1.03L17.16 17H6.84z";
    VectorIcon.AUDIO_MUTE_SMALL_ICON = "M5.688 4l22.313 22.313-1.688 1.688-5.563-5.563c-1 .625-2.25 1-3.438 1.188v4.375h-2.625v-4.375c-4.375-.625-8-4.375-8-8.938h2.25c0 4 3.375 6.75 7.063 6.75 1.063 0 2.125-.25 3.063-.688l-2.188-2.188c-.25.063-.563.125-.875.125-2.188 0-4-1.813-4-4v-1l-8-8zM20 14.875l-8-7.938v-.25c0-2.188 1.813-4 4-4s4 1.813 4 4v8.188zm5.313-.187a8.824 8.824 0 01-1.188 4.375L22.5 17.375c.375-.813.563-1.688.563-2.688h2.25z";
    VectorIcon.VIDEO_MUTE_SMALL_ICON = "M4.375 2.688L28 26.313l-1.688 1.688-4.25-4.25c-.188.125-.5.25-.75.25h-16c-.75 0-1.313-.563-1.313-1.313V9.313c0-.75.563-1.313 1.313-1.313h1L2.687 4.375zm23.625 6v14.25L13.062 8h8.25c.75 0 1.375.563 1.375 1.313v4.688z";
    VectorIcon.MODERATOR_SMALL_ICON = "M16 20.563l5 3-1.313-5.688L24.125 14l-5.875-.5L16 8.125 13.75 13.5l-5.875.5 4.438 3.875L11 23.563zm13.313-8.25l-7.25 6.313 2.188 9.375-8.25-5-8.25 5 2.188-9.375-7.25-6.313 9.563-.813 3.75-8.813 3.75 8.813z";
    VectorIcon.SETTING_ICON = "M9.005 2.17l-.576 1.727-.634.262-1.628-.813a1.833 1.833 0 00-2.116.343l-.362.362a1.833 1.833 0 00-.343 2.116l.816 1.624-.265.638-1.727.576c-.748.25-1.253.95-1.253 1.739v.512c0 .79.505 1.49 1.253 1.74l1.727.575.262.634-.813 1.628a1.833 1.833 0 00.343 2.116l.362.362c.558.558 1.41.696 2.116.343l1.624-.816.638.265.576 1.727c.25.748.95 1.253 1.739 1.253h.512c.79 0 1.49-.505 1.74-1.253l.575-1.726.634-.263 1.628.813a1.833 1.833 0 002.116-.343l.362-.362c.558-.558.696-1.41.343-2.116l-.816-1.624.265-.638 1.727-.576a1.833 1.833 0 001.253-1.739v-.512c0-.79-.505-1.49-1.253-1.74l-1.726-.572-.264-.637.814-1.628a1.833 1.833 0 00-.343-2.116l-.362-.362a1.833 1.833 0 00-2.116-.343l-1.624.816-.638-.265-.576-1.727a1.833 1.833 0 00-1.74-1.253h-.511c-.79 0-1.49.505-1.74 1.253zM7.723 6.173l2.181-.903.84-2.52h.512l.84 2.52 2.185.908 2.372-1.193.362.362-1.188 2.376.903 2.185 2.52.836v.512l-2.52.84-.908 2.185 1.193 2.372-.362.362-2.376-1.188-2.181.903-.84 2.52h-.512l-.84-2.52-2.185-.908-2.372 1.193-.362-.362 1.188-2.376-.903-2.181-2.52-.84v-.512l2.52-.84.908-2.185-1.193-2.372.362-.362 2.376 1.188zM11 15.583a4.583 4.583 0 110-9.166 4.583 4.583 0 010 9.166zM13.75 11a2.75 2.75 0 11-5.5 0 2.75 2.75 0 015.5 0z";
    VectorIcon.USER_GROUP_ICON = "M5.33331 2C6.28101 2 7.09675 2.56499 7.46207 3.37651C7.00766 3.45023 6.58406 3.61583 6.21095 3.85361C6.04111 3.54356 5.71176 3.33333 5.33331 3.33333C4.78103 3.33333 4.33331 3.78105 4.33331 4.33333C4.33331 4.75895 4.59921 5.12246 4.97395 5.26682C4.77672 5.69245 4.66665 6.16671 4.66665 6.66667L4.66678 6.6967C3.12249 6.85332 2.66665 7.65415 2.66665 9.83333C2.66665 9.89666 2.66835 9.95222 2.67088 10H3.13441C2.977 10.3982 2.86114 10.8423 2.7841 11.3333H2.33331C1.66665 11.3333 1.33331 10.8333 1.33331 9.83333C1.33331 7.60559 1.88097 6.20498 3.39417 5.63152C3.14521 5.26038 2.99998 4.81382 2.99998 4.33333C2.99998 3.04467 4.04465 2 5.33331 2ZM9.78901 3.85361C9.4159 3.61583 8.9923 3.45023 8.53788 3.37651C8.90321 2.56499 9.71895 2 10.6666 2C11.9553 2 13 3.04467 13 4.33333C13 4.81382 12.8547 5.26038 12.6058 5.63152C14.119 6.20498 14.6666 7.60559 14.6666 9.83333C14.6666 10.8333 14.3333 11.3333 13.6666 11.3333H13.2159C13.1388 10.8423 13.023 10.3982 12.8656 10H13.3291C13.3316 9.95222 13.3333 9.89666 13.3333 9.83333C13.3333 7.65415 12.8775 6.85332 11.3332 6.6967L11.3333 6.66667C11.3333 6.1667 11.2232 5.69245 11.026 5.26682C11.4008 5.12246 11.6666 4.75895 11.6666 4.33333C11.6666 3.78105 11.2189 3.33333 10.6666 3.33333C10.2882 3.33333 9.95885 3.54356 9.78901 3.85361ZM4.49998 14.6667C3.7222 14.6667 3.33331 14.1111 3.33331 13C3.33331 10.4598 4.0062 8.8875 5.87888 8.28308C5.5366 7.83462 5.33331 7.27438 5.33331 6.66667C5.33331 5.19391 6.52722 4 7.99998 4C9.47274 4 10.6666 5.19391 10.6666 6.66667C10.6666 7.27438 10.4634 7.83462 10.1211 8.28308C11.9938 8.8875 12.6666 10.4598 12.6666 13C12.6666 14.1111 12.2778 14.6667 11.5 14.6667H4.49998ZM9.33331 6.66667C9.33331 7.40305 8.73636 8 7.99998 8C7.2636 8 6.66665 7.40305 6.66665 6.66667C6.66665 5.93029 7.2636 5.33333 7.99998 5.33333C8.73636 5.33333 9.33331 5.93029 9.33331 6.66667ZM11.3333 13C11.3333 13.1426 11.3252 13.2536 11.3152 13.3333H4.68477C4.67476 13.2536 4.66665 13.1426 4.66665 13C4.66665 10.1957 5.42021 9.33333 7.99998 9.33333C10.5797 9.33333 11.3333 10.1957 11.3333 13Z";
    VectorIcon.SEND_FILE = "M13.5,12.5a1,1,0,0,0-1-1h-5a1,1,0,0,0,0,2h5A1,1,0,0,0,13.5,12.5Zm5,5a2,2,0,0,0-1.18.39l-1.75-.8,1.91-.88a2,2,0,0,0,1,.29,2,2,0,1,0-2-2l-1.89.87A2,2,0,1,0,13.5,19a1.88,1.88,0,0,0,.92-.24l2.1,1a2,2,0,1,0,2-2.23Zm-8,2h-5a1,1,0,0,1-1-1V4.5a1,1,0,0,1,1-1h5v3a3,3,0,0,0,3,3h3a1,1,0,0,0,2,0v-1s0,0,0-.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.29.29,0,0,0-.1,0,1.1,1.1,0,0,0-.26-.06H5.5a3,3,0,0,0-3,3v14a3,3,0,0,0,3,3h5a1,1,0,0,0,0-2Zm2-14.59L15.09,7.5H13.5a1,1,0,0,1-1-1ZM7.5,15.5a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm0-6h1a1,1,0,0,0,0-2h-1a1,1,0,0,0,0,2Z";
    return VectorIcon;
}());
exports.VectorIcon = VectorIcon;
//# sourceMappingURL=vector_icon.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/components\\vector_icon.js","/components")
},{"buffer":25,"e/U+97":27}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelType = void 0;
var ChannelType;
(function (ChannelType) {
    ChannelType["Both"] = "Both";
    ChannelType["AudioOnly"] = "AudioOnly";
    ChannelType["VideoOnly"] = "VideoOnly";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
//# sourceMappingURL=ChannelType.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/enum\\ChannelType.js","/enum")
},{"buffer":25,"e/U+97":27}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaType = void 0;
var MediaType;
(function (MediaType) {
    MediaType["VIDEO"] = "video";
    MediaType["AUDIO"] = "audio";
    MediaType["PRESENTER"] = "presenter";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
//# sourceMappingURL=MediaType.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/enum\\MediaType.js","/enum")
},{"buffer":25,"e/U+97":27}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDuration = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["User"] = "user";
    NotificationType["GrantHost"] = "host";
    NotificationType["Video"] = "video";
    NotificationType["VideoMute"] = "video-mute";
    NotificationType["Audio"] = "audio";
    NotificationType["AudioMute"] = "audio-mute";
    NotificationType["Recording"] = "recording";
    NotificationType["Screensharing"] = "screensharing";
    NotificationType["HandRaise"] = "handraise";
    NotificationType["Chat"] = "chat";
    NotificationType["FileTransfer"] = "file-tranfer";
    NotificationType["FileReceive"] = "file-receive";
    NotificationType["Info"] = "info";
    NotificationType["Warning"] = "warning";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
;
var NotificationDuration;
(function (NotificationDuration) {
    NotificationDuration["Permanent"] = "permanent";
    NotificationDuration["HideAuto"] = "hide-auto";
})(NotificationDuration = exports.NotificationDuration || (exports.NotificationDuration = {}));
//# sourceMappingURL=NotificationType.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/enum\\NotificationType.js","/enum")
},{"buffer":25,"e/U+97":27}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProperty = void 0;
var UserProperty;
(function (UserProperty) {
    UserProperty["videoPanel"] = "videoPanel";
    UserProperty["IsHost"] = "IsHost";
    UserProperty["useCamera"] = "useCamera";
    UserProperty["useMic"] = "useMic";
})(UserProperty = exports.UserProperty || (exports.UserProperty = {}));
//# sourceMappingURL=UserProperty.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/enum\\UserProperty.js","/enum")
},{"buffer":25,"e/U+97":27}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizGazeMeeting = void 0;
var signalR = require("@microsoft/signalr");
var bg_1 = require("./protocol/bg");
var meeting_ui_1 = require("./meeting_ui");
var BGUser_1 = require("./model/BGUser");
var BGMeeting_1 = require("./model/BGMeeting");
var MediaType_1 = require("./enum/MediaType");
var JitsiCommandParam_1 = require("./jitsi/JitsiCommandParam");
var UserProperty_1 = require("./enum/UserProperty");
var TimeUtil_1 = require("./util/TimeUtil");
var ActiveDevices_1 = require("./model/ActiveDevices");
var InputDevicePolicy_1 = require("./model/InputDevicePolicy");
var ChannelType_1 = require("./enum/ChannelType");
var jitsi_1 = require("./protocol/jitsi");
var NotificationType_1 = require("./enum/NotificationType");
var JitsiCommandQueue_1 = require("./jitsi/JitsiCommandQueue");
var KEYS = {
    BACKSPACE: 'backspace',
    DELETE: 'delete',
    RETURN: 'enter',
    TAB: 'tab',
    ESCAPE: 'escape',
    UP: 'up',
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left',
    HOME: 'home',
    END: 'end',
    PAGEUP: 'pageup',
    PAGEDOWN: 'pagedown',
    F1: 'f1',
    F2: 'f2',
    F3: 'f3',
    F4: 'f4',
    F5: 'f5',
    F6: 'f6',
    F7: 'f7',
    F8: 'f8',
    F9: 'f9',
    F10: 'f10',
    F11: 'f11',
    F12: 'f12',
    META: 'command',
    CMD_L: 'command',
    CMD_R: 'command',
    ALT: 'alt',
    CONTROL: 'control',
    SHIFT: 'shift',
    CAPS_LOCK: 'caps_lock',
    SPACE: 'space',
    PRINTSCREEN: 'printscreen',
    INSERT: 'insert',
    NUMPAD_0: 'numpad_0',
    NUMPAD_1: 'numpad_1',
    NUMPAD_2: 'numpad_2',
    NUMPAD_3: 'numpad_3',
    NUMPAD_4: 'numpad_4',
    NUMPAD_5: 'numpad_5',
    NUMPAD_6: 'numpad_6',
    NUMPAD_7: 'numpad_7',
    NUMPAD_8: 'numpad_8',
    NUMPAD_9: 'numpad_9',
    COMMA: ',',
    PERIOD: '.',
    SEMICOLON: ';',
    QUOTE: '\'',
    BRACKET_LEFT: '[',
    BRACKET_RIGHT: ']',
    BACKQUOTE: '`',
    BACKSLASH: '\\',
    MINUS: '-',
    EQUAL: '=',
    SLASH: '/'
};
var keyCodeToKey = [];
keyCodeToKey[8] = KEYS.BACKSPACE;
keyCodeToKey[9] = KEYS.TAB;
keyCodeToKey[13] = KEYS.RETURN;
keyCodeToKey[16] = KEYS.SHIFT;
keyCodeToKey[17] = KEYS.CONTROL;
keyCodeToKey[18] = KEYS.ALT;
keyCodeToKey[20] = KEYS.CAPS_LOCK;
keyCodeToKey[27] = KEYS.ESCAPE;
keyCodeToKey[32] = KEYS.SPACE;
keyCodeToKey[33] = KEYS.PAGEUP;
keyCodeToKey[34] = KEYS.PAGEDOWN;
keyCodeToKey[35] = KEYS.END;
keyCodeToKey[36] = KEYS.HOME;
keyCodeToKey[37] = KEYS.LEFT;
keyCodeToKey[38] = KEYS.UP;
keyCodeToKey[39] = KEYS.RIGHT;
keyCodeToKey[40] = KEYS.DOWN;
keyCodeToKey[42] = KEYS.PRINTSCREEN;
keyCodeToKey[44] = KEYS.PRINTSCREEN;
keyCodeToKey[45] = KEYS.INSERT;
keyCodeToKey[46] = KEYS.DELETE;
keyCodeToKey[59] = KEYS.SEMICOLON;
keyCodeToKey[61] = KEYS.EQUAL;
keyCodeToKey[91] = KEYS.CMD_L;
keyCodeToKey[92] = KEYS.CMD_R;
keyCodeToKey[93] = KEYS.CMD_R;
keyCodeToKey[96] = KEYS.NUMPAD_0;
keyCodeToKey[97] = KEYS.NUMPAD_1;
keyCodeToKey[98] = KEYS.NUMPAD_2;
keyCodeToKey[99] = KEYS.NUMPAD_3;
keyCodeToKey[100] = KEYS.NUMPAD_4;
keyCodeToKey[101] = KEYS.NUMPAD_5;
keyCodeToKey[102] = KEYS.NUMPAD_6;
keyCodeToKey[103] = KEYS.NUMPAD_7;
keyCodeToKey[104] = KEYS.NUMPAD_8;
keyCodeToKey[105] = KEYS.NUMPAD_9;
keyCodeToKey[112] = KEYS.F1;
keyCodeToKey[113] = KEYS.F2;
keyCodeToKey[114] = KEYS.F3;
keyCodeToKey[115] = KEYS.F4;
keyCodeToKey[116] = KEYS.F5;
keyCodeToKey[117] = KEYS.F6;
keyCodeToKey[118] = KEYS.F7;
keyCodeToKey[119] = KEYS.F8;
keyCodeToKey[120] = KEYS.F9;
keyCodeToKey[121] = KEYS.F10;
keyCodeToKey[122] = KEYS.F11;
keyCodeToKey[123] = KEYS.F12;
keyCodeToKey[124] = KEYS.PRINTSCREEN;
keyCodeToKey[173] = KEYS.MINUS;
keyCodeToKey[186] = KEYS.SEMICOLON;
keyCodeToKey[187] = KEYS.EQUAL;
keyCodeToKey[188] = KEYS.COMMA;
keyCodeToKey[189] = KEYS.MINUS;
keyCodeToKey[190] = KEYS.PERIOD;
keyCodeToKey[191] = KEYS.SLASH;
keyCodeToKey[192] = KEYS.BACKQUOTE;
keyCodeToKey[219] = KEYS.BRACKET_LEFT;
keyCodeToKey[220] = KEYS.BACKSLASH;
keyCodeToKey[221] = KEYS.BRACKET_RIGHT;
keyCodeToKey[222] = KEYS.QUOTE;
keyCodeToKey[224] = KEYS.META;
keyCodeToKey[229] = KEYS.SEMICOLON;
for (var i = 0; i < 10; i++) {
    keyCodeToKey[i + 48] = "" + i;
}
for (var i = 0; i < 26; i++) {
    var keyCode = i + 65;
    keyCodeToKey[keyCode] = String.fromCharCode(keyCode).toLowerCase();
}
function keyboardEventToKey(akey) {
    return keyCodeToKey[akey];
}
/***********************************************************************************

                       Lifecycle of Bizgaze Meeting

    connectToBG -> joinBGConference -> connectToJitsi -> joinJitsiConference -> ...
    ... -> leaveFromJitsi -> leaveFromBG

************************************************************************************/
var MeetingConfig = /** @class */ (function () {
    function MeetingConfig() {
        this.resetMuteOnDeviceChange = true;
        this.hideToolbarOnMouseOut = true;
    }
    return MeetingConfig;
}());
var BizGazeMeeting = /** @class */ (function () {
    function BizGazeMeeting() {
        this.connection = new signalR.HubConnectionBuilder().withUrl("/BizGazeMeetingServer").build();
        this.joinedBGConference = false;
        this.isToggleMuteMyAudio = false; //isControlAllowed
        this.isToggleMuteMyVideo = false; //isControlAllowed
        this.isMultipleSharing = false;
        this.isAllowCtlMic = false; //is allowed control mic in participant's list
        this.isAllowCtlVideo = false; //is allowed control video in participant's list
        this.isSendPermissionMic = false;
        this.isSendPermissionCamera = false;
        this.isSetHostControlMic = false;
        this.isSetHostControlCamera = false;
        this.ui = new meeting_ui_1.MeetingUI(this);
        this.roomInfo = new BGMeeting_1.BGMeetingInfo();
        this.m_BGUserList = new Map();
        this.localVideoPanel = null;
        this.myInfo = new BGUser_1.UserInfo();
        this.JitsiMeetJS = window.JitsiMeetJS;
        this.JitsiServerDomain = "unimail.in";
        //JitsiServerDomain = "meetserver.com";
        this.localTracks = [];
        this.screenSharing = false;
        this.recording = false;
        this.downloadRecordFile = false;
        //default devices
        this.activeCameraId = window._camId;
        this.activeMicId = window._micId;
        this.activeSpeakerId = window._speakerId;
        this.config = new MeetingConfig();
        this.commandQueue = new JitsiCommandQueue_1.JitsiCommandQueue();
        this.privateCommandQueue = new JitsiCommandQueue_1.JitsiPrivateCommandQueue();
        this.recordingData = [];
    }
    /**
     * **************************************************************************
     *              START ~ END
     *
     * **************************************************************************
     */
    BizGazeMeeting.prototype.start = function () {
        var _this = this;
        if (!window._roomId) {
            this.leaveBGConference();
            return;
        }
        //jitsi init
        var initOptions = {
            disableAudioLevels: true
        };
        this.JitsiMeetJS.setLogLevel(this.JitsiMeetJS.logLevels.ERROR);
        this.JitsiMeetJS.init(initOptions);
        //device log
        this.JitsiMeetJS.mediaDevices.enumerateDevices(function (devices) {
            devices.forEach(function (d) {
                if (_this.activeCameraId.length > 0 && d.deviceId === _this.activeCameraId) {
                    _this.Log("Camera: " + d.label);
                }
                if (_this.activeMicId.length > 0 && d.deviceId === _this.activeMicId && d.kind === 'audioinput') {
                    _this.Log("Microphone: " + d.label);
                }
            });
        });
        //connect to bg server
        this.connectToBGServer(function () {
            _this.Log("Connected to BizGaze SignalR Server");
            _this.joinBGConference(); // => onBGConferenceJoined
        });
    };
    BizGazeMeeting.prototype.stop = function () {
        //todo 
        //if it was recording, save it before stop
        var _this = this;
        if (this.jitsiRoomJoined()) {
            this.stopAllMediaStreams();
            this.jitsiRoom.leave().then(function () {
                _this.leaveBGConference();
            }).catch(function (error) {
                _this.leaveBGConference();
            });
        }
        else {
            this.leaveBGConference();
        }
    };
    BizGazeMeeting.prototype.forceStop = function () {
        this.stop();
    };
    /**
     * **************************************************************************
     *              BizGaze SignalR Server interaction
     *
     *          Connect
     *          Join/Leave
     *          Control Message
     * **************************************************************************
     */
    BizGazeMeeting.prototype.connectToBGServer = function (callback) {
        var _this = this;
        // Connect to the signaling server
        this.connection.start().then(function () {
            _this.registerBGServerCallbacks();
            callback();
        }).catch(function (err) {
            return console.error(err.toString());
        });
    };
    BizGazeMeeting.prototype.joinBGConference = function () {
        this.connection.invoke("Join", "" + window._roomId, "" + window._userId, "" + window._anonymousUserName).catch(function (err) {
            return console.error("Join Meeting Failed.", err.toString());
        });
    };
    //this is the entry point where we can decide webinar/group chatting
    //                        where we can decide i am host or not
    BizGazeMeeting.prototype.onBGConferenceJoined = function (roomInfo, userInfo) {
        var _this = this;
        this.joinedBGConference = true;
        this.localStartTimestamp = Date.now();
        this.roomInfo = roomInfo;
        this.Log("Meeting Type: " + (roomInfo.IsWebinar ? "Webinar" : "Group Chatting"));
        this.myInfo.Id = userInfo.Id;
        this.myInfo.Name = userInfo.Name;
        this.myInfo.IsHost = userInfo.IsHost;
        var deviceUsePolicy = this.getInitMediaPolicy();
        this.myInfo.mediaPolicy.useCamera = deviceUsePolicy.useCamera;
        this.myInfo.mediaPolicy.useMic = deviceUsePolicy.useMic;
        if (this.roomInfo.IsControlAllowed && this.myInfo.IsHost)
            this.ui.setHost(true);
        else
            this.ui.setHost(false);
        if (this.roomInfo.IsControlAllowed) {
            this.ui.updateByRole(this.myInfo.IsHost);
            this.ui.setIscontrolAllowed(true);
            //this.ui.setHost(true)
        }
        else {
            //this.ui.updateByRole(false);
            this.ui.updateByRole(this.myInfo.IsHost);
            this.ui.setIscontrolAllowed(false);
        }
        this.ui.toolbar.updateByRole(this.myInfo.IsHost);
        this.ui.updateJoiningInfo();
        this.initMediaDevices()
            .then(function (_) {
            //connect to jitsi server and enter room
            _this.connectToJitsiServer();
        });
    };
    BizGazeMeeting.prototype.leaveBGConference = function () {
        this.Log("leaving Meeting " + this.joinedBGConference);
        /*if (this.joinedBGConference) {
            this.connection.invoke("LeaveRoom").catch((err: any) => {
                return console.error("Leave Meeting Failed.", err.toString());
            });
        } else*/ {
            this.stopAllMediaStreams();
            $("form#return").submit();
        }
    };
    BizGazeMeeting.prototype.onBGConferenceLeft = function () {
        this.joinedBGConference = false;
        this.stopAllMediaStreams();
        this.m_BGUserList.clear();
        $("form#return").submit();
    };
    BizGazeMeeting.prototype.onBGUserJoined = function (userInfo) {
        this.m_BGUserList.set(userInfo.Id, userInfo);
    };
    BizGazeMeeting.prototype.onBGUserLeft = function (userId) {
        //self leave
        if (userId == this.myInfo.Id) {
            this.onBGConferenceLeft();
        }
        // participant left
        else {
            if (this.m_BGUserList.has(userId)) {
                var bizUser = this.m_BGUserList.get(userId);
                if (bizUser.Jitsi_Id && this.jitsiRoomJoined()) {
                    var jitsiUser = this.jitsiRoom.getParticipantById(bizUser.Jitsi_Id);
                    if (jitsiUser)
                        this.onJitsiUserLeft(bizUser.Jitsi_Id, jitsiUser);
                }
                this.Log(this.m_BGUserList.get(userId).Name + " has left");
                this.m_BGUserList.delete(userId);
            }
        }
    };
    BizGazeMeeting.prototype.registerBGServerCallbacks = function () {
        var _this = this;
        this.connection.on(bg_1.BGtoUser.ROOM_JOINED, function (strRoomInfo, strMyInfo) {
            var roomInfo = JSON.parse(strRoomInfo);
            var myInfo = JSON.parse(strMyInfo);
            _this.onBGConferenceJoined(roomInfo, myInfo);
        });
        this.connection.on(bg_1.BGtoUser.ROOM_USER_JOINED, function (strUserInfo) {
            var info = JSON.parse(strUserInfo);
            _this.onBGUserJoined(info);
        });
        this.connection.on(bg_1.BGtoUser.ERROR, function (message) {
            _this.forceStop();
        });
        this.connection.on(bg_1.BGtoUser.ROOM_LEFT, function (clientId) {
            _this.onBGUserLeft(clientId);
        });
        this.connection.on(bg_1.BGtoUser.SIGNALING, function (sourceId, strMsg) {
            /*console.log(' received signaling message:', strMsg);
            let msg = JSON.parse(strMsg);
            if (sourceId != this.myInfo.Id && this.connMap.has(sourceId)) {
                let peerConn: BizGazeConnection = this.connMap.get(sourceId);
                peerConn.onSignalingMessage(msg);
            }*/
        });
    };
    BizGazeMeeting.prototype.sendBGSignalingMessage = function (destId, msg) {
        this.connection.invoke(bg_1.BGtoUser.SIGNALING, this.myInfo.Id, destId, JSON.stringify(msg)).catch(function (err) {
            return console.error(err.toString());
        });
    };
    /**
     * **************************************************************************
     *              Local Camera/Microphone init
     *
     * **************************************************************************
     */
    BizGazeMeeting.prototype.initMediaDevices = function () {
        var _this = this;
        this.Log('Getting user media devices ...');
        //set speaker
        if (this.activeSpeakerId && this.JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
            this.JitsiMeetJS.mediaDevices.setAudioOutputDevice(this.activeSpeakerId);
        }
        ;
        //set input devices
        var cameraId = this.activeCameraId;
        var micId = this.activeMicId;
        return this.createLocalTracks(cameraId, micId)
            .then(function (tracks) {
            if (tracks.length <= 0) {
                throw new Error("no tracks");
            }
            tracks.forEach(function (track, index) {
                if (track.getType() === MediaType_1.MediaType.VIDEO) {
                    if (!_this.myInfo.mediaPolicy.useCamera)
                        track.mute();
                    else
                        track.unmute();
                }
                else if (track.getType() === MediaType_1.MediaType.AUDIO) {
                    if (!_this.myInfo.mediaPolicy.useMic)
                        track.mute();
                    else
                        track.unmute();
                }
            });
            _this.onLocalTrackAdded(tracks);
            return Promise.resolve();
        }).catch(function (error) {
            _this.ui.toolbar.update(_this.myInfo, _this.getLocalTracks());
            //if (!this.roomInfo.IsWebinar || this.myInfo.IsHost) //matvey
            if (!_this.roomInfo.IsControlAllowed || _this.myInfo.IsHost)
                _this._updateMyPanel();
            return Promise.resolve();
        });
    };
    BizGazeMeeting.prototype.createVideoTrack = function (cameraDeviceId) {
        var _this = this;
        return this.JitsiMeetJS.createLocalTracks({
            devices: ['video'],
            cameraDeviceId: cameraDeviceId,
            micDeviceId: null
        })
            .catch(function (error) {
            _this.Log(error);
            return Promise.resolve([]);
        });
    };
    BizGazeMeeting.prototype.createAudioTrack = function (micDeviceId) {
        var _this = this;
        return (this.JitsiMeetJS.createLocalTracks({
            devices: ['audio'],
            cameraDeviceId: null,
            micDeviceId: micDeviceId
        })
            .catch(function (error) {
            _this.Log(error);
            return Promise.resolve([]);
        }));
    };
    BizGazeMeeting.prototype.createLocalTracks = function (cameraDeviceId, micDeviceId) {
        var _this = this;
        if (cameraDeviceId != null && micDeviceId != null) {
            return this.JitsiMeetJS.createLocalTracks({
                devices: ['audio', 'video'],
                cameraDeviceId: cameraDeviceId,
                micDeviceId: micDeviceId
            }).catch(function () { return Promise.all([
                _this.createAudioTrack(micDeviceId).then(function (_a) {
                    var stream = _a[0];
                    return stream;
                }),
                _this.createVideoTrack(cameraDeviceId).then(function (_a) {
                    var stream = _a[0];
                    return stream;
                })
            ]); }).then(function (tracks) {
                return tracks.filter(function (t) { return typeof t !== 'undefined'; });
            });
        }
        else if (cameraDeviceId != null) {
            return this.createVideoTrack(cameraDeviceId);
        }
        else if (micDeviceId != null) {
            return this.createAudioTrack(micDeviceId);
        }
        return Promise.resolve([]);
    };
    BizGazeMeeting.prototype.onLocalTrackAdded = function (tracks) {
        return __awaiter(this, void 0, void 0, function () {
            var i, localVideoTrack;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tracks.length <= 0)
                            return [2 /*return*/];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < tracks.length)) return [3 /*break*/, 4];
                        tracks[i].addEventListener(this.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, function (audioLevel) { return console.log("Audio Level local: " + audioLevel); });
                        tracks[i].addEventListener(this.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, function (track) { _this.updateUiOnLocalTrackChange(); });
                        tracks[i].addEventListener(this.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function (track) { _this.updateUiOnLocalTrackChange(); });
                        tracks[i].addEventListener(this.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED, function (deviceId) {
                            return console.log("track audio output device was changed to " + deviceId);
                        });
                        if (this.jitsiRoomJoined())
                            this.Log("[ OUT ] my track - " + tracks[i].getType());
                        return [4 /*yield*/, this.replaceLocalTrack(tracks[i], tracks[i].getType())];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        //toolbar
                        this.ui.toolbar.update(this.myInfo, this.getLocalTracks());
                        //my video panel
                        this._updateMyPanel();
                        localVideoTrack = this.getLocalTrackByType(MediaType_1.MediaType.VIDEO);
                        if (localVideoTrack && this.localVideoPanel) {
                            localVideoTrack.attach(this.localVideoPanel.videoElem);
                            this.localVideoPanel.videoElem.play();
                            this.localVideoPanel.setShotnameVisible(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BizGazeMeeting.prototype.stopAllMediaStreams = function () {
        var _this = this;
        var localTracks = __spreadArray([], this.getLocalTracks());
        localTracks.forEach(function (track) {
            _this.removeLocalTrack(track).then(function (_) {
                track.dispose();
            });
        });
    };
    BizGazeMeeting.prototype.onDeviceChange = function (newDevices) {
        var _this = this;
        var videoDeviceChanged = this.activeCameraId !== newDevices.cameraId;
        var audioDeviceChanged = this.activeMicId !== newDevices.micId;
        //create new tracks with new devices
        this.createLocalTracks(videoDeviceChanged ? newDevices.cameraId : null, audioDeviceChanged ? newDevices.micId : null)
            .then(function (tracks) {
            _this.onLocalTrackAdded(tracks);
        });
        this.activeCameraId = newDevices.cameraId;
        this.activeMicId = newDevices.micId;
        this.activeSpeakerId = newDevices.speakerId;
    };
    BizGazeMeeting.prototype.getActiveDevices = function () {
        var activeDevices = new ActiveDevices_1.ActiveDevices();
        activeDevices.cameraId = this.activeCameraId;
        activeDevices.micId = this.activeMicId;
        activeDevices.speakerId = this.activeSpeakerId;
        return activeDevices;
    };
    BizGazeMeeting.prototype.getInitMediaPolicy = function () {
        var useCamera = true;
        var useMic = true;
        //if (this.roomInfo.IsWebinar) //matvey
        if (this.roomInfo.IsControlAllowed) {
            if (!this.myInfo.IsHost) {
                useCamera = false;
                useMic = false;
            }
        }
        if (this.roomInfo.channelType === ChannelType_1.ChannelType.AudioOnly)
            useCamera = false;
        if (this.roomInfo.channelType === ChannelType_1.ChannelType.VideoOnly)
            useMic = false;
        if (window._videoMute !== "true")
            useCamera = false;
        if (window._audioMute !== "true")
            useMic = false;
        var policy = new InputDevicePolicy_1.InputMediaPolicy();
        policy.useCamera = useCamera;
        policy.useMic = useMic;
        this.Log("useCamera " + useCamera);
        this.Log("useMic " + useMic);
        return policy;
    };
    /**
     * **************************************************************************
     *              Local Track Access
     *
     * **************************************************************************
     */
    BizGazeMeeting.prototype.jitsiRoomJoined = function () {
        return this.jitsiRoom && this.jitsiRoom.isJoined();
    };
    BizGazeMeeting.prototype.getLocalTracks = function () {
        if (this.jitsiRoomJoined())
            return this.jitsiRoom.getLocalTracks();
        else
            return this.localTracks;
    };
    BizGazeMeeting.prototype.getLocalTrackByType = function (type) {
        if (this.jitsiRoomJoined()) {
            var tracks = this.jitsiRoom.getLocalTracks(type);
            if (tracks.length > 0)
                return tracks[0];
            return null;
        }
        else {
            var track = this.localTracks.find(function (t) { return t.getType() === type; });
            return track;
        }
    };
    BizGazeMeeting.prototype.removeLocalTrack = function (track) {
        if (this.jitsiRoomJoined()) {
            return this.jitsiRoom.removeTrack(track);
        }
        else {
            var index = this.localTracks.indexOf(track);
            if (index >= 0)
                this.localTracks.splice(index, 1);
            return Promise.resolve();
        }
    };
    //type is neccessray when newTrack is null
    BizGazeMeeting.prototype.replaceLocalTrack = function (newTrack, type) {
        return __awaiter(this, void 0, void 0, function () {
            var oldTrack;
            var _this = this;
            return __generator(this, function (_a) {
                oldTrack = this.getLocalTrackByType(type);
                if (oldTrack === newTrack)
                    return [2 /*return*/, Promise.reject()];
                if (!oldTrack && !newTrack)
                    return [2 /*return*/, Promise.reject()];
                if (this.jitsiRoomJoined()) {
                    return [2 /*return*/, this.jitsiRoom.replaceTrack(oldTrack, newTrack).then(function (_) {
                            if (oldTrack)
                                oldTrack.dispose();
                            _this.updateUiOnLocalTrackChange();
                            return Promise.resolve();
                        })];
                }
                else {
                    return [2 /*return*/, this.removeLocalTrack(oldTrack).then(function (_) {
                            if (oldTrack)
                                oldTrack.dispose();
                            if (newTrack)
                                _this.localTracks.push(newTrack);
                            _this.updateUiOnLocalTrackChange();
                            return Promise.resolve();
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    BizGazeMeeting.prototype.updateUiOnLocalTrackChange = function () {
        if (this.localVideoPanel)
            this._updateMyPanel();
        this.ui.toolbar.update(this.myInfo, this.getLocalTracks());
    };
    /**
     * **************************************************************************
     *              Jitsi Server interaction
     *         Connect
     *         Enter/Leave Room
     *         Send/Receive Track
     *         UserInfo
     * **************************************************************************
     */
    BizGazeMeeting.prototype.connectToJitsiServer = function () {
        var _this = this;
        var serverdomain = this.JitsiServerDomain;
        var connConf = {
            hosts: {
                domain: serverdomain,
                muc: "conference." + serverdomain,
            },
            bosh: "//" + serverdomain + "/http-bind",
            // The name of client node advertised in XEP-0115 'c' stanza
            clientNode: "//" + serverdomain + "/jitsimeet"
        };
        this.jitsiConnection = new this.JitsiMeetJS.JitsiConnection(null, null, connConf);
        this.jitsiConnection.addEventListener(this.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, function () { _this.onJitsiConnectionSuccess(); });
        this.jitsiConnection.addEventListener(this.JitsiMeetJS.events.connection.CONNECTION_FAILED, function () { _this.onJitsiConnectionFailed(); });
        this.jitsiConnection.addEventListener(this.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, function () { _this.disconnectFromJitsiServer(); });
        this.jitsiConnection.connect();
    };
    BizGazeMeeting.prototype.onJitsiConnectionSuccess = function () {
        this.Log("Connected to Jitsi Server - " + this.JitsiServerDomain);
        this.joinJitsiConference();
    };
    BizGazeMeeting.prototype.onJitsiConnectionFailed = function () {
        this.Log("Failed to connect Jitsi Server - " + this.JitsiServerDomain);
        this.stop();
    };
    BizGazeMeeting.prototype.disconnectFromJitsiServer = function () {
        this.Log("Disconnected from Jitsi Server - " + this.JitsiServerDomain);
        this.stop();
    };
    BizGazeMeeting.prototype.joinJitsiConference = function () {
        var _this = this;
        var confOptions = {
            openBridgeChannel: true
        };
        this.jitsiRoom = this.jitsiConnection.initJitsiConference("" + this.roomInfo.Id, confOptions);
        //remote track
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.TRACK_ADDED, function (track) {
            _this.onRemoteTrackAdded(track);
        });
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.TRACK_REMOVED, function (track) {
            _this.onRemovedRemoteTrack(track);
        });
        //my join
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.CONFERENCE_JOINED, function () { _this.onJitsiConferenceJoined(); });
        //my left
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.CONFERENCE_LEFT, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            this.onJitsiConferenceLeft();
            return [2 /*return*/];
        }); }); });
        //remote join
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.USER_JOINED, function (id, user) {
            _this.onJitsiUserJoined(id, user);
            //remoteTracks[id] = [];
        });
        //remote left
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.USER_LEFT, function (id, user) {
            _this.onJitsiUserLeft(id, user);
        });
        //track mute
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, function (track) {
            if (track.isLocal()) {
                _this.onLocalTrackMuteChanged(track);
            }
            else {
                _this.onRemoteTrackMuteChanged(track);
            }
        });
        //audio level change
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED, function (userID, audioLevel) {
            _this.Log(userID + " - " + audioLevel);
        });
        //chat
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.MESSAGE_RECEIVED, function (id, message, timestamp) {
            _this.onReceiveChatMessage(id, message, timestamp);
        });
        //private message object
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.ENDPOINT_MESSAGE_RECEIVED, function (peer, message) {
            if (message && message.type === "biz_private") {
                _this.onPrivateCommand(message.senderId, message.subtype, message.message);
            }
        });
        //dominant speaker
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.DOMINANT_SPEAKER_CHANGED, function (id, previousSpeakers) {
            _this.onDominantSpeakerChanged(id);
        });
        //name change
        this.jitsiRoom.on(this.JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED, function (userID, displayName) {
            console.log(userID + " - " + displayName);
        });
        //command
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.KICK_OUT, function (param) {
            _this.onKickedOut(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.MUTE_All_AUDIO, function (param) {
            _this.onMuteAllAudio(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.MUTE_All_VIDEO, function (param) {
            _this.onMuteAllVideo(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.GRANT_HOST_ROLE, function (param) {
            _this.onChangedModerator(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.MUTE_AUDIO, function (param) {
            _this.onMutedAudio(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.ALLOW_MIC, function (param) {
            _this.onAllowMic(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.SET_HOSTCONTORLSELF_MIC, function (param) {
            _this.onSetHostControlSelfMic(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.ALLOW_VIDEO, function (param) {
            _this.onAllowVideo(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.MUTE_VIDEO, function (param) {
            _this.onMutedVideo(param);
        });
        /*this.jitsiRoom.addCommandListener(JitsiCommand.ALLOW_CAMERA, (param: JitsiCommandParam) => {
            this.onAllowCameraCommand(param)
        });
        this.jitsiRoom.addCommandListener(JitsiCommand.ALLOW_MIC, (param: JitsiCommandParam) => {
            this.onAllowMicCommand(param)
        });*/
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.INIT_MEDIA_POLICY, function (param) {
            _this.onInitMediaPolicy(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.BIZ_ID, function (param) {
            _this.onBizId(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.ASK_RECORDING, function (param) {
            _this.onAskRecording(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.ASK_SCREENSHARE, function (param) {
            _this.onAskScreenShare(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.ASK_MULTISHARE, function (param) {
            _this.onAskMultiShare(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.ASK_HANDRAISE, function (param) {
            _this.onAskHandRaise(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.FILE_META, function (param) {
            _this.onFileMeta(param);
        });
        this.jitsiRoom.addCommandListener(jitsi_1.JitsiCommand.FILE_SLICE, function (param) {
            _this.onFileData(param);
        });
        //set name
        this.jitsiRoom.setDisplayName(this.myInfo.Name);
        for (var i = 0; i < this.localTracks.length; i++) {
            this.Log("[ OUT ] my track - " + this.localTracks[i].getType());
            this.jitsiRoom.addTrack(this.localTracks[i]).catch(function (error) {
                _this.Log(error);
            });
        }
        //joinJitsiConference
        this.jitsiRoom.join(); //callback -  onJitsiUserJoined
    };
    BizGazeMeeting.prototype.leaveJitsiConference = function () {
    };
    //my enter room
    BizGazeMeeting.prototype.onJitsiConferenceJoined = function () {
        var _this = this;
        this.myInfo.Jitsi_Id = this.jitsiRoom.myUserId();
        this.Log("Jitsi_Id : " + this.myInfo.Jitsi_Id);
        //set subject
        this.ui.meetingDescWidget.setSubject(this.roomInfo.conferenceName, this.roomInfo.hostName);
        var audioMute = true;
        var videoMute = true;
        this.getLocalTracks().forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO && !track.isMuted())
                videoMute = false;
            if (track.getType() === MediaType_1.MediaType.AUDIO && !track.isMuted())
                audioMute = false;
        });
        //add list
        //if (this.myInfo.IsHost) 
        {
            this.ui.addParticipant(this.jitsiRoom.myUserId(), this.myInfo.Name, true, false, false, videoMute, audioMute);
        }
        //set time
        setInterval(function () {
            var delta = Date.now() - _this.localStartTimestamp;
            var elapsed = _this.roomInfo.elapsed + delta;
            _this.ui.meetingDescWidget.updateTime(TimeUtil_1.TsToDateFormat(elapsed));
        }, 1000);
        //send media policy
        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.INIT_MEDIA_POLICY, this.myInfo.Jitsi_Id, this.myInfo.mediaPolicy);
        //send bizgaze id
        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.BIZ_ID, this.myInfo.Id);
    };
    //my leave room
    BizGazeMeeting.prototype.onJitsiConferenceLeft = function () {
        this.myInfo.Jitsi_Id = null;
        this.leaveBGConference();
    };
    //remote-user enter room
    BizGazeMeeting.prototype.onJitsiUserJoined = function (jitsiId, user) {
        var _this = this;
        this.Log("joined user: " + user.getDisplayName());
        this.ui.notification(user.getDisplayName(), "New Participant joined", NotificationType_1.NotificationType.User);
        //if track doesn't arrive for certain time
        //generate new panel for that user
        //if (!this.roomInfo.IsWebinar) { //matvey
        if (!this.roomInfo.IsControlAllowed) {
            setTimeout(function () {
                if (!user.getProperty(UserProperty_1.UserProperty.videoPanel)) {
                    var videoPanel = _this.ui.videoPanelGrid.getNewVideoPanel();
                    user.setProperty(UserProperty_1.UserProperty.videoPanel, videoPanel);
                    _this._updateUserPanel(user);
                }
            }, 1000);
        }
        var audioMute = true;
        var videoMute = true;
        user.getTracks().forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO && !track.isMuted())
                videoMute = false;
            if (track.getType() === MediaType_1.MediaType.AUDIO && !track.isMuted())
                videoMute = false;
        });
        //add list
        if (this.myInfo.IsHost) {
            this.ui.addParticipant(jitsiId, user.getDisplayName(), false, //me?
            false, false, videoMute, //use camera?
            audioMute //use mic?
            );
        }
        else {
            this.ui.addParticipant(jitsiId, user.getDisplayName(), false, //me?
            true, true, videoMute, //use camera?
            audioMute //use mic?
            );
        }
        //notify him that i am moderator
        if (this.myInfo.IsHost)
            this.grantModeratorRole(this.jitsiRoom.myUserId());
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.MEDIA_POLICY, this.myInfo.mediaPolicy);
        this.commandQueue.executeQueuedCommands(jitsiId);
        this.privateCommandQueue.executeQueuedCommands(jitsiId);
    };
    //remote leave room
    BizGazeMeeting.prototype.onJitsiUserLeft = function (jitsiId, user) {
        var _this = this;
        this.ui.notification_warning(user.getDisplayName(), "Participant left", NotificationType_1.NotificationType.User);
        this.Log("left user: " + user.getDisplayName());
        var videoPanel = user.getProperty(UserProperty_1.UserProperty.videoPanel);
        if (videoPanel) {
            this.ui.videoPanelGrid.freeVideoPanel(videoPanel.Id);
            user.setProperty(UserProperty_1.UserProperty.videoPanel, null);
        }
        //remove list
        this.ui.removeParticipant(jitsiId);
        //remove from list
        this.m_BGUserList.forEach(function (bzUser, bizId) {
            if (bzUser.Jitsi_Id == jitsiId) {
                _this.m_BGUserList.delete(bizId);
            }
        });
    };
    BizGazeMeeting.prototype.onBizId = function (param) {
        var senderJitsiId = param.attributes.senderId;
        if (senderJitsiId === this.myInfo.Jitsi_Id)
            return;
        var user = this.jitsiRoom.getParticipantById(senderJitsiId);
        if (user) {
            var bizId = param.value;
            var bizUser = this.m_BGUserList.get(bizId);
            if (bizUser)
                bizUser.Jitsi_Id = senderJitsiId;
        }
        else {
            this.commandQueue.queueCommand(senderJitsiId, jitsi_1.JitsiCommand.BIZ_ID, param, this.onBizId.bind(this));
        }
    };
    //[ IN ] remote track
    BizGazeMeeting.prototype.onRemoteTrackAdded = function (track) {
        if (track.isLocal()) {
            return;
        }
        this.Log("[ IN ] remote track - " + track.getType());
        //if (this.roomInfo.IsWebinar && track.isMuted()) //matvey
        if (this.roomInfo.IsControlAllowed && track.isMuted())
            return;
        //add to ui
        var id = track.getParticipantId();
        var user = this.jitsiRoom.getParticipantById(id);
        if (!user) {
            this.Log(user.getDisplayName() + " not yet added");
            return;
        }
        var videoPanel = user.getProperty(UserProperty_1.UserProperty.videoPanel);
        if (!videoPanel) {
            videoPanel = this.ui.videoPanelGrid.getNewVideoPanel();
            user.setProperty(UserProperty_1.UserProperty.videoPanel, videoPanel);
        }
        if (track.getType() === MediaType_1.MediaType.VIDEO) {
            var videoElem = videoPanel.videoElem;
            track.attach(videoElem);
            videoElem.play();
        }
        else if (track.getType() === MediaType_1.MediaType.AUDIO) {
            var audioElem = videoPanel.audioElem;
            track.attach(audioElem);
            audioElem.play();
        }
        this._updateUserPanel(user);
    };
    // [DEL] remote track
    BizGazeMeeting.prototype.onRemovedRemoteTrack = function (track) {
        if (track.isLocal()) {
            this.Log("[ DEL ] localtrack - " + track.getType());
            console.log("[ DEL ] localtrack - " + track.getType());
        }
        else {
            this.Log("[ DEL ] remotetrack - " + track.getType());
            console.log("[ DEL ] remotetrack --- " + track.getType());
        }
        track.removeAllListeners(this.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED);
        track.removeAllListeners(this.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED);
        track.removeAllListeners(this.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED);
        track.removeAllListeners(this.JitsiMeetJS.events.track.TRACK_VIDEOTYPE_CHANGED);
        track.removeAllListeners(this.JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED);
        track.removeAllListeners(this.JitsiMeetJS.events.track.NO_DATA_FROM_SOURCE);
        if (!track.isLocal()) {
            var jitsiId = track.getParticipantId();
            var user = this.jitsiRoom.getParticipantById(jitsiId);
            //if (this.roomInfo.IsWebinar) { //matvey
            if (this.roomInfo.IsControlAllowed) {
                var IsHost = user.getProperty(UserProperty_1.UserProperty.IsHost);
                var userVideoPanel = user.getProperty(UserProperty_1.UserProperty.videoPanel);
                if (!IsHost && user.getTracks().length <= 0 && userVideoPanel) {
                    this.ui.videoPanelGrid.freeVideoPanel(userVideoPanel.Id);
                    user.setProperty(UserProperty_1.UserProperty.videoPanel, null);
                }
            }
            this._updateUserPanel(user);
        }
        else {
            this.updateUiOnLocalTrackChange();
        }
    };
    BizGazeMeeting.prototype._updateUserPanel = function (user) {
        if (user && user.getProperty(UserProperty_1.UserProperty.videoPanel)) {
            var videoPanel = user.getProperty(UserProperty_1.UserProperty.videoPanel);
            videoPanel.updatePanelOnJitsiUser(this.myInfo, user);
        }
    };
    BizGazeMeeting.prototype._updateMyPanel = function () {
        if (this.localVideoPanel == null) {
            //if (this.roomInfo.IsWebinar && !this.myInfo.IsHost) { //matvey
            if (this.roomInfo.IsControlAllowed && !this.myInfo.IsHost) {
                var isAllMuted_1 = true;
                this.getLocalTracks().forEach(function (track) {
                    if (!track.isMuted())
                        isAllMuted_1 = false;
                });
                if (!isAllMuted_1)
                    this.localVideoPanel = this.ui.videoPanelGrid.getNewVideoPanel();
            }
            else {
                this.localVideoPanel = this.ui.videoPanelGrid.getNewVideoPanel();
            }
        }
        if (this.localVideoPanel)
            this.localVideoPanel.updatePanelOnMyBGUser(this.myInfo, this.getLocalTracks());
    };
    /**
     * **************************************************************************
     *                Messaging between Jitsi participants
     *        Broadcast
     *        Private
     *
     * **************************************************************************
     */
    //ATTENTION! attributes = {key1: not object, key2: not object, ...}
    //send as primitive type like boolean, string, number...
    //and decode when use value1, vaule2
    BizGazeMeeting.prototype.sendJitsiBroadcastCommand = function (type, value, attributes) {
        if (attributes === void 0) { attributes = null; }
        var param = new JitsiCommandParam_1.JitsiCommandParam();
        param.value = value;
        if (!!attributes && typeof attributes === "object" && attributes.constructor.name === "Object")
            param.attributes = __assign({}, attributes);
        param.attributes.senderId = this.myInfo.Jitsi_Id;
        param.attributes.senderName = this.myInfo.Name;
        this.jitsiRoom.sendCommandOnce(type, param);
    };
    BizGazeMeeting.prototype.sendJitsiPrivateCommand = function (targetId, type, message) {
        var payload = {
            type: "biz_private",
            subtype: type,
            senderId: this.myInfo.Jitsi_Id,
            message: message
        };
        this.jitsiRoom.sendMessage(payload, targetId);
    };
    BizGazeMeeting.prototype.onPrivateCommand = function (senderId, type, message) {
        var user = this.jitsiRoom.getParticipantById(senderId);
        if (!user) {
            this.privateCommandQueue.queueCommand(senderId, type, message, this.onPrivateCommand.bind(this));
            return;
        }
        if (type === jitsi_1.JitsiPrivateCommand.MEDIA_POLICY) {
            var policy = message;
            this.onUserMediaPolicy(senderId, policy);
        }
        else if (type === jitsi_1.JitsiPrivateCommand.ALLOW_RECORDING) {
            var allow = message.allow;
            this.onAllowRecording(senderId, allow);
        }
        else if (type === jitsi_1.JitsiPrivateCommand.ALLOW_SCREENSHARE) {
            var allow = message.allow;
            this.onAllowScreenshare(senderId, allow);
        }
        else if (type === jitsi_1.JitsiPrivateCommand.ALLOW_HANDRAISE) {
            var allow = message.allow;
            this.onAllowHandRaise(senderId, allow);
        }
        else if (type === jitsi_1.JitsiPrivateCommand.PRIVATE_CAHT) {
            this.onReceivePrivateChatMessage(senderId, message);
        }
        else if (type === jitsi_1.JitsiPrivateCommand.SET_PERMISSION_MIC) {
            var permission = message.permission;
            this.onSetPermissionMic(senderId, permission);
        }
        else if (type === jitsi_1.JitsiPrivateCommand.SET_PERMISSION_CAMERA) {
            var permission = message.permission;
            this.onSetPermissionCamera(senderId, permission);
        }
    };
    /**
     * **************************************************************************
     *                Meeting Logic
     *        Moderator
     *        Mute/Unmute Audio/Video
     *        ScreenShare
     *        Recording
     *        Chatting
     *        File Sharing
     *
     * **************************************************************************
     */
    BizGazeMeeting.prototype.sendRemoteControlReply = function (type, e, targetId) {
        //this.Log("Sending remoteControl");
        var param = {
            name: 'remote-control',
            type: '',
            action: '',
            button: 0,
            x: 0,
            y: 0,
            modifiers: {},
            key: ''
        };
        switch (type) {
            case 'permissions':
                param.type = 'permissions';
                param.action = 'request';
                break;
            case 'mousemove':
                param.type = 'mousemove';
                param.x = e.x;
                param.y = e.y;
                break;
            case 'mousedown':
                param.type = 'mousedown';
                param.button = e.button;
                break;
            case 'mouseup':
                param.type = 'mouseup';
                param.button = e.button;
                break;
            case 'keydown':
                param.type = 'keydown';
                param.modifiers = e.modifiers;
                param.key = keyboardEventToKey(e.key);
                console.info('--------------------param', param);
                break;
            case 'keyup':
                param.type = 'keyup';
                param.modifiers = e.modifiers;
                param.key = keyboardEventToKey(e.key);
                console.info('--------------------param', param);
                break;
        }
        /*let param = {
            name: 'remote-control',
            type: 'mousedown',
            button: 1
        };*/
        this.jitsiRoom.sendEndpointMessage(targetId, param);
    };
    BizGazeMeeting.prototype.kickParticipantOut = function (targetId) {
        this.Log("Sending kick out");
        console.log(targetId);
        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.KICK_OUT, targetId);
    };
    BizGazeMeeting.prototype.onKickedOut = function (param) {
        this.Log("received kick out");
        var targetId = param.value;
        if (targetId === this.myInfo.Jitsi_Id) {
            this.forceStop();
        }
    };
    //moderator
    BizGazeMeeting.prototype.grantModeratorRole = function (targetId) {
        this.Log("Sending grant host");
        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.GRANT_HOST_ROLE, targetId);
    };
    BizGazeMeeting.prototype.onChangedModerator = function (param) {
        var _this = this;
        this.Log("received grant host");
        var targetId = param.value;
        var senderName = param.attributes.senderName;
        var senderId = param.attributes.senderId;
        if (targetId === this.myInfo.Jitsi_Id) {
            if (senderId !== targetId) {
                this.ui.notification_warning(senderName, "You're granted co-host permission", NotificationType_1.NotificationType.GrantHost);
                this.myInfo.IsHost = true;
                this._updateMyPanel();
                this.jitsiRoom.getParticipants().forEach(function (user) {
                    _this._updateUserPanel(user);
                });
                this.ui.updateByRole(this.myInfo.IsHost);
            }
        }
        else {
            var user = this.jitsiRoom.getParticipantById(targetId);
            if (user) {
                user.setProperty(UserProperty_1.UserProperty.IsHost, true);
                this._updateUserPanel(user);
            }
            else {
                this.commandQueue.queueCommand(targetId, jitsi_1.JitsiCommand.GRANT_HOST_ROLE, param, this.onChangedModerator.bind(this));
            }
        }
    };
    BizGazeMeeting.prototype.onInitMediaPolicy = function (param) {
        var sourceId = param.value;
        if (sourceId === this.myInfo.Jitsi_Id)
            return;
        this.Log("received initMediaPolicy from " + sourceId);
        var user = this.jitsiRoom.getParticipantById(sourceId);
        if (user) {
            var useCamera = param.attributes.useCamera === "true";
            var useMic = param.attributes.useMic === "true";
            this.ui.participantsListWidget.setMuteCamera(sourceId, !useCamera);
            this.ui.participantsListWidget.setMuteMic(sourceId, !useMic);
        }
        else {
            this.Log("delaying initMediaPolicy callback");
            this.commandQueue.queueCommand(sourceId, jitsi_1.JitsiCommand.INIT_MEDIA_POLICY, param, this.onInitMediaPolicy.bind(this));
        }
    };
    BizGazeMeeting.prototype.onUserMediaPolicy = function (senderId, policy) {
        this.ui.participantsListWidget.setMuteCamera(senderId, !policy.useCamera);
        this.ui.participantsListWidget.setMuteMic(senderId, !policy.useMic);
    };
    //mute myself
    //called when user click toolbar buttons
    BizGazeMeeting.prototype.OnToggleMuteMyAudio = function () {
        /*
            if (this.roomInfo.IsControlAllowed && !this.isAllowCtlMic)
                return;
            let audioMuted = false;
            this.getLocalTracks().forEach(track => {
                if (track.getType() === MediaType.AUDIO && track.isMuted()) audioMuted = true;
            });
            this.isToggleMuteMyAudio = true;
            this.muteMyAudio(!audioMuted);
        */
        if (this.roomInfo.IsControlAllowed) {
            if (this.isSendPermissionMic || this.myInfo.IsHost) {
                var audioMuted_1 = false;
                this.getLocalTracks().forEach(function (track) {
                    if (track.getType() === MediaType_1.MediaType.AUDIO && track.isMuted())
                        audioMuted_1 = true;
                });
                this.isToggleMuteMyAudio = true;
                this.muteMyAudio(!audioMuted_1);
            }
            else
                this.ui.notification_warning("", "You can't control your Mic until you have permission from the Host.", NotificationType_1.NotificationType.AudioMute);
        }
        else {
            if (this.roomInfo.IsControlAllowed && !this.isAllowCtlMic)
                return;
            var audioMuted_2 = false;
            this.getLocalTracks().forEach(function (track) {
                if (track.getType() === MediaType_1.MediaType.AUDIO && track.isMuted())
                    audioMuted_2 = true;
            });
            this.isToggleMuteMyAudio = true;
            this.muteMyAudio(!audioMuted_2);
        }
    };
    BizGazeMeeting.prototype.OnToggleMuteMyVideo = function () {
        /*
        if (this.roomInfo.IsControlAllowed && !this.isAllowCtlVideo)
            return;
        let videoMuted = false;
        this.getLocalTracks().forEach(track => {
            if (track.getType() === MediaType.VIDEO && track.isMuted()) videoMuted = true;
        });
        this.isToggleMuteMyVideo = true;
        this.muteMyVideo(!videoMuted);
        */
        if (this.roomInfo.IsControlAllowed) {
            if (this.isSendPermissionCamera || this.myInfo.IsHost) {
                var videoMuted_1 = false;
                this.getLocalTracks().forEach(function (track) {
                    if (track.getType() === MediaType_1.MediaType.VIDEO && track.isMuted())
                        videoMuted_1 = true;
                });
                this.isToggleMuteMyVideo = true;
                this.muteMyVideo(!videoMuted_1);
            }
            else
                this.ui.notification_warning("", "You can't control your Camera until you have permission from the Host.", NotificationType_1.NotificationType.VideoMute);
        }
        else {
            if (this.roomInfo.IsControlAllowed && !this.isAllowCtlVideo)
                return;
            var videoMuted_2 = false;
            this.getLocalTracks().forEach(function (track) {
                if (track.getType() === MediaType_1.MediaType.VIDEO && track.isMuted())
                    videoMuted_2 = true;
            });
            this.isToggleMuteMyVideo = true;
            this.muteMyVideo(!videoMuted_2);
        }
    };
    BizGazeMeeting.prototype.deniedunmuteMyAudio = function (targetId, mute) {
        if (targetId !== this.myInfo.Jitsi_Id) {
            this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ALLOW_MIC, targetId, { mute: mute });
        }
    };
    BizGazeMeeting.prototype.deniedunmuteMyVideo = function (targetId, mute) {
        if (targetId !== this.myInfo.Jitsi_Id) {
            this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ALLOW_VIDEO, targetId, { mute: mute });
        }
    };
    BizGazeMeeting.prototype.muteMyAudioForFalse = function (mute, isHost) {
        this.getLocalTracks().forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.AUDIO) {
                if (mute)
                    track.mute();
                else
                    track.unmute();
            }
        });
        if (!this.roomInfo.IsControlAllowed && mute && !this.isToggleMuteMyAudio && !this.myInfo.IsHost && !isHost)
            this.ui.notification_warning("", "Your Mic is Muted", NotificationType_1.NotificationType.AudioMute);
    };
    BizGazeMeeting.prototype.muteMyAudio = function (mute) {
        var fRole;
        this.getLocalTracks().forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.AUDIO) {
                if (mute)
                    track.mute();
                else
                    track.unmute();
            }
        });
        if (this.roomInfo.IsControlAllowed && mute) {
            /*if (!this.myInfo.IsHost) {
                this.isAllowCtlMic = false;
            }
            if (this.isAllowCtlMic == false && this.isAllowCtlVideo == false)
                fRole = false;
            else
                fRole = true;
                */
            if (!this.myInfo.IsHost)
                this.ui.updateByRole(false);
            else
                this.ui.updateByRole(true);
            this.ui.notification_warning("", "Your Mic is Muted", NotificationType_1.NotificationType.AudioMute);
        }
        else if (this.roomInfo.IsControlAllowed && (!mute)) {
            this.isAllowCtlMic = true;
            //this.ui.updateByRole(this.isAllowCtlMic);
            //this.ui.updateByRole(true);
            if (!this.myInfo.IsHost)
                this.ui.updateByRole(false);
            else
                this.ui.updateByRole(true);
            this.ui.notification_warning("", "Your Mic is Unmuted", NotificationType_1.NotificationType.Audio);
        }
        if (!this.roomInfo.IsControlAllowed && mute && !this.isToggleMuteMyAudio && !this.myInfo.IsHost)
            this.ui.notification_warning("", "Host muted Your Mic", NotificationType_1.NotificationType.AudioMute);
        else if (!this.roomInfo.IsControlAllowed && mute)
            this.ui.notification_warning("", "Your Mic is Muted", NotificationType_1.NotificationType.Audio);
        else if (!this.roomInfo.IsControlAllowed && !mute)
            this.ui.notification_warning("", "Your Mic is Unmuted", NotificationType_1.NotificationType.AudioMute);
        //    this.ui.notification_warning("", "Host Unmuted your Mic", NotificationType.Audio);
    };
    BizGazeMeeting.prototype.muteMyVideoForFalse = function (mute, isHost) {
        this.getLocalTracks().forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO) {
                if (mute)
                    track.mute();
                else
                    track.unmute();
            }
        });
        if (!this.roomInfo.IsControlAllowed && mute && !this.isToggleMuteMyVideo && !this.myInfo.IsHost && !isHost)
            this.ui.notification_warning("", "your Camera is Disabled", NotificationType_1.NotificationType.VideoMute);
    };
    BizGazeMeeting.prototype.muteMyVideo = function (mute) {
        var fRole;
        this.getLocalTracks().forEach(function (track) {
            if (track.getType() === MediaType_1.MediaType.VIDEO) {
                if (mute)
                    track.mute();
                else
                    track.unmute();
            }
        });
        if (this.roomInfo.IsControlAllowed && mute) {
            /*
            if (!this.myInfo.IsHost) {
                this.isAllowCtlVideo = false;
            }
            if (this.isAllowCtlVideo == false && this.isAllowCtlMic == false)
                fRole = false;
            else
                fRole = true;
                */
            //this.ui.updateByRole(true);
            if (!this.myInfo.IsHost)
                this.ui.updateByRole(false);
            else
                this.ui.updateByRole(true);
            this.ui.notification_warning("", "Your Carmera is Disabled", NotificationType_1.NotificationType.VideoMute);
        }
        else if (this.roomInfo.IsControlAllowed && (!mute)) {
            this.isAllowCtlVideo = true;
            if (!this.myInfo.IsHost)
                this.ui.updateByRole(false);
            else
                this.ui.updateByRole(true);
            //this.ui.updateByRole(this.isAllowCtlVideo);
            this.ui.notification_warning("", "Your Camera is Enabled", NotificationType_1.NotificationType.Video);
        }
        if (!this.roomInfo.IsControlAllowed && mute && !this.isToggleMuteMyVideo && !this.myInfo.IsHost)
            this.ui.notification_warning("", "Host disabled your Camera", NotificationType_1.NotificationType.VideoMute);
        else if (!this.roomInfo.IsControlAllowed && mute)
            this.ui.notification_warning("", "Your Camera is Disabled", NotificationType_1.NotificationType.VideoMute);
        else if (!this.roomInfo.IsControlAllowed && !mute)
            this.ui.notification_warning("", "Your Camera is Enabled", NotificationType_1.NotificationType.Video);
    };
    BizGazeMeeting.prototype.givePermissionMic = function (jitsiId, permission) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.SET_PERMISSION_MIC, { permission: permission });
    };
    BizGazeMeeting.prototype.onSetPermissionMic = function (senderId, permission) {
        //const permission = param.attributes.permission === "true";
        this.isSendPermissionMic = permission;
        this.ui.updatePermissionMic(this.isSendPermissionMic);
        //const sourceId = param.value;
        if (this.isSendPermissionMic)
            this.ui.notification_warning("", "You can control your mic", NotificationType_1.NotificationType.Audio);
        else if (!this.isSendPermissionMic)
            this.ui.notification_warning("", "You can't control your mic", NotificationType_1.NotificationType.AudioMute);
    };
    BizGazeMeeting.prototype.givePermissionCamera = function (jitsiId, permission) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.SET_PERMISSION_CAMERA, { permission: permission });
    };
    BizGazeMeeting.prototype.onSetPermissionCamera = function (senderId, permission) {
        //const permission = param.attributes.permission === "true";
        this.isSendPermissionCamera = permission;
        this.ui.updatePermissionCamera(this.isSendPermissionCamera);
        //const sourceId = param.value;
        if (this.isSendPermissionCamera)
            this.ui.notification_warning("", "You can control your Camera", NotificationType_1.NotificationType.Video);
        else if (!this.isSendPermissionCamera)
            this.ui.notification_warning("", "You can't control your Camera", NotificationType_1.NotificationType.VideoMute);
    };
    BizGazeMeeting.prototype.setHostControlMic = function (targetId, isSetHostControlMic) {
        this.isSetHostControlMic = isSetHostControlMic;
        if (this.isSetHostControlMic)
            this.ui.setIsHostControlSelfMic(this.isSetHostControlMic);
        //this.sendJitsiBroadcastCommand(JitsiCommand.SET_HOSTCONTORLSELF_MIC, targetId, { isSetHostControlMic: isSetHostControlMic });
    };
    BizGazeMeeting.prototype.onSetHostControlSelfMic = function (param) {
        this.isSetHostControlMic = param.attributes.isSetHostControlMic;
    };
    BizGazeMeeting.prototype.setHostControlCamera = function (targetId, isSetHostControlCamera) {
        this.isSetHostControlCamera = isSetHostControlCamera;
        if (this.isSetHostControlCamera)
            this.ui.setIsHostControlSelfCamera(this.isSetHostControlCamera);
    };
    //mute others
    BizGazeMeeting.prototype.muteUserAudio = function (targetId, mute, isHost) {
        this.isToggleMuteMyAudio = false;
        if (this.roomInfo.IsControlAllowed) {
            //if (!this.isSetHostControlMic) {//It is not the case when host control his mic
            if (!this.myInfo.IsHost && this.isSendPermissionMic || this.isSetHostControlMic) { //When participant receive the permission to control his mic from host
                if (targetId === this.myInfo.Jitsi_Id) {
                    this.muteMyAudio(mute);
                }
                else
                    this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.MUTE_AUDIO, targetId, { mute: mute });
            }
            else
                this.ui.notification_warning("", "You can't control your Mic until you have permission from the Host.", NotificationType_1.NotificationType.AudioMute);
        }
        else {
            if (targetId === this.myInfo.Jitsi_Id) {
                this.muteMyAudioForFalse(mute, isHost);
            }
            else
                this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.MUTE_AUDIO, targetId, { mute: mute });
        }
    };
    BizGazeMeeting.prototype.muteUserVideo = function (targetId, mute, isHost) {
        this.isToggleMuteMyVideo = false;
        /*if (targetId === this.myInfo.Jitsi_Id)
            this.muteMyVideo(mute);
        else
            this.sendJitsiBroadcastCommand(JitsiCommand.MUTE_VIDEO, targetId, { mute: mute });
        */
        if (this.roomInfo.IsControlAllowed) {
            if (!this.myInfo.IsHost && this.isSendPermissionCamera || this.isSetHostControlCamera) {
                if (targetId === this.myInfo.Jitsi_Id) {
                    this.muteMyVideo(mute);
                }
                else
                    this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.MUTE_VIDEO, targetId, { mute: mute });
            }
            else
                this.ui.notification_warning("", "You can't control your Camera until you have permission from the Host.", NotificationType_1.NotificationType.VideoMute);
        }
        else {
            if (targetId === this.myInfo.Jitsi_Id) {
                this.muteMyVideoForFalse(mute, isHost);
            }
            else
                this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.MUTE_VIDEO, targetId, { mute: mute });
        }
    };
    BizGazeMeeting.prototype.onAllowMic = function (param) {
        var senderName = param.attributes.senderName;
        if (this.myInfo.IsHost)
            this.ui.notification_warning("", "Your request is denied by " + senderName, NotificationType_1.NotificationType.AudioMute);
    };
    BizGazeMeeting.prototype.onAllowVideo = function (param) {
        var senderName = param.attributes.senderName;
        if (this.myInfo.IsHost)
            this.ui.notification_warning("", "Your request is denied by " + senderName, NotificationType_1.NotificationType.VideoMute);
    };
    BizGazeMeeting.prototype.onMutedAudio = function (param) {
        this.isToggleMuteMyAudio = false;
        var targetId = param.value;
        var senderId = param.attributes.senderId;
        var senderName = param.attributes.senderName;
        var mute = param.attributes.mute === "true";
        if (targetId == this.myInfo.Jitsi_Id) {
            if (senderId !== targetId) {
                if (mute) {
                    /*
                    if (!this.roomInfo.IsControlAllowed) {
                        this.ui.askDialog(
                            senderName,
                            "Requested to mute your microphone",
                            NotificationType.AudioMute,
                            this.muteMyAudio.bind(this),
                            null,
                            mute);
                    }
                    else {*/
                    this.muteMyAudio(mute);
                    //}
                }
                else {
                    if (!this.roomInfo.IsControlAllowed) {
                        this.ui.askDialog(senderName, "Requested to unmute your microphone", NotificationType_1.NotificationType.Audio, this.muteMyAudio.bind(this), this.deniedunmuteMyAudio.bind(this), mute);
                    }
                    else {
                        this.muteMyAudio(mute);
                    }
                }
            }
            else {
                this.muteMyAudio(mute);
            }
        }
    };
    BizGazeMeeting.prototype.onMutedVideo = function (param) {
        this.isToggleMuteMyVideo = false;
        var targetId = param.value;
        var senderId = param.attributes.senderId;
        var senderName = param.attributes.senderName;
        var mute = param.attributes.mute === "true";
        if (targetId == this.myInfo.Jitsi_Id) {
            if (senderId !== targetId) {
                if (mute) {
                    /*
                    if (!this.roomInfo.IsControlAllowed) {
                        this.ui.askDialog(
                            senderName,
                            "Requested to mute your camera",
                            NotificationType.VideoMute,
                            this.muteMyVideo.bind(this),
                            null,
                            mute);
                    }
                    else {*/
                    this.muteMyVideo(mute);
                    //}
                }
                else {
                    if (!this.roomInfo.IsControlAllowed) {
                        this.ui.askDialog(senderName, "Requested to unmute your camera", NotificationType_1.NotificationType.Video, this.muteMyVideo.bind(this), this.deniedunmuteMyVideo.bind(this), mute);
                    }
                    else {
                        this.muteMyVideo(mute);
                    }
                }
            }
            else {
                this.muteMyVideo(mute);
            }
        }
    };
    BizGazeMeeting.prototype.onLocalTrackMuteChanged = function (track) {
        var id = track.getParticipantId();
        //if (this.roomInfo.IsWebinar && !this.myInfo.IsHost) { //matvey
        if (this.roomInfo.IsControlAllowed && !this.myInfo.IsHost) {
            var isAllMuted_2 = true;
            this.getLocalTracks().forEach(function (t) {
                if (!t.isMuted())
                    isAllMuted_2 = false;
            });
            if (isAllMuted_2) {
                if (this.localVideoPanel) { //remote it
                    this.ui.videoPanelGrid.freeVideoPanel(this.localVideoPanel.Id);
                    this.localVideoPanel = null;
                }
            }
            else {
                if (!this.localVideoPanel) {
                    this.localVideoPanel = this.ui.videoPanelGrid.getNewVideoPanel();
                }
                //if (!this.roomInfo.IsControlAllowed) {
                if (track.getType() === MediaType_1.MediaType.VIDEO) {
                    var videoElem = this.localVideoPanel.videoElem;
                    track.attach(videoElem);
                    videoElem.play();
                }
                else if (track.getType() === MediaType_1.MediaType.AUDIO) {
                    var audioElem = this.localVideoPanel.audioElem;
                    track.attach(audioElem);
                    audioElem.play();
                }
                //}
            }
        }
        this.updateUiOnLocalTrackChange();
        //update list
        if (track.getType() === MediaType_1.MediaType.VIDEO)
            this.ui.participantsListWidget.setMuteCamera(id, track.isMuted());
        else if (track.getType() === MediaType_1.MediaType.AUDIO)
            this.ui.participantsListWidget.setMuteMic(id, track.isMuted());
    };
    BizGazeMeeting.prototype.onRemoteTrackMuteChanged = function (track) {
        var id = track.getParticipantId();
        var user = this.jitsiRoom.getParticipantById(id);
        if (!user)
            return;
        //if (this.roomInfo.IsWebinar) { //matvey
        if (this.roomInfo.IsControlAllowed) {
            var isAllMuted_3 = true;
            user.getTracks().forEach(function (t) {
                if (!t.isMuted())
                    isAllMuted_3 = false;
            });
            var videoPanel = user.getProperty(UserProperty_1.UserProperty.videoPanel);
            if (isAllMuted_3) {
                if (videoPanel) { //remote it
                    this.ui.videoPanelGrid.freeVideoPanel(videoPanel.Id);
                    user.setProperty(UserProperty_1.UserProperty.videoPanel, null);
                }
            }
            else {
                if (!videoPanel) {
                    videoPanel = this.ui.videoPanelGrid.getNewVideoPanel();
                    user.setProperty(UserProperty_1.UserProperty.videoPanel, videoPanel);
                }
                if (track.getType() === MediaType_1.MediaType.VIDEO) {
                    var videoElem = videoPanel.videoElem;
                    track.attach(videoElem);
                    videoElem.play();
                }
                else if (track.getType() === MediaType_1.MediaType.AUDIO) {
                    var audioElem = videoPanel.audioElem;
                    track.attach(audioElem);
                    audioElem.play();
                }
            }
        }
        //update panel
        this._updateUserPanel(user);
        //update list
        if (track.getType() === MediaType_1.MediaType.VIDEO)
            this.ui.participantsListWidget.setMuteCamera(id, track.isMuted());
        else if (track.getType() === MediaType_1.MediaType.AUDIO)
            this.ui.participantsListWidget.setMuteMic(id, track.isMuted());
    };
    //allow of camera, mic 
    /*public allowCamera(jitsiId: string, allow: boolean) {
        if (!this.myInfo.IsHost)
            return;

        this.sendJitsiBroadcastCommand(JitsiCommand.ALLOW_CAMERA, jitsiId, { allow: allow });
    }

    public allowMic(jitsiId: string, allow: boolean) {
        if (!this.myInfo.IsHost)
            return;

        this.sendJitsiBroadcastCommand(JitsiCommand.ALLOW_MIC, jitsiId, { allow: allow });
    }

    private onAllowCameraCommand(param: JitsiCommandParam) {
        const targetId = param.value;
        const allow = param.attributes.allow === "true";

        this.ui.participantsListWidget.setMuteCamera(targetId, allow);

        if (targetId === this.jitsiRoom.myUserId()) {
            if (param.attributes.senderId !== targetId) {
                if (allow) {
                    this.ui.notification(
                        param.attributes.senderName,
                        "Your camera was allowed",
                        NotificationType.Video
                    );
                }
                else {
                    this.ui.notification_warning(
                        param.attributes.senderName,
                        "Your camera was blocked",
                        NotificationType.VideoMute
                    );
                }
            }

            this.onAllowCamera(allow);
        }
    }

    private onAllowCamera(allow: boolean) {
        this.myInfo.mediaPolicy.useCamera = allow;
        if (allow) {
            this.createVideoTrack(this.activeCameraId)
                .then((tracks: JitsiTrack[]) => {
                    this.onLocalTrackAdded(tracks);
                })
        } else {
            //remove track
            const localVideoTrack = this.getLocalTrackByType(MediaType.VIDEO);
            if (localVideoTrack) {
                this.removeLocalTrack(localVideoTrack).then((_: any) => {
                    localVideoTrack.dispose();
                    this.updateUiOnLocalTrackChange();
                });
            }
        }
    }

    private onAllowMicCommand(param: JitsiCommandParam) {
        const targetId = param.value;
        const allow = param.attributes.allow === "true";

        this.ui.participantsListWidget.setMuteMic(targetId, allow);

        if (targetId === this.jitsiRoom.myUserId()) {
            if (param.attributes.senderId !== targetId) {
                if (allow) {
                    this.ui.notification(
                        param.attributes.senderName,
                        "Your microphone was allowed",
                        NotificationType.Audio
                    );
                }
                else {
                    this.ui.notification_warning(
                        param.attributes.senderName,
                        "Your microphone was blocked",
                        NotificationType.AudioMute
                    );
                }
            }

            this.onAllowMic(allow);
        }
    }

    private onAllowMic(allow: boolean) {
        this.myInfo.mediaPolicy.useMic = allow;

        if (allow) {
            this.createAudioTrack(this.activeMicId)
                .then((tracks: JitsiTrack[]) => {
                    this.onLocalTrackAdded(tracks);
                })
        } else {
            //remove track
            const localAudioTrack = this.getLocalTrackByType(MediaType.AUDIO);
            if (localAudioTrack) {
                this.removeLocalTrack(localAudioTrack).then((_: any) => {
                    localAudioTrack.dispose();
                    this.updateUiOnLocalTrackChange();
                });
            }
        }
    }*/
    //screenshare
    BizGazeMeeting.prototype.toggleScreenShare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.screenSharing) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.turnOnCamera()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 2:
                        if (!this.myInfo.IsHost) return [3 /*break*/, 6];
                        if (!(!this.roomInfo.IsMultipleSharingAllowed && this.isMultipleSharing)) return [3 /*break*/, 3];
                        this.ui.notification_warning("", this.sharingUserName + " is Already Sharing Screen", NotificationType_1.NotificationType.Screensharing);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.turnOnScreenShare()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 14];
                    case 6:
                        if (!this.roomInfo.IsMultipleSharingAllowed) return [3 /*break*/, 10];
                        if (!this.roomInfo.IsScreenShareRequired) return [3 /*break*/, 7];
                        //ask permission to host
                        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ASK_SCREENSHARE, this.myInfo.Jitsi_Id, null);
                        this.ui.notification_warning("Wait a second", "Sent your screen sharing request", NotificationType_1.NotificationType.Screensharing);
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.turnOnScreenShare()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 14];
                    case 10:
                        if (!this.isMultipleSharing) return [3 /*break*/, 11];
                        this.ui.notification_warning("", this.sharingUserName + " is Already Sharing Screen", NotificationType_1.NotificationType.Screensharing);
                        return [3 /*break*/, 14];
                    case 11:
                        if (!this.roomInfo.IsScreenShareRequired) return [3 /*break*/, 12];
                        //await this.turnOnScreenShare();
                        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ASK_SCREENSHARE, this.myInfo.Jitsi_Id, null);
                        this.ui.notification_warning("Wait a second", "Sent your screen sharing request", NotificationType_1.NotificationType.Screensharing);
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, this.turnOnScreenShare()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        this.ui.toolbar.setScreenShare(this.screenSharing);
                        return [2 /*return*/];
                }
            });
        });
    };
    BizGazeMeeting.prototype.onAskMultiShare = function (param) {
        if (param.attributes.sharing == "true") { //true: turn on sharing
            this.isMultipleSharing = true;
            this.sharingUserName = param.attributes.senderName;
        }
        else if (param.attributes.sharing == "false") {
            this.isMultipleSharing = false;
        }
    };
    BizGazeMeeting.prototype.onAskScreenShare = function (param) {
        if (!this.myInfo.IsHost)
            return;
        var senderName = param.attributes.senderName;
        var senderId = param.attributes.senderId;
        this.ui.askDialog(senderName, "Requested screen sharing", NotificationType_1.NotificationType.Screensharing, this.allowScreenshare.bind(this), this.denyScreenshare.bind(this), senderId);
    };
    BizGazeMeeting.prototype.allowScreenshare = function (jitsiId) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.ALLOW_SCREENSHARE, { allow: true });
    };
    BizGazeMeeting.prototype.denyScreenshare = function (jitsiId) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.ALLOW_SCREENSHARE, { allow: false });
    };
    BizGazeMeeting.prototype.onAllowScreenshare = function (senderId, allow) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.jitsiRoom.getParticipantById(senderId);
                        if (!user) return [3 /*break*/, 3];
                        userName = user.getDisplayName();
                        if (!allow) return [3 /*break*/, 2];
                        this.ui.notification(userName, "Accepted your Request", NotificationType_1.NotificationType.Screensharing);
                        return [4 /*yield*/, this.turnOnScreenShare()];
                    case 1:
                        _a.sent();
                        this.ui.toolbar.setScreenShare(this.screenSharing);
                        return [3 /*break*/, 3];
                    case 2:
                        this.ui.notification_warning(userName, "Denied your Request", NotificationType_1.NotificationType.Screensharing);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //turn on screen share
    BizGazeMeeting.prototype.turnOnScreenShare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.JitsiMeetJS.createLocalTracks({
                            devices: ['desktop']
                        })
                            .then(function (tracks) { return __awaiter(_this, void 0, void 0, function () {
                            var screenTrack;
                            var _this = this;
                            return __generator(this, function (_a) {
                                if (tracks.length <= 0) {
                                    throw new Error("No Screen Selected");
                                }
                                screenTrack = tracks[0];
                                this.onLocalTrackAdded([screenTrack]);
                                screenTrack.addEventListener(this.JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, function () {
                                    _this.Log('screen - stopped');
                                    _this.toggleScreenShare();
                                    _this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ASK_MULTISHARE, _this.myInfo.Jitsi_Id, { sharing: false });
                                });
                                this.screenSharing = true;
                                if (!this.roomInfo.IsMultipleSharingAllowed)
                                    this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ASK_MULTISHARE, this.myInfo.Jitsi_Id, { sharing: true });
                                return [2 /*return*/];
                            });
                        }); })
                            .catch(function (error) {
                            _this.screenSharing = false;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BizGazeMeeting.prototype.turnOnCamera = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.JitsiMeetJS.createLocalTracks({
                            devices: [MediaType_1.MediaType.VIDEO]
                        })
                            .then(function (tracks) { return __awaiter(_this, void 0, void 0, function () {
                            var cameraTrack;
                            return __generator(this, function (_a) {
                                if (tracks.length <= 0) {
                                    return [2 /*return*/];
                                }
                                cameraTrack = tracks[0];
                                this.onLocalTrackAdded([cameraTrack]);
                                this.screenSharing = false;
                                return [2 /*return*/];
                            });
                        }); })
                            .catch(function (error) {
                            _this.screenSharing = false;
                            console.log(error);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*chat*/
    BizGazeMeeting.prototype.sendChatMessage = function (msg) {
        this.jitsiRoom.sendTextMessage(msg);
    };
    BizGazeMeeting.prototype.sendPrivateChatMessage = function (targetId, msg) {
        this.sendJitsiPrivateCommand(targetId, jitsi_1.JitsiPrivateCommand.PRIVATE_CAHT, msg);
    };
    BizGazeMeeting.prototype.onReceiveChatMessage = function (id, msg, timestamp) {
        if (this.myInfo.Jitsi_Id === id)
            return;
        var user = this.jitsiRoom.getParticipantById(id);
        if (user) {
            this.ui.chattingWidget.receiveMessage(id, user.getDisplayName(), msg);
        }
    };
    BizGazeMeeting.prototype.onReceivePrivateChatMessage = function (senderId, msg) {
        if (this.myInfo.Jitsi_Id === senderId)
            return;
        var user = this.jitsiRoom.getParticipantById(senderId);
        if (user) {
            this.ui.chattingWidget.receiveMessage(senderId, user.getDisplayName(), msg, true);
        }
    };
    BizGazeMeeting.prototype.onAllowControl = function (senderId, allow) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userName;
            return __generator(this, function (_a) {
                user = this.jitsiRoom.getParticipantById(senderId);
                if (user) {
                    userName = user.getDisplayName();
                    if (allow) {
                    }
                    else {
                        this.ui.notification_warning(userName, "Recording was denied", NotificationType_1.NotificationType.AudioMute);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /*file sharing*/
    BizGazeMeeting.prototype.sendFileMeta = function (meta) {
        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.FILE_META, meta.sessionId, { meta: JSON.stringify(meta) });
    };
    BizGazeMeeting.prototype.sendFileData = function (sessionId, data) {
        var binary = '';
        var bytes = new Uint8Array(data);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        var enc = window.btoa(binary);
        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.FILE_SLICE, sessionId, { data: enc });
    };
    BizGazeMeeting.prototype.onFileMeta = function (param) {
        var sessionId = param.value;
        var senderId = param.attributes.senderId;
        var senderName = param.attributes.senderName;
        var meta = JSON.parse(param.attributes.meta);
        if (senderId === this.myInfo.Jitsi_Id)
            return;
        this.ui.chattingWidget.onFileMeta(sessionId, meta, senderId, senderName);
    };
    BizGazeMeeting.prototype.onFileData = function (param) {
        var sessionId = param.value;
        var enc = param.attributes.data;
        var senderId = param.attributes.senderId;
        var senderName = param.attributes.senderName;
        if (senderId === this.myInfo.Jitsi_Id)
            return;
        var binary = window.atob(enc);
        var array = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; ++i) {
            array[i] = binary.charCodeAt(i);
        }
        this.ui.chattingWidget.onFileData(sessionId, array.buffer);
    };
    BizGazeMeeting.prototype.toggleRecording = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.recording) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.stopRecording()];
                    case 1:
                        _a.sent();
                        this.ui.toolbar.setRecording(this.recording);
                        return [3 /*break*/, 7];
                    case 2:
                        if (!this.myInfo.IsHost) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.startRecording()];
                    case 3:
                        _a.sent();
                        this.ui.toolbar.setRecording(this.recording);
                        return [3 /*break*/, 7];
                    case 4:
                        if (!this.roomInfo.IsRecordingRequired) return [3 /*break*/, 5];
                        //ask permission to host
                        this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ASK_RECORDING, this.myInfo.Jitsi_Id, null);
                        this.ui.notification_warning("Wait a second", "Sent your recording request", NotificationType_1.NotificationType.Recording);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.startRecording()];
                    case 6:
                        _a.sent();
                        this.ui.toolbar.setRecording(this.recording);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BizGazeMeeting.prototype.onAskRecording = function (param) {
        if (!this.myInfo.IsHost)
            return;
        var senderName = param.attributes.senderName;
        var senderId = param.attributes.senderId;
        this.ui.askDialog(senderName, "Requested a recording", NotificationType_1.NotificationType.Recording, this.allowRecording.bind(this), this.denyRecording.bind(this), senderId);
    };
    BizGazeMeeting.prototype.allowRecording = function (jitsiId) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.ALLOW_RECORDING, { allow: true });
    };
    BizGazeMeeting.prototype.denyRecording = function (jitsiId) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.ALLOW_RECORDING, { allow: false });
    };
    BizGazeMeeting.prototype.onAllowRecording = function (senderId, allow) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.jitsiRoom.getParticipantById(senderId);
                        if (!user) return [3 /*break*/, 3];
                        userName = user.getDisplayName();
                        if (!allow) return [3 /*break*/, 2];
                        this.ui.notification(userName, "Recording was accepted", NotificationType_1.NotificationType.Recording);
                        return [4 /*yield*/, this.startRecording()];
                    case 1:
                        _a.sent();
                        this.ui.toolbar.setRecording(this.recording);
                        return [3 /*break*/, 3];
                    case 2:
                        this.ui.notification_warning(userName, "Recording was denied", NotificationType_1.NotificationType.Recording);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BizGazeMeeting.prototype.startRecording = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gumStream, gdmStream, e_1, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gumStream = null;
                        gdmStream = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 9]);
                        debugger;
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: false, audio: true })];
                    case 2:
                        gumStream = _a.sent();
                        return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia({
                                video: { displaySurface: "screen" },
                                audio: { channelCount: 2 },
                            })];
                    case 3:
                        //gdmStream.getTracks().forEach(track => track.stop());
                        gdmStream = _a.sent();
                        gdmStream.addEventListener('inactive', function (event) {
                            if (_this.recording)
                                _this.toggleRecording();
                        });
                        return [3 /*break*/, 9];
                    case 4:
                        e_1 = _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        gumStream = null;
                        return [4 /*yield*/, navigator.getDisplayMedia({
                                video: { displaySurface: "browser" },
                                audio: { channelCount: 2 }
                            })];
                    case 6:
                        gdmStream = _a.sent();
                        gdmStream.addEventListener('inactive', function (event) {
                            if (_this.recording)
                                _this.toggleRecording();
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        console.error("capture for recording failure");
                        return [2 /*return*/];
                    case 8: return [3 /*break*/, 9];
                    case 9:
                        this.recorderStream = gumStream ? this.mixer(gumStream, gdmStream) : gdmStream;
                        this.mediaRecorder = new MediaRecorder(this.recorderStream, { mimeType: 'video/webm' });
                        this.mediaRecorder.ondataavailable = function (e) {
                            if (e.data && e.data.size > 0) {
                                _this.recordingData.push(e.data);
                                if (!_this.recording && !_this.downloadRecordFile) {
                                    _this.downloadRecordingFile();
                                }
                            }
                        };
                        this.mediaRecorder.onstop = function () {
                            _this.recorderStream.getTracks().forEach(function (track) { return track.stop(); });
                            gumStream.getTracks().forEach(function (track) { return track.stop(); });
                            gdmStream.getTracks().forEach(function (track) { return track.stop(); });
                        };
                        this.recorderStream.addEventListener('inactive', function () {
                            console.log('Capture stream inactive');
                            _this.stopRecording();
                        });
                        this.recordingData = [];
                        this.mediaRecorder.start();
                        this.recording = true;
                        this.downloadRecordFile = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    BizGazeMeeting.prototype.stopRecording = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.recording)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.mediaRecorder.stop()];
                    case 1:
                        _a.sent();
                        this.downloadRecordingFile();
                        this.recording = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    BizGazeMeeting.prototype.downloadRecordingFile = function () {
        if (this.downloadRecordFile || this.recordingData.length <= 0)
            return;
        var blob = new Blob(this.recordingData, { type: 'video/webm' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = this.getRecordingFilename() + ".webm";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 5000);
        this.downloadRecordFile = true;
    };
    BizGazeMeeting.prototype.getRecordingFilename = function () {
        var now = new Date();
        var timestamp = now.toISOString();
        return this.roomInfo.conferenceName + "_recording_" + timestamp;
    };
    BizGazeMeeting.prototype.mixer = function (stream1, stream2) {
        var ctx = new AudioContext();
        var dest = ctx.createMediaStreamDestination();
        if (stream1.getAudioTracks().length > 0)
            ctx.createMediaStreamSource(stream1).connect(dest);
        if (stream2.getAudioTracks().length > 0)
            ctx.createMediaStreamSource(stream2).connect(dest);
        var tracks = dest.stream.getTracks();
        tracks = tracks.concat(stream1.getVideoTracks()).concat(stream2.getVideoTracks());
        return new MediaStream(tracks);
    };
    BizGazeMeeting.prototype.toggleMuteAllVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.myInfo.IsHost)
                    return [2 /*return*/];
                this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.MUTE_All_VIDEO, this.myInfo.Jitsi_Id, { mute: true });
                this.ui.notification_warning("Wait a second", "Sent your all video disable request", NotificationType_1.NotificationType.VideoMute);
                return [2 /*return*/];
            });
        });
    };
    BizGazeMeeting.prototype.onMuteAllVideo = function (param) {
        var senderId = param.value;
        var senderName = param.attributes.senderName;
        var mute = param.attributes.mute === "true";
        if (senderId !== this.myInfo.Jitsi_Id) {
            this.ui.askDialog(senderName, "Requested to mute your camera", NotificationType_1.NotificationType.VideoMute, this.muteMyVideo.bind(this), null, mute);
        }
    };
    BizGazeMeeting.prototype.toggleMuteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.myInfo.IsHost)
                    return [2 /*return*/];
                this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.MUTE_All_AUDIO, this.myInfo.Jitsi_Id, { mute: true });
                return [2 /*return*/];
            });
        });
    };
    BizGazeMeeting.prototype.onMuteAllAudio = function (param) {
        var senderId = param.value;
        var senderName = param.attributes.senderName;
        var mute = param.attributes.mute;
        if (senderId !== this.myInfo.Jitsi_Id) {
            /*
            if (this.roomInfo.IsControlAllowed)
                this.ui.askDialog(
                    senderName,
                    "Requested to mute your microphone",
                    NotificationType.AudioMute,
                    this.muteMyAudio.bind(this),
                    null,
                    mute);
            else
            */
            this.muteMyAudio(mute);
        }
    };
    // handraise
    BizGazeMeeting.prototype.toggleHandRaise = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.myInfo.IsHost) {
                    //ask handraise to host
                    this.sendJitsiBroadcastCommand(jitsi_1.JitsiCommand.ASK_HANDRAISE, this.myInfo.Jitsi_Id, null);
                    this.ui.notification_warning("Wait a second", "Sent your hand-raise request", NotificationType_1.NotificationType.HandRaise);
                }
                return [2 /*return*/];
            });
        });
    };
    BizGazeMeeting.prototype.onAskHandRaise = function (param) {
        if (!this.myInfo.IsHost)
            return;
        var senderName = param.attributes.senderName;
        var senderId = param.attributes.senderId;
        this.ui.askDialog(senderName, "Requested Hand-Raise", NotificationType_1.NotificationType.HandRaise, this.allowHandRaise.bind(this), this.denyHandRaise.bind(this), senderId);
    };
    BizGazeMeeting.prototype.allowHandRaise = function (jitsiId) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.ALLOW_HANDRAISE, { allow: true });
    };
    BizGazeMeeting.prototype.denyHandRaise = function (jitsiId) {
        this.sendJitsiPrivateCommand(jitsiId, jitsi_1.JitsiPrivateCommand.ALLOW_HANDRAISE, { allow: false });
    };
    BizGazeMeeting.prototype.onAllowHandRaise = function (senderId, allow) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userName;
            return __generator(this, function (_a) {
                user = this.jitsiRoom.getParticipantById(senderId);
                if (user) {
                    userName = user.getDisplayName();
                    if (allow) {
                        this.ui.notification(userName, "Hand-raise was accepted", NotificationType_1.NotificationType.HandRaise);
                        this.muteMyVideo(false);
                        this.muteMyAudio(false);
                    }
                    else {
                        this.ui.notification_warning(userName, "Hand-raise was denied", NotificationType_1.NotificationType.HandRaise);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    BizGazeMeeting.prototype.toggleCopyJoiningInfo = function () {
        var TempText = document.createElement("input");
        TempText.value = "https://" + window.location.host + "/lobby/" + this.roomInfo.Id; // enter your meeting url here
        document.body.appendChild(TempText);
        TempText.select();
        document.execCommand("copy");
        document.body.removeChild(TempText);
    };
    //highlight speaker
    BizGazeMeeting.prototype.onDominantSpeakerChanged = function (id) {
        if (id === this.myInfo.Jitsi_Id) {
            this.ui.videoPanelGrid.hightlightPanel(this.localVideoPanel.Id);
        }
        else {
            var user = this.jitsiRoom.getParticipantById(id);
            if (user) {
                var videoPanel = user.getProperty(UserProperty_1.UserProperty.videoPanel);
                if (videoPanel)
                    this.ui.videoPanelGrid.hightlightPanel(videoPanel.Id);
            }
        }
    };
    /**
     * **************************************************************************
     *              Log
     * **************************************************************************
     */
    BizGazeMeeting.prototype.Log = function (message) {
        console.log(message);
        if (this.ui != null)
            this.ui.Log(message);
    };
    return BizGazeMeeting;
}());
exports.BizGazeMeeting = BizGazeMeeting;
var meeting = new BizGazeMeeting();
meeting.start();
//# sourceMappingURL=meeting.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_247def46.js","/")
},{"./enum/ChannelType":37,"./enum/MediaType":38,"./enum/NotificationType":39,"./enum/UserProperty":40,"./jitsi/JitsiCommandParam":44,"./jitsi/JitsiCommandQueue":45,"./meeting_ui":46,"./model/ActiveDevices":47,"./model/BGMeeting":48,"./model/BGUser":49,"./model/InputDevicePolicy":50,"./protocol/bg":51,"./protocol/jitsi":52,"./util/TimeUtil":53,"@microsoft/signalr":23,"buffer":25,"e/U+97":27}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReceiver = exports.FileReceiverProps = void 0;
var snippet_1 = require("../util/snippet");
var FileReceiverProps = /** @class */ (function () {
    function FileReceiverProps() {
    }
    return FileReceiverProps;
}());
exports.FileReceiverProps = FileReceiverProps;
var FileReceiver = /** @class */ (function () {
    function FileReceiver(props) {
        this.receiveBuffer = [];
        this.size = 0;
        this.props = props;
    }
    FileReceiver.prototype.show = function () {
        var receivingId = "receiving-" + this.props.meta.sessionId;
        var html = "\n            <div class=\"file-progress\" id=\"" + receivingId + "\">\n                <div class=\"fileinfo\">\n                    <a class=\"download\" href=\"#\">" + this.props.meta.name + "(" + snippet_1.getCapacityLabel(this.props.meta.size) + ")</a>\n                </div>\n                <div class=\"progress\">\n                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n                </div>\n            </div>";
        this.props.addChatItem(this.props.senderId, this.props.senderName, html, false);
        this.receivingElement = $("#" + receivingId);
        this.progressElement = this.receivingElement.find(".progress-bar");
        this.downloadElement = this.receivingElement.find(".download");
        this.receivingElement.closest(".usermessage").css("white-space", "nowrap");
    };
    FileReceiver.prototype.readFileData = function (data) {
        debugger;
        this.receiveBuffer.push(data);
        this.size += data.byteLength;
        var percent = Math.floor(this.size / this.props.meta.size * 100);
        this.progressElement.attr("aria-valuenow", percent);
        this.progressElement.css("width", percent + "%");
        if (this.size >= this.props.meta.size) {
            var received = new Blob(this.receiveBuffer);
            this.downloadElement.attr('href', URL.createObjectURL(received));
            this.downloadElement.attr('download', this.props.meta.name);
            this.props.onFinished(this.props.meta.sessionId, this.props.meta.name, "Receive finished");
        }
    };
    return FileReceiver;
}());
exports.FileReceiver = FileReceiver;
//# sourceMappingURL=FileReceiver.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/file\\FileReceiver.js","/file")
},{"../util/snippet":55,"buffer":25,"e/U+97":27}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSender = exports.FileSenderProps = void 0;
var snippet_1 = require("../util/snippet");
var TimeUtil_1 = require("../util/TimeUtil");
var FileSenderProps = /** @class */ (function () {
    function FileSenderProps() {
    }
    return FileSenderProps;
}());
exports.FileSenderProps = FileSenderProps;
var FileSender = /** @class */ (function () {
    function FileSender(props) {
        this.sendBuf = [];
        this.props = props;
    }
    FileSender.prototype.sendFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file, sendingId, html, $progressElem, chunkSize, fileReader, offset, readSlice;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.props.fileElement.files.length <= 0) {
                    //this.props.onError("No file", "Please select a file to share");
                    return [2 /*return*/];
                }
                file = this.props.fileElement.files[0];
                if (file.size <= 0) {
                    this.props.onError(file.name, "You choosed empty file");
                    return [2 /*return*/];
                }
                this.file = file;
                sendingId = "sending-" + this.props.sessionId;
                html = "\n            <div class=\"file-progress\" id=\"" + sendingId + "\">\n                <div class=\"fileinfo\">\n                    " + file.name + "(" + snippet_1.getCapacityLabel(file.size) + ")\n                </div>\n                <div class=\"progress\">\n                    <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n                </div>\n            </div>";
                $(this.props.fileSendingPanel).append(html);
                this.sendingElement = $("#" + sendingId);
                $progressElem = this.sendingElement.find(".progress-bar");
                this.props.sendFileMeta({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    sessionId: this.props.sessionId
                });
                chunkSize = 16384;
                fileReader = new FileReader();
                offset = 0;
                fileReader.addEventListener('error', function (error) {
                    _this.removeSelf();
                    _this.props.onError(file.name, "Error happened while reading ");
                });
                fileReader.addEventListener('abort', function (event) {
                    _this.removeSelf();
                    _this.props.onError(file.name, "Reading was aborted");
                });
                readSlice = function (o) {
                    var slice = file.slice(offset, o + chunkSize);
                    fileReader.readAsArrayBuffer(slice);
                };
                fileReader.addEventListener('load', function (e) {
                    var blob = e.target.result;
                    _this.props.sendFileData(_this.props.sessionId, blob);
                    offset += blob.byteLength;
                    //update progress
                    var percent = Math.floor((offset * 100) / file.size);
                    $progressElem.attr("aria-valuenow", percent);
                    $progressElem.css("width", percent + "%");
                    if (offset < file.size) {
                        setTimeout(function (_) {
                            readSlice(offset);
                        }, 100);
                        //readSlice(offset);
                    }
                    else {
                        _this.removeSelf();
                        //this.props.onFinished(file.name, `Sending finished`);
                        var time = TimeUtil_1.getCurTime();
                        var binary = '';
                        var bytes = new Uint8Array(blob);
                        var len = bytes.byteLength;
                        for (var i = 0; i < len; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var sender = new Blob(Array.from(binary));
                        var html_1 = "\n                    <div class=\"chat-message-group local\">\n                        <div class=\"chatmessage-wrapper\">\n                            <div class=\"chatmessage\" >\n                                <div class=\"replywrapper\">\n                                    <div class=\"messagecontent\">\n                                        <div class=\"fileinfo\">\n                                            <a href = \"" + URL.createObjectURL(sender) + "\" download = \"" + _this.file.name + "\" > " + _this.file.name + " (" + snippet_1.getCapacityLabel(_this.file.size) + ") </a>\n                                        </div>\n                                    </div>\n                                </div>\n                             </div >\n                             <div class=\"timestamp\" >" + time + "</div>\n                        </div>\n                    </div>\n                ";
                        $("#chatconversation").append(html_1);
                    }
                });
                readSlice(0);
                return [2 /*return*/];
            });
        });
    };
    FileSender.prototype.removeSelf = function () {
        this.sendingElement.remove();
    };
    return FileSender;
}());
exports.FileSender = FileSender;
//# sourceMappingURL=FileSender.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/file\\FileSender.js","/file")
},{"../util/TimeUtil":53,"../util/snippet":55,"buffer":25,"e/U+97":27}],44:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitsiCommandParam = void 0;
var JitsiCommandParam = /** @class */ (function () {
    function JitsiCommandParam() {
        this.attributes = {};
        this.children = [];
    }
    return JitsiCommandParam;
}());
exports.JitsiCommandParam = JitsiCommandParam;
//# sourceMappingURL=JitsiCommandParam.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/jitsi\\JitsiCommandParam.js","/jitsi")
},{"buffer":25,"e/U+97":27}],45:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitsiPrivateCommandQueue = exports.JitsiCommandQueue = void 0;
var JitsiCommandCallback = /** @class */ (function () {
    function JitsiCommandCallback() {
    }
    return JitsiCommandCallback;
}());
var JitsiCommandQueue = /** @class */ (function () {
    function JitsiCommandQueue() {
        this.callbacks = new Map();
    }
    JitsiCommandQueue.prototype.reset = function () {
        this.callbacks.clear();
    };
    JitsiCommandQueue.prototype.queueCommand = function (jitsiId, command, param, callback) {
        if (!this.callbacks.has(jitsiId)) {
            this.callbacks.set(jitsiId, []);
        }
        var cb = new JitsiCommandCallback();
        cb.command = command;
        cb.param = param;
        cb.callback = callback;
        this.callbacks.get(jitsiId).push(cb);
    };
    JitsiCommandQueue.prototype.executeQueuedCommands = function (jitsiId) {
        if (!this.callbacks.has(jitsiId))
            return;
        var cbs = this.callbacks.get(jitsiId);
        cbs.forEach(function (cb, index) {
            debugger;
            cb.callback(cb.param);
        });
        this.callbacks.delete(jitsiId);
    };
    return JitsiCommandQueue;
}());
exports.JitsiCommandQueue = JitsiCommandQueue;
var JitsiPrivateCommandCallback = /** @class */ (function () {
    function JitsiPrivateCommandCallback() {
    }
    return JitsiPrivateCommandCallback;
}());
var JitsiPrivateCommandQueue = /** @class */ (function () {
    function JitsiPrivateCommandQueue() {
        this.callbacks = new Map();
    }
    JitsiPrivateCommandQueue.prototype.reset = function () {
        this.callbacks.clear();
    };
    JitsiPrivateCommandQueue.prototype.queueCommand = function (jitsiId, command, message, callback) {
        if (!this.callbacks.has(jitsiId)) {
            this.callbacks.set(jitsiId, []);
        }
        var cb = new JitsiPrivateCommandCallback();
        cb.command = command;
        cb.message = message;
        cb.callback = callback;
        this.callbacks.get(jitsiId).push(cb);
    };
    JitsiPrivateCommandQueue.prototype.executeQueuedCommands = function (jitsiId) {
        if (!this.callbacks.has(jitsiId))
            return;
        var cbs = this.callbacks.get(jitsiId);
        cbs.forEach(function (cb, index) {
            cb.callback(jitsiId, cb.command, cb.message);
        });
        this.callbacks.delete(jitsiId);
    };
    return JitsiPrivateCommandQueue;
}());
exports.JitsiPrivateCommandQueue = JitsiPrivateCommandQueue;
//# sourceMappingURL=JitsiCommandQueue.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/jitsi\\JitsiCommandQueue.js","/jitsi")
},{"buffer":25,"e/U+97":27}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
/****************************************************************
  
          nPanelCount = 4

----------panelContainer--------------

    ---panel---       ---panel---
    |    1     |      |    2    |
    |__________|      |_________|

    ---panel---       ---panel---
    |    3     |      |    4    |
    |__________|      |_________|

-------------------------------------

         Buttons -  audio/videoMute, screenShare, Record, Chat
*****************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingUI = void 0;
var SettingDialog_1 = require("./components/SettingDialog");
var ChattingPanel_1 = require("./components/ChattingPanel");
var ParticipantListPanel_1 = require("./components/ParticipantListPanel");
var NotificationType_1 = require("./enum/NotificationType");
var AskDialog_1 = require("./components/AskDialog");
var ToolBar_1 = require("./components/ToolBar");
var MeetingDescriptionWidget_1 = require("./components/MeetingDescriptionWidget");
var VideoPanelGrid_1 = require("./components/VideoPanelGrid");
var PanelVideoState;
(function (PanelVideoState) {
    PanelVideoState["NoCamera"] = "no-camera";
    PanelVideoState["ScreenShare"] = "screen";
    PanelVideoState["Camera"] = "camera";
    PanelVideoState["VideoStreaming"] = "stream";
})(PanelVideoState || (PanelVideoState = {}));
var MeetingUI = /** @class */ (function () {
    function MeetingUI(meeting) {
        this.meeting = null;
        this.options = {
            hideToolbarOnMouseOut: false,
        };
        this.meeting = meeting;
        //toolbar
        var tProps = new ToolBar_1.ToolBarProps();
        tProps.toggleTileView = this.redrawGrid.bind(this);
        tProps.toggleVideoMute = this.meeting.OnToggleMuteMyVideo.bind(this.meeting);
        tProps.toggleAudioMute = this.meeting.OnToggleMuteMyAudio.bind(this.meeting);
        tProps.openChatting = this.openChatting.bind(this);
        tProps.toggleScreenShare = this.meeting.toggleScreenShare.bind(this.meeting);
        tProps.toggleRecording = this.meeting.toggleRecording.bind(this.meeting);
        tProps.toggleHandRaise = this.meeting.toggleHandRaise.bind(this.meeting);
        tProps.toggleMuteAll = this.meeting.toggleMuteAll.bind(this.meeting);
        tProps.toggleMuteAllVideo = this.meeting.toggleMuteAllVideo.bind(this.meeting);
        tProps.openSetting = this.showSettingDialog.bind(this);
        tProps.leaveMeeting = this.meeting.stop.bind(this.meeting);
        this.toolbar = new ToolBar_1.ToolBar(tProps);
        //chatting
        this.chattingWidget = new ChattingPanel_1.ChattingWidget();
        var props = new ChattingPanel_1.ChattingPanelProps();
        props.openCallback = this.redrawGrid.bind(this);
        props.sendChat = this.meeting.sendChatMessage.bind(this.meeting);
        props.sendPrivateChat = this.meeting.sendPrivateChatMessage.bind(this.meeting);
        props.sendFileMeta = this.meeting.sendFileMeta.bind(this.meeting);
        props.sendFileData = this.meeting.sendFileData.bind(this.meeting);
        props.onFileSendErrror = this.onFileSendError.bind(this);
        props.onFileSendFinished = this.onFileSendFinished.bind(this);
        props.onFileReceiveError = this.onFileReceiveError.bind(this);
        props.onFileReceiveFinished = this.onFileReceiveFinished.bind(this);
        props.showUnreadBadge = this.toolbar.showUnreadBadge.bind(this.toolbar);
        props.setUnreadCount = this.toolbar.setUnreadCount.bind(this.toolbar);
        this.chattingWidget.init(props);
        //list
        this.participantsListWidget = new ParticipantListPanel_1.ParticipantListWidget();
        var lProps = new ParticipantListPanel_1.ParticipantListPanelProps();
        lProps.onMuteCamera = this.meeting.muteUserVideo.bind(this.meeting);
        lProps.onMuteMic = this.meeting.muteUserAudio.bind(this.meeting);
        lProps.onMuteAll = this.meeting.toggleMuteAll.bind(this.meeting);
        lProps.givePermissionMic = this.meeting.givePermissionMic.bind(this.meeting);
        lProps.setHostControlMic = this.meeting.setHostControlMic.bind(this.meeting);
        lProps.setHostControlCamera = this.meeting.setHostControlCamera.bind(this.meeting);
        lProps.givePermissionCamera = this.meeting.givePermissionCamera.bind(this.meeting);
        lProps.toggleCopyJoiningInfo = this.meeting.toggleCopyJoiningInfo.bind(this.meeting);
        this.participantsListWidget.init(lProps);
        //meeting description
        this.meetingDescWidget = new MeetingDescriptionWidget_1.MeetingDescriptionWidget();
        //video grid
        var vProps = new VideoPanelGrid_1.VideoPanelGridProps();
        vProps.grantModeratorRole = this.meeting.grantModeratorRole.bind(this.meeting);
        vProps.kickParticipantOut = this.meeting.kickParticipantOut.bind(this.meeting);
        vProps.sendRemoteControlReply = this.meeting.sendRemoteControlReply.bind(this.meeting);
        vProps.muteMyAudio = this.meeting.muteMyAudio.bind(this.meeting);
        vProps.muteMyVideo = this.meeting.muteMyVideo.bind(this.meeting);
        vProps.muteUserAudio = this.meeting.muteUserAudio.bind(this.meeting);
        vProps.muteUserVideo = this.meeting.muteUserVideo.bind(this.meeting);
        vProps.openPrivateChat = this.chattingWidget.openPrivateChat.bind(this.chattingWidget);
        this.videoPanelGrid = new VideoPanelGrid_1.VideoPanelGrid(vProps);
        this.attachHandlers();
    }
    MeetingUI.prototype.attachHandlers = function () {
        var _this = this;
        $(document).ready(function () {
            //hover effect
            if (_this.options.hideToolbarOnMouseOut) {
                $("#content").hover(function (_) {
                    _this.toolbar.fadeIn();
                    _this.meetingDescWidget.fadeIn();
                }, function (_) {
                    _this.toolbar.fadeOut();
                    _this.meetingDescWidget.fadeOut();
                });
            }
        });
        window.addEventListener('unload', function () {
            _this.meeting.forceStop();
        });
    };
    MeetingUI.prototype.updatePermissionMic = function (permission) {
        this.participantsListWidget.updatePermissionMic(permission);
    };
    MeetingUI.prototype.updatePermissionCamera = function (permission) {
        this.participantsListWidget.updatePermissionCamera(permission);
    };
    MeetingUI.prototype.updateByRole = function (isHost) {
        var isWebinar = this.meeting.roomInfo.IsWebinar;
        /*if (isWebinar && !isHost)
            this.showParticipantListButton(false);
        else
            this.showParticipantListButton(true);*/
        //this.participantsListWidget.updateByRole(isHost && this.meeting.roomInfo.IsControlAllowed); //commented by matvey
        this.participantsListWidget.updateByRole(isHost);
    };
    MeetingUI.prototype.setIscontrolAllowed = function (isControl) {
        this.participantsListWidget.setIscontrolAllowed(isControl);
    };
    MeetingUI.prototype.setHost = function (setHost) {
        this.participantsListWidget.setHost(setHost);
    };
    MeetingUI.prototype.setIsHostControlSelfMic = function (isSetHostControlMic) {
        this.participantsListWidget.setIsHostControlSelfMic(isSetHostControlMic);
    };
    MeetingUI.prototype.setIsHostControlSelfCamera = function (isSetHostControlCamera) {
        this.participantsListWidget.setIsHostControlSelfCamera(isSetHostControlCamera);
    };
    MeetingUI.prototype.updateJoiningInfo = function () {
        this.participantsListWidget.updateJoiningInfo("https://" + window.location.host + "/lobby/" + this.meeting.roomInfo.Id);
    };
    //chattting
    MeetingUI.prototype.openChatting = function (o) {
        if (this.chattingWidget)
            this.chattingWidget.open(o);
    };
    MeetingUI.prototype.redrawGrid = function () {
        if (this.videoPanelGrid)
            this.videoPanelGrid.redrawGrid();
    };
    MeetingUI.prototype.showSettingDialog = function () {
        var settingDialog = new SettingDialog_1.SettingDialog();
        var props = new SettingDialog_1.SettingDialogProps();
        props.curDevices = this.meeting.getActiveDevices();
        props.onDeviceChange = this.meeting.onDeviceChange.bind(this.meeting);
        settingDialog.init(props);
        settingDialog.show();
    };
    //add, remove participant to and from list
    MeetingUI.prototype.addParticipant = function (jitsiId, name, me, isMicDisable, isVideoDisable, muteCamera, muteMic) {
        this.participantsListWidget.addParticipant(jitsiId, name, me, isMicDisable, isVideoDisable, muteCamera, muteMic);
    };
    MeetingUI.prototype.removeParticipant = function (jitsiId) {
        this.participantsListWidget.removeParticipant(jitsiId);
    };
    MeetingUI.prototype.showParticipantListButton = function (show) {
        $("#open-participants-toggle").css("visibility", show ? "visible" : "hidden");
    };
    //file send
    MeetingUI.prototype.onFileSendError = function (filename, message) {
        this.notification_warning(filename, message, NotificationType_1.NotificationType.FileTransfer);
    };
    MeetingUI.prototype.onFileSendFinished = function (filename, message) {
        this.notification(filename, message, NotificationType_1.NotificationType.FileTransfer);
    };
    //file receive
    MeetingUI.prototype.onFileReceiveError = function (filename, message) {
        this.notification_warning(filename, message, NotificationType_1.NotificationType.FileReceive);
    };
    MeetingUI.prototype.onFileReceiveFinished = function (filename, message) {
        this.notification(filename, message, NotificationType_1.NotificationType.FileReceive);
    };
    MeetingUI.prototype.Log = function (message) {
        return;
        if ($("#logPanel").length <= 0) {
            var logPanel = "<div id=\"logPanel\" style=\"position: fixed;width: 300px;height: 100px;background: black;top:0px;left: 0px;\n                                z-index: 100000;border-right: 1px dashed rebeccapurple;border-bottom: 1px dashed rebeccapurple;overflow-y:auto;\"></div>";
            $("body").append(logPanel);
        }
        var colors = ['blanchedalmond', 'hotpink', 'chartreuse', 'coral', 'gold', 'greenyellow', 'violet', 'wheat'];
        var color = colors[Math.floor(Math.random() * 100) % colors.length];
        var messageItm = "<div style=\"color:" + color + ";\"><span>" + message + "</span></div>";
        $("#logPanel").append(messageItm);
        $('#logPanel').scroll();
        $("#logPanel").animate({
            scrollTop: 20000
        }, 200);
    };
    MeetingUI.prototype.askDialog = function (title, message, icon, allowCallback, denyCallback, param) {
        var props = new AskDialog_1.AskDialogProps();
        props.title = title;
        props.message = message;
        props.icon = icon;
        props.isWarning = true;
        props.allowCallback = allowCallback;
        props.denyCallback = denyCallback;
        props.param = param;
        var dlg = new AskDialog_1.AskDialog(props);
        dlg.show();
    };
    MeetingUI.prototype.notification = function (title, message, icon) {
        if (!icon)
            icon = NotificationType_1.NotificationType.Info;
        $.toast({
            heading: title,
            text: message,
            showHideTransition: 'slide',
            hideAfter: 7000,
            bgColor: "#164157",
            icon: icon,
            stack: 5,
            loader: false,
        });
    };
    MeetingUI.prototype.notification_warning = function (title, message, icon) {
        if (!icon)
            icon = NotificationType_1.NotificationType.Warning;
        $.toast({
            heading: title,
            text: message,
            showHideTransition: 'slide',
            hideAfter: 7000,
            bgColor: "#800000",
            icon: icon,
            stack: 5,
            loader: false
        });
    };
    return MeetingUI;
}());
exports.MeetingUI = MeetingUI;
//# sourceMappingURL=meeting_ui.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/meeting_ui.js","/")
},{"./components/AskDialog":28,"./components/ChattingPanel":29,"./components/MeetingDescriptionWidget":30,"./components/ParticipantListPanel":31,"./components/SettingDialog":32,"./components/ToolBar":33,"./components/VideoPanelGrid":35,"./enum/NotificationType":39,"buffer":25,"e/U+97":27}],47:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveDevices = void 0;
var ActiveDevices = /** @class */ (function () {
    function ActiveDevices() {
    }
    return ActiveDevices;
}());
exports.ActiveDevices = ActiveDevices;
//# sourceMappingURL=ActiveDevices.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/model\\ActiveDevices.js","/model")
},{"buffer":25,"e/U+97":27}],48:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BGMeetingInfo = exports.BGMeeting = exports.BGMeetingParticipant = void 0;
/*
callbackUrl: "http://"
conferenceId: 1234
conferenceName: "Building A Bitcoin Crypto application "
isControlAllowed: true | false              // Host can control Audio and Video of Participants
isRecordingRequired: true | false           // Approval required for recording the meeting
isMultipleSharingAllowed: true | false      // Allow multiple participants to screen share
isScreenShareRequired: true | false         // Approval required to present/share the screen
isOpened: true | false                      // Allow external users to join meeting using link
channelType : : "Both |  AudioOnly | VideoOnly"
description: "c# application that works on dotnet framework, and bouncy castle crypto libraries"
duration: "2021-05-18T09:19:57.654Z"
endDateTime: "2021-05-18T09:19:57.654Z"
participants: (2) [{…}, {…}]
refGuid: "30251003"
startDateTime: "2021-05-18T09:19:57.654Z"
*/
//src/DbModels/Participants.cs
var BGMeetingParticipant = /** @class */ (function () {
    function BGMeetingParticipant() {
    }
    return BGMeetingParticipant;
}());
exports.BGMeetingParticipant = BGMeetingParticipant;
//src/DbModels/Meeting.cs
//comes from api
var BGMeeting = /** @class */ (function () {
    function BGMeeting() {
    }
    return BGMeeting;
}());
exports.BGMeeting = BGMeeting;
//src/Model/LiveMeeting.cs/MeetingInfo
//comes from BGMeeting SignalR Server
var BGMeetingInfo = /** @class */ (function () {
    function BGMeetingInfo() {
    }
    return BGMeetingInfo;
}());
exports.BGMeetingInfo = BGMeetingInfo;
//# sourceMappingURL=BGMeeting.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/model\\BGMeeting.js","/model")
},{"buffer":25,"e/U+97":27}],49:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
var UserInfo = /** @class */ (function () {
    function UserInfo() {
        this.Id = ""; //connectionId
        //BG_Id: string;
        this.Jitsi_Id = "";
        this.Name = "";
        this.IsHost = false;
        this.IsAnonymous = false;
        this.mediaPolicy = { useCamera: false, useMic: false };
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
//# sourceMappingURL=BGUser.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/model\\BGUser.js","/model")
},{"buffer":25,"e/U+97":27}],50:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputMediaPolicy = void 0;
var InputMediaPolicy = /** @class */ (function () {
    function InputMediaPolicy() {
    }
    return InputMediaPolicy;
}());
exports.InputMediaPolicy = InputMediaPolicy;
//# sourceMappingURL=InputDevicePolicy.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/model\\InputDevicePolicy.js","/model")
},{"buffer":25,"e/U+97":27}],51:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToUserViaBG = exports.UserToBG = exports.BGtoUser = void 0;
/**
 * **************************************************************************
 *
 *              should match with /src/Server/Protocol/BGtoUser
 *
 * **************************************************************************
 */
var BGtoUser;
(function (BGtoUser) {
    BGtoUser["ROOM_CREATED"] = "created";
    BGtoUser["ROOM_INFO"] = "room_info";
    BGtoUser["ROOM_JOINED"] = "joined";
    BGtoUser["ROOM_USER_JOINED"] = "user_joined";
    BGtoUser["ROOM_LEFT"] = "left";
    BGtoUser["ERROR"] = "error";
    BGtoUser["SIGNALING"] = "SignalingMessage";
})(BGtoUser = exports.BGtoUser || (exports.BGtoUser = {}));
;
/**
 * **************************************************************************
 *
 *              should match with /src/Server/Protocol/UserToBG
 *
 * **************************************************************************
 */
var UserToBG;
(function (UserToBG) {
})(UserToBG = exports.UserToBG || (exports.UserToBG = {}));
var UserToUserViaBG;
(function (UserToUserViaBG) {
})(UserToUserViaBG = exports.UserToUserViaBG || (exports.UserToUserViaBG = {}));
//# sourceMappingURL=bg.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/protocol\\bg.js","/protocol")
},{"buffer":25,"e/U+97":27}],52:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
/* SHOULD not exist same value in two enums
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitsiPrivateCommand = exports.JitsiCommand = void 0;
var JitsiCommand;
(function (JitsiCommand) {
    JitsiCommand["GRANT_HOST_ROLE"] = "grant-host";
    JitsiCommand["MUTE_AUDIO"] = "mute_audio";
    JitsiCommand["MUTE_VIDEO"] = "mute_video";
    JitsiCommand["ALLOW_CAMERA"] = "allow_video";
    JitsiCommand["ALLOW_MIC"] = "allow_audio";
    JitsiCommand["ALLOW_VIDEO"] = "allow_video";
    JitsiCommand["INIT_MEDIA_POLICY"] = "init_media_policy";
    JitsiCommand["ASK_RECORDING"] = "ask-recording";
    JitsiCommand["ASK_SCREENSHARE"] = "ask-screenshare";
    JitsiCommand["ASK_MULTISHARE"] = "ask-multishare";
    JitsiCommand["ASK_HANDRAISE"] = "ask-handraise";
    JitsiCommand["FILE_META"] = "file_meta";
    JitsiCommand["FILE_SLICE"] = "file_slice";
    JitsiCommand["BIZ_ID"] = "biz_id";
    JitsiCommand["KICK_OUT"] = "kick_out";
    JitsiCommand["MUTE_All_AUDIO"] = "mute_all_audio";
    JitsiCommand["MUTE_All_VIDEO"] = "mute_all_video";
    JitsiCommand["SET_HOSTCONTORLSELF_MIC"] = "set_hostcontrolself_mic";
})(JitsiCommand = exports.JitsiCommand || (exports.JitsiCommand = {}));
;
var JitsiPrivateCommand;
(function (JitsiPrivateCommand) {
    JitsiPrivateCommand["MEDIA_POLICY"] = "media_policy";
    JitsiPrivateCommand["ALLOW_RECORDING"] = "allow_recording";
    JitsiPrivateCommand["ALLOW_SCREENSHARE"] = "allow_screenshare";
    JitsiPrivateCommand["ALLOW_HANDRAISE"] = "allow_handraise";
    JitsiPrivateCommand["SET_PERMISSION_MIC"] = "set_permission_mic";
    JitsiPrivateCommand["SET_PERMISSION_CAMERA"] = "set_permission_camera";
    JitsiPrivateCommand["PRIVATE_CAHT"] = "private_chat";
})(JitsiPrivateCommand = exports.JitsiPrivateCommand || (exports.JitsiPrivateCommand = {}));
//# sourceMappingURL=jitsi.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/protocol\\jitsi.js","/protocol")
},{"buffer":25,"e/U+97":27}],53:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTimestamp = exports.getCurTime = exports.TsToDateFormat = void 0;
function TsToDateFormat(tsInMillisecond) {
    var sec = Math.floor(tsInMillisecond / 1000);
    // Hours part from the timestamp
    var hours = Math.floor(sec / 3600);
    // Minutes part from the timestamp
    var minutes = "0" + (Math.floor(sec / 60) - (hours * 60));
    // Seconds part from the timestamp
    var seconds = "0" + (sec % 60);
    // Will display time in 10:30:23 format
    var formattedTime = ("0" + hours).substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}
exports.TsToDateFormat = TsToDateFormat;
function getCurTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var m_2 = ("0" + m).slice(-2);
    var h_2 = ("0" + h).slice(-2);
    var time = h_2 + ":" + m_2;
    return time;
}
exports.getCurTime = getCurTime;
function getCurrentTimestamp() {
    var currentDate = new Date();
    var timestamp = currentDate.getTime();
    return timestamp;
}
exports.getCurrentTimestamp = getCurrentTimestamp;
//# sourceMappingURL=TimeUtil.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util\\TimeUtil.js","/util")
},{"buffer":25,"e/U+97":27}],54:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSessonId = exports.randomNumber = void 0;
var TimeUtil_1 = require("./TimeUtil");
function randomNumber() {
    return randomFromInterval(1, 100000000);
}
exports.randomNumber = randomNumber;
function randomSessonId() {
    return TimeUtil_1.getCurrentTimestamp() + "-" + randomNumber();
}
exports.randomSessonId = randomSessonId;
function randomFromInterval(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
/*interface ProvideFeedbackFormProps {
    feedbackNature: FormikDropdownProps
    waybillNumber: FormikDropdownProps
    provideFeedback: FormikDropdownProps
    editorState?: string
    attachments?: string[]
}


interface FormikDropdownProps {
    id: number
    value: string
}

const values: ProvideFeedbackFormProps = {};
const customFields: string[] = [];

for (const property in values) {
    const customField = values[property as keyof ProvideFeedbackFormProps]
    customFields.push(customField)
}*/ 
//# sourceMappingURL=random.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util\\random.js","/util")
},{"./TimeUtil":53,"buffer":25,"e/U+97":27}],55:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCapacityLabel = exports.random = exports.avatarName = exports.stripHTMLTags = void 0;
function stripHTMLTags(text) {
    return text.replace(/(<([^>]+)>)/gi, "");
}
exports.stripHTMLTags = stripHTMLTags;
/*
 ajax example
 $.ajax({
        url: "http://localhost/myproject/ajax_url",
        type: "POST",
        data: $("#my-form").serialize(),
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(){}
});
 
 
 */
function avatarName(name) {
    var unknown = "?";
    if (!name || name.length <= 0)
        return unknown;
    var nameParts = name.split(" ");
    var res = "";
    nameParts.forEach(function (p) {
        if (p.length > 0)
            res += p[0];
    });
    if (res.length <= 0)
        unknown;
    return res.toUpperCase().substr(0, 2);
}
exports.avatarName = avatarName;
var random = function (min, max) { return Math.floor(Math.random() * (max - min)) + min; };
exports.random = random;
function getCapacityLabel(bytes) {
    if (bytes < 1024)
        return bytes + " bytes";
    else if (bytes < 1024 * 1024) {
        var kb = bytes / 1024;
        return kb.toFixed(2) + " KB";
    }
    else {
        var mb = bytes / (1024 * 1024);
        return mb.toFixed(2) + " MB";
    }
}
exports.getCapacityLabel = getCapacityLabel;
//# sourceMappingURL=snippet.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util\\snippet.js","/util")
},{"buffer":25,"e/U+97":27}]},{},[41])