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
var signalR = require("@microsoft/signalr");
var connection = new signalR.HubConnectionBuilder().withUrl("/BizGazeMeetingServer").build();
var meetingTable = document.getElementById('meetingTable');
var connectionStatusMessage = document.getElementById('connectionStatusMessage');
var roomNameTxt = document.getElementById('meetingTitleTxt');
var createRoomBtn = document.getElementById('createMeetingBtn');
var hasRoomJoined = false;
$(meetingTable).DataTable({
    columns: [
        { data: 'RoomId', "width": "30%" },
        { data: 'Name', "width": "30%" },
        { data: 'IsControlAllowed', "width": "5%" },
        { data: 'IsRecordingRequired', "width": "5%" },
        { data: 'IsMultipleSharingAllowed', "width": "5%" },
        { data: 'IsScreenShareRequired', "width": "5%" },
        { data: 'IsOpened', "width": "5%" },
        { data: 'Button', "width": "15%" }
    ],
    "lengthChange": false,
    "searching": false,
    "language": {
        "emptyTable": "No meeting available"
    },
    "info": false
});
// Connect to the signaling server
connection.start().then(function () {
    connection.on('updateRoom', function (data) {
        try {
            var obj = JSON.parse(data);
            $(meetingTable).DataTable().clear().rows.add(obj).draw();
        }
        catch (err) { }
    });
    connection.on('created', function (roomId, clientInfoMsg) {
        try {
            console.log('Created room', roomId);
            connectionStatusMessage.innerText = 'You created Room ' + roomId + '. Waiting for participants...';
        }
        catch (err) { }
    });
    connection.on('error', function (message) {
        alert(message);
    });
    //Get room list.
    connection.invoke("GetRoomInfo").catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});
$(createRoomBtn).click(function () {
    var meetingTitle = roomNameTxt.value;
    createMeeting(meetingTitle);
});
$('#meetingTable tbody').on('click', 'button', function () {
    if (hasRoomJoined) {
        alert('You already joined the room. Please use a new tab or window.');
    }
    else {
        var rowdata = $(meetingTable).DataTable().row($(this).parents('tr')).data();
        var meetingId = parseInt(rowdata.RoomId);
        var isOpened = rowdata.IsOpened;
        var userId = parseInt($(this).attr('id'));
        if (meetingId === NaN)
            return;
        if (isOpened == true) {
            if (!userId)
                joinMeetingAsAnonymous(meetingId);
            else
                joinMeeting(meetingId, userId);
        }
        else if (isOpened == false) {
            if (userId !== NaN)
                joinMeeting(meetingId, userId);
        }
    }
});
function createMeeting(meetingTitle) {
    connection.invoke("CreateRoom", meetingTitle, "").catch(function (err) {
        return console.error(err.toString());
    });
}
function joinMeeting(meetingId, userId) {
    location.href = "/lobby/" + meetingId + "/" + userId;
}
function joinMeetingAsAnonymous(meetingId) {
    location.href = "/lobby/" + meetingId;
}
//# sourceMappingURL=meeting_list.js.map
}).call(this,require("e/U+97"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_89ad63eb.js","/")
},{"@microsoft/signalr":23,"buffer":25,"e/U+97":27}]},{},[28])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkU6XFxqaXRzaVxcd29yayhyYXpvcilcXGJpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pXFxiaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbFxcdmlkZW9jb25mXFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9BYm9ydENvbnRyb2xsZXIuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9EZWZhdWx0SHR0cENsaWVudC5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL0RlZmF1bHRSZWNvbm5lY3RQb2xpY3kuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9FcnJvcnMuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9GZXRjaEh0dHBDbGllbnQuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9IYW5kc2hha2VQcm90b2NvbC5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL0h0dHBDbGllbnQuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9IdHRwQ29ubmVjdGlvbi5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL0h1YkNvbm5lY3Rpb24uanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9IdWJDb25uZWN0aW9uQnVpbGRlci5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL0lIdWJQcm90b2NvbC5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL0lMb2dnZXIuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9JVHJhbnNwb3J0LmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9janMvSnNvbkh1YlByb3RvY29sLmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9janMvTG9nZ2Vycy5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL0xvbmdQb2xsaW5nVHJhbnNwb3J0LmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9janMvU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL1N1YmplY3QuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2Nqcy9UZXh0TWVzc2FnZUZvcm1hdC5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL1V0aWxzLmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9janMvV2ViU29ja2V0VHJhbnNwb3J0LmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9janMvWGhySHR0cENsaWVudC5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvY2pzL2luZGV4LmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkU6L2ppdHNpL3dvcmsocmF6b3IpL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pL2JpemdhemVfbWVldGluZy1tYXN0ZXIobGF0ZXN0LWZyb20tZ3lvbmdib20pX2luX3RyaWFsL3ZpZGVvY29uZi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiRTovaml0c2kvd29yayhyYXpvcikvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSkvYml6Z2F6ZV9tZWV0aW5nLW1hc3RlcihsYXRlc3QtZnJvbS1neW9uZ2JvbSlfaW5fdHJpYWwvdmlkZW9jb25mL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJFOi9qaXRzaS93b3JrKHJhem9yKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKS9iaXpnYXplX21lZXRpbmctbWFzdGVyKGxhdGVzdC1mcm9tLWd5b25nYm9tKV9pbl90cmlhbC92aWRlb2NvbmYvc2NyaXB0cy9idWlsZC9mYWtlXzg5YWQ2M2ViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcHNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDejdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIFJvdWdoIHBvbHlmaWxsIG9mIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9BYm9ydENvbnRyb2xsZXJcbi8vIFdlIGRvbid0IGFjdHVhbGx5IGV2ZXIgdXNlIHRoZSBBUEkgYmVpbmcgcG9seWZpbGxlZCwgd2UgYWx3YXlzIHVzZSB0aGUgcG9seWZpbGwgYmVjYXVzZVxuLy8gaXQncyBhIHZlcnkgbmV3IEFQSSByaWdodCBub3cuXG4vLyBOb3QgZXhwb3J0ZWQgZnJvbSBpbmRleC5cbi8qKiBAcHJpdmF0ZSAqL1xudmFyIEFib3J0Q29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBYm9ydENvbnRyb2xsZXIoKSB7XG4gICAgICAgIHRoaXMuaXNBYm9ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25hYm9ydCA9IG51bGw7XG4gICAgfVxuICAgIEFib3J0Q29udHJvbGxlci5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Fib3J0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNBYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uYWJvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFib3J0Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2lnbmFsXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFib3J0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiYWJvcnRlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNBYm9ydGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQWJvcnRDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuQWJvcnRDb250cm9sbGVyID0gQWJvcnRDb250cm9sbGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWJvcnRDb250cm9sbGVyLmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXFxcXEFib3J0Q29udHJvbGxlci5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFcnJvcnNfMSA9IHJlcXVpcmUoXCIuL0Vycm9yc1wiKTtcbnZhciBGZXRjaEh0dHBDbGllbnRfMSA9IHJlcXVpcmUoXCIuL0ZldGNoSHR0cENsaWVudFwiKTtcbnZhciBIdHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi9IdHRwQ2xpZW50XCIpO1xudmFyIFV0aWxzXzEgPSByZXF1aXJlKFwiLi9VdGlsc1wiKTtcbnZhciBYaHJIdHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi9YaHJIdHRwQ2xpZW50XCIpO1xuLyoqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdHRwQ2xpZW50fS4gKi9cbnZhciBEZWZhdWx0SHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRGVmYXVsdEh0dHBDbGllbnQsIF9zdXBlcik7XG4gICAgLyoqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuRGVmYXVsdEh0dHBDbGllbnR9LCB1c2luZyB0aGUgcHJvdmlkZWQge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5JTG9nZ2VyfSB0byBsb2cgbWVzc2FnZXMuICovXG4gICAgZnVuY3Rpb24gRGVmYXVsdEh0dHBDbGllbnQobG9nZ2VyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggIT09IFwidW5kZWZpbmVkXCIgfHwgVXRpbHNfMS5QbGF0Zm9ybS5pc05vZGUpIHtcbiAgICAgICAgICAgIF90aGlzLmh0dHBDbGllbnQgPSBuZXcgRmV0Y2hIdHRwQ2xpZW50XzEuRmV0Y2hIdHRwQ2xpZW50KGxvZ2dlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBfdGhpcy5odHRwQ2xpZW50ID0gbmV3IFhockh0dHBDbGllbnRfMS5YaHJIdHRwQ2xpZW50KGxvZ2dlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB1c2FibGUgSHR0cENsaWVudCBmb3VuZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBEZWZhdWx0SHR0cENsaWVudC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIC8vIENoZWNrIHRoYXQgYWJvcnQgd2FzIG5vdCBzaWduYWxlZCBiZWZvcmUgY2FsbGluZyBzZW5kXG4gICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsICYmIHJlcXVlc3QuYWJvcnRTaWduYWwuYWJvcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcnNfMS5BYm9ydEVycm9yKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVxdWVzdC5tZXRob2QpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyBtZXRob2QgZGVmaW5lZC5cIikpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVxdWVzdC51cmwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJObyB1cmwgZGVmaW5lZC5cIikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuc2VuZChyZXF1ZXN0KTtcbiAgICB9O1xuICAgIERlZmF1bHRIdHRwQ2xpZW50LnByb3RvdHlwZS5nZXRDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0Q29va2llU3RyaW5nKHVybCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmYXVsdEh0dHBDbGllbnQ7XG59KEh0dHBDbGllbnRfMS5IdHRwQ2xpZW50KSk7XG5leHBvcnRzLkRlZmF1bHRIdHRwQ2xpZW50ID0gRGVmYXVsdEh0dHBDbGllbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EZWZhdWx0SHR0cENsaWVudC5qcy5tYXBcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1xcXFxEZWZhdWx0SHR0cENsaWVudC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyAwLCAyLCAxMCwgMzAgc2Vjb25kIGRlbGF5cyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHRzLlxudmFyIERFRkFVTFRfUkVUUllfREVMQVlTX0lOX01JTExJU0VDT05EUyA9IFswLCAyMDAwLCAxMDAwMCwgMzAwMDAsIG51bGxdO1xuLyoqIEBwcml2YXRlICovXG52YXIgRGVmYXVsdFJlY29ubmVjdFBvbGljeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZhdWx0UmVjb25uZWN0UG9saWN5KHJldHJ5RGVsYXlzKSB7XG4gICAgICAgIHRoaXMucmV0cnlEZWxheXMgPSByZXRyeURlbGF5cyAhPT0gdW5kZWZpbmVkID8gcmV0cnlEZWxheXMuY29uY2F0KFtudWxsXSkgOiBERUZBVUxUX1JFVFJZX0RFTEFZU19JTl9NSUxMSVNFQ09ORFM7XG4gICAgfVxuICAgIERlZmF1bHRSZWNvbm5lY3RQb2xpY3kucHJvdG90eXBlLm5leHRSZXRyeURlbGF5SW5NaWxsaXNlY29uZHMgPSBmdW5jdGlvbiAocmV0cnlDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJldHJ5RGVsYXlzW3JldHJ5Q29udGV4dC5wcmV2aW91c1JldHJ5Q291bnRdO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmF1bHRSZWNvbm5lY3RQb2xpY3k7XG59KCkpO1xuZXhwb3J0cy5EZWZhdWx0UmVjb25uZWN0UG9saWN5ID0gRGVmYXVsdFJlY29ubmVjdFBvbGljeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlZmF1bHRSZWNvbm5lY3RQb2xpY3kuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcRGVmYXVsdFJlY29ubmVjdFBvbGljeS5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKiBFcnJvciB0aHJvd24gd2hlbiBhbiBIVFRQIHJlcXVlc3QgZmFpbHMuICovXG52YXIgSHR0cEVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIdHRwRXJyb3IsIF9zdXBlcik7XG4gICAgLyoqIENvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2Ugb2Yge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdHRwRXJyb3J9LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yTWVzc2FnZSBBIGRlc2NyaXB0aXZlIGVycm9yIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c0NvZGUgVGhlIEhUVFAgc3RhdHVzIGNvZGUgcmVwcmVzZW50ZWQgYnkgdGhpcyBlcnJvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIdHRwRXJyb3IoZXJyb3JNZXNzYWdlLCBzdGF0dXNDb2RlKSB7XG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRydWVQcm90byA9IF9uZXdUYXJnZXQucHJvdG90eXBlO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGVycm9yTWVzc2FnZSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGU7XG4gICAgICAgIC8vIFdvcmthcm91bmQgaXNzdWUgaW4gVHlwZXNjcmlwdCBjb21waWxlclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzOTY1I2lzc3VlY29tbWVudC0yNzg1NzAyMDBcbiAgICAgICAgX3RoaXMuX19wcm90b19fID0gdHJ1ZVByb3RvO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIdHRwRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkh0dHBFcnJvciA9IEh0dHBFcnJvcjtcbi8qKiBFcnJvciB0aHJvd24gd2hlbiBhIHRpbWVvdXQgZWxhcHNlcy4gKi9cbnZhciBUaW1lb3V0RXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRpbWVvdXRFcnJvciwgX3N1cGVyKTtcbiAgICAvKiogQ29uc3RydWN0cyBhIG5ldyBpbnN0YW5jZSBvZiB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLlRpbWVvdXRFcnJvcn0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JNZXNzYWdlIEEgZGVzY3JpcHRpdmUgZXJyb3IgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBUaW1lb3V0RXJyb3IoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZSA9PT0gdm9pZCAwKSB7IGVycm9yTWVzc2FnZSA9IFwiQSB0aW1lb3V0IG9jY3VycmVkLlwiOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB0cnVlUHJvdG8gPSBfbmV3VGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBlcnJvck1lc3NhZ2UpIHx8IHRoaXM7XG4gICAgICAgIC8vIFdvcmthcm91bmQgaXNzdWUgaW4gVHlwZXNjcmlwdCBjb21waWxlclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzOTY1I2lzc3VlY29tbWVudC0yNzg1NzAyMDBcbiAgICAgICAgX3RoaXMuX19wcm90b19fID0gdHJ1ZVByb3RvO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBUaW1lb3V0RXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLlRpbWVvdXRFcnJvciA9IFRpbWVvdXRFcnJvcjtcbi8qKiBFcnJvciB0aHJvd24gd2hlbiBhbiBhY3Rpb24gaXMgYWJvcnRlZC4gKi9cbnZhciBBYm9ydEVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBYm9ydEVycm9yLCBfc3VwZXIpO1xuICAgIC8qKiBDb25zdHJ1Y3RzIGEgbmV3IGluc3RhbmNlIG9mIHtAbGluayBBYm9ydEVycm9yfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2UgQSBkZXNjcmlwdGl2ZSBlcnJvciBtZXNzYWdlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFib3J0RXJyb3IoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZSA9PT0gdm9pZCAwKSB7IGVycm9yTWVzc2FnZSA9IFwiQW4gYWJvcnQgb2NjdXJyZWQuXCI7IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRydWVQcm90byA9IF9uZXdUYXJnZXQucHJvdG90eXBlO1xuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGVycm9yTWVzc2FnZSkgfHwgdGhpcztcbiAgICAgICAgLy8gV29ya2Fyb3VuZCBpc3N1ZSBpbiBUeXBlc2NyaXB0IGNvbXBpbGVyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM5NjUjaXNzdWVjb21tZW50LTI3ODU3MDIwMFxuICAgICAgICBfdGhpcy5fX3Byb3RvX18gPSB0cnVlUHJvdG87XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFib3J0RXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnRzLkFib3J0RXJyb3IgPSBBYm9ydEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXJyb3JzLmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXFxcXEVycm9ycy5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFcnJvcnNfMSA9IHJlcXVpcmUoXCIuL0Vycm9yc1wiKTtcbnZhciBIdHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi9IdHRwQ2xpZW50XCIpO1xudmFyIElMb2dnZXJfMSA9IHJlcXVpcmUoXCIuL0lMb2dnZXJcIik7XG52YXIgVXRpbHNfMSA9IHJlcXVpcmUoXCIuL1V0aWxzXCIpO1xudmFyIEZldGNoSHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRmV0Y2hIdHRwQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZldGNoSHR0cENsaWVudChsb2dnZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICBpZiAodHlwZW9mIGZldGNoID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBpZ25vcmUgdGhlIGR5bmFtaWMgcmVxdWlyZSBpbiB3ZWJwYWNrIGJ1aWxkcyB3ZSBuZWVkIHRvIGRvIHRoaXMgbWFnaWNcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IFRTIGRvZXNuJ3Qga25vdyBhYm91dCB0aGVzZSBuYW1lc1xuICAgICAgICAgICAgdmFyIHJlcXVpcmVGdW5jID0gdHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gPT09IFwiZnVuY3Rpb25cIiA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIDogcmVxdWlyZTtcbiAgICAgICAgICAgIC8vIENvb2tpZXMgYXJlbid0IGF1dG9tYXRpY2FsbHkgaGFuZGxlZCBpbiBOb2RlIHNvIHdlIG5lZWQgdG8gYWRkIGEgQ29va2llSmFyIHRvIHByZXNlcnZlIGNvb2tpZXMgYWNyb3NzIHJlcXVlc3RzXG4gICAgICAgICAgICBfdGhpcy5qYXIgPSBuZXcgKHJlcXVpcmVGdW5jKFwidG91Z2gtY29va2llXCIpKS5Db29raWVKYXIoKTtcbiAgICAgICAgICAgIF90aGlzLmZldGNoVHlwZSA9IHJlcXVpcmVGdW5jKFwibm9kZS1mZXRjaFwiKTtcbiAgICAgICAgICAgIC8vIG5vZGUtZmV0Y2ggZG9lc24ndCBoYXZlIGEgbmljZSBBUEkgZm9yIGdldHRpbmcgYW5kIHNldHRpbmcgY29va2llc1xuICAgICAgICAgICAgLy8gZmV0Y2gtY29va2llIHdpbGwgd3JhcCBhIGZldGNoIGltcGxlbWVudGF0aW9uIHdpdGggYSBkZWZhdWx0IENvb2tpZUphciBvciBhIHByb3ZpZGVkIG9uZVxuICAgICAgICAgICAgX3RoaXMuZmV0Y2hUeXBlID0gcmVxdWlyZUZ1bmMoXCJmZXRjaC1jb29raWVcIikoX3RoaXMuZmV0Y2hUeXBlLCBfdGhpcy5qYXIpO1xuICAgICAgICAgICAgLy8gTm9kZSBuZWVkcyBFdmVudExpc3RlbmVyIG1ldGhvZHMgb24gQWJvcnRDb250cm9sbGVyIHdoaWNoIG91ciBjdXN0b20gcG9seWZpbGwgZG9lc24ndCBwcm92aWRlXG4gICAgICAgICAgICBfdGhpcy5hYm9ydENvbnRyb2xsZXJUeXBlID0gcmVxdWlyZUZ1bmMoXCJhYm9ydC1jb250cm9sbGVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuZmV0Y2hUeXBlID0gZmV0Y2guYmluZChzZWxmKTtcbiAgICAgICAgICAgIF90aGlzLmFib3J0Q29udHJvbGxlclR5cGUgPSBBYm9ydENvbnRyb2xsZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICBGZXRjaEh0dHBDbGllbnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYWJvcnRDb250cm9sbGVyLCBlcnJvciwgdGltZW91dElkLCBtc1RpbWVvdXQsIHJlc3BvbnNlLCBlXzEsIGNvbnRlbnQsIHBheWxvYWQ7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBhYm9ydCB3YXMgbm90IHNpZ25hbGVkIGJlZm9yZSBjYWxsaW5nIHNlbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsICYmIHJlcXVlc3QuYWJvcnRTaWduYWwuYWJvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcnNfMS5BYm9ydEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIGRlZmluZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LnVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHVybCBkZWZpbmVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlciA9IG5ldyB0aGlzLmFib3J0Q29udHJvbGxlclR5cGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhvb2sgb3VyIGFib3J0U2lnbmFsIGludG8gdGhlIGFib3J0IGNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5hYm9ydFNpZ25hbC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3JzXzEuQWJvcnRFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zVGltZW91dCA9IHJlcXVlc3QudGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLldhcm5pbmcsIFwiVGltZW91dCBmcm9tIEhUVFAgcmVxdWVzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yc18xLlRpbWVvdXRFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG1zVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgNCwgNV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaFR5cGUocmVxdWVzdC51cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogcmVxdWVzdC5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZTogXCJuby1jYWNoZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPT09IHRydWUgPyBcImluY2x1ZGVcIiA6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogX19hc3NpZ24oeyBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiLCBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiIH0sIHJlcXVlc3QuaGVhZGVycyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdDogXCJtYW51YWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLldhcm5pbmcsIFwiRXJyb3IgZnJvbSBIVFRQIHJlcXVlc3QuIFwiICsgZV8xICsgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZV8xO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGltZW91dElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnRTaWduYWwub25hYm9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yc18xLkh0dHBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0LCByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGRlc2VyaWFsaXplQ29udGVudChyZXNwb25zZSwgcmVxdWVzdC5yZXNwb25zZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY29udGVudF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IEh0dHBDbGllbnRfMS5IdHRwUmVzcG9uc2UocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0LCBwYXlsb2FkKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRmV0Y2hIdHRwQ2xpZW50LnByb3RvdHlwZS5nZXRDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHZhciBjb29raWVzID0gXCJcIjtcbiAgICAgICAgaWYgKFV0aWxzXzEuUGxhdGZvcm0uaXNOb2RlICYmIHRoaXMuamFyKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiB1bnVzZWQgdmFyaWFibGVcbiAgICAgICAgICAgIHRoaXMuamFyLmdldENvb2tpZXModXJsLCBmdW5jdGlvbiAoZSwgYykgeyByZXR1cm4gY29va2llcyA9IGMuam9pbihcIjsgXCIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llcztcbiAgICB9O1xuICAgIHJldHVybiBGZXRjaEh0dHBDbGllbnQ7XG59KEh0dHBDbGllbnRfMS5IdHRwQ2xpZW50KSk7XG5leHBvcnRzLkZldGNoSHR0cENsaWVudCA9IEZldGNoSHR0cENsaWVudDtcbmZ1bmN0aW9uIGRlc2VyaWFsaXplQ29udGVudChyZXNwb25zZSwgcmVzcG9uc2VUeXBlKSB7XG4gICAgdmFyIGNvbnRlbnQ7XG4gICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICAgICAgY2FzZSBcImFycmF5YnVmZmVyXCI6XG4gICAgICAgICAgICBjb250ZW50ID0gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgICAgY29udGVudCA9IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgICBjYXNlIFwiZG9jdW1lbnRcIjpcbiAgICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZVR5cGUgKyBcIiBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnRlbnQgPSByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GZXRjaEh0dHBDbGllbnQuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcRmV0Y2hIdHRwQ2xpZW50LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBUZXh0TWVzc2FnZUZvcm1hdF8xID0gcmVxdWlyZShcIi4vVGV4dE1lc3NhZ2VGb3JtYXRcIik7XG52YXIgVXRpbHNfMSA9IHJlcXVpcmUoXCIuL1V0aWxzXCIpO1xuLyoqIEBwcml2YXRlICovXG52YXIgSGFuZHNoYWtlUHJvdG9jb2wgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSGFuZHNoYWtlUHJvdG9jb2woKSB7XG4gICAgfVxuICAgIC8vIEhhbmRzaGFrZSByZXF1ZXN0IGlzIGFsd2F5cyBKU09OXG4gICAgSGFuZHNoYWtlUHJvdG9jb2wucHJvdG90eXBlLndyaXRlSGFuZHNoYWtlUmVxdWVzdCA9IGZ1bmN0aW9uIChoYW5kc2hha2VSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBUZXh0TWVzc2FnZUZvcm1hdF8xLlRleHRNZXNzYWdlRm9ybWF0LndyaXRlKEpTT04uc3RyaW5naWZ5KGhhbmRzaGFrZVJlcXVlc3QpKTtcbiAgICB9O1xuICAgIEhhbmRzaGFrZVByb3RvY29sLnByb3RvdHlwZS5wYXJzZUhhbmRzaGFrZVJlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlTWVzc2FnZTtcbiAgICAgICAgdmFyIG1lc3NhZ2VEYXRhO1xuICAgICAgICB2YXIgcmVtYWluaW5nRGF0YTtcbiAgICAgICAgaWYgKFV0aWxzXzEuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fCAodHlwZW9mIEJ1ZmZlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkYXRhIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgICAgICAgICAgLy8gRm9ybWF0IGlzIGJpbmFyeSBidXQgc3RpbGwgbmVlZCB0byByZWFkIEpTT04gdGV4dCBmcm9tIGhhbmRzaGFrZSByZXNwb25zZVxuICAgICAgICAgICAgdmFyIGJpbmFyeURhdGEgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3JJbmRleCA9IGJpbmFyeURhdGEuaW5kZXhPZihUZXh0TWVzc2FnZUZvcm1hdF8xLlRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvckNvZGUpO1xuICAgICAgICAgICAgaWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1lc3NhZ2UgaXMgaW5jb21wbGV0ZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb250ZW50IGJlZm9yZSBzZXBhcmF0b3IgaXMgaGFuZHNoYWtlIHJlc3BvbnNlXG4gICAgICAgICAgICAvLyBvcHRpb25hbCBjb250ZW50IGFmdGVyIGlzIGFkZGl0aW9uYWwgbWVzc2FnZXNcbiAgICAgICAgICAgIHZhciByZXNwb25zZUxlbmd0aCA9IHNlcGFyYXRvckluZGV4ICsgMTtcbiAgICAgICAgICAgIG1lc3NhZ2VEYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBiaW5hcnlEYXRhLnNsaWNlKDAsIHJlc3BvbnNlTGVuZ3RoKSk7XG4gICAgICAgICAgICByZW1haW5pbmdEYXRhID0gKGJpbmFyeURhdGEuYnl0ZUxlbmd0aCA+IHJlc3BvbnNlTGVuZ3RoKSA/IGJpbmFyeURhdGEuc2xpY2UocmVzcG9uc2VMZW5ndGgpLmJ1ZmZlciA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGV4dERhdGEgPSBkYXRhO1xuICAgICAgICAgICAgdmFyIHNlcGFyYXRvckluZGV4ID0gdGV4dERhdGEuaW5kZXhPZihUZXh0TWVzc2FnZUZvcm1hdF8xLlRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvcik7XG4gICAgICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWVzc2FnZSBpcyBpbmNvbXBsZXRlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnRlbnQgYmVmb3JlIHNlcGFyYXRvciBpcyBoYW5kc2hha2UgcmVzcG9uc2VcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsIGNvbnRlbnQgYWZ0ZXIgaXMgYWRkaXRpb25hbCBtZXNzYWdlc1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlTGVuZ3RoID0gc2VwYXJhdG9ySW5kZXggKyAxO1xuICAgICAgICAgICAgbWVzc2FnZURhdGEgPSB0ZXh0RGF0YS5zdWJzdHJpbmcoMCwgcmVzcG9uc2VMZW5ndGgpO1xuICAgICAgICAgICAgcmVtYWluaW5nRGF0YSA9ICh0ZXh0RGF0YS5sZW5ndGggPiByZXNwb25zZUxlbmd0aCkgPyB0ZXh0RGF0YS5zdWJzdHJpbmcocmVzcG9uc2VMZW5ndGgpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHdlIHNob3VsZCBoYXZlIGp1c3QgdGhlIHNpbmdsZSBoYW5kc2hha2UgbWVzc2FnZVxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBUZXh0TWVzc2FnZUZvcm1hdF8xLlRleHRNZXNzYWdlRm9ybWF0LnBhcnNlKG1lc3NhZ2VEYXRhKTtcbiAgICAgICAgdmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZShtZXNzYWdlc1swXSk7XG4gICAgICAgIGlmIChyZXNwb25zZS50eXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhIGhhbmRzaGFrZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlTWVzc2FnZSA9IHJlc3BvbnNlO1xuICAgICAgICAvLyBtdWx0aXBsZSBtZXNzYWdlcyBjb3VsZCBoYXZlIGFycml2ZWQgd2l0aCBoYW5kc2hha2VcbiAgICAgICAgLy8gcmV0dXJuIGFkZGl0aW9uYWwgZGF0YSB0byBiZSBwYXJzZWQgYXMgdXN1YWwsIG9yIG51bGwgaWYgYWxsIHBhcnNlZFxuICAgICAgICByZXR1cm4gW3JlbWFpbmluZ0RhdGEsIHJlc3BvbnNlTWVzc2FnZV07XG4gICAgfTtcbiAgICByZXR1cm4gSGFuZHNoYWtlUHJvdG9jb2w7XG59KCkpO1xuZXhwb3J0cy5IYW5kc2hha2VQcm90b2NvbCA9IEhhbmRzaGFrZVByb3RvY29sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SGFuZHNoYWtlUHJvdG9jb2wuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcSGFuZHNoYWtlUHJvdG9jb2wuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiogUmVwcmVzZW50cyBhbiBIVFRQIHJlc3BvbnNlLiAqL1xudmFyIEh0dHBSZXNwb25zZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdHRwUmVzcG9uc2Uoc3RhdHVzQ29kZSwgc3RhdHVzVGV4dCwgY29udGVudCkge1xuICAgICAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xuICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0O1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIH1cbiAgICByZXR1cm4gSHR0cFJlc3BvbnNlO1xufSgpKTtcbmV4cG9ydHMuSHR0cFJlc3BvbnNlID0gSHR0cFJlc3BvbnNlO1xuLyoqIEFic3RyYWN0aW9uIG92ZXIgYW4gSFRUUCBjbGllbnQuXG4gKlxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBhbiBhYnN0cmFjdGlvbiBvdmVyIGFuIEhUVFAgY2xpZW50IHNvIHRoYXQgYSBkaWZmZXJlbnQgaW1wbGVtZW50YXRpb24gY2FuIGJlIHByb3ZpZGVkIG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuXG4gKi9cbnZhciBIdHRwQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEh0dHBDbGllbnQoKSB7XG4gICAgfVxuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZChfX2Fzc2lnbih7fSwgb3B0aW9ucywgeyBtZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsIH0pKTtcbiAgICB9O1xuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoX19hc3NpZ24oe30sIG9wdGlvbnMsIHsgbWV0aG9kOiBcIlBPU1RcIiwgdXJsOiB1cmwgfSkpO1xuICAgIH07XG4gICAgSHR0cENsaWVudC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKF9fYXNzaWduKHt9LCBvcHRpb25zLCB7IG1ldGhvZDogXCJERUxFVEVcIiwgdXJsOiB1cmwgfSkpO1xuICAgIH07XG4gICAgLyoqIEdldHMgYWxsIGNvb2tpZXMgdGhhdCBhcHBseSB0byB0aGUgc3BlY2lmaWVkIFVSTC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmwgVGhlIFVSTCB0aGF0IHRoZSBjb29raWVzIGFyZSB2YWxpZCBmb3IuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmcgY29udGFpbmluZyBhbGwgdGhlIGtleS12YWx1ZSBjb29raWUgcGFpcnMgZm9yIHRoZSBzcGVjaWZpZWQgVVJMLlxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5nZXRDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG4gICAgcmV0dXJuIEh0dHBDbGllbnQ7XG59KCkpO1xuZXhwb3J0cy5IdHRwQ2xpZW50ID0gSHR0cENsaWVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUh0dHBDbGllbnQuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcSHR0cENsaWVudC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRGVmYXVsdEh0dHBDbGllbnRfMSA9IHJlcXVpcmUoXCIuL0RlZmF1bHRIdHRwQ2xpZW50XCIpO1xudmFyIElMb2dnZXJfMSA9IHJlcXVpcmUoXCIuL0lMb2dnZXJcIik7XG52YXIgSVRyYW5zcG9ydF8xID0gcmVxdWlyZShcIi4vSVRyYW5zcG9ydFwiKTtcbnZhciBMb25nUG9sbGluZ1RyYW5zcG9ydF8xID0gcmVxdWlyZShcIi4vTG9uZ1BvbGxpbmdUcmFuc3BvcnRcIik7XG52YXIgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydF8xID0gcmVxdWlyZShcIi4vU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydFwiKTtcbnZhciBVdGlsc18xID0gcmVxdWlyZShcIi4vVXRpbHNcIik7XG52YXIgV2ViU29ja2V0VHJhbnNwb3J0XzEgPSByZXF1aXJlKFwiLi9XZWJTb2NrZXRUcmFuc3BvcnRcIik7XG52YXIgTUFYX1JFRElSRUNUUyA9IDEwMDtcbi8qKiBAcHJpdmF0ZSAqL1xudmFyIEh0dHBDb25uZWN0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEh0dHBDb25uZWN0aW9uKHVybCwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmZlYXR1cmVzID0ge307XG4gICAgICAgIHRoaXMubmVnb3RpYXRlVmVyc2lvbiA9IDE7XG4gICAgICAgIFV0aWxzXzEuQXJnLmlzUmVxdWlyZWQodXJsLCBcInVybFwiKTtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBVdGlsc18xLmNyZWF0ZUxvZ2dlcihvcHRpb25zLmxvZ2dlcik7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IHRoaXMucmVzb2x2ZVVybCh1cmwpO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgb3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudCA9IG9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogb3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9PT0gXCJib29sZWFuXCIgfHwgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwid2l0aENyZWRlbnRpYWxzIG9wdGlvbiB3YXMgbm90IGEgJ2Jvb2xlYW4nIG9yICd1bmRlZmluZWQnIHZhbHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3ZWJTb2NrZXRNb2R1bGUgPSBudWxsO1xuICAgICAgICB2YXIgZXZlbnRTb3VyY2VNb2R1bGUgPSBudWxsO1xuICAgICAgICBpZiAoVXRpbHNfMS5QbGF0Zm9ybS5pc05vZGUgJiYgdHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGlnbm9yZSB0aGUgZHluYW1pYyByZXF1aXJlIGluIHdlYnBhY2sgYnVpbGRzIHdlIG5lZWQgdG8gZG8gdGhpcyBtYWdpY1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogVFMgZG9lc24ndCBrbm93IGFib3V0IHRoZXNlIG5hbWVzXG4gICAgICAgICAgICB2YXIgcmVxdWlyZUZ1bmMgPSB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyA9PT0gXCJmdW5jdGlvblwiID8gX19ub25fd2VicGFja19yZXF1aXJlX18gOiByZXF1aXJlO1xuICAgICAgICAgICAgd2ViU29ja2V0TW9kdWxlID0gcmVxdWlyZUZ1bmMoXCJ3c1wiKTtcbiAgICAgICAgICAgIGV2ZW50U291cmNlTW9kdWxlID0gcmVxdWlyZUZ1bmMoXCJldmVudHNvdXJjZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVV0aWxzXzEuUGxhdGZvcm0uaXNOb2RlICYmIHR5cGVvZiBXZWJTb2NrZXQgIT09IFwidW5kZWZpbmVkXCIgJiYgIW9wdGlvbnMuV2ViU29ja2V0KSB7XG4gICAgICAgICAgICBvcHRpb25zLldlYlNvY2tldCA9IFdlYlNvY2tldDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlsc18xLlBsYXRmb3JtLmlzTm9kZSAmJiAhb3B0aW9ucy5XZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIGlmICh3ZWJTb2NrZXRNb2R1bGUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLldlYlNvY2tldCA9IHdlYlNvY2tldE1vZHVsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIVV0aWxzXzEuUGxhdGZvcm0uaXNOb2RlICYmIHR5cGVvZiBFdmVudFNvdXJjZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhb3B0aW9ucy5FdmVudFNvdXJjZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5FdmVudFNvdXJjZSA9IEV2ZW50U291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFV0aWxzXzEuUGxhdGZvcm0uaXNOb2RlICYmICFvcHRpb25zLkV2ZW50U291cmNlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50U291cmNlTW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5FdmVudFNvdXJjZSA9IGV2ZW50U291cmNlTW9kdWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IG9wdGlvbnMuaHR0cENsaWVudCB8fCBuZXcgRGVmYXVsdEh0dHBDbGllbnRfMS5EZWZhdWx0SHR0cENsaWVudCh0aGlzLmxvZ2dlcik7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi87XG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5vbnJlY2VpdmUgPSBudWxsO1xuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xuICAgIH1cbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAodHJhbnNmZXJGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UsIG1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2ZlckZvcm1hdCA9IHRyYW5zZmVyRm9ybWF0IHx8IElUcmFuc3BvcnRfMS5UcmFuc2ZlckZvcm1hdC5CaW5hcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsc18xLkFyZy5pc0luKHRyYW5zZmVyRm9ybWF0LCBJVHJhbnNwb3J0XzEuVHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIlN0YXJ0aW5nIGNvbm5lY3Rpb24gd2l0aCB0cmFuc2ZlciBmb3JtYXQgJ1wiICsgSVRyYW5zcG9ydF8xLlRyYW5zZmVyRm9ybWF0W3RyYW5zZmVyRm9ybWF0XSArIFwiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBzdGFydCBhbiBIdHRwQ29ubmVjdGlvbiB0aGF0IGlzIG5vdCBpbiB0aGUgJ0Rpc2Nvbm5lY3RlZCcgc3RhdGUuXCIpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiQ29ubmVjdGluZ1wiIC8qIENvbm5lY3RpbmcgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SW50ZXJuYWxQcm9taXNlID0gdGhpcy5zdGFydEludGVybmFsKHRyYW5zZmVyRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRJbnRlcm5hbFByb21pc2VdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRmFpbGVkIHRvIHN0YXJ0IHRoZSBIdHRwQ29ubmVjdGlvbiBiZWZvcmUgc3RvcCgpIHdhcyBjYWxsZWQuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbm5vdCBhd2FpdCBzdG9wUHJvbWlzZSBpbnNpZGUgc3RhcnRJbnRlcm5hbCBzaW5jZSBzdG9wSW50ZXJuYWwgYXdhaXRzIHRoZSBzdGFydEludGVybmFsUHJvbWlzZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcFByb21pc2VdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW5ub3QgYXdhaXQgc3RvcFByb21pc2UgaW5zaWRlIHN0YXJ0SW50ZXJuYWwgc2luY2Ugc3RvcEludGVybmFsIGF3YWl0cyB0aGUgc3RhcnRJbnRlcm5hbFByb21pc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gXCJDb25uZWN0ZWRcIiAvKiBDb25uZWN0ZWQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJIdHRwQ29ubmVjdGlvbi5zdGFydEludGVybmFsIGNvbXBsZXRlZCBncmFjZWZ1bGx5IGJ1dCBkaWRuJ3QgZW50ZXIgdGhlIGNvbm5lY3Rpb24gaW50byB0aGUgY29ubmVjdGVkIHN0YXRlIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IFwiQ29ubmVjdGVkXCIgLyogQ29ubmVjdGVkICovKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHNlbmQgZGF0YSBpZiB0aGUgY29ubmVjdGlvbiBpcyBub3QgaW4gdGhlICdDb25uZWN0ZWQnIFN0YXRlLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNlbmRRdWV1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZW5kUXVldWUgPSBuZXcgVHJhbnNwb3J0U2VuZFF1ZXVlKHRoaXMudHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUcmFuc3BvcnQgd2lsbCBub3QgYmUgbnVsbCBpZiBzdGF0ZSBpcyBjb25uZWN0ZWRcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFF1ZXVlLnNlbmQoZGF0YSk7XG4gICAgfTtcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVzb2x2ZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3Rpbmcgc3RhdGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnN0b3BQcm9taXNlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNvbXBsZXRlIHN0b3AoKSB1bnRpbCBzdG9wQ29ubmVjdGlvbigpIGNvbXBsZXRlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9wUHJvbWlzZVJlc29sdmVyID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RvcEludGVybmFsIHNob3VsZCBuZXZlciB0aHJvdyBzbyBqdXN0IG9ic2VydmUgaXQuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0b3BJbnRlcm5hbChlcnJvcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdG9wSW50ZXJuYWwgc2hvdWxkIG5ldmVyIHRocm93IHNvIGp1c3Qgb2JzZXJ2ZSBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcFByb21pc2VdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnN0b3BJbnRlcm5hbCA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZV8xLCBlXzI7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZXJyb3IgYXMgc29vbiBhcyBwb3NzaWJsZSBvdGhlcndpc2UgdGhlcmUgaXMgYSByYWNlIGJldHdlZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSB0cmFuc3BvcnQgY2xvc2luZyBhbmQgcHJvdmlkaW5nIGFuIGVycm9yIGFuZCB0aGUgZXJyb3IgZnJvbSBhIGNsb3NlIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHdvdWxkIHByZWZlciB0aGUgY2xvc2UgbWVzc2FnZSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0SW50ZXJuYWxQcm9taXNlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudHJhbnNwb3J0KSByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFs1LCA3LCAsIDhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJhbnNwb3J0LnN0b3AoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBcIkh0dHBDb25uZWN0aW9uLnRyYW5zcG9ydC5zdG9wKCkgdGhyZXcgZXJyb3IgJ1wiICsgZV8yICsgXCInLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcENvbm5lY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDEwXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJIdHRwQ29ubmVjdGlvbi50cmFuc3BvcnQgaXMgdW5kZWZpbmVkIGluIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBiZWNhdXNlIHN0YXJ0KCkgZmFpbGVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcENvbm5lY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RhcnRJbnRlcm5hbCA9IGZ1bmN0aW9uICh0cmFuc2ZlckZvcm1hdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXJsLCBuZWdvdGlhdGVSZXNwb25zZSwgcmVkaXJlY3RzLCBfbG9vcF8xLCB0aGlzXzEsIGVfMztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuYmFzZVVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5ID0gdGhpcy5vcHRpb25zLmFjY2Vzc1Rva2VuRmFjdG9yeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAxMiwgLCAxM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2tpcE5lZ290aWF0aW9uKSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMub3B0aW9ucy50cmFuc3BvcnQgPT09IElUcmFuc3BvcnRfMS5IdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBuZWVkIHRvIGFkZCBhIGNvbm5lY3Rpb24gSUQgaW4gdGhpcyBjYXNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRoaXMuY29uc3RydWN0VHJhbnNwb3J0KElUcmFuc3BvcnRfMS5IdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHNob3VsZCBqdXN0IGNhbGwgY29ubmVjdCBkaXJlY3RseSBpbiB0aGlzIGNhc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBmYWxsYmFjayBvciBuZWdvdGlhdGUgaW4gdGhpcyBjYXNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydFRyYW5zcG9ydCh1cmwsIHRyYW5zZmVyRm9ybWF0KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHNob3VsZCBqdXN0IGNhbGwgY29ubmVjdCBkaXJlY3RseSBpbiB0aGlzIGNhc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBmYWxsYmFjayBvciBuZWdvdGlhdGUgaW4gdGhpcyBjYXNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogdGhyb3cgbmV3IEVycm9yKFwiTmVnb3RpYXRpb24gY2FuIG9ubHkgYmUgc2tpcHBlZCB3aGVuIHVzaW5nIHRoZSBXZWJTb2NrZXQgdHJhbnNwb3J0IGRpcmVjdGx5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzMgLypicmVhayovLCAxMV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVJlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2Nlc3NUb2tlbl8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzXzEuZ2V0TmVnb3RpYXRpb25SZXNwb25zZSh1cmwpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGVSZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdXNlciB0cmllcyB0byBzdG9wIHRoZSBjb25uZWN0aW9uIHdoZW4gaXQgaXMgYmVpbmcgc3RhcnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzXzEuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RpbmdcIiAvKiBEaXNjb25uZWN0aW5nICovIHx8IHRoaXNfMS5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjb25uZWN0aW9uIHdhcyBzdG9wcGVkIGR1cmluZyBuZWdvdGlhdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdvdGlhdGVSZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobmVnb3RpYXRlUmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnb3RpYXRlUmVzcG9uc2UuUHJvdG9jb2xWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkRldGVjdGVkIGEgY29ubmVjdGlvbiBhdHRlbXB0IHRvIGFuIEFTUC5ORVQgU2lnbmFsUiBTZXJ2ZXIuIFRoaXMgY2xpZW50IG9ubHkgc3VwcG9ydHMgY29ubmVjdGluZyB0byBhbiBBU1AuTkVUIENvcmUgU2lnbmFsUiBTZXJ2ZXIuIFNlZSBodHRwczovL2FrYS5tcy9zaWduYWxyLWNvcmUtZGlmZmVyZW5jZXMgZm9yIGRldGFpbHMuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnb3RpYXRlUmVzcG9uc2UudXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IG5lZ290aWF0ZVJlc3BvbnNlLnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ290aWF0ZVJlc3BvbnNlLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuXzEgPSBuZWdvdGlhdGVSZXNwb25zZS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xLmFjY2Vzc1Rva2VuRmFjdG9yeSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFjY2Vzc1Rva2VuXzE7IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDY7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs1IC8qeWllbGQqKi8sIF9sb29wXzEoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ290aWF0ZVJlc3BvbnNlLnVybCAmJiByZWRpcmVjdHMgPCBNQVhfUkVESVJFQ1RTKSByZXR1cm4gWzMgLypicmVhayovLCA2XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gOTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0cyA9PT0gTUFYX1JFRElSRUNUUyAmJiBuZWdvdGlhdGVSZXNwb25zZS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZWdvdGlhdGUgcmVkaXJlY3Rpb24gbGltaXQgZXhjZWVkZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5jcmVhdGVUcmFuc3BvcnQodXJsLCB0aGlzLm9wdGlvbnMudHJhbnNwb3J0LCBuZWdvdGlhdGVSZXNwb25zZSwgdHJhbnNmZXJGb3JtYXQpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQgaW5zdGFuY2VvZiBMb25nUG9sbGluZ1RyYW5zcG9ydF8xLkxvbmdQb2xsaW5nVHJhbnNwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlcy5pbmhlcmVudEtlZXBBbGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiQ29ubmVjdGluZ1wiIC8qIENvbm5lY3RpbmcgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIGNvbm5lY3Rpb24gdHJhbnNpdGlvbnMgdG8gdGhlIGNvbm5lY3RlZCBzdGF0ZSBwcmlvciB0byBjb21wbGV0aW5nIHRoaXMuc3RhcnRJbnRlcm5hbFByb21pc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQoKSB3aWxsIGhhbmRsZSB0aGUgY2FzZSB3aGVuIHN0b3Agd2FzIGNhbGxlZCBhbmQgc3RhcnRJbnRlcm5hbCBleGl0cyBzdGlsbCBpbiB0aGUgZGlzY29ubmVjdGluZyBzdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIlRoZSBIdHRwQ29ubmVjdGlvbiBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiQ29ubmVjdGVkXCIgLyogQ29ubmVjdGVkICovO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8zID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5FcnJvciwgXCJGYWlsZWQgdG8gc3RhcnQgdGhlIGNvbm5lY3Rpb246IFwiICsgZV8zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi87XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChlXzMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5nZXROZWdvdGlhdGlvblJlc3BvbnNlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaGVhZGVycywgdG9rZW4sIF9hLCBuYW1lLCB2YWx1ZSwgbmVnb3RpYXRlVXJsLCByZXNwb25zZSwgbmVnb3RpYXRlUmVzcG9uc2UsIGVfNDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IFV0aWxzXzEuZ2V0VXNlckFnZW50SGVhZGVyKCksIG5hbWUgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVVybCA9IHRoaXMucmVzb2x2ZU5lZ290aWF0ZVVybCh1cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJTZW5kaW5nIG5lZ290aWF0aW9uIHJlcXVlc3Q6IFwiICsgbmVnb3RpYXRlVXJsICsgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzMsIDUsICwgNl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5odHRwQ2xpZW50LnBvc3QobmVnb3RpYXRlVXJsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKHt9LCBoZWFkZXJzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIHN0YXR1cyBjb2RlIHJldHVybmVkIGZyb20gbmVnb3RpYXRlICdcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyBcIidcIikpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmVnb3RpYXRlUmVzcG9uc2UubmVnb3RpYXRlVmVyc2lvbiB8fCBuZWdvdGlhdGVSZXNwb25zZS5uZWdvdGlhdGVWZXJzaW9uIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5lZ290aWF0ZSB2ZXJzaW9uIDAgZG9lc24ndCB1c2UgY29ubmVjdGlvblRva2VuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU28gd2Ugc2V0IGl0IGVxdWFsIHRvIGNvbm5lY3Rpb25JZCBzbyBhbGwgb3VyIGxvZ2ljIGNhbiB1c2UgY29ubmVjdGlvblRva2VuIHdpdGhvdXQgYmVpbmcgYXdhcmUgb2YgdGhlIG5lZ290aWF0ZSB2ZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlUmVzcG9uc2UuY29ubmVjdGlvblRva2VuID0gbmVnb3RpYXRlUmVzcG9uc2UuY29ubmVjdGlvbklkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5lZ290aWF0ZVJlc3BvbnNlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV80ID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5FcnJvciwgXCJGYWlsZWQgdG8gY29tcGxldGUgbmVnb3RpYXRpb24gd2l0aCB0aGUgc2VydmVyOiBcIiArIGVfNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QoZV80KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVDb25uZWN0VXJsID0gZnVuY3Rpb24gKHVybCwgY29ubmVjdGlvblRva2VuKSB7XG4gICAgICAgIGlmICghY29ubmVjdGlvblRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmwgKyAodXJsLmluZGV4T2YoXCI/XCIpID09PSAtMSA/IFwiP1wiIDogXCImXCIpICsgKFwiaWQ9XCIgKyBjb25uZWN0aW9uVG9rZW4pO1xuICAgIH07XG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZVRyYW5zcG9ydCA9IGZ1bmN0aW9uICh1cmwsIHJlcXVlc3RlZFRyYW5zcG9ydCwgbmVnb3RpYXRlUmVzcG9uc2UsIHJlcXVlc3RlZFRyYW5zZmVyRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb25uZWN0VXJsLCB0cmFuc3BvcnRFeGNlcHRpb25zLCB0cmFuc3BvcnRzLCBuZWdvdGlhdGUsIF9pLCB0cmFuc3BvcnRzXzEsIGVuZHBvaW50LCB0cmFuc3BvcnRPckVycm9yLCBleF8xLCBleF8yLCBtZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdFVybCA9IHRoaXMuY3JlYXRlQ29ubmVjdFVybCh1cmwsIG5lZ290aWF0ZVJlc3BvbnNlLmNvbm5lY3Rpb25Ub2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNJVHJhbnNwb3J0KHJlcXVlc3RlZFRyYW5zcG9ydCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIHdhcyBwcm92aWRlZCBhbiBpbnN0YW5jZSBvZiBJVHJhbnNwb3J0LCB1c2luZyB0aGF0IGRpcmVjdGx5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gcmVxdWVzdGVkVHJhbnNwb3J0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydFRyYW5zcG9ydChjb25uZWN0VXJsLCByZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCA9IG5lZ290aWF0ZVJlc3BvbnNlLmNvbm5lY3Rpb25JZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0RXhjZXB0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0cyA9IG5lZ290aWF0ZVJlc3BvbnNlLmF2YWlsYWJsZVRyYW5zcG9ydHMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGUgPSBuZWdvdGlhdGVSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pID0gMCwgdHJhbnNwb3J0c18xID0gdHJhbnNwb3J0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoX2kgPCB0cmFuc3BvcnRzXzEubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kcG9pbnQgPSB0cmFuc3BvcnRzXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0T3JFcnJvciA9IHRoaXMucmVzb2x2ZVRyYW5zcG9ydE9yRXJyb3IoZW5kcG9pbnQsIHJlcXVlc3RlZFRyYW5zcG9ydCwgcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHJhbnNwb3J0T3JFcnJvciBpbnN0YW5jZW9mIEVycm9yKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgZXJyb3IgYW5kIGNvbnRpbnVlLCB3ZSBkb24ndCB3YW50IHRvIGNhdXNlIGEgcmUtbmVnb3RpYXRlIGluIHRoZXNlIGNhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRFeGNlcHRpb25zLnB1c2goZW5kcG9pbnQudHJhbnNwb3J0ICsgXCIgZmFpbGVkOiBcIiArIHRyYW5zcG9ydE9yRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNJVHJhbnNwb3J0KHRyYW5zcG9ydE9yRXJyb3IpKSByZXR1cm4gWzMgLypicmVhayovLCAxMl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydE9yRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFuZWdvdGlhdGUpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzUsIDcsICwgOF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXROZWdvdGlhdGlvblJlc3BvbnNlKHVybCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGUgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA4XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZXhfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChleF8xKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RVcmwgPSB0aGlzLmNyZWF0ZUNvbm5lY3RVcmwodXJsLCBuZWdvdGlhdGUuY29ubmVjdGlvblRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gOTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFs5LCAxMSwgLCAxMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydFRyYW5zcG9ydChjb25uZWN0VXJsLCByZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgPSBuZWdvdGlhdGUuY29ubmVjdGlvbklkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXhfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRXJyb3IsIFwiRmFpbGVkIHRvIHN0YXJ0IHRoZSB0cmFuc3BvcnQgJ1wiICsgZW5kcG9pbnQudHJhbnNwb3J0ICsgXCInOiBcIiArIGV4XzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0RXhjZXB0aW9ucy5wdXNoKGVuZHBvaW50LnRyYW5zcG9ydCArIFwiIGZhaWxlZDogXCIgKyBleF8yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gXCJDb25uZWN0aW5nXCIgLyogQ29ubmVjdGluZyAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkZhaWxlZCB0byBzZWxlY3QgdHJhbnNwb3J0IGJlZm9yZSBzdG9wKCkgd2FzIGNhbGxlZC5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxMl07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0RXhjZXB0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhbnkgb2YgdGhlIGF2YWlsYWJsZSB0cmFuc3BvcnRzLiBcIiArIHRyYW5zcG9ydEV4Y2VwdGlvbnMuam9pbihcIiBcIikpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm9uZSBvZiB0aGUgdHJhbnNwb3J0cyBzdXBwb3J0ZWQgYnkgdGhlIGNsaWVudCBhcmUgc3VwcG9ydGVkIGJ5IHRoZSBzZXJ2ZXIuXCIpKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgICAgICAgc3dpdGNoICh0cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIGNhc2UgSVRyYW5zcG9ydF8xLkh0dHBUcmFuc3BvcnRUeXBlLldlYlNvY2tldHM6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuV2ViU29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidXZWJTb2NrZXQnIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2ViU29ja2V0VHJhbnNwb3J0XzEuV2ViU29ja2V0VHJhbnNwb3J0KHRoaXMuaHR0cENsaWVudCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIHRoaXMubG9nZ2VyLCB0aGlzLm9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgfHwgZmFsc2UsIHRoaXMub3B0aW9ucy5XZWJTb2NrZXQsIHRoaXMub3B0aW9ucy5oZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgICAgIGNhc2UgSVRyYW5zcG9ydF8xLkh0dHBUcmFuc3BvcnRUeXBlLlNlcnZlclNlbnRFdmVudHM6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuRXZlbnRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ0V2ZW50U291cmNlJyBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnRfMS5TZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0KHRoaXMuaHR0cENsaWVudCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIHRoaXMubG9nZ2VyLCB0aGlzLm9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgfHwgZmFsc2UsIHRoaXMub3B0aW9ucy5FdmVudFNvdXJjZSwgdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscywgdGhpcy5vcHRpb25zLmhlYWRlcnMgfHwge30pO1xuICAgICAgICAgICAgY2FzZSBJVHJhbnNwb3J0XzEuSHR0cFRyYW5zcG9ydFR5cGUuTG9uZ1BvbGxpbmc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMb25nUG9sbGluZ1RyYW5zcG9ydF8xLkxvbmdQb2xsaW5nVHJhbnNwb3J0KHRoaXMuaHR0cENsaWVudCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIHRoaXMubG9nZ2VyLCB0aGlzLm9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgfHwgZmFsc2UsIHRoaXMub3B0aW9ucy53aXRoQ3JlZGVudGlhbHMsIHRoaXMub3B0aW9ucy5oZWFkZXJzIHx8IHt9KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0cmFuc3BvcnQ6IFwiICsgdHJhbnNwb3J0ICsgXCIuXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RhcnRUcmFuc3BvcnQgPSBmdW5jdGlvbiAodXJsLCB0cmFuc2ZlckZvcm1hdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5vbnJlY2VpdmUgPSB0aGlzLm9ucmVjZWl2ZTtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5zdG9wQ29ubmVjdGlvbihlKTsgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LmNvbm5lY3QodXJsLCB0cmFuc2ZlckZvcm1hdCk7XG4gICAgfTtcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUucmVzb2x2ZVRyYW5zcG9ydE9yRXJyb3IgPSBmdW5jdGlvbiAoZW5kcG9pbnQsIHJlcXVlc3RlZFRyYW5zcG9ydCwgcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpIHtcbiAgICAgICAgdmFyIHRyYW5zcG9ydCA9IElUcmFuc3BvcnRfMS5IdHRwVHJhbnNwb3J0VHlwZVtlbmRwb2ludC50cmFuc3BvcnRdO1xuICAgICAgICBpZiAodHJhbnNwb3J0ID09PSBudWxsIHx8IHRyYW5zcG9ydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBlbmRwb2ludC50cmFuc3BvcnQgKyBcIicgYmVjYXVzZSBpdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgY2xpZW50LlwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCJTa2lwcGluZyB0cmFuc3BvcnQgJ1wiICsgZW5kcG9pbnQudHJhbnNwb3J0ICsgXCInIGJlY2F1c2UgaXQgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIGNsaWVudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0TWF0Y2hlcyhyZXF1ZXN0ZWRUcmFuc3BvcnQsIHRyYW5zcG9ydCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmZXJGb3JtYXRzID0gZW5kcG9pbnQudHJhbnNmZXJGb3JtYXRzLm1hcChmdW5jdGlvbiAocykgeyByZXR1cm4gSVRyYW5zcG9ydF8xLlRyYW5zZmVyRm9ybWF0W3NdOyB9KTtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXRzLmluZGV4T2YocmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0cmFuc3BvcnQgPT09IElUcmFuc3BvcnRfMS5IdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzICYmICF0aGlzLm9wdGlvbnMuV2ViU29ja2V0KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHRyYW5zcG9ydCA9PT0gSVRyYW5zcG9ydF8xLkh0dHBUcmFuc3BvcnRUeXBlLlNlcnZlclNlbnRFdmVudHMgJiYgIXRoaXMub3B0aW9ucy5FdmVudFNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsIFwiU2tpcHBpbmcgdHJhbnNwb3J0ICdcIiArIElUcmFuc3BvcnRfMS5IdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInIGJlY2F1c2UgaXQgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LidcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiJ1wiICsgSVRyYW5zcG9ydF8xLkh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsIFwiU2VsZWN0aW5nIHRyYW5zcG9ydCAnXCIgKyBJVHJhbnNwb3J0XzEuSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBJVHJhbnNwb3J0XzEuSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBiZWNhdXNlIGl0IGRvZXMgbm90IHN1cHBvcnQgdGhlIHJlcXVlc3RlZCB0cmFuc2ZlciBmb3JtYXQgJ1wiICsgSVRyYW5zcG9ydF8xLlRyYW5zZmVyRm9ybWF0W3JlcXVlc3RlZFRyYW5zZmVyRm9ybWF0XSArIFwiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCInXCIgKyBJVHJhbnNwb3J0XzEuSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICsgSVRyYW5zcG9ydF8xLlRyYW5zZmVyRm9ybWF0W3JlcXVlc3RlZFRyYW5zZmVyRm9ybWF0XSArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBJVHJhbnNwb3J0XzEuSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBiZWNhdXNlIGl0IHdhcyBkaXNhYmxlZCBieSB0aGUgY2xpZW50LlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiJ1wiICsgSVRyYW5zcG9ydF8xLkh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgaXMgZGlzYWJsZWQgYnkgdGhlIGNsaWVudC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5pc0lUcmFuc3BvcnQgPSBmdW5jdGlvbiAodHJhbnNwb3J0KSB7XG4gICAgICAgIHJldHVybiB0cmFuc3BvcnQgJiYgdHlwZW9mICh0cmFuc3BvcnQpID09PSBcIm9iamVjdFwiICYmIFwiY29ubmVjdFwiIGluIHRyYW5zcG9ydDtcbiAgICB9O1xuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wQ29ubmVjdGlvbiA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkh0dHBDb25uZWN0aW9uLnN0b3BDb25uZWN0aW9uKFwiICsgZXJyb3IgKyBcIikgY2FsbGVkIHdoaWxlIGluIHN0YXRlIFwiICsgdGhpcy5jb25uZWN0aW9uU3RhdGUgKyBcIi5cIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgc3RvcEVycm9yLCBpdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGhlIGVycm9yIGZyb20gdGhlIHRyYW5zcG9ydFxuICAgICAgICBlcnJvciA9IHRoaXMuc3RvcEVycm9yIHx8IGVycm9yO1xuICAgICAgICB0aGlzLnN0b3BFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJDYWxsIHRvIEh0dHBDb25uZWN0aW9uLnN0b3BDb25uZWN0aW9uKFwiICsgZXJyb3IgKyBcIikgd2FzIGlnbm9yZWQgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IGluIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJDb25uZWN0aW5nXCIgLyogQ29ubmVjdGluZyAqLykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5XYXJuaW5nLCBcIkNhbGwgdG8gSHR0cENvbm5lY3Rpb24uc3RvcENvbm5lY3Rpb24oXCIgKyBlcnJvciArIFwiKSB3YXMgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIHN0aWxsIGluIHRoZSBjb25uZWN0aW5nIHN0YXRlLlwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBDb25uZWN0aW9uLnN0b3BDb25uZWN0aW9uKFwiICsgZXJyb3IgKyBcIikgd2FzIGNhbGxlZCB3aGlsZSB0aGUgY29ubmVjdGlvbiBpcyBzdGlsbCBpbiB0aGUgY29ubmVjdGluZyBzdGF0ZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RpbmdcIiAvKiBEaXNjb25uZWN0aW5nICovKSB7XG4gICAgICAgICAgICAvLyBBIGNhbGwgdG8gc3RvcCgpIGluZHVjZWQgdGhpcyBjYWxsIHRvIHN0b3BDb25uZWN0aW9uIGFuZCBuZWVkcyB0byBiZSBjb21wbGV0ZWQuXG4gICAgICAgICAgICAvLyBBbnkgc3RvcCgpIGF3YWl0ZXJzIHdpbGwgYmUgc2NoZWR1bGVkIHRvIGNvbnRpbnVlIGFmdGVyIHRoZSBvbmNsb3NlIGNhbGxiYWNrIGZpcmVzLlxuICAgICAgICAgICAgdGhpcy5zdG9wUHJvbWlzZVJlc29sdmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBcIkNvbm5lY3Rpb24gZGlzY29ubmVjdGVkIHdpdGggZXJyb3IgJ1wiICsgZXJyb3IgKyBcIicuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJDb25uZWN0aW9uIGRpc2Nvbm5lY3RlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VuZFF1ZXVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRRdWV1ZS5zdG9wKCkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5FcnJvciwgXCJUcmFuc3BvcnRTZW5kUXVldWUuc3RvcCgpIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbmRRdWV1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLztcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25jbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5FcnJvciwgXCJIdHRwQ29ubmVjdGlvbi5vbmNsb3NlKFwiICsgZXJyb3IgKyBcIikgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5yZXNvbHZlVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAvLyBzdGFydHNXaXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gSUVcbiAgICAgICAgaWYgKHVybC5sYXN0SW5kZXhPZihcImh0dHBzOi8vXCIsIDApID09PSAwIHx8IHVybC5sYXN0SW5kZXhPZihcImh0dHA6Ly9cIiwgMCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlsc18xLlBsYXRmb3JtLmlzQnJvd3NlciB8fCAhd2luZG93LmRvY3VtZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcmVzb2x2ZSAnXCIgKyB1cmwgKyBcIicuXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldHRpbmcgdGhlIHVybCB0byB0aGUgaHJlZiBwcm9wZXJ5IG9mIGFuIGFuY2hvciB0YWcgaGFuZGxlcyBub3JtYWxpemF0aW9uXG4gICAgICAgIC8vIGZvciB1cy4gVGhlcmUgYXJlIDMgbWFpbiBjYXNlcy5cbiAgICAgICAgLy8gMS4gUmVsYXRpdmUgcGF0aCBub3JtYWxpemF0aW9uIGUuZyBcImJcIiAtPiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hL2JcIlxuICAgICAgICAvLyAyLiBBYnNvbHV0ZSBwYXRoIG5vcm1hbGl6YXRpb24gZS5nIFwiL2EvYlwiIC0+IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2EvYlwiXG4gICAgICAgIC8vIDMuIE5ldHdvcmtwYXRoIHJlZmVyZW5jZSBub3JtYWxpemF0aW9uIGUuZyBcIi8vbG9jYWxob3N0OjUwMDAvYS9iXCIgLT4gXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvYS9iXCJcbiAgICAgICAgdmFyIGFUYWcgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGFUYWcuaHJlZiA9IHVybDtcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJOb3JtYWxpemluZyAnXCIgKyB1cmwgKyBcIicgdG8gJ1wiICsgYVRhZy5ocmVmICsgXCInLlwiKTtcbiAgICAgICAgcmV0dXJuIGFUYWcuaHJlZjtcbiAgICB9O1xuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5yZXNvbHZlTmVnb3RpYXRlVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgaW5kZXggPSB1cmwuaW5kZXhPZihcIj9cIik7XG4gICAgICAgIHZhciBuZWdvdGlhdGVVcmwgPSB1cmwuc3Vic3RyaW5nKDAsIGluZGV4ID09PSAtMSA/IHVybC5sZW5ndGggOiBpbmRleCk7XG4gICAgICAgIGlmIChuZWdvdGlhdGVVcmxbbmVnb3RpYXRlVXJsLmxlbmd0aCAtIDFdICE9PSBcIi9cIikge1xuICAgICAgICAgICAgbmVnb3RpYXRlVXJsICs9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICAgIG5lZ290aWF0ZVVybCArPSBcIm5lZ290aWF0ZVwiO1xuICAgICAgICBuZWdvdGlhdGVVcmwgKz0gaW5kZXggPT09IC0xID8gXCJcIiA6IHVybC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgICAgICBpZiAobmVnb3RpYXRlVXJsLmluZGV4T2YoXCJuZWdvdGlhdGVWZXJzaW9uXCIpID09PSAtMSkge1xuICAgICAgICAgICAgbmVnb3RpYXRlVXJsICs9IGluZGV4ID09PSAtMSA/IFwiP1wiIDogXCImXCI7XG4gICAgICAgICAgICBuZWdvdGlhdGVVcmwgKz0gXCJuZWdvdGlhdGVWZXJzaW9uPVwiICsgdGhpcy5uZWdvdGlhdGVWZXJzaW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZWdvdGlhdGVVcmw7XG4gICAgfTtcbiAgICByZXR1cm4gSHR0cENvbm5lY3Rpb247XG59KCkpO1xuZXhwb3J0cy5IdHRwQ29ubmVjdGlvbiA9IEh0dHBDb25uZWN0aW9uO1xuZnVuY3Rpb24gdHJhbnNwb3J0TWF0Y2hlcyhyZXF1ZXN0ZWRUcmFuc3BvcnQsIGFjdHVhbFRyYW5zcG9ydCkge1xuICAgIHJldHVybiAhcmVxdWVzdGVkVHJhbnNwb3J0IHx8ICgoYWN0dWFsVHJhbnNwb3J0ICYgcmVxdWVzdGVkVHJhbnNwb3J0KSAhPT0gMCk7XG59XG4vKiogQHByaXZhdGUgKi9cbnZhciBUcmFuc3BvcnRTZW5kUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHJhbnNwb3J0U2VuZFF1ZXVlKHRyYW5zcG9ydCkge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5leGVjdXRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXJlZERhdGEgPSBuZXcgUHJvbWlzZVNvdXJjZSgpO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydFJlc3VsdCA9IG5ldyBQcm9taXNlU291cmNlKCk7XG4gICAgICAgIHRoaXMuc2VuZExvb3BQcm9taXNlID0gdGhpcy5zZW5kTG9vcCgpO1xuICAgIH1cbiAgICBUcmFuc3BvcnRTZW5kUXVldWUucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLmJ1ZmZlckRhdGEoZGF0YSk7XG4gICAgICAgIGlmICghdGhpcy50cmFuc3BvcnRSZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0UmVzdWx0ID0gbmV3IFByb21pc2VTb3VyY2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRSZXN1bHQucHJvbWlzZTtcbiAgICB9O1xuICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5leGVjdXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyZWREYXRhLnJlc29sdmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZExvb3BQcm9taXNlO1xuICAgIH07XG4gICAgVHJhbnNwb3J0U2VuZFF1ZXVlLnByb3RvdHlwZS5idWZmZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCAmJiB0eXBlb2YgKHRoaXMuYnVmZmVyWzBdKSAhPT0gdHlwZW9mIChkYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgZGF0YSB0byBiZSBvZiB0eXBlIFwiICsgdHlwZW9mICh0aGlzLmJ1ZmZlcikgKyBcIiBidXQgd2FzIG9mIHR5cGUgXCIgKyB0eXBlb2YgKGRhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXJlZERhdGEucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgVHJhbnNwb3J0U2VuZFF1ZXVlLnByb3RvdHlwZS5zZW5kTG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zcG9ydFJlc3VsdCwgZGF0YSwgZXJyb3JfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJ1ZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlbmRCdWZmZXJlZERhdGEucHJvbWlzZV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5leGVjdXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRSZXN1bHQucmVqZWN0KFwiQ29ubmVjdGlvbiBzdG9wcGVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXJlZERhdGEgPSBuZXcgUHJvbWlzZVNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0UmVzdWx0ID0gdGhpcy50cmFuc3BvcnRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydFJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0eXBlb2YgKHRoaXMuYnVmZmVyWzBdKSA9PT0gXCJzdHJpbmdcIiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXIuam9pbihcIlwiKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhbnNwb3J0U2VuZFF1ZXVlLmNvbmNhdEJ1ZmZlcnModGhpcy5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsyLCA0LCAsIDVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJhbnNwb3J0LnNlbmQoZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRSZXN1bHQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRSZXN1bHQucmVqZWN0KGVycm9yXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszIC8qYnJlYWsqLywgMF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5jb25jYXRCdWZmZXJzID0gZnVuY3Rpb24gKGFycmF5QnVmZmVycykge1xuICAgICAgICB2YXIgdG90YWxMZW5ndGggPSBhcnJheUJ1ZmZlcnMubWFwKGZ1bmN0aW9uIChiKSB7IHJldHVybiBiLmJ5dGVMZW5ndGg7IH0pLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBhcnJheUJ1ZmZlcnNfMSA9IGFycmF5QnVmZmVyczsgX2kgPCBhcnJheUJ1ZmZlcnNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gYXJyYXlCdWZmZXJzXzFbX2ldO1xuICAgICAgICAgICAgcmVzdWx0LnNldChuZXcgVWludDhBcnJheShpdGVtKSwgb2Zmc2V0KTtcbiAgICAgICAgICAgIG9mZnNldCArPSBpdGVtLmJ5dGVMZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5idWZmZXI7XG4gICAgfTtcbiAgICByZXR1cm4gVHJhbnNwb3J0U2VuZFF1ZXVlO1xufSgpKTtcbmV4cG9ydHMuVHJhbnNwb3J0U2VuZFF1ZXVlID0gVHJhbnNwb3J0U2VuZFF1ZXVlO1xudmFyIFByb21pc2VTb3VyY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJvbWlzZVNvdXJjZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIF9hID0gW3Jlc29sdmUsIHJlamVjdF0sIF90aGlzLnJlc29sdmVyID0gX2FbMF0sIF90aGlzLnJlamVjdGVyID0gX2FbMV0sIF9hO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgUHJvbWlzZVNvdXJjZS5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlcigpO1xuICAgIH07XG4gICAgUHJvbWlzZVNvdXJjZS5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICB0aGlzLnJlamVjdGVyKHJlYXNvbik7XG4gICAgfTtcbiAgICByZXR1cm4gUHJvbWlzZVNvdXJjZTtcbn0oKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1IdHRwQ29ubmVjdGlvbi5qcy5tYXBcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1xcXFxIdHRwQ29ubmVjdGlvbi5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEhhbmRzaGFrZVByb3RvY29sXzEgPSByZXF1aXJlKFwiLi9IYW5kc2hha2VQcm90b2NvbFwiKTtcbnZhciBJSHViUHJvdG9jb2xfMSA9IHJlcXVpcmUoXCIuL0lIdWJQcm90b2NvbFwiKTtcbnZhciBJTG9nZ2VyXzEgPSByZXF1aXJlKFwiLi9JTG9nZ2VyXCIpO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL1N1YmplY3RcIik7XG52YXIgVXRpbHNfMSA9IHJlcXVpcmUoXCIuL1V0aWxzXCIpO1xudmFyIERFRkFVTFRfVElNRU9VVF9JTl9NUyA9IDMwICogMTAwMDtcbnZhciBERUZBVUxUX1BJTkdfSU5URVJWQUxfSU5fTVMgPSAxNSAqIDEwMDA7XG4vKiogRGVzY3JpYmVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB7QGxpbmsgSHViQ29ubmVjdGlvbn0gdG8gdGhlIHNlcnZlci4gKi9cbnZhciBIdWJDb25uZWN0aW9uU3RhdGU7XG4oZnVuY3Rpb24gKEh1YkNvbm5lY3Rpb25TdGF0ZSkge1xuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgZGlzY29ubmVjdGVkLiAqL1xuICAgIEh1YkNvbm5lY3Rpb25TdGF0ZVtcIkRpc2Nvbm5lY3RlZFwiXSA9IFwiRGlzY29ubmVjdGVkXCI7XG4gICAgLyoqIFRoZSBodWIgY29ubmVjdGlvbiBpcyBjb25uZWN0aW5nLiAqL1xuICAgIEh1YkNvbm5lY3Rpb25TdGF0ZVtcIkNvbm5lY3RpbmdcIl0gPSBcIkNvbm5lY3RpbmdcIjtcbiAgICAvKiogVGhlIGh1YiBjb25uZWN0aW9uIGlzIGNvbm5lY3RlZC4gKi9cbiAgICBIdWJDb25uZWN0aW9uU3RhdGVbXCJDb25uZWN0ZWRcIl0gPSBcIkNvbm5lY3RlZFwiO1xuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgZGlzY29ubmVjdGluZy4gKi9cbiAgICBIdWJDb25uZWN0aW9uU3RhdGVbXCJEaXNjb25uZWN0aW5nXCJdID0gXCJEaXNjb25uZWN0aW5nXCI7XG4gICAgLyoqIFRoZSBodWIgY29ubmVjdGlvbiBpcyByZWNvbm5lY3RpbmcuICovXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiUmVjb25uZWN0aW5nXCJdID0gXCJSZWNvbm5lY3RpbmdcIjtcbn0pKEh1YkNvbm5lY3Rpb25TdGF0ZSA9IGV4cG9ydHMuSHViQ29ubmVjdGlvblN0YXRlIHx8IChleHBvcnRzLkh1YkNvbm5lY3Rpb25TdGF0ZSA9IHt9KSk7XG4vKiogUmVwcmVzZW50cyBhIGNvbm5lY3Rpb24gdG8gYSBTaWduYWxSIEh1Yi4gKi9cbnZhciBIdWJDb25uZWN0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEh1YkNvbm5lY3Rpb24oY29ubmVjdGlvbiwgbG9nZ2VyLCBwcm90b2NvbCwgcmVjb25uZWN0UG9saWN5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIFV0aWxzXzEuQXJnLmlzUmVxdWlyZWQoY29ubmVjdGlvbiwgXCJjb25uZWN0aW9uXCIpO1xuICAgICAgICBVdGlsc18xLkFyZy5pc1JlcXVpcmVkKGxvZ2dlciwgXCJsb2dnZXJcIik7XG4gICAgICAgIFV0aWxzXzEuQXJnLmlzUmVxdWlyZWQocHJvdG9jb2wsIFwicHJvdG9jb2xcIik7XG4gICAgICAgIHRoaXMuc2VydmVyVGltZW91dEluTWlsbGlzZWNvbmRzID0gREVGQVVMVF9USU1FT1VUX0lOX01TO1xuICAgICAgICB0aGlzLmtlZXBBbGl2ZUludGVydmFsSW5NaWxsaXNlY29uZHMgPSBERUZBVUxUX1BJTkdfSU5URVJWQUxfSU5fTVM7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMucmVjb25uZWN0UG9saWN5ID0gcmVjb25uZWN0UG9saWN5O1xuICAgICAgICB0aGlzLmhhbmRzaGFrZVByb3RvY29sID0gbmV3IEhhbmRzaGFrZVByb3RvY29sXzEuSGFuZHNoYWtlUHJvdG9jb2woKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ucmVjZWl2ZSA9IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBfdGhpcy5wcm9jZXNzSW5jb21pbmdEYXRhKGRhdGEpOyB9O1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gX3RoaXMuY29ubmVjdGlvbkNsb3NlZChlcnJvcik7IH07XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgICAgIHRoaXMubWV0aG9kcyA9IHt9O1xuICAgICAgICB0aGlzLmNsb3NlZENhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGluZ0NhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGVkQ2FsbGJhY2tzID0gW107XG4gICAgICAgIHRoaXMuaW52b2NhdGlvbklkID0gMDtcbiAgICAgICAgdGhpcy5yZWNlaXZlZEhhbmRzaGFrZVJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhY2hlZFBpbmdNZXNzYWdlID0gdGhpcy5wcm90b2NvbC53cml0ZU1lc3NhZ2UoeyB0eXBlOiBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5QaW5nIH0pO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgLy8gVXNpbmcgYSBwdWJsaWMgc3RhdGljIGZhY3RvcnkgbWV0aG9kIG1lYW5zIHdlIGNhbiBoYXZlIGEgcHJpdmF0ZSBjb25zdHJ1Y3RvciBhbmQgYW4gX2ludGVybmFsX1xuICAgIC8vIGNyZWF0ZSBtZXRob2QgdGhhdCBjYW4gYmUgdXNlZCBieSBIdWJDb25uZWN0aW9uQnVpbGRlci4gQW4gXCJpbnRlcm5hbFwiIGNvbnN0cnVjdG9yIHdvdWxkIGp1c3RcbiAgICAvLyBiZSBzdHJpcHBlZCBhd2F5IGFuZCB0aGUgJy5kLnRzJyBmaWxlIHdvdWxkIGhhdmUgbm8gY29uc3RydWN0b3IsIHdoaWNoIGlzIGludGVycHJldGVkIGFzIGFcbiAgICAvLyBwdWJsaWMgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3IuXG4gICAgSHViQ29ubmVjdGlvbi5jcmVhdGUgPSBmdW5jdGlvbiAoY29ubmVjdGlvbiwgbG9nZ2VyLCBwcm90b2NvbCwgcmVjb25uZWN0UG9saWN5KSB7XG4gICAgICAgIHJldHVybiBuZXcgSHViQ29ubmVjdGlvbihjb25uZWN0aW9uLCBsb2dnZXIsIHByb3RvY29sLCByZWNvbm5lY3RQb2xpY3kpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLCBcInN0YXRlXCIsIHtcbiAgICAgICAgLyoqIEluZGljYXRlcyB0aGUgc3RhdGUgb2YgdGhlIHtAbGluayBIdWJDb25uZWN0aW9ufSB0byB0aGUgc2VydmVyLiAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLCBcImNvbm5lY3Rpb25JZFwiLCB7XG4gICAgICAgIC8qKiBSZXByZXNlbnRzIHRoZSBjb25uZWN0aW9uIGlkIG9mIHRoZSB7QGxpbmsgSHViQ29ubmVjdGlvbn0gb24gdGhlIHNlcnZlci4gVGhlIGNvbm5lY3Rpb24gaWQgd2lsbCBiZSBudWxsIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgZWl0aGVyXG4gICAgICAgICAqICBpbiB0aGUgZGlzY29ubmVjdGVkIHN0YXRlIG9yIGlmIHRoZSBuZWdvdGlhdGlvbiBzdGVwIHdhcyBza2lwcGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uID8gKHRoaXMuY29ubmVjdGlvbi5jb25uZWN0aW9uSWQgfHwgbnVsbCkgOiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSHViQ29ubmVjdGlvbi5wcm90b3R5cGUsIFwiYmFzZVVybFwiLCB7XG4gICAgICAgIC8qKiBJbmRpY2F0ZXMgdGhlIHVybCBvZiB0aGUge0BsaW5rIEh1YkNvbm5lY3Rpb259IHRvIHRoZSBzZXJ2ZXIuICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5iYXNlVXJsIHx8IFwiXCI7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIGEgbmV3IHVybCBmb3IgdGhlIEh1YkNvbm5lY3Rpb24uIE5vdGUgdGhhdCB0aGUgdXJsIGNhbiBvbmx5IGJlIGNoYW5nZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBpbiBlaXRoZXIgdGhlIERpc2Nvbm5lY3RlZCBvclxuICAgICAgICAgKiBSZWNvbm5lY3Rpbmcgc3RhdGVzLlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgdG8gY29ubmVjdCB0by5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkICYmIHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBIdWJDb25uZWN0aW9uU3RhdGUuUmVjb25uZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIEh1YkNvbm5lY3Rpb24gbXVzdCBiZSBpbiB0aGUgRGlzY29ubmVjdGVkIG9yIFJlY29ubmVjdGluZyBzdGF0ZSB0byBjaGFuZ2UgdGhlIHVybC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBIdWJDb25uZWN0aW9uIHVybCBtdXN0IGJlIGEgdmFsaWQgdXJsLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5iYXNlVXJsID0gdXJsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKiogU3RhcnRzIHRoZSBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGVzdGFibGlzaGVkLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAgICovXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRQcm9taXNlID0gdGhpcy5zdGFydFdpdGhTdGF0ZVRyYW5zaXRpb25zKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0UHJvbWlzZTtcbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0YXJ0V2l0aFN0YXRlVHJhbnNpdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHN0YXJ0IGEgSHViQ29ubmVjdGlvbiB0aGF0IGlzIG5vdCBpbiB0aGUgJ0Rpc2Nvbm5lY3RlZCcgc3RhdGUuXCIpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJTdGFydGluZyBIdWJDb25uZWN0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRJbnRlcm5hbCgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkh1YkNvbm5lY3Rpb24gY29ubmVjdGVkIHN1Y2Nlc3NmdWxseS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJIdWJDb25uZWN0aW9uIGZhaWxlZCB0byBzdGFydCBzdWNjZXNzZnVsbHkgYmVjYXVzZSBvZiBlcnJvciAnXCIgKyBlXzEgKyBcIicuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KGVfMSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydEludGVybmFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaGFuZHNoYWtlUHJvbWlzZSwgaGFuZHNoYWtlUmVxdWVzdCwgZV8yO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVkSGFuZHNoYWtlUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRzaGFrZVByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGFuZHNoYWtlUmVzb2x2ZXIgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhhbmRzaGFrZVJlamVjdGVyID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmNvbm5lY3Rpb24uc3RhcnQodGhpcy5wcm90b2NvbC50cmFuc2ZlckZvcm1hdCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMiwgNSwgLCA3XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kc2hha2VSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiB0aGlzLnByb3RvY29sLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy5wcm90b2NvbC52ZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsIFwiU2VuZGluZyBoYW5kc2hha2UgcmVxdWVzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlbmRNZXNzYWdlKHRoaXMuaGFuZHNoYWtlUHJvdG9jb2wud3JpdGVIYW5kc2hha2VSZXF1ZXN0KGhhbmRzaGFrZVJlcXVlc3QpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiVXNpbmcgSHViUHJvdG9jb2wgJ1wiICsgdGhpcy5wcm90b2NvbC5uYW1lICsgXCInLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmVuc2l2ZWx5IGNsZWFudXAgdGltZW91dCBpbiBjYXNlIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciBiZWZvcmUgd2UgZmluaXNoIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXBUaW1lb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VGltZW91dFBlcmlvZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEtlZXBBbGl2ZUludGVydmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBoYW5kc2hha2VQcm9taXNlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gY2hlY2sgdGhlIHN0b3BEdXJpbmdTdGFydEVycm9yIGluc3RlYWQgb2YganVzdCByZWx5aW5nIG9uIHRoZSBoYW5kc2hha2VQcm9taXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiZWluZyByZWplY3RlZCBvbiBjbG9zZSwgYmVjYXVzZSB0aGlzIGNvbnRpbnVhdGlvbiBjYW4gcnVuIGFmdGVyIGJvdGggdGhlIGhhbmRzaGFrZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGNvbm5lY3Rpb24gd2FzIGNsb3NlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0b3BEdXJpbmdTdGFydEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdGhyb3cgaW5zdGVhZCBvZiByZXR1cm5pbmcgYSByZWplY3RlZCBwcm9taXNlLCBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gYWxsb3cgYW55IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNpdGlvbnMgdG8gb2NjdXIgYmV0d2VlbiBub3cgYW5kIHRoZSBjYWxsaW5nIGNvZGUgb2JzZXJ2aW5nIHRoZSBleGNlcHRpb25zLiBSZXR1cm5pbmcgYSByZWplY3RlZCBwcm9taXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBjYXVzZSB0aGUgY2FsbGluZyBjb250aW51YXRpb24gdG8gZ2V0IHNjaGVkdWxlZCB0byBydW4gbGF0ZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkh1YiBoYW5kc2hha2UgZmFpbGVkIHdpdGggZXJyb3IgJ1wiICsgZV8yICsgXCInIGR1cmluZyBzdGFydCgpLiBTdG9wcGluZyBIdWJDb25uZWN0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cFBpbmdUaW1lcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSHR0cENvbm5lY3Rpb24uc3RvcCgpIHNob3VsZCBub3QgY29tcGxldGUgdW50aWwgYWZ0ZXIgdGhlIG9uY2xvc2UgY2FsbGJhY2sgaXMgaW52b2tlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCB0cmFuc2l0aW9uIHRoZSBIdWJDb25uZWN0aW9uIHRvIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUgYmVmb3JlIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBjb21wbGV0ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmNvbm5lY3Rpb24uc3RvcChlXzIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSHR0cENvbm5lY3Rpb24uc3RvcCgpIHNob3VsZCBub3QgY29tcGxldGUgdW50aWwgYWZ0ZXIgdGhlIG9uY2xvc2UgY2FsbGJhY2sgaXMgaW52b2tlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCB0cmFuc2l0aW9uIHRoZSBIdWJDb25uZWN0aW9uIHRvIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUgYmVmb3JlIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBjb21wbGV0ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXzI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBTdG9wcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSB0ZXJtaW5hdGVkLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAgICovXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0UHJvbWlzZSwgZV8zO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQcm9taXNlID0gdGhpcy5zdGFydFByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlID0gdGhpcy5zdG9wSW50ZXJuYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcFByb21pc2VdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMiwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBd2FpdGluZyB1bmRlZmluZWQgY29udGludWVzIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBzdGFydFByb21pc2VdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBd2FpdGluZyB1bmRlZmluZWQgY29udGludWVzIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8zID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0b3BJbnRlcm5hbCA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdWJDb25uZWN0aW9uLnN0b3AoXCIgKyBlcnJvciArIFwiKSBpZ25vcmVkIGJlY2F1c2UgaXQgaXMgYWxyZWFkeSBpbiB0aGUgZGlzY29ubmVjdGVkIHN0YXRlLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkNhbGwgdG8gSHR0cENvbm5lY3Rpb24uc3RvcChcIiArIGVycm9yICsgXCIpIGlnbm9yZWQgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IGluIHRoZSBkaXNjb25uZWN0aW5nIHN0YXRlLlwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3BQcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3Rpbmc7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsIFwiU3RvcHBpbmcgSHViQ29ubmVjdGlvbi5cIik7XG4gICAgICAgIGlmICh0aGlzLnJlY29ubmVjdERlbGF5SGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBpbiBhIHJlY29ubmVjdCBkZWxheSB3aGljaCBtZWFucyB0aGUgdW5kZXJseWluZyBjb25uZWN0aW9uIGlzIGN1cnJlbnRseSBhbHJlYWR5IHN0b3BwZWQuXG4gICAgICAgICAgICAvLyBKdXN0IGNsZWFyIHRoZSBoYW5kbGUgdG8gc3RvcCB0aGUgcmVjb25uZWN0IGxvb3AgKHdoaWNoIG5vIG9uZSBpcyB3YWl0aW5nIG9uIHRoYW5rZnVsbHkpIGFuZFxuICAgICAgICAgICAgLy8gZmlyZSB0aGUgb25jbG9zZSBjYWxsYmFja3MuXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkNvbm5lY3Rpb24gc3RvcHBlZCBkdXJpbmcgcmVjb25uZWN0IGRlbGF5LiBEb25lIHJlY29ubmVjdGluZy5cIik7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZWNvbm5lY3REZWxheUhhbmRsZSk7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdERlbGF5SGFuZGxlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhbnVwVGltZW91dCgpO1xuICAgICAgICB0aGlzLmNsZWFudXBQaW5nVGltZXIoKTtcbiAgICAgICAgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvciA9IGVycm9yIHx8IG5ldyBFcnJvcihcIlRoZSBjb25uZWN0aW9uIHdhcyBzdG9wcGVkIGJlZm9yZSB0aGUgaHViIGhhbmRzaGFrZSBjb3VsZCBjb21wbGV0ZS5cIik7XG4gICAgICAgIC8vIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBzaG91bGQgbm90IGNvbXBsZXRlIHVudGlsIGFmdGVyIGVpdGhlciBIdHRwQ29ubmVjdGlvbi5zdGFydCgpIGZhaWxzXG4gICAgICAgIC8vIG9yIHRoZSBvbmNsb3NlIGNhbGxiYWNrIGlzIGludm9rZWQuIFRoZSBvbmNsb3NlIGNhbGxiYWNrIHdpbGwgdHJhbnNpdGlvbiB0aGUgSHViQ29ubmVjdGlvblxuICAgICAgICAvLyB0byB0aGUgZGlzY29ubmVjdGVkIHN0YXRlIGlmIG5lZWQgYmUgYmVmb3JlIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBjb21wbGV0ZXMuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc3RvcChlcnJvcik7XG4gICAgfTtcbiAgICAvKiogSW52b2tlcyBhIHN0cmVhbWluZyBodWIgbWV0aG9kIG9uIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBAdHlwZXBhcmFtIFQgVGhlIHR5cGUgb2YgdGhlIGl0ZW1zIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZlciBtZXRob2QgdG8gaW52b2tlLlxuICAgICAqIEBwYXJhbSB7YW55W119IGFyZ3MgVGhlIGFyZ3VtZW50cyB1c2VkIHRvIGludm9rZSB0aGUgc2VydmVyIG1ldGhvZC5cbiAgICAgKiBAcmV0dXJucyB7SVN0cmVhbVJlc3VsdDxUPn0gQW4gb2JqZWN0IHRoYXQgeWllbGRzIHJlc3VsdHMgZnJvbSB0aGUgc2VydmVyIGFzIHRoZXkgYXJlIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcbiAgICAgICAgdmFyIGludm9jYXRpb25EZXNjcmlwdG9yID0gdGhpcy5jcmVhdGVTdHJlYW1JbnZvY2F0aW9uKG1ldGhvZE5hbWUsIGFyZ3MsIHN0cmVhbUlkcyk7XG4gICAgICAgIHZhciBwcm9taXNlUXVldWU7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IFN1YmplY3RfMS5TdWJqZWN0KCk7XG4gICAgICAgIHN1YmplY3QuY2FuY2VsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2FuY2VsSW52b2NhdGlvbiA9IF90aGlzLmNyZWF0ZUNhbmNlbEludm9jYXRpb24oaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkKTtcbiAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5jYWxsYmFja3NbaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkXTtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUXVldWUudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNlbmRXaXRoUHJvdG9jb2woY2FuY2VsSW52b2NhdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkXSA9IGZ1bmN0aW9uIChpbnZvY2F0aW9uRXZlbnQsIGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbnZvY2F0aW9uRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uRXZlbnQgd2lsbCBub3QgYmUgbnVsbCB3aGVuIGFuIGVycm9yIGlzIG5vdCBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgaWYgKGludm9jYXRpb25FdmVudC50eXBlID09PSBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5Db21wbGV0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uRXZlbnQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IobmV3IEVycm9yKGludm9jYXRpb25FdmVudC5lcnJvcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0Lm5leHQoKGludm9jYXRpb25FdmVudC5pdGVtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwcm9taXNlUXVldWUgPSB0aGlzLnNlbmRXaXRoUHJvdG9jb2woaW52b2NhdGlvbkRlc2NyaXB0b3IpXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZSk7XG4gICAgICAgICAgICBkZWxldGUgX3RoaXMuY2FsbGJhY2tzW2ludm9jYXRpb25EZXNjcmlwdG9yLmludm9jYXRpb25JZF07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxhdW5jaFN0cmVhbXMoc3RyZWFtcywgcHJvbWlzZVF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMucmVzZXRLZWVwQWxpdmVJbnRlcnZhbCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGpzIG9iamVjdCB0byB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBqcyBvYmplY3QgdG8gc2VyaWFsaXplIGFuZCBzZW5kLlxuICAgICAqL1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRXaXRoUHJvdG9jb2wgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kTWVzc2FnZSh0aGlzLnByb3RvY29sLndyaXRlTWVzc2FnZShtZXNzYWdlKSk7XG4gICAgfTtcbiAgICAvKiogSW52b2tlcyBhIGh1YiBtZXRob2Qgb24gdGhlIHNlcnZlciB1c2luZyB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIGFyZ3VtZW50cy4gRG9lcyBub3Qgd2FpdCBmb3IgYSByZXNwb25zZSBmcm9tIHRoZSByZWNlaXZlci5cbiAgICAgKlxuICAgICAqIFRoZSBQcm9taXNlIHJldHVybmVkIGJ5IHRoaXMgbWV0aG9kIHJlc29sdmVzIHdoZW4gdGhlIGNsaWVudCBoYXMgc2VudCB0aGUgaW52b2NhdGlvbiB0byB0aGUgc2VydmVyLiBUaGUgc2VydmVyIG1heSBzdGlsbFxuICAgICAqIGJlIHByb2Nlc3NpbmcgdGhlIGludm9jYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgc2VydmVyIG1ldGhvZCB0byBpbnZva2UuXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJncyBUaGUgYXJndW1lbnRzIHVzZWQgdG8gaW52b2tlIHRoZSBzZXJ2ZXIgbWV0aG9kLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBpbnZvY2F0aW9uIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBzZW50LCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAgICovXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcbiAgICAgICAgdmFyIHNlbmRQcm9taXNlID0gdGhpcy5zZW5kV2l0aFByb3RvY29sKHRoaXMuY3JlYXRlSW52b2NhdGlvbihtZXRob2ROYW1lLCBhcmdzLCB0cnVlLCBzdHJlYW1JZHMpKTtcbiAgICAgICAgdGhpcy5sYXVuY2hTdHJlYW1zKHN0cmVhbXMsIHNlbmRQcm9taXNlKTtcbiAgICAgICAgcmV0dXJuIHNlbmRQcm9taXNlO1xuICAgIH07XG4gICAgLyoqIEludm9rZXMgYSBodWIgbWV0aG9kIG9uIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBUaGUgUHJvbWlzZSByZXR1cm5lZCBieSB0aGlzIG1ldGhvZCByZXNvbHZlcyB3aGVuIHRoZSBzZXJ2ZXIgaW5kaWNhdGVzIGl0IGhhcyBmaW5pc2hlZCBpbnZva2luZyB0aGUgbWV0aG9kLiBXaGVuIHRoZSBwcm9taXNlXG4gICAgICogcmVzb2x2ZXMsIHRoZSBzZXJ2ZXIgaGFzIGZpbmlzaGVkIGludm9raW5nIHRoZSBtZXRob2QuIElmIHRoZSBzZXJ2ZXIgbWV0aG9kIHJldHVybnMgYSByZXN1bHQsIGl0IGlzIHByb2R1Y2VkIGFzIHRoZSByZXN1bHQgb2ZcbiAgICAgKiByZXNvbHZpbmcgdGhlIFByb21pc2UuXG4gICAgICpcbiAgICAgKiBAdHlwZXBhcmFtIFQgVGhlIGV4cGVjdGVkIHJldHVybiB0eXBlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2ZXIgbWV0aG9kIHRvIGludm9rZS5cbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzIFRoZSBhcmd1bWVudHMgdXNlZCB0byBpbnZva2UgdGhlIHNlcnZlciBtZXRob2QuXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3VsdCBvZiB0aGUgc2VydmVyIG1ldGhvZCAoaWYgYW55KSwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxuICAgICAqL1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcbiAgICAgICAgdmFyIGludm9jYXRpb25EZXNjcmlwdG9yID0gdGhpcy5jcmVhdGVJbnZvY2F0aW9uKG1ldGhvZE5hbWUsIGFyZ3MsIGZhbHNlLCBzdHJlYW1JZHMpO1xuICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vIGludm9jYXRpb25JZCB3aWxsIGFsd2F5cyBoYXZlIGEgdmFsdWUgZm9yIGEgbm9uLWJsb2NraW5nIGludm9jYXRpb25cbiAgICAgICAgICAgIF90aGlzLmNhbGxiYWNrc1tpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWRdID0gZnVuY3Rpb24gKGludm9jYXRpb25FdmVudCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnZvY2F0aW9uRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW52b2NhdGlvbkV2ZW50IHdpbGwgbm90IGJlIG51bGwgd2hlbiBhbiBlcnJvciBpcyBub3QgcGFzc2VkIHRvIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkV2ZW50LnR5cGUgPT09IElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlLkNvbXBsZXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uRXZlbnQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGludm9jYXRpb25FdmVudC5lcnJvcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpbnZvY2F0aW9uRXZlbnQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIG1lc3NhZ2UgdHlwZTogXCIgKyBpbnZvY2F0aW9uRXZlbnQudHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBwcm9taXNlUXVldWUgPSBfdGhpcy5zZW5kV2l0aFByb3RvY29sKGludm9jYXRpb25EZXNjcmlwdG9yKVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uSWQgd2lsbCBhbHdheXMgaGF2ZSBhIHZhbHVlIGZvciBhIG5vbi1ibG9ja2luZyBpbnZvY2F0aW9uXG4gICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLmNhbGxiYWNrc1tpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWRdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5sYXVuY2hTdHJlYW1zKHN0cmVhbXMsIHByb21pc2VRdWV1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9O1xuICAgIC8qKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGh1YiBtZXRob2Qgd2l0aCB0aGUgc3BlY2lmaWVkIG1ldGhvZCBuYW1lIGlzIGludm9rZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgaHViIG1ldGhvZCB0byBkZWZpbmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3TWV0aG9kIFRoZSBoYW5kbGVyIHRoYXQgd2lsbCBiZSByYWlzZWQgd2hlbiB0aGUgaHViIG1ldGhvZCBpcyBpbnZva2VkLlxuICAgICAqL1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIG5ld01ldGhvZCkge1xuICAgICAgICBpZiAoIW1ldGhvZE5hbWUgfHwgIW5ld01ldGhvZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1ldGhvZE5hbWUgPSBtZXRob2ROYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghdGhpcy5tZXRob2RzW21ldGhvZE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQcmV2ZW50aW5nIGFkZGluZyB0aGUgc2FtZSBoYW5kbGVyIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICBpZiAodGhpcy5tZXRob2RzW21ldGhvZE5hbWVdLmluZGV4T2YobmV3TWV0aG9kKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV0ucHVzaChuZXdNZXRob2QpO1xuICAgIH07XG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIG1ldGhvZCkge1xuICAgICAgICBpZiAoIW1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtZXRob2ROYW1lID0gbWV0aG9kTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV07XG4gICAgICAgIGlmICghaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlSWR4ID0gaGFuZGxlcnMuaW5kZXhPZihtZXRob2QpO1xuICAgICAgICAgICAgaWYgKHJlbW92ZUlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UocmVtb3ZlSWR4LCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBjbG9zZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NlZC4gT3B0aW9uYWxseSByZWNlaXZlcyBhIHNpbmdsZSBhcmd1bWVudCBjb250YWluaW5nIHRoZSBlcnJvciB0aGF0IGNhdXNlZCB0aGUgY29ubmVjdGlvbiB0byBjbG9zZSAoaWYgYW55KS5cbiAgICAgKi9cbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmNsb3NlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5jbG9zZWRDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhcnRzIHJlY29ubmVjdGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhcnRzIHJlY29ubmVjdGluZy4gT3B0aW9uYWxseSByZWNlaXZlcyBhIHNpbmdsZSBhcmd1bWVudCBjb250YWluaW5nIHRoZSBlcnJvciB0aGF0IGNhdXNlZCB0aGUgY29ubmVjdGlvbiB0byBzdGFydCByZWNvbm5lY3RpbmcgKGlmIGFueSkuXG4gICAgICovXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUub25yZWNvbm5lY3RpbmcgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkgcmVjb25uZWN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5IHJlY29ubmVjdHMuXG4gICAgICovXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUub25yZWNvbm5lY3RlZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0ZWRDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnByb2Nlc3NJbmNvbWluZ0RhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLmNsZWFudXBUaW1lb3V0KCk7XG4gICAgICAgIGlmICghdGhpcy5yZWNlaXZlZEhhbmRzaGFrZVJlc3BvbnNlKSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5wcm9jZXNzSGFuZHNoYWtlUmVzcG9uc2UoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVkSGFuZHNoYWtlUmVzcG9uc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIERhdGEgbWF5IGhhdmUgYWxsIGJlZW4gcmVhZCB3aGVuIHByb2Nlc3NpbmcgaGFuZHNoYWtlIHJlc3BvbnNlXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAvLyBQYXJzZSB0aGUgbWVzc2FnZXNcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IHRoaXMucHJvdG9jb2wucGFyc2VNZXNzYWdlcyhkYXRhLCB0aGlzLmxvZ2dlcik7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIG1lc3NhZ2VzXzEgPSBtZXNzYWdlczsgX2kgPCBtZXNzYWdlc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbWVzc2FnZXNfMVtfaV07XG4gICAgICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5JbnZvY2F0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZva2VDbGllbnRNZXRob2QobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5TdHJlYW1JdGVtOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlLkNvbXBsZXRpb246XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1ttZXNzYWdlLmludm9jYXRpb25JZF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5Db21wbGV0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1ttZXNzYWdlLmludm9jYXRpb25JZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSUh1YlByb3RvY29sXzEuTWVzc2FnZVR5cGUuUGluZzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNhcmUgYWJvdXQgcGluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlLkNsb3NlOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJDbG9zZSBtZXNzYWdlIHJlY2VpdmVkIGZyb20gc2VydmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG1lc3NhZ2UuZXJyb3IgPyBuZXcgRXJyb3IoXCJTZXJ2ZXIgcmV0dXJuZWQgYW4gZXJyb3Igb24gY2xvc2U6IFwiICsgbWVzc2FnZS5lcnJvcikgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5hbGxvd1JlY29ubmVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0IGZlZWxzIHdyb25nIG5vdCB0byBhd2FpdCBjb25uZWN0aW9uLnN0b3AoKSBoZXJlLCBidXQgcHJvY2Vzc0luY29taW5nRGF0YSBpcyBjYWxsZWQgYXMgcGFydCBvZiBhbiBvbnJlY2VpdmUgY2FsbGJhY2sgd2hpY2ggaXMgbm90IGFzeW5jLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYWxyZWFkeSB0aGUgYmVoYXZpb3IgZm9yIHNlcnZlclRpbWVvdXQoKSwgYW5kIEh0dHBDb25uZWN0aW9uLlN0b3AoKSBzaG91bGQgY2F0Y2ggYW5kIGxvZyBhbGwgcG9zc2libGUgZXhjZXB0aW9ucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc3RvcChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW5ub3QgYXdhaXQgc3RvcEludGVybmFsKCkgaGVyZSwgYnV0IHN1YnNlcXVlbnQgY2FsbHMgdG8gc3RvcCgpIHdpbGwgYXdhaXQgdGhpcyBpZiBzdG9wSW50ZXJuYWwoKSBpcyBzdGlsbCBvbmdvaW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2UgPSB0aGlzLnN0b3BJbnRlcm5hbChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuV2FybmluZywgXCJJbnZhbGlkIG1lc3NhZ2UgdHlwZTogXCIgKyBtZXNzYWdlLnR5cGUgKyBcIi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXRQZXJpb2QoKTtcbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnByb2Nlc3NIYW5kc2hha2VSZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIHJlc3BvbnNlTWVzc2FnZTtcbiAgICAgICAgdmFyIHJlbWFpbmluZ0RhdGE7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBfYSA9IHRoaXMuaGFuZHNoYWtlUHJvdG9jb2wucGFyc2VIYW5kc2hha2VSZXNwb25zZShkYXRhKSwgcmVtYWluaW5nRGF0YSA9IF9hWzBdLCByZXNwb25zZU1lc3NhZ2UgPSBfYVsxXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIkVycm9yIHBhcnNpbmcgaGFuZHNoYWtlIHJlc3BvbnNlOiBcIiArIGU7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlUmVqZWN0ZXIoZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlTWVzc2FnZS5lcnJvcikge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIlNlcnZlciByZXR1cm5lZCBoYW5kc2hha2UgZXJyb3I6IFwiICsgcmVzcG9uc2VNZXNzYWdlLmVycm9yO1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRzaGFrZVJlamVjdGVyKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJTZXJ2ZXIgaGFuZHNoYWtlIGNvbXBsZXRlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRzaGFrZVJlc29sdmVyKCk7XG4gICAgICAgIHJldHVybiByZW1haW5pbmdEYXRhO1xuICAgIH07XG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUucmVzZXRLZWVwQWxpdmVJbnRlcnZhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbi5mZWF0dXJlcy5pbmhlcmVudEtlZXBBbGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYW51cFBpbmdUaW1lcigpO1xuICAgICAgICB0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlbmRNZXNzYWdlKHRoaXMuY2FjaGVkUGluZ01lc3NhZ2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgY2FyZSBhYm91dCB0aGUgZXJyb3IuIEl0IHNob3VsZCBiZSBzZWVuIGVsc2V3aGVyZSBpbiB0aGUgY2xpZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGNvbm5lY3Rpb24gaXMgcHJvYmFibHkgaW4gYSBiYWQgb3IgY2xvc2VkIHN0YXRlIG5vdywgY2xlYW51cCB0aGUgdGltZXIgc28gaXQgc3RvcHMgdHJpZ2dlcmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pOyB9LCB0aGlzLmtlZXBBbGl2ZUludGVydmFsSW5NaWxsaXNlY29uZHMpO1xuICAgIH07XG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUucmVzZXRUaW1lb3V0UGVyaW9kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbi5mZWF0dXJlcyB8fCAhdGhpcy5jb25uZWN0aW9uLmZlYXR1cmVzLmluaGVyZW50S2VlcEFsaXZlKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHRpbWVvdXQgdGltZXJcbiAgICAgICAgICAgIHRoaXMudGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc2VydmVyVGltZW91dCgpOyB9LCB0aGlzLnNlcnZlclRpbWVvdXRJbk1pbGxpc2Vjb25kcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlcnZlclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFRoZSBzZXJ2ZXIgaGFzbid0IHRhbGtlZCB0byB1cyBpbiBhIHdoaWxlLiBJdCBkb2Vzbid0IGxpa2UgdXMgYW55bW9yZSAuLi4gOihcbiAgICAgICAgLy8gVGVybWluYXRlIHRoZSBjb25uZWN0aW9uLCBidXQgd2UgZG9uJ3QgbmVlZCB0byB3YWl0IG9uIHRoZSBwcm9taXNlLiBUaGlzIGNvdWxkIHRyaWdnZXIgcmVjb25uZWN0aW5nLlxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnN0b3AobmV3IEVycm9yKFwiU2VydmVyIHRpbWVvdXQgZWxhcHNlZCB3aXRob3V0IHJlY2VpdmluZyBhIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyLlwiKSk7XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5pbnZva2VDbGllbnRNZXRob2QgPSBmdW5jdGlvbiAoaW52b2NhdGlvbk1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1ldGhvZHMgPSB0aGlzLm1ldGhvZHNbaW52b2NhdGlvbk1lc3NhZ2UudGFyZ2V0LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICBpZiAobWV0aG9kcykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uYXBwbHkoX3RoaXMsIGludm9jYXRpb25NZXNzYWdlLmFyZ3VtZW50cyk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBcIkEgY2FsbGJhY2sgZm9yIHRoZSBtZXRob2QgXCIgKyBpbnZvY2F0aW9uTWVzc2FnZS50YXJnZXQudG9Mb3dlckNhc2UoKSArIFwiIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGludm9jYXRpb25NZXNzYWdlLmludm9jYXRpb25JZCkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiB2MS4gU28gd2UgcmV0dXJuIGFuIGVycm9yIHRvIGF2b2lkIGJsb2NraW5nIHRoZSBzZXJ2ZXIgd2FpdGluZyBmb3IgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJTZXJ2ZXIgcmVxdWVzdGVkIGEgcmVzcG9uc2UsIHdoaWNoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyB2ZXJzaW9uIG9mIHRoZSBjbGllbnQuXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB3YWl0IG9uIHRoZSBzdG9wIGl0c2VsZi5cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlID0gdGhpcy5zdG9wSW50ZXJuYWwobmV3IEVycm9yKG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuV2FybmluZywgXCJObyBjbGllbnQgbWV0aG9kIHdpdGggdGhlIG5hbWUgJ1wiICsgaW52b2NhdGlvbk1lc3NhZ2UudGFyZ2V0ICsgXCInIGZvdW5kLlwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY29ubmVjdGlvbkNsb3NlZCA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkh1YkNvbm5lY3Rpb24uY29ubmVjdGlvbkNsb3NlZChcIiArIGVycm9yICsgXCIpIGNhbGxlZCB3aGlsZSBpbiBzdGF0ZSBcIiArIHRoaXMuY29ubmVjdGlvblN0YXRlICsgXCIuXCIpO1xuICAgICAgICAvLyBUcmlnZ2VyaW5nIHRoaXMuaGFuZHNoYWtlUmVqZWN0ZXIgaXMgaW5zdWZmaWNpZW50IGJlY2F1c2UgaXQgY291bGQgYWxyZWFkeSBiZSByZXNvbHZlZCB3aXRob3V0IHRoZSBjb250aW51YXRpb24gaGF2aW5nIHJ1biB5ZXQuXG4gICAgICAgIHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IgPSB0aGlzLnN0b3BEdXJpbmdTdGFydEVycm9yIHx8IGVycm9yIHx8IG5ldyBFcnJvcihcIlRoZSB1bmRlcmx5aW5nIGNvbm5lY3Rpb24gd2FzIGNsb3NlZCBiZWZvcmUgdGhlIGh1YiBoYW5kc2hha2UgY291bGQgY29tcGxldGUuXCIpO1xuICAgICAgICAvLyBJZiB0aGUgaGFuZHNoYWtlIGlzIGluIHByb2dyZXNzLCBzdGFydCB3aWxsIGJlIHdhaXRpbmcgZm9yIHRoZSBoYW5kc2hha2UgcHJvbWlzZSwgc28gd2UgY29tcGxldGUgaXQuXG4gICAgICAgIC8vIElmIGl0IGhhcyBhbHJlYWR5IGNvbXBsZXRlZCwgdGhpcyBzaG91bGQganVzdCBub29wLlxuICAgICAgICBpZiAodGhpcy5oYW5kc2hha2VSZXNvbHZlcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kc2hha2VSZXNvbHZlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FuY2VsQ2FsbGJhY2tzV2l0aEVycm9yKGVycm9yIHx8IG5ldyBFcnJvcihcIkludm9jYXRpb24gY2FuY2VsZWQgZHVlIHRvIHRoZSB1bmRlcmx5aW5nIGNvbm5lY3Rpb24gYmVpbmcgY2xvc2VkLlwiKSk7XG4gICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcbiAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDbG9zZShlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQgJiYgdGhpcy5yZWNvbm5lY3RQb2xpY3kpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIG5vbmUgb2YgdGhlIGFib3ZlIGlmIGNvbmRpdGlvbnMgd2VyZSB0cnVlIHdlcmUgY2FsbGVkIHRoZSBIdWJDb25uZWN0aW9uIG11c3QgYmUgaW4gZWl0aGVyOlxuICAgICAgICAvLyAxLiBUaGUgQ29ubmVjdGluZyBzdGF0ZSBpbiB3aGljaCBjYXNlIHRoZSBoYW5kc2hha2VSZXNvbHZlciB3aWxsIGNvbXBsZXRlIGl0IGFuZCBzdG9wRHVyaW5nU3RhcnRFcnJvciB3aWxsIGZhaWwgaXQuXG4gICAgICAgIC8vIDIuIFRoZSBSZWNvbm5lY3Rpbmcgc3RhdGUgaW4gd2hpY2ggY2FzZSB0aGUgaGFuZHNoYWtlUmVzb2x2ZXIgd2lsbCBjb21wbGV0ZSBpdCBhbmQgc3RvcER1cmluZ1N0YXJ0RXJyb3Igd2lsbCBmYWlsIHRoZSBjdXJyZW50IHJlY29ubmVjdCBhdHRlbXB0XG4gICAgICAgIC8vICAgIGFuZCBwb3RlbnRpYWxseSBjb250aW51ZSB0aGUgcmVjb25uZWN0KCkgbG9vcC5cbiAgICAgICAgLy8gMy4gVGhlIERpc2Nvbm5lY3RlZCBzdGF0ZSBpbiB3aGljaCBjYXNlIHdlJ3JlIGFscmVhZHkgZG9uZS5cbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNvbXBsZXRlQ2xvc2UgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWRDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hcHBseShfdGhpcywgW2Vycm9yXSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBcIkFuIG9uY2xvc2UgY2FsbGJhY2sgY2FsbGVkIHdpdGggZXJyb3IgJ1wiICsgZXJyb3IgKyBcIicgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnJlY29ubmVjdCA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVjb25uZWN0U3RhcnRUaW1lLCBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzLCByZXRyeUVycm9yLCBuZXh0UmV0cnlEZWxheSwgZV80O1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29ubmVjdFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5RXJyb3IgPSBlcnJvciAhPT0gdW5kZWZpbmVkID8gZXJyb3IgOiBuZXcgRXJyb3IoXCJBdHRlbXB0aW5nIHRvIHJlY29ubmVjdCBkdWUgdG8gYSB1bmtub3duIGVycm9yLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSZXRyeURlbGF5ID0gdGhpcy5nZXROZXh0UmV0cnlEZWxheShwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzKyssIDAsIHJldHJ5RXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRSZXRyeURlbGF5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIG5vdCByZWNvbm5lY3RpbmcgYmVjYXVzZSB0aGUgSVJldHJ5UG9saWN5IHJldHVybmVkIG51bGwgb24gdGhlIGZpcnN0IHJlY29ubmVjdCBhdHRlbXB0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiQ29ubmVjdGlvbiByZWNvbm5lY3RpbmcgYmVjYXVzZSBvZiBlcnJvciAnXCIgKyBlcnJvciArIFwiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkluZm9ybWF0aW9uLCBcIkNvbm5lY3Rpb24gcmVjb25uZWN0aW5nLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ucmVjb25uZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RpbmdDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hcHBseShfdGhpcywgW2Vycm9yXSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBcIkFuIG9ucmVjb25uZWN0aW5nIGNhbGxiYWNrIGNhbGxlZCB3aXRoIGVycm9yICdcIiArIGVycm9yICsgXCInIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGl0IGVhcmx5IGlmIGFuIG9ucmVjb25uZWN0aW5nIGNhbGxiYWNrIGNhbGxlZCBjb25uZWN0aW9uLnN0b3AoKS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIGxlZnQgdGhlIHJlY29ubmVjdGluZyBzdGF0ZSBpbiBvbnJlY29ubmVjdGluZyBjYWxsYmFjay4gRG9uZSByZWNvbm5lY3RpbmcuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShuZXh0UmV0cnlEZWxheSAhPT0gbnVsbCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJSZWNvbm5lY3QgYXR0ZW1wdCBudW1iZXIgXCIgKyBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzICsgXCIgd2lsbCBzdGFydCBpbiBcIiArIG5leHRSZXRyeURlbGF5ICsgXCIgbXMuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVjb25uZWN0RGVsYXlIYW5kbGUgPSBzZXRUaW1lb3V0KHJlc29sdmUsIG5leHRSZXRyeURlbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25uZWN0RGVsYXlIYW5kbGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkNvbm5lY3Rpb24gbGVmdCB0aGUgcmVjb25uZWN0aW5nIHN0YXRlIGR1cmluZyByZWNvbm5lY3QgZGVsYXkuIERvbmUgcmVjb25uZWN0aW5nLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMywgNSwgLCA2XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0SW50ZXJuYWwoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiSHViQ29ubmVjdGlvbiByZWNvbm5lY3RlZCBzdWNjZXNzZnVsbHkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25yZWNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25uZWN0ZWRDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hcHBseShfdGhpcywgW190aGlzLmNvbm5lY3Rpb24uY29ubmVjdGlvbklkXSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBcIkFuIG9ucmVjb25uZWN0ZWQgY2FsbGJhY2sgY2FsbGVkIHdpdGggY29ubmVjdGlvbklkICdcIiArIHRoaXMuY29ubmVjdGlvbi5jb25uZWN0aW9uSWQgKyBcIjsgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlJlY29ubmVjdCBhdHRlbXB0IGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yICdcIiArIGVfNCArIFwiJy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkRlYnVnLCBcIkNvbm5lY3Rpb24gbGVmdCB0aGUgcmVjb25uZWN0aW5nIHN0YXRlIGR1cmluZyByZWNvbm5lY3QgYXR0ZW1wdC4gRG9uZSByZWNvbm5lY3RpbmcuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5RXJyb3IgPSBlXzQgaW5zdGFuY2VvZiBFcnJvciA/IGVfNCA6IG5ldyBFcnJvcihlXzQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UmV0cnlEZWxheSA9IHRoaXMuZ2V0TmV4dFJldHJ5RGVsYXkocHJldmlvdXNSZWNvbm5lY3RBdHRlbXB0cysrLCBEYXRlLm5vdygpIC0gcmVjb25uZWN0U3RhcnRUaW1lLCByZXRyeUVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlJlY29ubmVjdCByZXRyaWVzIGhhdmUgYmVlbiBleGhhdXN0ZWQgYWZ0ZXIgXCIgKyAoRGF0ZS5ub3coKSAtIHJlY29ubmVjdFN0YXJ0VGltZSkgKyBcIiBtcyBhbmQgXCIgKyBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzICsgXCIgZmFpbGVkIGF0dGVtcHRzLiBDb25uZWN0aW9uIGRpc2Nvbm5lY3RpbmcuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TmV4dFJldHJ5RGVsYXkgPSBmdW5jdGlvbiAocHJldmlvdXNSZXRyeUNvdW50LCBlbGFwc2VkTWlsbGlzZWNvbmRzLCByZXRyeVJlYXNvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjb25uZWN0UG9saWN5Lm5leHRSZXRyeURlbGF5SW5NaWxsaXNlY29uZHMoe1xuICAgICAgICAgICAgICAgIGVsYXBzZWRNaWxsaXNlY29uZHM6IGVsYXBzZWRNaWxsaXNlY29uZHMsXG4gICAgICAgICAgICAgICAgcHJldmlvdXNSZXRyeUNvdW50OiBwcmV2aW91c1JldHJ5Q291bnQsXG4gICAgICAgICAgICAgICAgcmV0cnlSZWFzb246IHJldHJ5UmVhc29uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRXJyb3IsIFwiSVJldHJ5UG9saWN5Lm5leHRSZXRyeURlbGF5SW5NaWxsaXNlY29uZHMoXCIgKyBwcmV2aW91c1JldHJ5Q291bnQgKyBcIiwgXCIgKyBlbGFwc2VkTWlsbGlzZWNvbmRzICsgXCIpIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNhbmNlbENhbGxiYWNrc1dpdGhFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3M7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKGNhbGxiYWNrcylcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGNhbGxiYWNrc1trZXldO1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNsZWFudXBQaW5nVGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jbGVhbnVwVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dEhhbmRsZSkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEhhbmRsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUludm9jYXRpb24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgYXJncywgbm9uYmxvY2tpbmcsIHN0cmVhbUlkcykge1xuICAgICAgICBpZiAobm9uYmxvY2tpbmcpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW1JZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1JZHM6IHN0cmVhbUlkcyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5JbnZvY2F0aW9uLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSUh1YlByb3RvY29sXzEuTWVzc2FnZVR5cGUuSW52b2NhdGlvbixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGludm9jYXRpb25JZCA9IHRoaXMuaW52b2NhdGlvbklkO1xuICAgICAgICAgICAgdGhpcy5pbnZvY2F0aW9uSWQrKztcbiAgICAgICAgICAgIGlmIChzdHJlYW1JZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGludm9jYXRpb25JZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1JZHM6IHN0cmVhbUlkcyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5JbnZvY2F0aW9uLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXG4gICAgICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaW52b2NhdGlvbklkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogSUh1YlByb3RvY29sXzEuTWVzc2FnZVR5cGUuSW52b2NhdGlvbixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5sYXVuY2hTdHJlYW1zID0gZnVuY3Rpb24gKHN0cmVhbXMsIHByb21pc2VRdWV1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoc3RyZWFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTeW5jaHJvbml6ZSBzdHJlYW0gZGF0YSBzbyB0aGV5IGFycml2ZSBpbi1vcmRlciBvbiB0aGUgc2VydmVyXG4gICAgICAgIGlmICghcHJvbWlzZVF1ZXVlKSB7XG4gICAgICAgICAgICBwcm9taXNlUXVldWUgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChzdHJlYW1JZCkge1xuICAgICAgICAgICAgc3RyZWFtc1tzdHJlYW1JZF0uc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUXVldWUgPSBwcm9taXNlUXVldWUudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zZW5kV2l0aFByb3RvY29sKF90aGlzLmNyZWF0ZUNvbXBsZXRpb25NZXNzYWdlKHN0cmVhbUlkKSk7IH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVyciAmJiBlcnIudG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlVua25vd24gZXJyb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUXVldWUgPSBwcm9taXNlUXVldWUudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zZW5kV2l0aFByb3RvY29sKF90aGlzLmNyZWF0ZUNvbXBsZXRpb25NZXNzYWdlKHN0cmVhbUlkLCBtZXNzYWdlKSk7IH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVF1ZXVlID0gcHJvbWlzZVF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc2VuZFdpdGhQcm90b2NvbChfdGhpcy5jcmVhdGVTdHJlYW1JdGVtTWVzc2FnZShzdHJlYW1JZCwgaXRlbSkpOyB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gaXRlcmF0ZSBvdmVyIHRoZSBrZXlzLCBzaW5jZSB0aGUga2V5cyBhcmUgdGhlIHN0cmVhbSBpZHNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAodmFyIHN0cmVhbUlkIGluIHN0cmVhbXMpIHtcbiAgICAgICAgICAgIF9sb29wXzEoc3RyZWFtSWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5yZXBsYWNlU3RyZWFtaW5nUGFyYW1zID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgdmFyIHN0cmVhbXMgPSBbXTtcbiAgICAgICAgdmFyIHN0cmVhbUlkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBhcmd1bWVudCA9IGFyZ3NbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5pc09ic2VydmFibGUoYXJndW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmVhbUlkID0gdGhpcy5pbnZvY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZvY2F0aW9uSWQrKztcbiAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgc3RyZWFtIGZvciBsYXRlciB1c2VcbiAgICAgICAgICAgICAgICBzdHJlYW1zW3N0cmVhbUlkXSA9IGFyZ3VtZW50O1xuICAgICAgICAgICAgICAgIHN0cmVhbUlkcy5wdXNoKHN0cmVhbUlkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzdHJlYW0gZnJvbSBhcmdzXG4gICAgICAgICAgICAgICAgYXJncy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzdHJlYW1zLCBzdHJlYW1JZHNdO1xuICAgIH07XG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuaXNPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAvLyBUaGlzIGFsbG93cyBvdGhlciBzdHJlYW0gaW1wbGVtZW50YXRpb25zIHRvIGp1c3Qgd29yayAobGlrZSByeGpzKVxuICAgICAgICByZXR1cm4gYXJnICYmIGFyZy5zdWJzY3JpYmUgJiYgdHlwZW9mIGFyZy5zdWJzY3JpYmUgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZVN0cmVhbUludm9jYXRpb24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgYXJncywgc3RyZWFtSWRzKSB7XG4gICAgICAgIHZhciBpbnZvY2F0aW9uSWQgPSB0aGlzLmludm9jYXRpb25JZDtcbiAgICAgICAgdGhpcy5pbnZvY2F0aW9uSWQrKztcbiAgICAgICAgaWYgKHN0cmVhbUlkcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxuICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaW52b2NhdGlvbklkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgc3RyZWFtSWRzOiBzdHJlYW1JZHMsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxuICAgICAgICAgICAgICAgIHR5cGU6IElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlLlN0cmVhbUludm9jYXRpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpbnZvY2F0aW9uSWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IG1ldGhvZE5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogSUh1YlByb3RvY29sXzEuTWVzc2FnZVR5cGUuU3RyZWFtSW52b2NhdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUNhbmNlbEludm9jYXRpb24gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGludm9jYXRpb25JZDogaWQsXG4gICAgICAgICAgICB0eXBlOiBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5DYW5jZWxJbnZvY2F0aW9uLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlU3RyZWFtSXRlbU1lc3NhZ2UgPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGludm9jYXRpb25JZDogaWQsXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgdHlwZTogSUh1YlByb3RvY29sXzEuTWVzc2FnZVR5cGUuU3RyZWFtSXRlbSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUNvbXBsZXRpb25NZXNzYWdlID0gZnVuY3Rpb24gKGlkLCBlcnJvciwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpZCxcbiAgICAgICAgICAgICAgICB0eXBlOiBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5Db21wbGV0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpZCxcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgdHlwZTogSUh1YlByb3RvY29sXzEuTWVzc2FnZVR5cGUuQ29tcGxldGlvbixcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBIdWJDb25uZWN0aW9uO1xufSgpKTtcbmV4cG9ydHMuSHViQ29ubmVjdGlvbiA9IEh1YkNvbm5lY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1IdWJDb25uZWN0aW9uLmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXFxcXEh1YkNvbm5lY3Rpb24uanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRGVmYXVsdFJlY29ubmVjdFBvbGljeV8xID0gcmVxdWlyZShcIi4vRGVmYXVsdFJlY29ubmVjdFBvbGljeVwiKTtcbnZhciBIdHRwQ29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4vSHR0cENvbm5lY3Rpb25cIik7XG52YXIgSHViQ29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4vSHViQ29ubmVjdGlvblwiKTtcbnZhciBJTG9nZ2VyXzEgPSByZXF1aXJlKFwiLi9JTG9nZ2VyXCIpO1xudmFyIEpzb25IdWJQcm90b2NvbF8xID0gcmVxdWlyZShcIi4vSnNvbkh1YlByb3RvY29sXCIpO1xudmFyIExvZ2dlcnNfMSA9IHJlcXVpcmUoXCIuL0xvZ2dlcnNcIik7XG52YXIgVXRpbHNfMSA9IHJlcXVpcmUoXCIuL1V0aWxzXCIpO1xuLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXG52YXIgTG9nTGV2ZWxOYW1lTWFwcGluZyA9IHtcbiAgICB0cmFjZTogSUxvZ2dlcl8xLkxvZ0xldmVsLlRyYWNlLFxuICAgIGRlYnVnOiBJTG9nZ2VyXzEuTG9nTGV2ZWwuRGVidWcsXG4gICAgaW5mbzogSUxvZ2dlcl8xLkxvZ0xldmVsLkluZm9ybWF0aW9uLFxuICAgIGluZm9ybWF0aW9uOiBJTG9nZ2VyXzEuTG9nTGV2ZWwuSW5mb3JtYXRpb24sXG4gICAgd2FybjogSUxvZ2dlcl8xLkxvZ0xldmVsLldhcm5pbmcsXG4gICAgd2FybmluZzogSUxvZ2dlcl8xLkxvZ0xldmVsLldhcm5pbmcsXG4gICAgZXJyb3I6IElMb2dnZXJfMS5Mb2dMZXZlbC5FcnJvcixcbiAgICBjcml0aWNhbDogSUxvZ2dlcl8xLkxvZ0xldmVsLkNyaXRpY2FsLFxuICAgIG5vbmU6IElMb2dnZXJfMS5Mb2dMZXZlbC5Ob25lLFxufTtcbmZ1bmN0aW9uIHBhcnNlTG9nTGV2ZWwobmFtZSkge1xuICAgIC8vIENhc2UtaW5zZW5zaXRpdmUgbWF0Y2hpbmcgdmlhIGxvd2VyLWNhc2luZ1xuICAgIC8vIFllcywgSSBrbm93IGNhc2UtZm9sZGluZyBpcyBhIGNvbXBsaWNhdGVkIHByb2JsZW0gaW4gVW5pY29kZSwgYnV0IHdlIG9ubHkgc3VwcG9ydFxuICAgIC8vIHRoZSBBU0NJSSBzdHJpbmdzIGRlZmluZWQgaW4gTG9nTGV2ZWxOYW1lTWFwcGluZyBhbnl3YXksIHNvIGl0J3MgZmluZSAtYW51cnNlLlxuICAgIHZhciBtYXBwaW5nID0gTG9nTGV2ZWxOYW1lTWFwcGluZ1tuYW1lLnRvTG93ZXJDYXNlKCldO1xuICAgIGlmICh0eXBlb2YgbWFwcGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gbWFwcGluZztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gbG9nIGxldmVsOiBcIiArIG5hbWUpO1xuICAgIH1cbn1cbi8qKiBBIGJ1aWxkZXIgZm9yIGNvbmZpZ3VyaW5nIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0gaW5zdGFuY2VzLiAqL1xudmFyIEh1YkNvbm5lY3Rpb25CdWlsZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEh1YkNvbm5lY3Rpb25CdWlsZGVyKCkge1xuICAgIH1cbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUuY29uZmlndXJlTG9nZ2luZyA9IGZ1bmN0aW9uIChsb2dnaW5nKSB7XG4gICAgICAgIFV0aWxzXzEuQXJnLmlzUmVxdWlyZWQobG9nZ2luZywgXCJsb2dnaW5nXCIpO1xuICAgICAgICBpZiAoaXNMb2dnZXIobG9nZ2luZykpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2luZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgbG9nZ2luZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdmFyIGxvZ0xldmVsID0gcGFyc2VMb2dMZXZlbChsb2dnaW5nKTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbmV3IFV0aWxzXzEuQ29uc29sZUxvZ2dlcihsb2dMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBVdGlsc18xLkNvbnNvbGVMb2dnZXIobG9nZ2luZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUud2l0aFVybCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zcG9ydFR5cGVPck9wdGlvbnMpIHtcbiAgICAgICAgVXRpbHNfMS5BcmcuaXNSZXF1aXJlZCh1cmwsIFwidXJsXCIpO1xuICAgICAgICBVdGlsc18xLkFyZy5pc05vdEVtcHR5KHVybCwgXCJ1cmxcIik7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICAvLyBGbG93LXR5cGluZyBrbm93cyB3aGVyZSBpdCdzIGF0LiBTaW5jZSBIdHRwVHJhbnNwb3J0VHlwZSBpcyBhIG51bWJlciBhbmQgSUh0dHBDb25uZWN0aW9uT3B0aW9ucyBpcyBndWFyYW50ZWVkXG4gICAgICAgIC8vIHRvIGJlIGFuIG9iamVjdCwgd2Uga25vdyAoYXMgZG9lcyBUeXBlU2NyaXB0KSB0aGlzIGNvbXBhcmlzb24gaXMgYWxsIHdlIG5lZWQgdG8gZmlndXJlIG91dCB3aGljaCBvdmVybG9hZCB3YXMgY2FsbGVkLlxuICAgICAgICBpZiAodHlwZW9mIHRyYW5zcG9ydFR5cGVPck9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zLCB0cmFuc3BvcnRUeXBlT3JPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zLCB7IHRyYW5zcG9ydDogdHJhbnNwb3J0VHlwZU9yT3B0aW9ucyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKiBDb25maWd1cmVzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1YkNvbm5lY3Rpb259IHRvIHVzZSB0aGUgc3BlY2lmaWVkIEh1YiBQcm90b2NvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SUh1YlByb3RvY29sfSBwcm90b2NvbCBUaGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5JSHViUHJvdG9jb2x9IGltcGxlbWVudGF0aW9uIHRvIHVzZS5cbiAgICAgKi9cbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUud2l0aEh1YlByb3RvY29sID0gZnVuY3Rpb24gKHByb3RvY29sKSB7XG4gICAgICAgIFV0aWxzXzEuQXJnLmlzUmVxdWlyZWQocHJvdG9jb2wsIFwicHJvdG9jb2xcIik7XG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUud2l0aEF1dG9tYXRpY1JlY29ubmVjdCA9IGZ1bmN0aW9uIChyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KSB7XG4gICAgICAgIGlmICh0aGlzLnJlY29ubmVjdFBvbGljeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSByZWNvbm5lY3RQb2xpY3kgaGFzIGFscmVhZHkgYmVlbiBzZXQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmV0cnlEZWxheXNPclJlY29ubmVjdFBvbGljeSkge1xuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RQb2xpY3kgPSBuZXcgRGVmYXVsdFJlY29ubmVjdFBvbGljeV8xLkRlZmF1bHRSZWNvbm5lY3RQb2xpY3koKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldHJ5RGVsYXlzT3JSZWNvbm5lY3RQb2xpY3kpKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdFBvbGljeSA9IG5ldyBEZWZhdWx0UmVjb25uZWN0UG9saWN5XzEuRGVmYXVsdFJlY29ubmVjdFBvbGljeShyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0UG9saWN5ID0gcmV0cnlEZWxheXNPclJlY29ubmVjdFBvbGljeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKiBDcmVhdGVzIGEge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdWJDb25uZWN0aW9ufSBmcm9tIHRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgc3BlY2lmaWVkIGluIHRoaXMgYnVpbGRlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtIdWJDb25uZWN0aW9ufSBUaGUgY29uZmlndXJlZCB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1YkNvbm5lY3Rpb259LlxuICAgICAqL1xuICAgIEh1YkNvbm5lY3Rpb25CdWlsZGVyLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSWYgaHR0cENvbm5lY3Rpb25PcHRpb25zIGhhcyBhIGxvZ2dlciwgdXNlIGl0LiBPdGhlcndpc2UsIG92ZXJyaWRlIGl0IHdpdGggdGhlIG9uZVxuICAgICAgICAvLyBwcm92aWRlZCB0byBjb25maWd1cmVMb2dnZXJcbiAgICAgICAgdmFyIGh0dHBDb25uZWN0aW9uT3B0aW9ucyA9IHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zIHx8IHt9O1xuICAgICAgICAvLyBJZiBpdCdzICdudWxsJywgdGhlIHVzZXIgKipleHBsaWNpdGx5KiogYXNrZWQgZm9yIG51bGwsIGRvbid0IG1lc3Mgd2l0aCBpdC5cbiAgICAgICAgaWYgKGh0dHBDb25uZWN0aW9uT3B0aW9ucy5sb2dnZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSWYgb3VyIGxvZ2dlciBpcyB1bmRlZmluZWQgb3IgbnVsbCwgdGhhdCdzIE9LLCB0aGUgSHR0cENvbm5lY3Rpb24gY29uc3RydWN0b3Igd2lsbCBoYW5kbGUgaXQuXG4gICAgICAgICAgICBodHRwQ29ubmVjdGlvbk9wdGlvbnMubG9nZ2VyID0gdGhpcy5sb2dnZXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm93IGNyZWF0ZSB0aGUgY29ubmVjdGlvblxuICAgICAgICBpZiAoIXRoaXMudXJsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ0h1YkNvbm5lY3Rpb25CdWlsZGVyLndpdGhVcmwnIG1ldGhvZCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgYnVpbGRpbmcgdGhlIGNvbm5lY3Rpb24uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gbmV3IEh0dHBDb25uZWN0aW9uXzEuSHR0cENvbm5lY3Rpb24odGhpcy51cmwsIGh0dHBDb25uZWN0aW9uT3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBIdWJDb25uZWN0aW9uXzEuSHViQ29ubmVjdGlvbi5jcmVhdGUoY29ubmVjdGlvbiwgdGhpcy5sb2dnZXIgfHwgTG9nZ2Vyc18xLk51bGxMb2dnZXIuaW5zdGFuY2UsIHRoaXMucHJvdG9jb2wgfHwgbmV3IEpzb25IdWJQcm90b2NvbF8xLkpzb25IdWJQcm90b2NvbCgpLCB0aGlzLnJlY29ubmVjdFBvbGljeSk7XG4gICAgfTtcbiAgICByZXR1cm4gSHViQ29ubmVjdGlvbkJ1aWxkZXI7XG59KCkpO1xuZXhwb3J0cy5IdWJDb25uZWN0aW9uQnVpbGRlciA9IEh1YkNvbm5lY3Rpb25CdWlsZGVyO1xuZnVuY3Rpb24gaXNMb2dnZXIobG9nZ2VyKSB7XG4gICAgcmV0dXJuIGxvZ2dlci5sb2cgIT09IHVuZGVmaW5lZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUh1YkNvbm5lY3Rpb25CdWlsZGVyLmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXFxcXEh1YkNvbm5lY3Rpb25CdWlsZGVyLmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKiBEZWZpbmVzIHRoZSB0eXBlIG9mIGEgSHViIE1lc3NhZ2UuICovXG52YXIgTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24gKE1lc3NhZ2VUeXBlKSB7XG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhbiBJbnZvY2F0aW9uIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSW52b2NhdGlvbk1lc3NhZ2V9IGludGVyZmFjZS4gKi9cbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIkludm9jYXRpb25cIl0gPSAxXSA9IFwiSW52b2NhdGlvblwiO1xuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBTdHJlYW1JdGVtIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuU3RyZWFtSXRlbU1lc3NhZ2V9IGludGVyZmFjZS4gKi9cbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIlN0cmVhbUl0ZW1cIl0gPSAyXSA9IFwiU3RyZWFtSXRlbVwiO1xuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBDb21wbGV0aW9uIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuQ29tcGxldGlvbk1lc3NhZ2V9IGludGVyZmFjZS4gKi9cbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIkNvbXBsZXRpb25cIl0gPSAzXSA9IFwiQ29tcGxldGlvblwiO1xuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBTdHJlYW0gSW52b2NhdGlvbiBtZXNzYWdlIGFuZCBpbXBsZW1lbnRzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLlN0cmVhbUludm9jYXRpb25NZXNzYWdlfSBpbnRlcmZhY2UuICovXG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJTdHJlYW1JbnZvY2F0aW9uXCJdID0gNF0gPSBcIlN0cmVhbUludm9jYXRpb25cIjtcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgQ2FuY2VsIEludm9jYXRpb24gbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5DYW5jZWxJbnZvY2F0aW9uTWVzc2FnZX0gaW50ZXJmYWNlLiAqL1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiQ2FuY2VsSW52b2NhdGlvblwiXSA9IDVdID0gXCJDYW5jZWxJbnZvY2F0aW9uXCI7XG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhIFBpbmcgbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5QaW5nTWVzc2FnZX0gaW50ZXJmYWNlLiAqL1xuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiUGluZ1wiXSA9IDZdID0gXCJQaW5nXCI7XG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhIENsb3NlIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuQ2xvc2VNZXNzYWdlfSBpbnRlcmZhY2UuICovXG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJDbG9zZVwiXSA9IDddID0gXCJDbG9zZVwiO1xufSkoTWVzc2FnZVR5cGUgPSBleHBvcnRzLk1lc3NhZ2VUeXBlIHx8IChleHBvcnRzLk1lc3NhZ2VUeXBlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlIdWJQcm90b2NvbC5qcy5tYXBcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1xcXFxJSHViUHJvdG9jb2wuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gVGhlc2UgdmFsdWVzIGFyZSBkZXNpZ25lZCB0byBtYXRjaCB0aGUgQVNQLk5FVCBMb2cgTGV2ZWxzIHNpbmNlIHRoYXQncyB0aGUgcGF0dGVybiB3ZSdyZSBlbXVsYXRpbmcgaGVyZS5cbi8qKiBJbmRpY2F0ZXMgdGhlIHNldmVyaXR5IG9mIGEgbG9nIG1lc3NhZ2UuXG4gKlxuICogTG9nIExldmVscyBhcmUgb3JkZXJlZCBpbiBpbmNyZWFzaW5nIHNldmVyaXR5LiBTbyBgRGVidWdgIGlzIG1vcmUgc2V2ZXJlIHRoYW4gYFRyYWNlYCwgZXRjLlxuICovXG52YXIgTG9nTGV2ZWw7XG4oZnVuY3Rpb24gKExvZ0xldmVsKSB7XG4gICAgLyoqIExvZyBsZXZlbCBmb3IgdmVyeSBsb3cgc2V2ZXJpdHkgZGlhZ25vc3RpYyBtZXNzYWdlcy4gKi9cbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIlRyYWNlXCJdID0gMF0gPSBcIlRyYWNlXCI7XG4gICAgLyoqIExvZyBsZXZlbCBmb3IgbG93IHNldmVyaXR5IGRpYWdub3N0aWMgbWVzc2FnZXMuICovXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJEZWJ1Z1wiXSA9IDFdID0gXCJEZWJ1Z1wiO1xuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGluZm9ybWF0aW9uYWwgZGlhZ25vc3RpYyBtZXNzYWdlcy4gKi9cbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkluZm9ybWF0aW9uXCJdID0gMl0gPSBcIkluZm9ybWF0aW9uXCI7XG4gICAgLyoqIExvZyBsZXZlbCBmb3IgZGlhZ25vc3RpYyBtZXNzYWdlcyB0aGF0IGluZGljYXRlIGEgbm9uLWZhdGFsIHByb2JsZW0uICovXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJXYXJuaW5nXCJdID0gM10gPSBcIldhcm5pbmdcIjtcbiAgICAvKiogTG9nIGxldmVsIGZvciBkaWFnbm9zdGljIG1lc3NhZ2VzIHRoYXQgaW5kaWNhdGUgYSBmYWlsdXJlIGluIHRoZSBjdXJyZW50IG9wZXJhdGlvbi4gKi9cbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkVycm9yXCJdID0gNF0gPSBcIkVycm9yXCI7XG4gICAgLyoqIExvZyBsZXZlbCBmb3IgZGlhZ25vc3RpYyBtZXNzYWdlcyB0aGF0IGluZGljYXRlIGEgZmFpbHVyZSB0aGF0IHdpbGwgdGVybWluYXRlIHRoZSBlbnRpcmUgYXBwbGljYXRpb24uICovXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJDcml0aWNhbFwiXSA9IDVdID0gXCJDcml0aWNhbFwiO1xuICAgIC8qKiBUaGUgaGlnaGVzdCBwb3NzaWJsZSBsb2cgbGV2ZWwuIFVzZWQgd2hlbiBjb25maWd1cmluZyBsb2dnaW5nIHRvIGluZGljYXRlIHRoYXQgbm8gbG9nIG1lc3NhZ2VzIHNob3VsZCBiZSBlbWl0dGVkLiAqL1xuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiTm9uZVwiXSA9IDZdID0gXCJOb25lXCI7XG59KShMb2dMZXZlbCA9IGV4cG9ydHMuTG9nTGV2ZWwgfHwgKGV4cG9ydHMuTG9nTGV2ZWwgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SUxvZ2dlci5qcy5tYXBcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1xcXFxJTG9nZ2VyLmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIFRoaXMgd2lsbCBiZSB0cmVhdGVkIGFzIGEgYml0IGZsYWcgaW4gdGhlIGZ1dHVyZSwgc28gd2Uga2VlcCBpdCB1c2luZyBwb3dlci1vZi10d28gdmFsdWVzLlxuLyoqIFNwZWNpZmllcyBhIHNwZWNpZmljIEhUVFAgdHJhbnNwb3J0IHR5cGUuICovXG52YXIgSHR0cFRyYW5zcG9ydFR5cGU7XG4oZnVuY3Rpb24gKEh0dHBUcmFuc3BvcnRUeXBlKSB7XG4gICAgLyoqIFNwZWNpZmllcyBubyB0cmFuc3BvcnQgcHJlZmVyZW5jZS4gKi9cbiAgICBIdHRwVHJhbnNwb3J0VHlwZVtIdHRwVHJhbnNwb3J0VHlwZVtcIk5vbmVcIl0gPSAwXSA9IFwiTm9uZVwiO1xuICAgIC8qKiBTcGVjaWZpZXMgdGhlIFdlYlNvY2tldHMgdHJhbnNwb3J0LiAqL1xuICAgIEh0dHBUcmFuc3BvcnRUeXBlW0h0dHBUcmFuc3BvcnRUeXBlW1wiV2ViU29ja2V0c1wiXSA9IDFdID0gXCJXZWJTb2NrZXRzXCI7XG4gICAgLyoqIFNwZWNpZmllcyB0aGUgU2VydmVyLVNlbnQgRXZlbnRzIHRyYW5zcG9ydC4gKi9cbiAgICBIdHRwVHJhbnNwb3J0VHlwZVtIdHRwVHJhbnNwb3J0VHlwZVtcIlNlcnZlclNlbnRFdmVudHNcIl0gPSAyXSA9IFwiU2VydmVyU2VudEV2ZW50c1wiO1xuICAgIC8qKiBTcGVjaWZpZXMgdGhlIExvbmcgUG9sbGluZyB0cmFuc3BvcnQuICovXG4gICAgSHR0cFRyYW5zcG9ydFR5cGVbSHR0cFRyYW5zcG9ydFR5cGVbXCJMb25nUG9sbGluZ1wiXSA9IDRdID0gXCJMb25nUG9sbGluZ1wiO1xufSkoSHR0cFRyYW5zcG9ydFR5cGUgPSBleHBvcnRzLkh0dHBUcmFuc3BvcnRUeXBlIHx8IChleHBvcnRzLkh0dHBUcmFuc3BvcnRUeXBlID0ge30pKTtcbi8qKiBTcGVjaWZpZXMgdGhlIHRyYW5zZmVyIGZvcm1hdCBmb3IgYSBjb25uZWN0aW9uLiAqL1xudmFyIFRyYW5zZmVyRm9ybWF0O1xuKGZ1bmN0aW9uIChUcmFuc2ZlckZvcm1hdCkge1xuICAgIC8qKiBTcGVjaWZpZXMgdGhhdCBvbmx5IHRleHQgZGF0YSB3aWxsIGJlIHRyYW5zbWl0dGVkIG92ZXIgdGhlIGNvbm5lY3Rpb24uICovXG4gICAgVHJhbnNmZXJGb3JtYXRbVHJhbnNmZXJGb3JtYXRbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcbiAgICAvKiogU3BlY2lmaWVzIHRoYXQgYmluYXJ5IGRhdGEgd2lsbCBiZSB0cmFuc21pdHRlZCBvdmVyIHRoZSBjb25uZWN0aW9uLiAqL1xuICAgIFRyYW5zZmVyRm9ybWF0W1RyYW5zZmVyRm9ybWF0W1wiQmluYXJ5XCJdID0gMl0gPSBcIkJpbmFyeVwiO1xufSkoVHJhbnNmZXJGb3JtYXQgPSBleHBvcnRzLlRyYW5zZmVyRm9ybWF0IHx8IChleHBvcnRzLlRyYW5zZmVyRm9ybWF0ID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlUcmFuc3BvcnQuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcSVRyYW5zcG9ydC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSUh1YlByb3RvY29sXzEgPSByZXF1aXJlKFwiLi9JSHViUHJvdG9jb2xcIik7XG52YXIgSUxvZ2dlcl8xID0gcmVxdWlyZShcIi4vSUxvZ2dlclwiKTtcbnZhciBJVHJhbnNwb3J0XzEgPSByZXF1aXJlKFwiLi9JVHJhbnNwb3J0XCIpO1xudmFyIExvZ2dlcnNfMSA9IHJlcXVpcmUoXCIuL0xvZ2dlcnNcIik7XG52YXIgVGV4dE1lc3NhZ2VGb3JtYXRfMSA9IHJlcXVpcmUoXCIuL1RleHRNZXNzYWdlRm9ybWF0XCIpO1xudmFyIEpTT05fSFVCX1BST1RPQ09MX05BTUUgPSBcImpzb25cIjtcbi8qKiBJbXBsZW1lbnRzIHRoZSBKU09OIEh1YiBQcm90b2NvbC4gKi9cbnZhciBKc29uSHViUHJvdG9jb2wgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSnNvbkh1YlByb3RvY29sKCkge1xuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAgICAgdGhpcy5uYW1lID0gSlNPTl9IVUJfUFJPVE9DT0xfTkFNRTtcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IDE7XG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgICAgICB0aGlzLnRyYW5zZmVyRm9ybWF0ID0gSVRyYW5zcG9ydF8xLlRyYW5zZmVyRm9ybWF0LlRleHQ7XG4gICAgfVxuICAgIC8qKiBDcmVhdGVzIGFuIGFycmF5IG9mIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViTWVzc2FnZX0gb2JqZWN0cyBmcm9tIHRoZSBzcGVjaWZpZWQgc2VyaWFsaXplZCByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCBBIHN0cmluZyBjb250YWluaW5nIHRoZSBzZXJpYWxpemVkIHJlcHJlc2VudGF0aW9uLlxuICAgICAqIEBwYXJhbSB7SUxvZ2dlcn0gbG9nZ2VyIEEgbG9nZ2VyIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGxvZyBtZXNzYWdlcyB0aGF0IG9jY3VyIGR1cmluZyBwYXJzaW5nLlxuICAgICAqL1xuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUucGFyc2VNZXNzYWdlcyA9IGZ1bmN0aW9uIChpbnB1dCwgbG9nZ2VyKSB7XG4gICAgICAgIC8vIFRoZSBpbnRlcmZhY2UgZG9lcyBhbGxvdyBcIkFycmF5QnVmZmVyXCIgdG8gYmUgcGFzc2VkIGluLCBidXQgdGhpcyBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdC4gU28gbGV0J3MgdGhyb3cgYSB1c2VmdWwgZXJyb3IuXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgZm9yIEpTT04gaHViIHByb3RvY29sLiBFeHBlY3RlZCBhIHN0cmluZy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2dnZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlciA9IExvZ2dlcnNfMS5OdWxsTG9nZ2VyLmluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhcnNlIHRoZSBtZXNzYWdlc1xuICAgICAgICB2YXIgbWVzc2FnZXMgPSBUZXh0TWVzc2FnZUZvcm1hdF8xLlRleHRNZXNzYWdlRm9ybWF0LnBhcnNlKGlucHV0KTtcbiAgICAgICAgdmFyIGh1Yk1lc3NhZ2VzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgbWVzc2FnZXNfMSA9IG1lc3NhZ2VzOyBfaSA8IG1lc3NhZ2VzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzXzFbX2ldO1xuICAgICAgICAgICAgdmFyIHBhcnNlZE1lc3NhZ2UgPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJzZWRNZXNzYWdlLnR5cGUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBheWxvYWQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChwYXJzZWRNZXNzYWdlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlLkludm9jYXRpb246XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZvY2F0aW9uTWVzc2FnZShwYXJzZWRNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJSHViUHJvdG9jb2xfMS5NZXNzYWdlVHlwZS5TdHJlYW1JdGVtOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3RyZWFtSXRlbU1lc3NhZ2UocGFyc2VkTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSUh1YlByb3RvY29sXzEuTWVzc2FnZVR5cGUuQ29tcGxldGlvbjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXRpb25NZXNzYWdlKHBhcnNlZE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlLlBpbmc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmdsZSB2YWx1ZSwgbm8gbmVlZCB0byB2YWxpZGF0ZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlLkNsb3NlOlxuICAgICAgICAgICAgICAgICAgICAvLyBBbGwgb3B0aW9uYWwgdmFsdWVzLCBubyBuZWVkIHRvIHZhbGlkYXRlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vIEZ1dHVyZSBwcm90b2NvbCBjaGFuZ2VzIGNhbiBhZGQgbWVzc2FnZSB0eXBlcywgb2xkIGNsaWVudHMgY2FuIGlnbm9yZSB0aGVtXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlVua25vd24gbWVzc2FnZSB0eXBlICdcIiArIHBhcnNlZE1lc3NhZ2UudHlwZSArIFwiJyBpZ25vcmVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodWJNZXNzYWdlcy5wdXNoKHBhcnNlZE1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodWJNZXNzYWdlcztcbiAgICB9O1xuICAgIC8qKiBXcml0ZXMgdGhlIHNwZWNpZmllZCB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1Yk1lc3NhZ2V9IHRvIGEgc3RyaW5nIGFuZCByZXR1cm5zIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIdWJNZXNzYWdlfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIHdyaXRlLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIHNlcmlhbGl6ZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1lc3NhZ2UuXG4gICAgICovXG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS53cml0ZU1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gVGV4dE1lc3NhZ2VGb3JtYXRfMS5UZXh0TWVzc2FnZUZvcm1hdC53cml0ZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgfTtcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLmlzSW52b2NhdGlvbk1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UudGFyZ2V0LCBcIkludmFsaWQgcGF5bG9hZCBmb3IgSW52b2NhdGlvbiBtZXNzYWdlLlwiKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuaW52b2NhdGlvbklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Tm90RW1wdHlTdHJpbmcobWVzc2FnZS5pbnZvY2F0aW9uSWQsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBJbnZvY2F0aW9uIG1lc3NhZ2UuXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLmlzU3RyZWFtSXRlbU1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UuaW52b2NhdGlvbklkLCBcIkludmFsaWQgcGF5bG9hZCBmb3IgU3RyZWFtSXRlbSBtZXNzYWdlLlwiKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuaXRlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBheWxvYWQgZm9yIFN0cmVhbUl0ZW0gbWVzc2FnZS5cIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUuaXNDb21wbGV0aW9uTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCAmJiBtZXNzYWdlLmVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBheWxvYWQgZm9yIENvbXBsZXRpb24gbWVzc2FnZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLnJlc3VsdCAmJiBtZXNzYWdlLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UuZXJyb3IsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBDb21wbGV0aW9uIG1lc3NhZ2UuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RW1wdHlTdHJpbmcobWVzc2FnZS5pbnZvY2F0aW9uSWQsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBDb21wbGV0aW9uIG1lc3NhZ2UuXCIpO1xuICAgIH07XG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS5hc3NlcnROb3RFbXB0eVN0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSwgZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIgfHwgdmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gSnNvbkh1YlByb3RvY29sO1xufSgpKTtcbmV4cG9ydHMuSnNvbkh1YlByb3RvY29sID0gSnNvbkh1YlByb3RvY29sO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SnNvbkh1YlByb3RvY29sLmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXFxcXEpzb25IdWJQcm90b2NvbC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKiogQSBsb2dnZXIgdGhhdCBkb2VzIG5vdGhpbmcgd2hlbiBsb2cgbWVzc2FnZXMgYXJlIHNlbnQgdG8gaXQuICovXG52YXIgTnVsbExvZ2dlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOdWxsTG9nZ2VyKCkge1xuICAgIH1cbiAgICAvKiogQGluaGVyaXREb2MgKi9cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBOdWxsTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAoX2xvZ0xldmVsLCBfbWVzc2FnZSkge1xuICAgIH07XG4gICAgLyoqIFRoZSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuTnVsbExvZ2dlcn0uICovXG4gICAgTnVsbExvZ2dlci5pbnN0YW5jZSA9IG5ldyBOdWxsTG9nZ2VyKCk7XG4gICAgcmV0dXJuIE51bGxMb2dnZXI7XG59KCkpO1xuZXhwb3J0cy5OdWxsTG9nZ2VyID0gTnVsbExvZ2dlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxvZ2dlcnMuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcTG9nZ2Vycy5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQWJvcnRDb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9BYm9ydENvbnRyb2xsZXJcIik7XG52YXIgRXJyb3JzXzEgPSByZXF1aXJlKFwiLi9FcnJvcnNcIik7XG52YXIgSUxvZ2dlcl8xID0gcmVxdWlyZShcIi4vSUxvZ2dlclwiKTtcbnZhciBJVHJhbnNwb3J0XzEgPSByZXF1aXJlKFwiLi9JVHJhbnNwb3J0XCIpO1xudmFyIFV0aWxzXzEgPSByZXF1aXJlKFwiLi9VdGlsc1wiKTtcbi8vIE5vdCBleHBvcnRlZCBmcm9tICdpbmRleCcsIHRoaXMgdHlwZSBpcyBpbnRlcm5hbC5cbi8qKiBAcHJpdmF0ZSAqL1xudmFyIExvbmdQb2xsaW5nVHJhbnNwb3J0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExvbmdQb2xsaW5nVHJhbnNwb3J0KGh0dHBDbGllbnQsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgbG9nZ2VyLCBsb2dNZXNzYWdlQ29udGVudCwgd2l0aENyZWRlbnRpYWxzLCBoZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5ID0gYWNjZXNzVG9rZW5GYWN0b3J5O1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5wb2xsQWJvcnQgPSBuZXcgQWJvcnRDb250cm9sbGVyXzEuQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQgPSBsb2dNZXNzYWdlQ29udGVudDtcbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9ucmVjZWl2ZSA9IG51bGw7XG4gICAgICAgIHRoaXMub25jbG9zZSA9IG51bGw7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUsIFwicG9sbEFib3J0ZWRcIiwge1xuICAgICAgICAvLyBUaGlzIGlzIGFuIGludGVybmFsIHR5cGUsIG5vdCBleHBvcnRlZCBmcm9tICdpbmRleCcgc28gdGhpcyBpcyByZWFsbHkganVzdCBpbnRlcm5hbC5cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2xsQWJvcnQuYWJvcnRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAodXJsLCB0cmFuc2ZlckZvcm1hdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBuYW1lLCB2YWx1ZSwgaGVhZGVycywgcG9sbE9wdGlvbnMsIHRva2VuLCBwb2xsVXJsLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzXzEuQXJnLmlzUmVxdWlyZWQodXJsLCBcInVybFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzXzEuQXJnLmlzUmVxdWlyZWQodHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsc18xLkFyZy5pc0luKHRyYW5zZmVyRm9ybWF0LCBJVHJhbnNwb3J0XzEuVHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgQ29ubmVjdGluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbGxvdyBiaW5hcnkgZm9ybWF0IG9uIE5vZGUgYW5kIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCBiaW5hcnkgY29udGVudCAoaW5kaWNhdGVkIGJ5IHRoZSBwcmVzZW5jZSBvZiByZXNwb25zZVR5cGUgcHJvcGVydHkpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IElUcmFuc3BvcnRfMS5UcmFuc2ZlckZvcm1hdC5CaW5hcnkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBuZXcgWE1MSHR0cFJlcXVlc3QoKS5yZXNwb25zZVR5cGUgIT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluYXJ5IHByb3RvY29scyBvdmVyIFhtbEh0dHBSZXF1ZXN0IG5vdCBpbXBsZW1lbnRpbmcgYWR2YW5jZWQgZmVhdHVyZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSBVdGlsc18xLmdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzID0gX19hc3NpZ24oKF9hID0ge30sIF9hW25hbWVdID0gdmFsdWUsIF9hKSwgdGhpcy5oZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0U2lnbmFsOiB0aGlzLnBvbGxBYm9ydC5zaWduYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IElUcmFuc3BvcnRfMS5UcmFuc2ZlckZvcm1hdC5CaW5hcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xsT3B0aW9ucy5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldEFjY2Vzc1Rva2VuKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyVG9rZW4ocG9sbE9wdGlvbnMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxVcmwgPSB1cmwgKyBcIiZfPVwiICsgRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgcG9sbGluZzogXCIgKyBwb2xsVXJsICsgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5odHRwQ2xpZW50LmdldChwb2xsVXJsLCBwb2xsT3B0aW9ucyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFVuZXhwZWN0ZWQgcmVzcG9uc2UgY29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlICsgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hcmsgcnVubmluZyBhcyBmYWxzZSBzbyB0aGF0IHRoZSBwb2xsIGltbWVkaWF0ZWx5IGVuZHMgYW5kIHJ1bnMgdGhlIGNsb3NlIGxvZ2ljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVycm9yID0gbmV3IEVycm9yc18xLkh0dHBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0IHx8IFwiXCIsIHJlc3BvbnNlLnN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2aW5nID0gdGhpcy5wb2xsKHRoaXMudXJsLCBwb2xsT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLmdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCBudWxsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUudXBkYXRlSGVhZGVyVG9rZW4gPSBmdW5jdGlvbiAocmVxdWVzdCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0LmhlYWRlcnMpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gXCJCZWFyZXIgXCIgKyB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgICAgaWYgKHJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0pIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICAgICAgICAgICAgZGVsZXRlIHJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24gKHVybCwgcG9sbE9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRva2VuLCBwb2xsVXJsLCByZXNwb25zZSwgZV8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAsIDgsIDldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRBY2Nlc3NUb2tlbigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclRva2VuKHBvbGxPcHRpb25zLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMywgNSwgLCA2XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsVXJsID0gdXJsICsgXCImXz1cIiArIERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIHBvbGxpbmc6IFwiICsgcG9sbFVybCArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5nZXQocG9sbFVybCwgcG9sbE9wdGlvbnMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBQb2xsIHRlcm1pbmF0ZWQgYnkgc2VydmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuRXJyb3IsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgVW5leHBlY3RlZCByZXNwb25zZSBjb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyBcIi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVW5leHBlY3RlZCBzdGF0dXMgY29kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFcnJvciA9IG5ldyBFcnJvcnNfMS5IdHRwRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCB8fCBcIlwiLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBkYXRhIHJlY2VpdmVkLiBcIiArIFV0aWxzXzEuZ2V0RGF0YURldGFpbChyZXNwb25zZS5jb250ZW50LCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25yZWNlaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9ucmVjZWl2ZShyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbm90aGVyIHdheSB0aW1lb3V0IG1hbmlmZXN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGwgdGltZWQgb3V0LCByZWlzc3VpbmcuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvZyBidXQgZGlzcmVnYXJkIGVycm9ycyB0aGF0IG9jY3VyIGFmdGVyIHN0b3BwaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBQb2xsIGVycm9yZWQgYWZ0ZXIgc2h1dGRvd246IFwiICsgZV8xLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVfMSBpbnN0YW5jZW9mIEVycm9yc18xLlRpbWVvdXRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGltZW91dHMgYW5kIHJlaXNzdWUgdGhlIHBvbGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgUG9sbCB0aW1lZCBvdXQsIHJlaXNzdWluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDbG9zZSB0aGUgY29ubmVjdGlvbiB3aXRoIHRoZSBlcnJvciBhcyB0aGUgcmVzdWx0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRXJyb3IgPSBlXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGxpbmcgY29tcGxldGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd2lsbCByZWFjaCBoZXJlIHdpdGggcG9sbEFib3J0ZWQ9PWZhbHNlIHdoZW4gdGhlIHNlcnZlciByZXR1cm5lZCBhIHJlc3BvbnNlIGNhdXNpbmcgdGhlIHRyYW5zcG9ydCB0byBzdG9wLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcG9sbEFib3J0ZWQ9PXRydWUgdGhlbiBjbGllbnQgaW5pdGlhdGVkIHRoZSBzdG9wIGFuZCB0aGUgc3RvcCBtZXRob2Qgd2lsbCByYWlzZSB0aGUgY2xvc2UgZXZlbnQgYWZ0ZXIgREVMRVRFIGlzIHNlbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9sbEFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlT25DbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBzZW5kIHVudGlsIHRoZSB0cmFuc3BvcnQgaXMgY29ubmVjdGVkXCIpKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBVdGlsc18xLnNlbmRNZXNzYWdlKHRoaXMubG9nZ2VyLCBcIkxvbmdQb2xsaW5nXCIsIHRoaXMuaHR0cENsaWVudCwgdGhpcy51cmwsIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5LCBkYXRhLCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50LCB0aGlzLndpdGhDcmVkZW50aWFscywgdGhpcy5oZWFkZXJzKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGhlYWRlcnMsIF9hLCBuYW1lXzEsIHZhbHVlLCBkZWxldGVPcHRpb25zLCB0b2tlbjtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgU3RvcHBpbmcgcG9sbGluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUZWxsIHJlY2VpdmluZyBsb29wIHRvIHN0b3AsIGFib3J0IGFueSBjdXJyZW50IHJlcXVlc3QsIGFuZCB0aGVuIHdhaXQgZm9yIGl0IHRvIGZpbmlzaFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbGxBYm9ydC5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsICwgNSwgNl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZWNlaXZpbmddO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZW5kIERFTEVURSB0byBjbGVhbiB1cCBsb25nIHBvbGxpbmcgb24gdGhlIHNlcnZlclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBzZW5kaW5nIERFTEVURSByZXF1ZXN0IHRvIFwiICsgdGhpcy51cmwgKyBcIi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IFV0aWxzXzEuZ2V0VXNlckFnZW50SGVhZGVyKCksIG5hbWVfMSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXzFdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKHt9LCBoZWFkZXJzLCB0aGlzLmhlYWRlcnMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRBY2Nlc3NUb2tlbigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclRva2VuKGRlbGV0ZU9wdGlvbnMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5kZWxldGUodGhpcy51cmwsIGRlbGV0ZU9wdGlvbnMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBERUxFVEUgcmVxdWVzdCBzZW50LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFN0b3AgZmluaXNoZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFpc2UgY2xvc2UgZXZlbnQgaGVyZSBpbnN0ZWFkIG9mIGluIHBvbGxpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0IG5lZWRzIHRvIGhhcHBlbiBhZnRlciB0aGUgREVMRVRFIHJlcXVlc3QgaXMgc2VudFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYWlzZU9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS5yYWlzZU9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uY2xvc2UpIHtcbiAgICAgICAgICAgIHZhciBsb2dNZXNzYWdlID0gXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBGaXJpbmcgb25jbG9zZSBldmVudC5cIjtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsb2dNZXNzYWdlICs9IFwiIEVycm9yOiBcIiArIHRoaXMuY2xvc2VFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIGxvZ01lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKHRoaXMuY2xvc2VFcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBMb25nUG9sbGluZ1RyYW5zcG9ydDtcbn0oKSk7XG5leHBvcnRzLkxvbmdQb2xsaW5nVHJhbnNwb3J0ID0gTG9uZ1BvbGxpbmdUcmFuc3BvcnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Mb25nUG9sbGluZ1RyYW5zcG9ydC5qcy5tYXBcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1xcXFxMb25nUG9sbGluZ1RyYW5zcG9ydC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSUxvZ2dlcl8xID0gcmVxdWlyZShcIi4vSUxvZ2dlclwiKTtcbnZhciBJVHJhbnNwb3J0XzEgPSByZXF1aXJlKFwiLi9JVHJhbnNwb3J0XCIpO1xudmFyIFV0aWxzXzEgPSByZXF1aXJlKFwiLi9VdGlsc1wiKTtcbi8qKiBAcHJpdmF0ZSAqL1xudmFyIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydChodHRwQ2xpZW50LCBhY2Nlc3NUb2tlbkZhY3RvcnksIGxvZ2dlciwgbG9nTWVzc2FnZUNvbnRlbnQsIGV2ZW50U291cmNlQ29uc3RydWN0b3IsIHdpdGhDcmVkZW50aWFscywgaGVhZGVycykge1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSA9IGFjY2Vzc1Rva2VuRmFjdG9yeTtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQgPSBsb2dNZXNzYWdlQ29udGVudDtcbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgIHRoaXMuZXZlbnRTb3VyY2VDb25zdHJ1Y3RvciA9IGV2ZW50U291cmNlQ29uc3RydWN0b3I7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMub25yZWNlaXZlID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbmNsb3NlID0gbnVsbDtcbiAgICB9XG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsc18xLkFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsc18xLkFyZy5pc1JlcXVpcmVkKHRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHNfMS5BcmcuaXNJbih0cmFuc2ZlckZvcm1hdCwgSVRyYW5zcG9ydF8xLlRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5UcmFjZSwgXCIoU1NFIHRyYW5zcG9ydCkgQ29ubmVjdGluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdXJsIGJlZm9yZSBhY2Nlc3NUb2tlbkZhY3RvcnkgYmVjYXVzZSB0aGlzLnVybCBpcyBvbmx5IGZvciBzZW5kIGFuZCB3ZSBzZXQgdGhlIGF1dGggaGVhZGVyIGluc3RlYWQgb2YgdGhlIHF1ZXJ5IHN0cmluZyBmb3Igc2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCArPSAodXJsLmluZGV4T2YoXCI/XCIpIDwgMCA/IFwiP1wiIDogXCImXCIpICsgKFwiYWNjZXNzX3Rva2VuPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zZmVyRm9ybWF0ICE9PSBJVHJhbnNwb3J0XzEuVHJhbnNmZXJGb3JtYXQuVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGhlIFNlcnZlci1TZW50IEV2ZW50cyB0cmFuc3BvcnQgb25seSBzdXBwb3J0cyB0aGUgJ1RleHQnIHRyYW5zZmVyIGZvcm1hdFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50U291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlsc18xLlBsYXRmb3JtLmlzQnJvd3NlciB8fCBVdGlsc18xLlBsYXRmb3JtLmlzV2ViV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlID0gbmV3IF90aGlzLmV2ZW50U291cmNlQ29uc3RydWN0b3IodXJsLCB7IHdpdGhDcmVkZW50aWFsczogX3RoaXMud2l0aENyZWRlbnRpYWxzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm9uLWJyb3dzZXIgcGFzc2VzIGNvb2tpZXMgdmlhIHRoZSBkaWN0aW9uYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb29raWVzID0gX3RoaXMuaHR0cENsaWVudC5nZXRDb29raWVTdHJpbmcodXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycy5Db29raWUgPSBjb29raWVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBVdGlsc18xLmdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lXzEgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXzFdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlID0gbmV3IF90aGlzLmV2ZW50U291cmNlQ29uc3RydWN0b3IodXJsLCB7IHdpdGhDcmVkZW50aWFsczogX3RoaXMud2l0aENyZWRlbnRpYWxzLCBoZWFkZXJzOiBfX2Fzc2lnbih7fSwgaGVhZGVycywgX3RoaXMuaGVhZGVycykgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub25yZWNlaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKFNTRSB0cmFuc3BvcnQpIGRhdGEgcmVjZWl2ZWQuIFwiICsgVXRpbHNfMS5nZXREYXRhRGV0YWlsKGUuZGF0YSwgX3RoaXMubG9nTWVzc2FnZUNvbnRlbnQpICsgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbnJlY2VpdmUoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRTb3VyY2Uub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZS5kYXRhIHx8IFwiRXJyb3Igb2NjdXJyZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRTb3VyY2Uub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiU1NFIGNvbm5lY3RlZCB0byBcIiArIF90aGlzLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5ldmVudFNvdXJjZSA9IGV2ZW50U291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmV2ZW50U291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3Qgc2VuZCB1bnRpbCB0aGUgdHJhbnNwb3J0IGlzIGNvbm5lY3RlZFwiKSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgVXRpbHNfMS5zZW5kTWVzc2FnZSh0aGlzLmxvZ2dlciwgXCJTU0VcIiwgdGhpcy5odHRwQ2xpZW50LCB0aGlzLnVybCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIGRhdGEsIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQsIHRoaXMud2l0aENyZWRlbnRpYWxzLCB0aGlzLmhlYWRlcnMpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uY2xvc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0O1xufSgpKTtcbmV4cG9ydHMuU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydCA9IFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0LmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXFxcXFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxzXzEgPSByZXF1aXJlKFwiLi9VdGlsc1wiKTtcbi8qKiBTdHJlYW0gaW1wbGVtZW50YXRpb24gdG8gc3RyZWFtIGl0ZW1zIHRvIHRoZSBzZXJ2ZXIuICovXG52YXIgU3ViamVjdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJqZWN0KCkge1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xuICAgIH1cbiAgICBTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMub2JzZXJ2ZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2FbX2ldO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChpdGVtKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm9ic2VydmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlci5lcnJvcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5vYnNlcnZlcnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBfYVtfaV07XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICAgIHJldHVybiBuZXcgVXRpbHNfMS5TdWJqZWN0U3Vic2NyaXB0aW9uKHRoaXMsIG9ic2VydmVyKTtcbiAgICB9O1xuICAgIHJldHVybiBTdWJqZWN0O1xufSgpKTtcbmV4cG9ydHMuU3ViamVjdCA9IFN1YmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXFxcXFN1YmplY3QuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gTm90IGV4cG9ydGVkIGZyb20gaW5kZXhcbi8qKiBAcHJpdmF0ZSAqL1xudmFyIFRleHRNZXNzYWdlRm9ybWF0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRNZXNzYWdlRm9ybWF0KCkge1xuICAgIH1cbiAgICBUZXh0TWVzc2FnZUZvcm1hdC53cml0ZSA9IGZ1bmN0aW9uIChvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyBvdXRwdXQgKyBUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3I7XG4gICAgfTtcbiAgICBUZXh0TWVzc2FnZUZvcm1hdC5wYXJzZSA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gIT09IFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWVzc2FnZSBpcyBpbmNvbXBsZXRlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBpbnB1dC5zcGxpdChUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3IpO1xuICAgICAgICBtZXNzYWdlcy5wb3AoKTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgIH07XG4gICAgVGV4dE1lc3NhZ2VGb3JtYXQuUmVjb3JkU2VwYXJhdG9yQ29kZSA9IDB4MWU7XG4gICAgVGV4dE1lc3NhZ2VGb3JtYXQuUmVjb3JkU2VwYXJhdG9yID0gU3RyaW5nLmZyb21DaGFyQ29kZShUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3JDb2RlKTtcbiAgICByZXR1cm4gVGV4dE1lc3NhZ2VGb3JtYXQ7XG59KCkpO1xuZXhwb3J0cy5UZXh0TWVzc2FnZUZvcm1hdCA9IFRleHRNZXNzYWdlRm9ybWF0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGV4dE1lc3NhZ2VGb3JtYXQuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcVGV4dE1lc3NhZ2VGb3JtYXQuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIElMb2dnZXJfMSA9IHJlcXVpcmUoXCIuL0lMb2dnZXJcIik7XG52YXIgTG9nZ2Vyc18xID0gcmVxdWlyZShcIi4vTG9nZ2Vyc1wiKTtcbi8vIFZlcnNpb24gdG9rZW4gdGhhdCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHRoZSBwcmVwYWNrIGNvbW1hbmRcbi8qKiBUaGUgdmVyc2lvbiBvZiB0aGUgU2lnbmFsUiBjbGllbnQuICovXG5leHBvcnRzLlZFUlNJT04gPSBcIjUuMC41XCI7XG4vKiogQHByaXZhdGUgKi9cbnZhciBBcmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXJnKCkge1xuICAgIH1cbiAgICBBcmcuaXNSZXF1aXJlZCA9IGZ1bmN0aW9uICh2YWwsIG5hbWUpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlICdcIiArIG5hbWUgKyBcIicgYXJndW1lbnQgaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBcmcuaXNOb3RFbXB0eSA9IGZ1bmN0aW9uICh2YWwsIG5hbWUpIHtcbiAgICAgICAgaWYgKCF2YWwgfHwgdmFsLm1hdGNoKC9eXFxzKiQvKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlICdcIiArIG5hbWUgKyBcIicgYXJndW1lbnQgc2hvdWxkIG5vdCBiZSBlbXB0eS5cIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFyZy5pc0luID0gZnVuY3Rpb24gKHZhbCwgdmFsdWVzLCBuYW1lKSB7XG4gICAgICAgIC8vIFR5cGVTY3JpcHQgZW51bXMgaGF2ZSBrZXlzIGZvciAqKmJvdGgqKiB0aGUgbmFtZSBhbmQgdGhlIHZhbHVlIG9mIGVhY2ggZW51bSBtZW1iZXIgb24gdGhlIHR5cGUgaXRzZWxmLlxuICAgICAgICBpZiAoISh2YWwgaW4gdmFsdWVzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBcIiArIG5hbWUgKyBcIiB2YWx1ZTogXCIgKyB2YWwgKyBcIi5cIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBcmc7XG59KCkpO1xuZXhwb3J0cy5BcmcgPSBBcmc7XG4vKiogQHByaXZhdGUgKi9cbnZhciBQbGF0Zm9ybSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQbGF0Zm9ybSgpIHtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFBsYXRmb3JtLCBcImlzQnJvd3NlclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQbGF0Zm9ybSwgXCJpc1dlYldvcmtlclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIFwiaW1wb3J0U2NyaXB0c1wiIGluIHNlbGY7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQbGF0Zm9ybSwgXCJpc05vZGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc0Jyb3dzZXIgJiYgIXRoaXMuaXNXZWJXb3JrZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBQbGF0Zm9ybTtcbn0oKSk7XG5leHBvcnRzLlBsYXRmb3JtID0gUGxhdGZvcm07XG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGdldERhdGFEZXRhaWwoZGF0YSwgaW5jbHVkZUNvbnRlbnQpIHtcbiAgICB2YXIgZGV0YWlsID0gXCJcIjtcbiAgICBpZiAoaXNBcnJheUJ1ZmZlcihkYXRhKSkge1xuICAgICAgICBkZXRhaWwgPSBcIkJpbmFyeSBkYXRhIG9mIGxlbmd0aCBcIiArIGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKGluY2x1ZGVDb250ZW50KSB7XG4gICAgICAgICAgICBkZXRhaWwgKz0gXCIuIENvbnRlbnQ6ICdcIiArIGZvcm1hdEFycmF5QnVmZmVyKGRhdGEpICsgXCInXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZGV0YWlsID0gXCJTdHJpbmcgZGF0YSBvZiBsZW5ndGggXCIgKyBkYXRhLmxlbmd0aDtcbiAgICAgICAgaWYgKGluY2x1ZGVDb250ZW50KSB7XG4gICAgICAgICAgICBkZXRhaWwgKz0gXCIuIENvbnRlbnQ6ICdcIiArIGRhdGEgKyBcIidcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGV0YWlsO1xufVxuZXhwb3J0cy5nZXREYXRhRGV0YWlsID0gZ2V0RGF0YURldGFpbDtcbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gZm9ybWF0QXJyYXlCdWZmZXIoZGF0YSkge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgLy8gVWludDhBcnJheS5tYXAgb25seSBzdXBwb3J0cyByZXR1cm5pbmcgYW5vdGhlciBVaW50OEFycmF5P1xuICAgIHZhciBzdHIgPSBcIlwiO1xuICAgIHZpZXcuZm9yRWFjaChmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIHZhciBwYWQgPSBudW0gPCAxNiA/IFwiMFwiIDogXCJcIjtcbiAgICAgICAgc3RyICs9IFwiMHhcIiArIHBhZCArIG51bS50b1N0cmluZygxNikgKyBcIiBcIjtcbiAgICB9KTtcbiAgICAvLyBUcmltIG9mIHRyYWlsaW5nIHNwYWNlLlxuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIHN0ci5sZW5ndGggLSAxKTtcbn1cbmV4cG9ydHMuZm9ybWF0QXJyYXlCdWZmZXIgPSBmb3JtYXRBcnJheUJ1ZmZlcjtcbi8vIEFsc28gaW4gc2lnbmFsci1wcm90b2NvbC1tc2dwYWNrL1V0aWxzLnRzXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gICAgcmV0dXJuIHZhbCAmJiB0eXBlb2YgQXJyYXlCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgKHZhbCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XG4gICAgICAgICAgICAvLyBTb21ldGltZXMgd2UgZ2V0IGFuIEFycmF5QnVmZmVyIHRoYXQgZG9lc24ndCBzYXRpc2Z5IGluc3RhbmNlb2ZcbiAgICAgICAgICAgICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiQXJyYXlCdWZmZXJcIikpO1xufVxuZXhwb3J0cy5pc0FycmF5QnVmZmVyID0gaXNBcnJheUJ1ZmZlcjtcbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gc2VuZE1lc3NhZ2UobG9nZ2VyLCB0cmFuc3BvcnROYW1lLCBodHRwQ2xpZW50LCB1cmwsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQsIHdpdGhDcmVkZW50aWFscywgZGVmYXVsdEhlYWRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgaGVhZGVycywgdG9rZW4sIF9iLCBuYW1lLCB2YWx1ZSwgcmVzcG9uc2VUeXBlLCByZXNwb25zZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xuICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFjY2Vzc1Rva2VuRmFjdG9yeSgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSAoX2EgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYVtcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIHRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYy5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBfYiA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKFwiICsgdHJhbnNwb3J0TmFtZSArIFwiIHRyYW5zcG9ydCkgc2VuZGluZyBkYXRhLiBcIiArIGdldERhdGFEZXRhaWwoY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQpICsgXCIuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGUgPSBpc0FycmF5QnVmZmVyKGNvbnRlbnQpID8gXCJhcnJheWJ1ZmZlclwiIDogXCJ0ZXh0XCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGh0dHBDbGllbnQucG9zdCh1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKHt9LCBoZWFkZXJzLCBkZWZhdWx0SGVhZGVycyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiByZXNwb25zZVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKFwiICsgdHJhbnNwb3J0TmFtZSArIFwiIHRyYW5zcG9ydCkgcmVxdWVzdCBjb21wbGV0ZS4gUmVzcG9uc2Ugc3RhdHVzOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyBcIi5cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNlbmRNZXNzYWdlID0gc2VuZE1lc3NhZ2U7XG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcihsb2dnZXIpIHtcbiAgICBpZiAobG9nZ2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zb2xlTG9nZ2VyKElMb2dnZXJfMS5Mb2dMZXZlbC5JbmZvcm1hdGlvbik7XG4gICAgfVxuICAgIGlmIChsb2dnZXIgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIExvZ2dlcnNfMS5OdWxsTG9nZ2VyLmluc3RhbmNlO1xuICAgIH1cbiAgICBpZiAobG9nZ2VyLmxvZykge1xuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbnNvbGVMb2dnZXIobG9nZ2VyKTtcbn1cbmV4cG9ydHMuY3JlYXRlTG9nZ2VyID0gY3JlYXRlTG9nZ2VyO1xuLyoqIEBwcml2YXRlICovXG52YXIgU3ViamVjdFN1YnNjcmlwdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJqZWN0U3Vic2NyaXB0aW9uKHN1YmplY3QsIG9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBvYnNlcnZlcjtcbiAgICB9XG4gICAgU3ViamVjdFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5zdWJqZWN0Lm9ic2VydmVycy5pbmRleE9mKHRoaXMub2JzZXJ2ZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN1YmplY3Qub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLnN1YmplY3QuY2FuY2VsQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5jYW5jZWxDYWxsYmFjaygpLmNhdGNoKGZ1bmN0aW9uIChfKSB7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnRzLlN1YmplY3RTdWJzY3JpcHRpb24gPSBTdWJqZWN0U3Vic2NyaXB0aW9uO1xuLyoqIEBwcml2YXRlICovXG52YXIgQ29uc29sZUxvZ2dlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb25zb2xlTG9nZ2VyKG1pbmltdW1Mb2dMZXZlbCkge1xuICAgICAgICB0aGlzLm1pbmltdW1Mb2dMZXZlbCA9IG1pbmltdW1Mb2dMZXZlbDtcbiAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlID0gY29uc29sZTtcbiAgICB9XG4gICAgQ29uc29sZUxvZ2dlci5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24gKGxvZ0xldmVsLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChsb2dMZXZlbCA+PSB0aGlzLm1pbmltdW1Mb2dMZXZlbCkge1xuICAgICAgICAgICAgc3dpdGNoIChsb2dMZXZlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgSUxvZ2dlcl8xLkxvZ0xldmVsLkNyaXRpY2FsOlxuICAgICAgICAgICAgICAgIGNhc2UgSUxvZ2dlcl8xLkxvZ0xldmVsLkVycm9yOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dHB1dENvbnNvbGUuZXJyb3IoXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBJTG9nZ2VyXzEuTG9nTGV2ZWxbbG9nTGV2ZWxdICsgXCI6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSUxvZ2dlcl8xLkxvZ0xldmVsLldhcm5pbmc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0Q29uc29sZS53YXJuKFwiW1wiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgXCJdIFwiICsgSUxvZ2dlcl8xLkxvZ0xldmVsW2xvZ0xldmVsXSArIFwiOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIElMb2dnZXJfMS5Mb2dMZXZlbC5JbmZvcm1hdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmluZm8oXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBJTG9nZ2VyXzEuTG9nTGV2ZWxbbG9nTGV2ZWxdICsgXCI6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGVidWcgb25seSBnb2VzIHRvIGF0dGFjaGVkIGRlYnVnZ2VycyBpbiBOb2RlLCBzbyB3ZSB1c2UgY29uc29sZS5sb2cgZm9yIFRyYWNlIGFuZCBEZWJ1Z1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dHB1dENvbnNvbGUubG9nKFwiW1wiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgXCJdIFwiICsgSUxvZ2dlcl8xLkxvZ0xldmVsW2xvZ0xldmVsXSArIFwiOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnNvbGVMb2dnZXI7XG59KCkpO1xuZXhwb3J0cy5Db25zb2xlTG9nZ2VyID0gQ29uc29sZUxvZ2dlcjtcbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gZ2V0VXNlckFnZW50SGVhZGVyKCkge1xuICAgIHZhciB1c2VyQWdlbnRIZWFkZXJOYW1lID0gXCJYLVNpZ25hbFItVXNlci1BZ2VudFwiO1xuICAgIGlmIChQbGF0Zm9ybS5pc05vZGUpIHtcbiAgICAgICAgdXNlckFnZW50SGVhZGVyTmFtZSA9IFwiVXNlci1BZ2VudFwiO1xuICAgIH1cbiAgICByZXR1cm4gW3VzZXJBZ2VudEhlYWRlck5hbWUsIGNvbnN0cnVjdFVzZXJBZ2VudChleHBvcnRzLlZFUlNJT04sIGdldE9zTmFtZSgpLCBnZXRSdW50aW1lKCksIGdldFJ1bnRpbWVWZXJzaW9uKCkpXTtcbn1cbmV4cG9ydHMuZ2V0VXNlckFnZW50SGVhZGVyID0gZ2V0VXNlckFnZW50SGVhZGVyO1xuLyoqIEBwcml2YXRlICovXG5mdW5jdGlvbiBjb25zdHJ1Y3RVc2VyQWdlbnQodmVyc2lvbiwgb3MsIHJ1bnRpbWUsIHJ1bnRpbWVWZXJzaW9uKSB7XG4gICAgLy8gTWljcm9zb2Z0IFNpZ25hbFIvW1ZlcnNpb25dIChbRGV0YWlsZWQgVmVyc2lvbl07IFtPcGVyYXRpbmcgU3lzdGVtXTsgW1J1bnRpbWVdOyBbUnVudGltZSBWZXJzaW9uXSlcbiAgICB2YXIgdXNlckFnZW50ID0gXCJNaWNyb3NvZnQgU2lnbmFsUi9cIjtcbiAgICB2YXIgbWFqb3JBbmRNaW5vciA9IHZlcnNpb24uc3BsaXQoXCIuXCIpO1xuICAgIHVzZXJBZ2VudCArPSBtYWpvckFuZE1pbm9yWzBdICsgXCIuXCIgKyBtYWpvckFuZE1pbm9yWzFdO1xuICAgIHVzZXJBZ2VudCArPSBcIiAoXCIgKyB2ZXJzaW9uICsgXCI7IFwiO1xuICAgIGlmIChvcyAmJiBvcyAhPT0gXCJcIikge1xuICAgICAgICB1c2VyQWdlbnQgKz0gb3MgKyBcIjsgXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB1c2VyQWdlbnQgKz0gXCJVbmtub3duIE9TOyBcIjtcbiAgICB9XG4gICAgdXNlckFnZW50ICs9IFwiXCIgKyBydW50aW1lO1xuICAgIGlmIChydW50aW1lVmVyc2lvbikge1xuICAgICAgICB1c2VyQWdlbnQgKz0gXCI7IFwiICsgcnVudGltZVZlcnNpb247XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB1c2VyQWdlbnQgKz0gXCI7IFVua25vd24gUnVudGltZSBWZXJzaW9uXCI7XG4gICAgfVxuICAgIHVzZXJBZ2VudCArPSBcIilcIjtcbiAgICByZXR1cm4gdXNlckFnZW50O1xufVxuZXhwb3J0cy5jb25zdHJ1Y3RVc2VyQWdlbnQgPSBjb25zdHJ1Y3RVc2VyQWdlbnQ7XG5mdW5jdGlvbiBnZXRPc05hbWUoKSB7XG4gICAgaWYgKFBsYXRmb3JtLmlzTm9kZSkge1xuICAgICAgICBzd2l0Y2ggKHByb2Nlc3MucGxhdGZvcm0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ3aW4zMlwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIldpbmRvd3MgTlRcIjtcbiAgICAgICAgICAgIGNhc2UgXCJkYXJ3aW5cIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJtYWNPU1wiO1xuICAgICAgICAgICAgY2FzZSBcImxpbnV4XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTGludXhcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MucGxhdGZvcm07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFJ1bnRpbWVWZXJzaW9uKCkge1xuICAgIGlmIChQbGF0Zm9ybS5pc05vZGUpIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MudmVyc2lvbnMubm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGdldFJ1bnRpbWUoKSB7XG4gICAgaWYgKFBsYXRmb3JtLmlzTm9kZSkge1xuICAgICAgICByZXR1cm4gXCJOb2RlSlNcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkJyb3dzZXJcIjtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlscy5qcy5tYXBcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1xcXFxVdGlscy5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSUxvZ2dlcl8xID0gcmVxdWlyZShcIi4vSUxvZ2dlclwiKTtcbnZhciBJVHJhbnNwb3J0XzEgPSByZXF1aXJlKFwiLi9JVHJhbnNwb3J0XCIpO1xudmFyIFV0aWxzXzEgPSByZXF1aXJlKFwiLi9VdGlsc1wiKTtcbi8qKiBAcHJpdmF0ZSAqL1xudmFyIFdlYlNvY2tldFRyYW5zcG9ydCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJTb2NrZXRUcmFuc3BvcnQoaHR0cENsaWVudCwgYWNjZXNzVG9rZW5GYWN0b3J5LCBsb2dnZXIsIGxvZ01lc3NhZ2VDb250ZW50LCB3ZWJTb2NrZXRDb25zdHJ1Y3RvciwgaGVhZGVycykge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkgPSBhY2Nlc3NUb2tlbkZhY3Rvcnk7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQgPSBsb2dNZXNzYWdlQ29udGVudDtcbiAgICAgICAgdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3RvciA9IHdlYlNvY2tldENvbnN0cnVjdG9yO1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICB0aGlzLm9ucmVjZWl2ZSA9IG51bGw7XG4gICAgICAgIHRoaXMub25jbG9zZSA9IG51bGw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgfVxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsc18xLkFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsc18xLkFyZy5pc1JlcXVpcmVkKHRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHNfMS5BcmcuaXNJbih0cmFuc2ZlckZvcm1hdCwgSVRyYW5zcG9ydF8xLlRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5UcmFjZSwgXCIoV2ViU29ja2V0cyB0cmFuc3BvcnQpIENvbm5lY3RpbmcuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiKSArIChcImFjY2Vzc190b2tlbj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL15odHRwLywgXCJ3c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2ViU29ja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb29raWVzID0gX3RoaXMuaHR0cENsaWVudC5nZXRDb29raWVTdHJpbmcodXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzXzEuUGxhdGZvcm0uaXNOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXJzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IFV0aWxzXzEuZ2V0VXNlckFnZW50SGVhZGVyKCksIG5hbWVfMSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW25hbWVfMV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvb2tpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbXCJDb29raWVcIl0gPSBcIlwiICsgY29va2llcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHBhc3MgaGVhZGVycyB3aGVuIGluIG5vbi1icm93c2VyIGVudmlyb25tZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQgPSBuZXcgX3RoaXMud2ViU29ja2V0Q29uc3RydWN0b3IodXJsLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKHt9LCBoZWFkZXJzLCBfdGhpcy5oZWFkZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghd2ViU29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENocm9tZSBpcyBub3QgaGFwcHkgd2l0aCBwYXNzaW5nICd1bmRlZmluZWQnIGFzIHByb3RvY29sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldCA9IG5ldyBfdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3Rvcih1cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IElUcmFuc3BvcnRfMS5UcmFuc2ZlckZvcm1hdC5CaW5hcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0LmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uIChfZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiV2ViU29ja2V0IGNvbm5lY3RlZCB0byBcIiArIHVybCArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2ViU29ja2V0ID0gd2ViU29ja2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFcnJvckV2ZW50IGlzIGEgYnJvd3NlciBvbmx5IHR5cGUgd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgdHlwZSBleGlzdHMgYmVmb3JlIHVzaW5nIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgRXJyb3JFdmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBldmVudCBpbnN0YW5jZW9mIEVycm9yRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gZXZlbnQuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHRoZSB0cmFuc3BvcnQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuVHJhY2UsIFwiKFdlYlNvY2tldHMgdHJhbnNwb3J0KSBkYXRhIHJlY2VpdmVkLiBcIiArIFV0aWxzXzEuZ2V0RGF0YURldGFpbChtZXNzYWdlLmRhdGEsIF90aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLm9ucmVjZWl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbnJlY2VpdmUobWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNhbGwgY2xvc2UgaGFuZGxlciBpZiBjb25uZWN0aW9uIHdhcyBuZXZlciBlc3RhYmxpc2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSdsbCByZWplY3QgdGhlIGNvbm5lY3QgY2FsbCBpbnN0ZWFkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFcnJvckV2ZW50IGlzIGEgYnJvd3NlciBvbmx5IHR5cGUgd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgdHlwZSBleGlzdHMgYmVmb3JlIHVzaW5nIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEVycm9yRXZlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZXZlbnQgaW5zdGFuY2VvZiBFcnJvckV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBldmVudC5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggdGhlIHRyYW5zcG9ydC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy53ZWJTb2NrZXQgJiYgdGhpcy53ZWJTb2NrZXQucmVhZHlTdGF0ZSA9PT0gdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3Rvci5PUEVOKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLlRyYWNlLCBcIihXZWJTb2NrZXRzIHRyYW5zcG9ydCkgc2VuZGluZyBkYXRhLiBcIiArIFV0aWxzXzEuZ2V0RGF0YURldGFpbChkYXRhLCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcbiAgICAgICAgICAgIHRoaXMud2ViU29ja2V0LnNlbmQoZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiV2ViU29ja2V0IGlzIG5vdCBpbiB0aGUgT1BFTiBzdGF0ZVwiKTtcbiAgICB9O1xuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMud2ViU29ja2V0KSB7XG4gICAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2Ugb25jbG9zZSBjYWxsYmFjayBpbmxpbmUgc28gd2Uga25vdyB0aGUgSHR0cENvbm5lY3Rpb24gd2FzIGNsb3NlZCBwcm9wZXJseSBiZWZvcmUgcmV0dXJuaW5nXG4gICAgICAgICAgICAvLyBUaGlzIGFsc28gc29sdmVzIGFuIGlzc3VlIHdoZXJlIHdlYnNvY2tldC5vbmNsb3NlIGNvdWxkIHRha2UgMTgrIHNlY29uZHMgdG8gdHJpZ2dlciBkdXJpbmcgbmV0d29yayBkaXNjb25uZWN0c1xuICAgICAgICAgICAgdGhpcy5jbG9zZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gd2ViU29ja2V0IHdpbGwgYmUgbnVsbCBpZiB0aGUgdHJhbnNwb3J0IGRpZCBub3Qgc3RhcnQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIGlmICh0aGlzLndlYlNvY2tldCkge1xuICAgICAgICAgICAgLy8gQ2xlYXIgd2Vic29ja2V0IGhhbmRsZXJzIGJlY2F1c2Ugd2UgYXJlIGNvbnNpZGVyaW5nIHRoZSBzb2NrZXQgY2xvc2VkIG5vd1xuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgIHRoaXMud2ViU29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgIHRoaXMud2ViU29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKElMb2dnZXJfMS5Mb2dMZXZlbC5UcmFjZSwgXCIoV2ViU29ja2V0cyB0cmFuc3BvcnQpIHNvY2tldCBjbG9zZWQuXCIpO1xuICAgICAgICBpZiAodGhpcy5vbmNsb3NlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nsb3NlRXZlbnQoZXZlbnQpICYmIChldmVudC53YXNDbGVhbiA9PT0gZmFsc2UgfHwgZXZlbnQuY29kZSAhPT0gMTAwMCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UobmV3IEVycm9yKFwiV2ViU29ja2V0IGNsb3NlZCB3aXRoIHN0YXR1cyBjb2RlOiBcIiArIGV2ZW50LmNvZGUgKyBcIiAoXCIgKyBldmVudC5yZWFzb24gKyBcIikuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuaXNDbG9zZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudCAmJiB0eXBlb2YgZXZlbnQud2FzQ2xlYW4gPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBldmVudC5jb2RlID09PSBcIm51bWJlclwiO1xuICAgIH07XG4gICAgcmV0dXJuIFdlYlNvY2tldFRyYW5zcG9ydDtcbn0oKSk7XG5leHBvcnRzLldlYlNvY2tldFRyYW5zcG9ydCA9IFdlYlNvY2tldFRyYW5zcG9ydDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVdlYlNvY2tldFRyYW5zcG9ydC5qcy5tYXBcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXEBtaWNyb3NvZnRcXFxcc2lnbmFsclxcXFxkaXN0XFxcXGNqc1xcXFxXZWJTb2NrZXRUcmFuc3BvcnQuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRXJyb3JzXzEgPSByZXF1aXJlKFwiLi9FcnJvcnNcIik7XG52YXIgSHR0cENsaWVudF8xID0gcmVxdWlyZShcIi4vSHR0cENsaWVudFwiKTtcbnZhciBJTG9nZ2VyXzEgPSByZXF1aXJlKFwiLi9JTG9nZ2VyXCIpO1xudmFyIFhockh0dHBDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhockh0dHBDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gWGhySHR0cENsaWVudChsb2dnZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xuICAgIFhockh0dHBDbGllbnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBDaGVjayB0aGF0IGFib3J0IHdhcyBub3Qgc2lnbmFsZWQgYmVmb3JlIGNhbGxpbmcgc2VuZFxuICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCAmJiByZXF1ZXN0LmFib3J0U2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3JzXzEuQWJvcnRFcnJvcigpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlcXVlc3QubWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gbWV0aG9kIGRlZmluZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlcXVlc3QudXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gdXJsIGRlZmluZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYLVJlcXVlc3RlZC1XaXRoXCIsIFwiWE1MSHR0cFJlcXVlc3RcIik7XG4gICAgICAgICAgICAvLyBFeHBsaWNpdGx5IHNldHRpbmcgdGhlIENvbnRlbnQtVHlwZSBoZWFkZXIgZm9yIFJlYWN0IE5hdGl2ZSBvbiBBbmRyb2lkIHBsYXRmb3JtLlxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycztcbiAgICAgICAgICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycylcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGhlYWRlcnNbaGVhZGVyXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnRTaWduYWwub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3JzXzEuQWJvcnRFcnJvcigpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3QudGltZW91dCkge1xuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gcmVxdWVzdC50aW1lb3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCkge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBIdHRwQ2xpZW50XzEuSHR0cFJlc3BvbnNlKHhoci5zdGF0dXMsIHhoci5zdGF0dXNUZXh0LCB4aHIucmVzcG9uc2UgfHwgeGhyLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcnNfMS5IdHRwRXJyb3IoeGhyLnN0YXR1c1RleHQsIHhoci5zdGF0dXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhJTG9nZ2VyXzEuTG9nTGV2ZWwuV2FybmluZywgXCJFcnJvciBmcm9tIEhUVFAgcmVxdWVzdC4gXCIgKyB4aHIuc3RhdHVzICsgXCI6IFwiICsgeGhyLnN0YXR1c1RleHQgKyBcIi5cIik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcnNfMS5IdHRwRXJyb3IoeGhyLnN0YXR1c1RleHQsIHhoci5zdGF0dXMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coSUxvZ2dlcl8xLkxvZ0xldmVsLldhcm5pbmcsIFwiVGltZW91dCBmcm9tIEhUVFAgcmVxdWVzdC5cIik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcnNfMS5UaW1lb3V0RXJyb3IoKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQocmVxdWVzdC5jb250ZW50IHx8IFwiXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBYaHJIdHRwQ2xpZW50O1xufShIdHRwQ2xpZW50XzEuSHR0cENsaWVudCkpO1xuZXhwb3J0cy5YaHJIdHRwQ2xpZW50ID0gWGhySHR0cENsaWVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVhockh0dHBDbGllbnQuanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcWGhySHR0cENsaWVudC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRXJyb3JzXzEgPSByZXF1aXJlKFwiLi9FcnJvcnNcIik7XG5leHBvcnRzLkFib3J0RXJyb3IgPSBFcnJvcnNfMS5BYm9ydEVycm9yO1xuZXhwb3J0cy5IdHRwRXJyb3IgPSBFcnJvcnNfMS5IdHRwRXJyb3I7XG5leHBvcnRzLlRpbWVvdXRFcnJvciA9IEVycm9yc18xLlRpbWVvdXRFcnJvcjtcbnZhciBIdHRwQ2xpZW50XzEgPSByZXF1aXJlKFwiLi9IdHRwQ2xpZW50XCIpO1xuZXhwb3J0cy5IdHRwQ2xpZW50ID0gSHR0cENsaWVudF8xLkh0dHBDbGllbnQ7XG5leHBvcnRzLkh0dHBSZXNwb25zZSA9IEh0dHBDbGllbnRfMS5IdHRwUmVzcG9uc2U7XG52YXIgRGVmYXVsdEh0dHBDbGllbnRfMSA9IHJlcXVpcmUoXCIuL0RlZmF1bHRIdHRwQ2xpZW50XCIpO1xuZXhwb3J0cy5EZWZhdWx0SHR0cENsaWVudCA9IERlZmF1bHRIdHRwQ2xpZW50XzEuRGVmYXVsdEh0dHBDbGllbnQ7XG52YXIgSHViQ29ubmVjdGlvbl8xID0gcmVxdWlyZShcIi4vSHViQ29ubmVjdGlvblwiKTtcbmV4cG9ydHMuSHViQ29ubmVjdGlvbiA9IEh1YkNvbm5lY3Rpb25fMS5IdWJDb25uZWN0aW9uO1xuZXhwb3J0cy5IdWJDb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uXzEuSHViQ29ubmVjdGlvblN0YXRlO1xudmFyIEh1YkNvbm5lY3Rpb25CdWlsZGVyXzEgPSByZXF1aXJlKFwiLi9IdWJDb25uZWN0aW9uQnVpbGRlclwiKTtcbmV4cG9ydHMuSHViQ29ubmVjdGlvbkJ1aWxkZXIgPSBIdWJDb25uZWN0aW9uQnVpbGRlcl8xLkh1YkNvbm5lY3Rpb25CdWlsZGVyO1xudmFyIElIdWJQcm90b2NvbF8xID0gcmVxdWlyZShcIi4vSUh1YlByb3RvY29sXCIpO1xuZXhwb3J0cy5NZXNzYWdlVHlwZSA9IElIdWJQcm90b2NvbF8xLk1lc3NhZ2VUeXBlO1xudmFyIElMb2dnZXJfMSA9IHJlcXVpcmUoXCIuL0lMb2dnZXJcIik7XG5leHBvcnRzLkxvZ0xldmVsID0gSUxvZ2dlcl8xLkxvZ0xldmVsO1xudmFyIElUcmFuc3BvcnRfMSA9IHJlcXVpcmUoXCIuL0lUcmFuc3BvcnRcIik7XG5leHBvcnRzLkh0dHBUcmFuc3BvcnRUeXBlID0gSVRyYW5zcG9ydF8xLkh0dHBUcmFuc3BvcnRUeXBlO1xuZXhwb3J0cy5UcmFuc2ZlckZvcm1hdCA9IElUcmFuc3BvcnRfMS5UcmFuc2ZlckZvcm1hdDtcbnZhciBMb2dnZXJzXzEgPSByZXF1aXJlKFwiLi9Mb2dnZXJzXCIpO1xuZXhwb3J0cy5OdWxsTG9nZ2VyID0gTG9nZ2Vyc18xLk51bGxMb2dnZXI7XG52YXIgSnNvbkh1YlByb3RvY29sXzEgPSByZXF1aXJlKFwiLi9Kc29uSHViUHJvdG9jb2xcIik7XG5leHBvcnRzLkpzb25IdWJQcm90b2NvbCA9IEpzb25IdWJQcm90b2NvbF8xLkpzb25IdWJQcm90b2NvbDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9TdWJqZWN0XCIpO1xuZXhwb3J0cy5TdWJqZWN0ID0gU3ViamVjdF8xLlN1YmplY3Q7XG52YXIgVXRpbHNfMSA9IHJlcXVpcmUoXCIuL1V0aWxzXCIpO1xuZXhwb3J0cy5WRVJTSU9OID0gVXRpbHNfMS5WRVJTSU9OO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxAbWljcm9zb2Z0XFxcXHNpZ25hbHJcXFxcZGlzdFxcXFxjanNcXFxcaW5kZXguanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcQG1pY3Jvc29mdFxcXFxzaWduYWxyXFxcXGRpc3RcXFxcY2pzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cbiAgdmFyIEFyciA9ICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBVaW50OEFycmF5XG4gICAgOiBBcnJheVxuXG5cdHZhciBQTFVTICAgPSAnKycuY2hhckNvZGVBdCgwKVxuXHR2YXIgU0xBU0ggID0gJy8nLmNoYXJDb2RlQXQoMClcblx0dmFyIE5VTUJFUiA9ICcwJy5jaGFyQ29kZUF0KDApXG5cdHZhciBMT1dFUiAgPSAnYScuY2hhckNvZGVBdCgwKVxuXHR2YXIgVVBQRVIgID0gJ0EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFBMVVNfVVJMX1NBRkUgPSAnLScuY2hhckNvZGVBdCgwKVxuXHR2YXIgU0xBU0hfVVJMX1NBRkUgPSAnXycuY2hhckNvZGVBdCgwKVxuXG5cdGZ1bmN0aW9uIGRlY29kZSAoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKVxuXHRcdGlmIChjb2RlID09PSBQTFVTIHx8XG5cdFx0ICAgIGNvZGUgPT09IFBMVVNfVVJMX1NBRkUpXG5cdFx0XHRyZXR1cm4gNjIgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIIHx8XG5cdFx0ICAgIGNvZGUgPT09IFNMQVNIX1VSTF9TQUZFKVxuXHRcdFx0cmV0dXJuIDYzIC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKVxuXHRcdFx0cmV0dXJuIC0xIC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBVUFBFUlxuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNlxuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkgKGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMFxuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGhcblxuXHRcdHZhciBMID0gMFxuXG5cdFx0ZnVuY3Rpb24gcHVzaCAodikge1xuXHRcdFx0YXJyW0wrK10gPSB2XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2KSB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSlcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNilcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDIpXG5cdFx0XHRwdXNoKCh0bXAgPj4gOCkgJiAweEZGKVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdHJldHVybiBhcnJcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQgKHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0XHRleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMywgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0XHR0ZW1wLCBsZW5ndGhcblxuXHRcdGZ1bmN0aW9uIGVuY29kZSAobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKVxuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApXG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV1cblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz09J1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPj4gNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDIpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9J1xuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxuXG5cdGV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheVxuXHRleHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0XG59KHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJyA/ICh0aGlzLmJhc2U2NGpzID0ge30pIDogZXhwb3J0cykpXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcXFxcYjY0LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCBpZiBicm93c2VyIHN1cHBvcnRzIFR5cGVkIEFycmF5cy4gU3VwcG9ydGVkIGJyb3dzZXJzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssXG4gIC8vIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy4gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmdcbiAgLy8gcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLCB0aGVuIHRoYXQncyB0aGUgc2FtZSBhcyBubyBgVWludDhBcnJheWAgc3VwcG9ydFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy4gVGhpcyBpcyBhbiBpc3N1ZVxuICAvLyBpbiBGaXJlZm94IDQtMjkuIE5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH1cbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJlxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nIC8vIENocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pKClcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlciAoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSlcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKVxuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3RcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpXG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSdcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aFxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKVxuICAgIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKVxuICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpIC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuJylcblxuICB2YXIgYnVmXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpc1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGhcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpXG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSlcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSlcbiAgICAgIGVsc2VcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdFtpXVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0XG4gIHN0ciA9IHN0ciArICcnXG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggLyAyXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMlxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgK1xuICAgICAgJ2xpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LicpXG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMClcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdXG4gIH1cblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIGl0ZW0uY29weShidWYsIHBvcylcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBhc3NlcnQoc3RyTGVuICUgMiA9PT0gMCwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGFzc2VydCghaXNOYU4oYnl0ZSksICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyXG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7ICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBvZmZzZXQgPSBsZW5ndGhcbiAgICBsZW5ndGggPSBzd2FwXG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuXG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMFxuICBlbmQgPSAoZW5kICE9PSB1bmRlZmluZWQpXG4gICAgPyBOdW1iZXIoZW5kKVxuICAgIDogZW5kID0gc2VsZi5sZW5ndGhcblxuICAvLyBGYXN0cGF0aCBlbXB0eSBzdHJpbmdzXG4gIGlmIChlbmQgPT09IHN0YXJ0KVxuICAgIHJldHVybiAnJ1xuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXNcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0JylcbiAgYXNzZXJ0KHRhcmdldF9zdGFydCA+PSAwICYmIHRhcmdldF9zdGFydCA8IHRhcmdldC5sZW5ndGgsXG4gICAgICAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgc291cmNlLmxlbmd0aCwgJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKVxuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpXG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKGxlbiA8IDEwMCB8fCAhQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydClcbiAgfVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJydcbiAgdmFyIHRtcCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgICAgIHRtcCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcClcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKVxuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKVxufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpKzFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApXG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pXG5cbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICAgIHJldHVybiBuZXdCdWZcbiAgfVxufVxuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KVxufVxuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMl0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICAgIHZhbCB8PSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMClcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDNdXG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCxcbiAgICAgICAgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHZhciBuZWcgPSB0aGlzW29mZnNldF0gJiAweDgwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRGbG9hdCAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZERvdWJsZSAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmYpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm5cblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgICAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZiwgLTB4ODApXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydClcbiAgZWxzZVxuICAgIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQzMihidWYsIDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLFxuICAgICAgICAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMFxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoXG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMClcbiAgfVxuXG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSksICd2YWx1ZSBpcyBub3QgYSBudW1iZXInKVxuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKVxuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IHZhbHVlXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW11cbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKVxuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLidcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+J1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgICAgcmV0dXJuIChuZXcgQnVmZmVyKHRoaXMpKS5idWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSlcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXVxuICAgICAgcmV0dXJuIGJ1Zi5idWZmZXJcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gIH1cbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlXG5cbi8qKlxuICogQXVnbWVudCBhIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBVaW50OEFycmF5IGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5faXNCdWZmZXIgPSB0cnVlXG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldFxuICBhcnIuX3NldCA9IGFyci5zZXRcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0XG4gIGFyci5zZXQgPSBCUC5zZXRcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZVxuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9KU09OID0gQlAudG9KU09OXG4gIGFyci5jb3B5ID0gQlAuY29weVxuICBhcnIuc2xpY2UgPSBCUC5zbGljZVxuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEVcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRVxuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFXG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkVcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDhcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEVcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkVcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEVcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkVcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEVcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkVcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRVxuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFXG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50OFxuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEVcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFXG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRVxuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkVcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50OFxuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFXG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkVcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRVxuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFXG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEVcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRVxuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEVcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFXG4gIGFyci5maWxsID0gQlAuZmlsbFxuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3RcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyXG5cbiAgcmV0dXJuIGFyclxufVxuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAgKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICBpbmRleCA9IH5+aW5kZXg7ICAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIGluZGV4ICs9IGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGNvZXJjZSAobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aClcbiAgcmV0dXJuIGxlbmd0aCA8IDAgPyAwIDogbGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKHN1YmplY3QpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuICB9KShzdWJqZWN0KVxufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoIChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fFxuICAgICAgc3ViamVjdCAmJiB0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcidcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoYiA8PSAweDdGKVxuICAgICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpXG4gICAgZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpXG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrK1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpKzEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKVxuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpXG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cilcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3NcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSlcbiAgICAgIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIgKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpIC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQgKHZhbHVlLCBtYXgpIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlID49IDAsICdzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZzaW50ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZJRUVFNzU0ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbn1cblxuZnVuY3Rpb24gYXNzZXJ0ICh0ZXN0LCBtZXNzYWdlKSB7XG4gIGlmICghdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0ZhaWxlZCBhc3NlcnRpb24nKVxufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxidWZmZXJcXFxcaW5kZXguanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxpZWVlNzU0XFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1xcXFxicm93c2VyLmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgc2lnbmFsUiA9IHJlcXVpcmUoXCJAbWljcm9zb2Z0L3NpZ25hbHJcIik7XHJcbnZhciBjb25uZWN0aW9uID0gbmV3IHNpZ25hbFIuSHViQ29ubmVjdGlvbkJ1aWxkZXIoKS53aXRoVXJsKFwiL0JpekdhemVNZWV0aW5nU2VydmVyXCIpLmJ1aWxkKCk7XHJcbnZhciBtZWV0aW5nVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVldGluZ1RhYmxlJyk7XHJcbnZhciBjb25uZWN0aW9uU3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25uZWN0aW9uU3RhdHVzTWVzc2FnZScpO1xyXG52YXIgcm9vbU5hbWVUeHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVldGluZ1RpdGxlVHh0Jyk7XHJcbnZhciBjcmVhdGVSb29tQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZU1lZXRpbmdCdG4nKTtcclxudmFyIGhhc1Jvb21Kb2luZWQgPSBmYWxzZTtcclxuJChtZWV0aW5nVGFibGUpLkRhdGFUYWJsZSh7XHJcbiAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgeyBkYXRhOiAnUm9vbUlkJywgXCJ3aWR0aFwiOiBcIjMwJVwiIH0sXHJcbiAgICAgICAgeyBkYXRhOiAnTmFtZScsIFwid2lkdGhcIjogXCIzMCVcIiB9LFxyXG4gICAgICAgIHsgZGF0YTogJ0lzQ29udHJvbEFsbG93ZWQnLCBcIndpZHRoXCI6IFwiNSVcIiB9LFxyXG4gICAgICAgIHsgZGF0YTogJ0lzUmVjb3JkaW5nUmVxdWlyZWQnLCBcIndpZHRoXCI6IFwiNSVcIiB9LFxyXG4gICAgICAgIHsgZGF0YTogJ0lzTXVsdGlwbGVTaGFyaW5nQWxsb3dlZCcsIFwid2lkdGhcIjogXCI1JVwiIH0sXHJcbiAgICAgICAgeyBkYXRhOiAnSXNTY3JlZW5TaGFyZVJlcXVpcmVkJywgXCJ3aWR0aFwiOiBcIjUlXCIgfSxcclxuICAgICAgICB7IGRhdGE6ICdJc09wZW5lZCcsIFwid2lkdGhcIjogXCI1JVwiIH0sXHJcbiAgICAgICAgeyBkYXRhOiAnQnV0dG9uJywgXCJ3aWR0aFwiOiBcIjE1JVwiIH1cclxuICAgIF0sXHJcbiAgICBcImxlbmd0aENoYW5nZVwiOiBmYWxzZSxcclxuICAgIFwic2VhcmNoaW5nXCI6IGZhbHNlLFxyXG4gICAgXCJsYW5ndWFnZVwiOiB7XHJcbiAgICAgICAgXCJlbXB0eVRhYmxlXCI6IFwiTm8gbWVldGluZyBhdmFpbGFibGVcIlxyXG4gICAgfSxcclxuICAgIFwiaW5mb1wiOiBmYWxzZVxyXG59KTtcclxuLy8gQ29ubmVjdCB0byB0aGUgc2lnbmFsaW5nIHNlcnZlclxyXG5jb25uZWN0aW9uLnN0YXJ0KCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25uZWN0aW9uLm9uKCd1cGRhdGVSb29tJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgJChtZWV0aW5nVGFibGUpLkRhdGFUYWJsZSgpLmNsZWFyKCkucm93cy5hZGQob2JqKS5kcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHsgfVxyXG4gICAgfSk7XHJcbiAgICBjb25uZWN0aW9uLm9uKCdjcmVhdGVkJywgZnVuY3Rpb24gKHJvb21JZCwgY2xpZW50SW5mb01zZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVkIHJvb20nLCByb29tSWQpO1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdHVzTWVzc2FnZS5pbm5lclRleHQgPSAnWW91IGNyZWF0ZWQgUm9vbSAnICsgcm9vbUlkICsgJy4gV2FpdGluZyBmb3IgcGFydGljaXBhbnRzLi4uJztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikgeyB9XHJcbiAgICB9KTtcclxuICAgIGNvbm5lY3Rpb24ub24oJ2Vycm9yJywgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICBhbGVydChtZXNzYWdlKTtcclxuICAgIH0pO1xyXG4gICAgLy9HZXQgcm9vbSBsaXN0LlxyXG4gICAgY29ubmVjdGlvbi5pbnZva2UoXCJHZXRSb29tSW5mb1wiKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyLnRvU3RyaW5nKCkpO1xyXG4gICAgfSk7XHJcbn0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVyci50b1N0cmluZygpKTtcclxufSk7XHJcbiQoY3JlYXRlUm9vbUJ0bikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1lZXRpbmdUaXRsZSA9IHJvb21OYW1lVHh0LnZhbHVlO1xyXG4gICAgY3JlYXRlTWVldGluZyhtZWV0aW5nVGl0bGUpO1xyXG59KTtcclxuJCgnI21lZXRpbmdUYWJsZSB0Ym9keScpLm9uKCdjbGljaycsICdidXR0b24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoaGFzUm9vbUpvaW5lZCkge1xyXG4gICAgICAgIGFsZXJ0KCdZb3UgYWxyZWFkeSBqb2luZWQgdGhlIHJvb20uIFBsZWFzZSB1c2UgYSBuZXcgdGFiIG9yIHdpbmRvdy4nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciByb3dkYXRhID0gJChtZWV0aW5nVGFibGUpLkRhdGFUYWJsZSgpLnJvdygkKHRoaXMpLnBhcmVudHMoJ3RyJykpLmRhdGEoKTtcclxuICAgICAgICB2YXIgbWVldGluZ0lkID0gcGFyc2VJbnQocm93ZGF0YS5Sb29tSWQpO1xyXG4gICAgICAgIHZhciBpc09wZW5lZCA9IHJvd2RhdGEuSXNPcGVuZWQ7XHJcbiAgICAgICAgdmFyIHVzZXJJZCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignaWQnKSk7XHJcbiAgICAgICAgaWYgKG1lZXRpbmdJZCA9PT0gTmFOKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKGlzT3BlbmVkID09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKCF1c2VySWQpXHJcbiAgICAgICAgICAgICAgICBqb2luTWVldGluZ0FzQW5vbnltb3VzKG1lZXRpbmdJZCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGpvaW5NZWV0aW5nKG1lZXRpbmdJZCwgdXNlcklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNPcGVuZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJJZCAhPT0gTmFOKVxyXG4gICAgICAgICAgICAgICAgam9pbk1lZXRpbmcobWVldGluZ0lkLCB1c2VySWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbmZ1bmN0aW9uIGNyZWF0ZU1lZXRpbmcobWVldGluZ1RpdGxlKSB7XHJcbiAgICBjb25uZWN0aW9uLmludm9rZShcIkNyZWF0ZVJvb21cIiwgbWVldGluZ1RpdGxlLCBcIlwiKS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyLnRvU3RyaW5nKCkpO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gam9pbk1lZXRpbmcobWVldGluZ0lkLCB1c2VySWQpIHtcclxuICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9sb2JieS9cIiArIG1lZXRpbmdJZCArIFwiL1wiICsgdXNlcklkO1xyXG59XHJcbmZ1bmN0aW9uIGpvaW5NZWV0aW5nQXNBbm9ueW1vdXMobWVldGluZ0lkKSB7XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gXCIvbG9iYnkvXCIgKyBtZWV0aW5nSWQ7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVldGluZ19saXN0LmpzLm1hcFxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzg5YWQ2M2ViLmpzXCIsXCIvXCIpIl19
