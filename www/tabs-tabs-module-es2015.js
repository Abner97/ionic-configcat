(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tabs-tabs-module"],{

/***/ "2cly":
/*!*************************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/ConfigCatClientOptions.js ***!
  \*************************************************************************/
/*! exports provided: DataGovernance, OptionsBase, AutoPollOptions, ManualPollOptions, LazyLoadOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGovernance", function() { return DataGovernance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsBase", function() { return OptionsBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoPollOptions", function() { return AutoPollOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManualPollOptions", function() { return ManualPollOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadOptions", function() { return LazyLoadOptions; });
/* harmony import */ var _ConfigCatLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigCatLogger */ "nGbc");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "q7S3");
/* harmony import */ var _Cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Cache */ "o13+");
/* harmony import */ var _Version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Version */ "IJvu");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/** Control the location of the config.json files containing your feature flags and settings within the ConfigCat CDN. */
var DataGovernance;
(function (DataGovernance) {
    /** Select this if your feature flags are published to all global CDN nodes. */
    DataGovernance[DataGovernance["Global"] = 0] = "Global";
    /** Select this if your feature flags are published to CDN nodes only in the EU. */
    DataGovernance[DataGovernance["EuOnly"] = 1] = "EuOnly";
})(DataGovernance || (DataGovernance = {}));
var OptionsBase = /** @class */ (function () {
    function OptionsBase(apiKey, clientVersion, options, defaultCache) {
        var _a;
        this.configFileName = "config_v5";
        this.logger = new _ConfigCatLogger__WEBPACK_IMPORTED_MODULE_0__["ConfigCatConsoleLogger"](_index__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Warn);
        this.requestTimeoutMs = 30000;
        this.baseUrlOverriden = false;
        this.proxy = "";
        if (!apiKey) {
            throw new Error("Invalid 'apiKey' value");
        }
        if (!defaultCache) {
            defaultCache = new _Cache__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"]();
        }
        this.apiKey = apiKey;
        this.clientVersion = clientVersion;
        this.dataGovernance = (_a = options === null || options === void 0 ? void 0 : options.dataGovernance) !== null && _a !== void 0 ? _a : DataGovernance.Global;
        this.cache = defaultCache;
        switch (this.dataGovernance) {
            case DataGovernance.EuOnly:
                this.baseUrl = "https://cdn-eu.configcat.com";
                break;
            default:
                this.baseUrl = "https://cdn-global.configcat.com";
                break;
        }
        if (options) {
            if (options.logger) {
                this.logger = options.logger;
            }
            if (options.requestTimeoutMs) {
                if (options.requestTimeoutMs < 0) {
                    throw new Error("Invalid 'requestTimeoutMs' value");
                }
                this.requestTimeoutMs = options.requestTimeoutMs;
            }
            if (options.baseUrl) {
                this.baseUrl = options.baseUrl;
                this.baseUrlOverriden = true;
            }
            if (options.proxy) {
                this.proxy = options.proxy;
            }
            if (options.cache) {
                this.cache = options.cache;
            }
        }
    }
    OptionsBase.prototype.getUrl = function () {
        return this.baseUrl + "/configuration-files/" + this.apiKey + "/" + this.configFileName + ".json";
    };
    OptionsBase.prototype.getCacheKey = function () {
        return "js_" + this.configFileName + "_" + this.apiKey;
    };
    return OptionsBase;
}());

var AutoPollOptions = /** @class */ (function (_super) {
    __extends(AutoPollOptions, _super);
    function AutoPollOptions(apiKey, options, defaultCache) {
        var _this = _super.call(this, apiKey, "a-" + _Version__WEBPACK_IMPORTED_MODULE_3__["default"], options, defaultCache) || this;
        /** The client's poll interval in seconds. Default: 60 seconds. */
        _this.pollIntervalSeconds = 60;
        /** You can subscribe to configuration changes with this callback. */
        _this.configChanged = function () { };
        /** Maximum waiting time between the client initialization and the first config acquisition in secconds. */
        _this.maxInitWaitTimeSeconds = 5;
        if (options) {
            if (options.pollIntervalSeconds !== undefined && options.pollIntervalSeconds !== null) {
                _this.pollIntervalSeconds = options.pollIntervalSeconds;
            }
            if (options.configChanged) {
                _this.configChanged = options.configChanged;
            }
            if (options.maxInitWaitTimeSeconds !== undefined && options.maxInitWaitTimeSeconds !== null) {
                _this.maxInitWaitTimeSeconds = options.maxInitWaitTimeSeconds;
            }
        }
        if (_this.pollIntervalSeconds < 1) {
            throw new Error("Invalid 'pollIntervalSeconds' value");
        }
        if (_this.maxInitWaitTimeSeconds < 0) {
            throw new Error("Invalid 'maxInitWaitTimeSeconds' value");
        }
        return _this;
    }
    return AutoPollOptions;
}(OptionsBase));

var ManualPollOptions = /** @class */ (function (_super) {
    __extends(ManualPollOptions, _super);
    function ManualPollOptions(apiKey, options, defaultCache) {
        return _super.call(this, apiKey, "m-" + _Version__WEBPACK_IMPORTED_MODULE_3__["default"], options, defaultCache) || this;
    }
    return ManualPollOptions;
}(OptionsBase));

var LazyLoadOptions = /** @class */ (function (_super) {
    __extends(LazyLoadOptions, _super);
    function LazyLoadOptions(apiKey, options, defaultCache) {
        var _this = _super.call(this, apiKey, "l-" + _Version__WEBPACK_IMPORTED_MODULE_3__["default"], options, defaultCache) || this;
        /** The cache TTL. */
        _this.cacheTimeToLiveSeconds = 60;
        if (options) {
            if (options.cacheTimeToLiveSeconds) {
                _this.cacheTimeToLiveSeconds = options.cacheTimeToLiveSeconds;
            }
        }
        if (!_this.cacheTimeToLiveSeconds || _this.cacheTimeToLiveSeconds < 1) {
            throw new Error("Invalid 'cacheTimeToLiveSeconds' value. Value must be greater than zero.");
        }
        return _this;
    }
    return LazyLoadOptions;
}(OptionsBase));



/***/ }),

/***/ "7w3z":
/*!********************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/ConfigServiceBase.js ***!
  \********************************************************************/
/*! exports provided: ConfigServiceBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigServiceBase", function() { return ConfigServiceBase; });
/* harmony import */ var _ProjectConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectConfig */ "Op/A");

var ConfigServiceBase = /** @class */ (function () {
    function ConfigServiceBase(configFetcher, baseConfig) {
        this.configFetcher = configFetcher;
        this.baseConfig = baseConfig;
    }
    ConfigServiceBase.prototype.refreshLogicBaseAsync = function (lastProjectConfig, forceUpdateCache) {
        var _this = this;
        if (forceUpdateCache === void 0) { forceUpdateCache = true; }
        return new Promise(function (resolve) {
            _this.fetchLogic(_this.baseConfig, lastProjectConfig, 0, function (newConfig) {
                if (newConfig && newConfig.ConfigJSON) {
                    if (forceUpdateCache || !_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["ProjectConfig"].equals(newConfig, lastProjectConfig)) {
                        _this.baseConfig.cache.set(_this.baseConfig.getCacheKey(), newConfig);
                    }
                    resolve(newConfig);
                }
                else {
                    resolve(lastProjectConfig);
                }
            });
        });
    };
    ConfigServiceBase.prototype.fetchLogic = function (options, lastProjectConfig, retries, callback) {
        var _this = this;
        var calledBaseUrl = this.baseConfig.baseUrl;
        this.configFetcher.fetchLogic(this.baseConfig, lastProjectConfig, function (newConfig) {
            if (!newConfig || !newConfig.ConfigJSON) {
                callback(null);
                return;
            }
            var preferences = newConfig.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["ConfigFile"].Preferences];
            if (!preferences) {
                callback(newConfig);
                return;
            }
            var baseUrl = preferences[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Preferences"].BaseUrl];
            // If the base_url is the same as the last called one, just return the response.
            if (!baseUrl || baseUrl == calledBaseUrl) {
                callback(newConfig);
                return;
            }
            var redirect = preferences[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Preferences"].Redirect];
            // If the base_url is overridden, and the redirect parameter is not 2 (force),
            // the SDK should not redirect the calls and it just have to return the response.
            if (options.baseUrlOverriden && redirect !== 2) {
                callback(newConfig);
                return;
            }
            options.baseUrl = baseUrl;
            if (redirect === 0) {
                callback(newConfig);
                return;
            }
            if (redirect === 1) {
                options.logger.warn("Your dataGovernance parameter at ConfigCatClient initialization is not in sync " +
                    "with your preferences on the ConfigCat Dashboard: " +
                    "https://app.configcat.com/organization/data-governance. " +
                    "Only Organization Admins can access this preference.");
            }
            if (retries >= 2) {
                options.logger.error("Redirect loop during config.json fetch. Please contact support@configcat.com.");
                callback(newConfig);
                return;
            }
            _this.fetchLogic(options, lastProjectConfig, ++retries, callback);
            return;
        });
    };
    return ConfigServiceBase;
}());



/***/ }),

/***/ "AHrv":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tabs/tabs.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-tabs>\n  <ion-tab-bar slot=\"bottom\">\n    <ion-tab-button tab=\"tab1\">\n      <ion-icon name=\"clipboard-outline\"></ion-icon>\n      <ion-label>Pendientes</ion-label>\n    </ion-tab-button>\n\n    <ion-tab-button tab=\"tab2\" *ngIf=\"listFeature\">\n      <ion-icon name=\"checkmark-done-outline\"></ion-icon>\n      <ion-label>Terminados</ion-label>\n    </ion-tab-button>\n  </ion-tab-bar>\n</ion-tabs>\n");

/***/ }),

/***/ "F0Vv":
/*!****************************************************!*\
  !*** ./node_modules/configcat-js/lib/esm/index.js ***!
  \****************************************************/
/*! exports provided: createClient, createClientWithAutoPoll, createClientWithManualPoll, createClientWithLazyLoad, createConsoleLogger, DataGovernance, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClient", function() { return createClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClientWithAutoPoll", function() { return createClientWithAutoPoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClientWithManualPoll", function() { return createClientWithManualPoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClientWithLazyLoad", function() { return createClientWithLazyLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createConsoleLogger", function() { return createConsoleLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGovernance", function() { return DataGovernance; });
/* harmony import */ var configcat_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! configcat-common */ "q7S3");
/* harmony import */ var _ConfigFetcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigFetcher */ "be5z");
/* harmony import */ var _Cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Cache */ "Y0Me");



/**
 * Create an instance of ConfigCatClient and setup Auto polling with default options.
 * @param {string} sdkkey - SDK Key to access your configuration.
 * @param options - Options for Auto polling
 */
function createClient(sdkkey, options) {
    return createClientWithAutoPoll(sdkkey, options);
}
/**
 * Create an instance of ConfigCatClient and setup Auto polling.
 * @param {string} sdkkey - SDK Key to access your configuration.
 * @param options - Options for Auto polling
 */
function createClientWithAutoPoll(sdkKey, options) {
    return configcat_common__WEBPACK_IMPORTED_MODULE_0__["createClientWithAutoPoll"](sdkKey, { configFetcher: new _ConfigFetcher__WEBPACK_IMPORTED_MODULE_1__["HttpConfigFetcher"](), cache: new _Cache__WEBPACK_IMPORTED_MODULE_2__["LocalStorageCache"]() }, options);
}
/**
 * Create an instance of ConfigCatClient and setup Manual polling.
 * @param {string} sdkKey - SDK Key to access your configuration.
 * @param options - Options for Manual polling
 */
function createClientWithManualPoll(sdkKey, options) {
    return configcat_common__WEBPACK_IMPORTED_MODULE_0__["createClientWithManualPoll"](sdkKey, {
        configFetcher: new _ConfigFetcher__WEBPACK_IMPORTED_MODULE_1__["HttpConfigFetcher"](),
        cache: new _Cache__WEBPACK_IMPORTED_MODULE_2__["LocalStorageCache"](),
    }, options);
}
/**
 * Create an instance of ConfigCatClient and setup Lazy loading.
 * @param {string} sdkKey - SDK Key to access your configuration.
 * @param options - Options for Lazy loading
 */
function createClientWithLazyLoad(sdkKey, options) {
    return configcat_common__WEBPACK_IMPORTED_MODULE_0__["createClientWithLazyLoad"](sdkKey, { configFetcher: new _ConfigFetcher__WEBPACK_IMPORTED_MODULE_1__["HttpConfigFetcher"](), cache: new _Cache__WEBPACK_IMPORTED_MODULE_2__["LocalStorageCache"]() }, options);
}
function createConsoleLogger(logLevel) {
    return configcat_common__WEBPACK_IMPORTED_MODULE_0__["createConsoleLogger"](logLevel);
}
var DataGovernance = {
    /** Select this if your feature flags are published to all global CDN nodes. */
    Global: configcat_common__WEBPACK_IMPORTED_MODULE_0__["DataGovernance"].Global,
    /** Select this if your feature flags are published to CDN nodes only in the EU. */
    EuOnly: configcat_common__WEBPACK_IMPORTED_MODULE_0__["DataGovernance"].EuOnly
};
/* harmony default export */ __webpack_exports__["default"] = (createClient);


/***/ }),

/***/ "IJvu":
/*!**********************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/Version.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("4.4.0");


/***/ }),

/***/ "MJr+":
/*!***********************************!*\
  !*** ./src/app/tabs/tabs.page.ts ***!
  \***********************************/
/*! exports provided: TabsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPage", function() { return TabsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_tabs_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./tabs.page.html */ "AHrv");
/* harmony import */ var _tabs_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs.page.scss */ "PkIa");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_configcat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/configcat.service */ "Y7u2");





let TabsPage = class TabsPage {
    constructor(configCatService) {
        this.configCatService = configCatService;
        //Subscripcion a observable para escuchar cambios en el servicio
        configCatService.getlist_feature().then((enabled) => {
            this.listFeature = enabled;
        });
    }
    ngOnInit() {
        this.subscription = this.configCatService.list_featureObs.subscribe((enabled) => {
            this.listFeature = enabled;
            console.log(enabled);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
TabsPage.ctorParameters = () => [
    { type: _services_configcat_service__WEBPACK_IMPORTED_MODULE_4__["ConfigcatService"] }
];
TabsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-tabs",
        template: _raw_loader_tabs_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tabs_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], TabsPage);



/***/ }),

/***/ "Op/A":
/*!****************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/ProjectConfig.js ***!
  \****************************************************************/
/*! exports provided: ProjectConfig, ConfigFile, Preferences, Setting, RolloutRules, RolloutPercentageItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectConfig", function() { return ProjectConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigFile", function() { return ConfigFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Preferences", function() { return Preferences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Setting", function() { return Setting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolloutRules", function() { return RolloutRules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolloutPercentageItems", function() { return RolloutPercentageItems; });
var ProjectConfig = /** @class */ (function () {
    function ProjectConfig(timeStamp, jsonConfig, httpETag) {
        this.Timestamp = timeStamp;
        this.ConfigJSON = JSON.parse(jsonConfig);
        this.HttpETag = httpETag;
    }
    /**
     * Determines whether the specified ProjectConfig instances are considered equal.
     */
    ProjectConfig.equals = function (projectConfig1, projectConfig2) {
        if (!projectConfig1 || !projectConfig2)
            return false;
        return (this.ensureStrictEtag(projectConfig1.HttpETag) === this.ensureStrictEtag(projectConfig2.HttpETag));
    };
    ProjectConfig.ensureStrictEtag = function (etag) {
        if (!etag) {
            return etag;
        }
        if (etag.length > 2 && etag.substr(0, 2).toLocaleUpperCase() === "W/") {
            return etag.substring(2);
        }
        return etag;
    };
    return ProjectConfig;
}());

var ConfigFile = /** @class */ (function () {
    function ConfigFile() {
    }
    ConfigFile.Preferences = "p";
    ConfigFile.FeatureFlags = "f";
    return ConfigFile;
}());

var Preferences = /** @class */ (function () {
    function Preferences() {
    }
    Preferences.BaseUrl = "u";
    Preferences.Redirect = "r";
    return Preferences;
}());

var Setting = /** @class */ (function () {
    function Setting() {
    }
    Setting.Value = "v";
    Setting.SettingType = "t";
    Setting.RolloutPercentageItems = "p";
    Setting.RolloutRules = "r";
    Setting.VariationId = "i";
    return Setting;
}());

var RolloutRules = /** @class */ (function () {
    function RolloutRules() {
    }
    RolloutRules.Order = "o";
    RolloutRules.ComparisonAttribute = "a";
    RolloutRules.Comparator = "t";
    RolloutRules.ComparisonValue = "c";
    RolloutRules.Value = "v";
    RolloutRules.VariationId = "i";
    return RolloutRules;
}());

var RolloutPercentageItems = /** @class */ (function () {
    function RolloutPercentageItems() {
    }
    RolloutPercentageItems.Order = "o";
    RolloutPercentageItems.Value = "v";
    RolloutPercentageItems.Percentage = "p";
    RolloutPercentageItems.VariationId = "i";
    return RolloutPercentageItems;
}());



/***/ }),

/***/ "PZHa":
/*!*******************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/Sha1.js ***!
  \*******************************************************/
/*! exports provided: sha1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha1", function() { return sha1; });
function sha1(msg) {
    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    }
    ;
    function lsb_hex(val) {
        var str = "";
        var vh;
        var vl;
        for (var i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    }
    ;
    function cvt_hex(val) {
        var str = "";
        var v;
        for (var i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    }
    ;
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    ;
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }
    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }
    word_array.push(i);
    while ((word_array.length % 16) != 14)
        word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++)
            W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++)
            W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    return (cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4)).toLowerCase();
}


/***/ }),

/***/ "PkIa":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWJzLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "XHuA":
/*!*******************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/RolloutEvaluator.js ***!
  \*******************************************************************/
/*! exports provided: User, RolloutEvaluator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolloutEvaluator", function() { return RolloutEvaluator; });
/* harmony import */ var _ProjectConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProjectConfig */ "Op/A");
/* harmony import */ var _Sha1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sha1 */ "PZHa");
/* harmony import */ var _Semver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Semver */ "rRx4");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils */ "hK9C");




/** Object for variation evaluation */
var User = /** @class */ (function () {
    function User(identifier, email, country, custom) {
        if (email === void 0) { email = null; }
        if (country === void 0) { country = null; }
        if (custom === void 0) { custom = {}; }
        /** Optional dictionary for custom attributes of the User for advanced targeting rule definitions. e.g. User role, Subscription type */
        this.custom = {};
        this.identifier = identifier;
        this.email = email;
        this.country = country;
        this.custom = custom;
    }
    return User;
}());

var RolloutEvaluator = /** @class */ (function () {
    function RolloutEvaluator(logger) {
        this.logger = logger;
    }
    RolloutEvaluator.prototype.Evaluate = function (config, key, defaultValue, user, defaultVariationId) {
        if (!config || !config.ConfigJSON || !config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["ConfigFile"].FeatureFlags]) {
            this.logger.error("JSONConfig is not present. Returning default value: '" + defaultValue + "'.");
            return { Value: defaultValue, VariationId: defaultVariationId };
        }
        var featureFlags = config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["ConfigFile"].FeatureFlags];
        if (!featureFlags[key]) {
            var s = "Evaluating getValue('" + key + "') failed. Returning default value: '" + defaultValue + "'.";
            s += " Here are the available keys: {" + Object.keys(featureFlags).join() + "}.";
            this.logger.error(s);
            return { Value: defaultValue, VariationId: defaultVariationId };
        }
        var featureFlag = featureFlags[key];
        var eLog = new EvaluateLogger();
        eLog.User = user;
        eLog.KeyName = key;
        eLog.ReturnValue = defaultValue;
        var result = new EvaluateResult();
        result.EvaluateLog = eLog;
        if (user) {
            result = this.EvaluateRules(featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].RolloutRules], user, eLog);
            if (result.ValueAndVariationId == null) {
                result.ValueAndVariationId = this.EvaluateVariations(featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].RolloutPercentageItems], key, user);
                if (result.ValueAndVariationId) {
                    result.EvaluateLog.ReturnValue = result.ValueAndVariationId.Value;
                }
                if (featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].RolloutPercentageItems].length > 0) {
                    result.EvaluateLog.OpAppendLine("Evaluating % options => " + (result.ValueAndVariationId == null ? "user not targeted" : "user targeted"));
                }
            }
        }
        else {
            if ((featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].RolloutRules] && featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].RolloutRules].length > 0) ||
                (featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].RolloutPercentageItems] && featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].RolloutPercentageItems].length > 0)) {
                var s = "Evaluating getValue('" + key + "'). ";
                s += "UserObject missing! You should pass a UserObject to getValue(), in order to make targeting work properly. ";
                s += "Read more: https://configcat.com/docs/advanced/user-object";
                this.logger.warn(s);
            }
        }
        if (result.ValueAndVariationId == null) {
            result.ValueAndVariationId = {
                Value: featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].Value],
                VariationId: featureFlag[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["Setting"].VariationId],
            };
            result.EvaluateLog.ReturnValue = result.ValueAndVariationId.Value;
        }
        this.logger.info(result.EvaluateLog.GetLog());
        return result.ValueAndVariationId;
    };
    RolloutEvaluator.prototype.EvaluateRules = function (rolloutRules, user, eLog) {
        var result = new EvaluateResult();
        result.ValueAndVariationId = null;
        if (rolloutRules && rolloutRules.length > 0) {
            var _loop_1 = function (i) {
                var rule = rolloutRules[i];
                var comparisonAttribute = this_1.GetUserAttribute(user, rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].ComparisonAttribute]);
                if (!comparisonAttribute) {
                    return "continue";
                }
                var comparator = rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Comparator];
                var comparisonValue = rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].ComparisonValue];
                var log = "Evaluating rule: '" + comparisonAttribute + "' " + this_1.RuleToString(comparator) + " '" + comparisonValue + "' => ";
                switch (comparator) {
                    case 0: // is one of
                        var cvs = comparisonValue.split(",");
                        for (var ci = 0; ci < cvs.length; ci++) {
                            if (cvs[ci].trim() === comparisonAttribute) {
                                log += "MATCH";
                                eLog.OpAppendLine(log);
                                result.ValueAndVariationId = {
                                    Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                    VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                                };
                                eLog.ReturnValue = result.ValueAndVariationId.Value;
                                result.EvaluateLog = eLog;
                                return { value: result };
                            }
                        }
                        log += "no match";
                        break;
                    case 1: // is not one of
                        if (!comparisonValue.split(",").some(function (e) {
                            if (e.trim() === comparisonAttribute) {
                                return true;
                            }
                            return false;
                        })) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 2: // contains
                        if (comparisonAttribute.search(comparisonValue) !== -1) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 3: // not contains
                        if (comparisonAttribute.search(comparisonValue) === -1) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        if (this_1.EvaluateSemver(comparisonAttribute, comparisonValue, comparator)) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        if (this_1.EvaluateNumber(comparisonAttribute, comparisonValue, comparator)) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    case 16: // is one of (sensitive)
                        var values = comparisonValue.split(",");
                        for (var ci = 0; ci < values.length; ci++) {
                            if (values[ci].trim() === Object(_Sha1__WEBPACK_IMPORTED_MODULE_1__["sha1"])(comparisonAttribute)) {
                                log += "MATCH";
                                eLog.OpAppendLine(log);
                                result.ValueAndVariationId = {
                                    Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                    VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                                };
                                eLog.ReturnValue = result.ValueAndVariationId.Value;
                                result.EvaluateLog = eLog;
                                return { value: result };
                            }
                        }
                        log += "no match";
                        break;
                    case 17: // is not one of (sensitive)
                        if (!comparisonValue.split(",").some(function (e) {
                            if (e.trim() === Object(_Sha1__WEBPACK_IMPORTED_MODULE_1__["sha1"])(comparisonAttribute)) {
                                return true;
                            }
                            return false;
                        })) {
                            log += "MATCH";
                            eLog.OpAppendLine(log);
                            result.ValueAndVariationId = {
                                Value: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].Value],
                                VariationId: rule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutRules"].VariationId]
                            };
                            eLog.ReturnValue = result.ValueAndVariationId.Value;
                            result.EvaluateLog = eLog;
                            return { value: result };
                        }
                        log += "no match";
                        break;
                    default:
                        break;
                }
                eLog.OpAppendLine(log);
            };
            var this_1 = this;
            for (var i = 0; i < rolloutRules.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        result.EvaluateLog = eLog;
        return result;
    };
    RolloutEvaluator.prototype.EvaluateVariations = function (rolloutPercentageItems, key, user) {
        if (rolloutPercentageItems && rolloutPercentageItems.length > 0) {
            var hashCandidate = key + ((user.identifier === null || user.identifier === undefined) ? '' : user.identifier);
            var hashValue = Object(_Sha1__WEBPACK_IMPORTED_MODULE_1__["sha1"])(hashCandidate).substring(0, 7);
            var hashScale = parseInt(hashValue, 16) % 100;
            var bucket = 0;
            for (var i = 0; i < rolloutPercentageItems.length; i++) {
                var variation = rolloutPercentageItems[i];
                bucket += +variation[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutPercentageItems"].Percentage];
                if (hashScale < bucket) {
                    return {
                        Value: variation[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutPercentageItems"].Value],
                        VariationId: variation[_ProjectConfig__WEBPACK_IMPORTED_MODULE_0__["RolloutPercentageItems"].VariationId]
                    };
                }
            }
        }
        return null;
    };
    RolloutEvaluator.prototype.EvaluateNumber = function (v1, v2, comparator) {
        var n1, n2;
        if (v1 && !Number.isNaN(Number.parseFloat(v1.replace(',', '.')))) {
            n1 = Number.parseFloat(v1.replace(',', '.'));
        }
        else {
            return false;
        }
        if (v2 && !Number.isNaN(Number.parseFloat(v2.replace(',', '.')))) {
            n2 = Number.parseFloat(v2.replace(',', '.'));
        }
        else {
            return false;
        }
        switch (comparator) {
            case 10:
                return n1 == n2;
            case 11:
                return n1 != n2;
            case 12:
                return n1 < n2;
            case 13:
                return n1 <= n2;
            case 14:
                return n1 > n2;
            case 15:
                return n1 >= n2;
            default:
                break;
        }
        return false;
    };
    RolloutEvaluator.prototype.EvaluateSemver = function (v1, v2, comparator) {
        if (_Semver__WEBPACK_IMPORTED_MODULE_2__["valid"](v1) == null || Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(v2)) {
            return false;
        }
        v2 = v2.trim();
        switch (comparator) {
            case 4:
                // in
                var sv = v2.split(",");
                var found = false;
                for (var ci = 0; ci < sv.length; ci++) {
                    if (!sv[ci] || Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(sv[ci]) || sv[ci].trim() === "") {
                        continue;
                    }
                    if (_Semver__WEBPACK_IMPORTED_MODULE_2__["valid"](sv[ci].trim()) == null) {
                        return false;
                    }
                    if (!found) {
                        found = _Semver__WEBPACK_IMPORTED_MODULE_2__["looseeq"](v1, sv[ci].trim());
                    }
                }
                return found;
            case 5:
                // not in
                return !v2.split(",").some(function (e) {
                    if (!e || Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["isUndefined"])(e) || e.trim() === "") {
                        return false;
                    }
                    e = _Semver__WEBPACK_IMPORTED_MODULE_2__["valid"](e.trim());
                    if (e == null) {
                        return false;
                    }
                    return _Semver__WEBPACK_IMPORTED_MODULE_2__["eq"](v1, e);
                });
            case 6:
                if (_Semver__WEBPACK_IMPORTED_MODULE_2__["valid"](v2) == null) {
                    return false;
                }
                return _Semver__WEBPACK_IMPORTED_MODULE_2__["lt"](v1, v2);
            case 7:
                if (_Semver__WEBPACK_IMPORTED_MODULE_2__["valid"](v2) == null) {
                    return false;
                }
                return _Semver__WEBPACK_IMPORTED_MODULE_2__["lte"](v1, v2);
            case 8:
                if (_Semver__WEBPACK_IMPORTED_MODULE_2__["valid"](v2) == null) {
                    return false;
                }
                return _Semver__WEBPACK_IMPORTED_MODULE_2__["gt"](v1, v2);
            case 9:
                if (_Semver__WEBPACK_IMPORTED_MODULE_2__["valid"](v2) == null) {
                    return false;
                }
                return _Semver__WEBPACK_IMPORTED_MODULE_2__["gte"](v1, v2);
            default:
                break;
        }
        return false;
    };
    RolloutEvaluator.prototype.GetUserAttribute = function (user, attribute) {
        switch (attribute) {
            case "Identifier":
                return user.identifier;
            case "Email":
                return user.email;
            case "Country":
                return user.country;
            default:
                return (user.custom || {})[attribute];
        }
    };
    RolloutEvaluator.prototype.RuleToString = function (rule) {
        switch (rule) {
            case 0:
                return "IS ONE OF";
            case 1:
                return "IS NOT ONE OF";
            case 2:
                return "CONTAINS";
            case 3:
                return "DOES NOT CONTAIN";
            case 4:
                return "IS ONE OF (SemVer)";
            case 5:
                return "IS NOT ONE OF (SemVer)";
            case 6:
                return "< (SemVer)";
            case 7:
                return "<= (SemVer)";
            case 8:
                return "> (SemVer)";
            case 9:
                return ">= (SemVer)";
            case 10:
                return "= (Number)";
            case 11:
                return "!= (Number)";
            case 12:
                return "< (Number)";
            case 13:
                return "<= (Number)";
            case 14:
                return "> (Number)";
            case 15:
                return ">= (Number)";
            case 16:
                return "IS ONE OF (Sensitive)";
            case 17:
                return "IS NOT ONE OF (Sensitive)";
            default:
                return rule;
        }
    };
    return RolloutEvaluator;
}());

var ValueAndVariationId = /** @class */ (function () {
    function ValueAndVariationId() {
    }
    return ValueAndVariationId;
}());
var EvaluateResult = /** @class */ (function () {
    function EvaluateResult() {
    }
    return EvaluateResult;
}());
var EvaluateLogger = /** @class */ (function () {
    function EvaluateLogger() {
        this.Operations = "";
    }
    EvaluateLogger.prototype.OpAppendLine = function (s) {
        this.Operations += " " + s + "\n";
    };
    EvaluateLogger.prototype.GetLog = function () {
        return "Evaluate '" + this.KeyName + "'"
            + "\n User : " + JSON.stringify(this.User)
            + "\n" + this.Operations
            + " Returning value : " + this.ReturnValue;
    };
    return EvaluateLogger;
}());


/***/ }),

/***/ "XXc6":
/*!**************************************************!*\
  !*** ./src/app/services/routes-guard.service.ts ***!
  \**************************************************/
/*! exports provided: RoutesGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutesGuardService", function() { return RoutesGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _configcat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configcat.service */ "Y7u2");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");





let RoutesGuardService = class RoutesGuardService {
    constructor(configCatService, navCtrl, router) {
        this.configCatService = configCatService;
        this.navCtrl = navCtrl;
        this.router = router;
        this.activated = true;
        const params = router.getCurrentNavigation().extras;
    }
    canActivate(route, state) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const enabled = yield this.configCatService.getlist_feature();
            if (!enabled) {
                this.navCtrl.navigateRoot(["/tabs/tab1"], { state: {}, animated: true });
                return false;
            }
            return true;
        });
    }
};
RoutesGuardService.ctorParameters = () => [
    { type: _configcat_service__WEBPACK_IMPORTED_MODULE_2__["ConfigcatService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
RoutesGuardService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root",
    })
], RoutesGuardService);



/***/ }),

/***/ "Y0Me":
/*!****************************************************!*\
  !*** ./node_modules/configcat-js/lib/esm/Cache.js ***!
  \****************************************************/
/*! exports provided: LocalStorageCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageCache", function() { return LocalStorageCache; });
var LocalStorageCache = /** @class */ (function () {
    function LocalStorageCache() {
        this.cache = {};
    }
    LocalStorageCache.prototype.set = function (key, config) {
        this.cache[key] = config;
        try {
            localStorage.setItem(key, btoa(JSON.stringify(config)));
        }
        catch (ex) {
            // local storage is unavailable
        }
    };
    LocalStorageCache.prototype.get = function (key) {
        var config = this.cache[key];
        if (config) {
            return config;
        }
        try {
            var configString = localStorage.getItem(key);
            if (configString) {
                var config_1 = JSON.parse(atob(configString));
                if (config_1) {
                    this.cache[key] = config_1;
                    return config_1;
                }
            }
        }
        catch (ex) {
            // local storage is unavailable or invalid cache value in localstorage
        }
        return null;
    };
    return LocalStorageCache;
}());



/***/ }),

/***/ "Y7u2":
/*!***********************************************!*\
  !*** ./src/app/services/configcat.service.ts ***!
  \***********************************************/
/*! exports provided: ConfigcatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigcatService", function() { return ConfigcatService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var configcat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! configcat-js */ "F0Vv");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var configcat_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! configcat-common */ "q7S3");
/* harmony import */ var _platform_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./platform.service */ "EktT");






let ConfigcatService = class ConfigcatService {
    constructor(platformService) {
        this.platformService = platformService;
        this.list_feature = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.list_featureObs = this.list_feature.asObservable();
        let logger = configcat_js__WEBPACK_IMPORTED_MODULE_2__["createConsoleLogger"](configcat_common__WEBPACK_IMPORTED_MODULE_4__["LogLevel"].Info);
        // Setting log level to 3 (Info)
        this.platformName = this.platformService.getPlatformName();
        this.user = new configcat_common__WEBPACK_IMPORTED_MODULE_4__["User"]("Abraham", "abrahamvega987@gmail.com", "Panamá", {
            platform: this.platformName,
        });
        //Configuracion de cliente
        this.configCatClient = configcat_js__WEBPACK_IMPORTED_MODULE_2__["createClientWithAutoPoll"]("VqDYCHA8hUSDB78ion6qaQ/C8uDWiW6HU-GRdDf-INAgQ", {
            // <-- This is the actual SDK Key for your Production environment
            pollIntervalSeconds: 5,
            logger: logger,
            configChanged: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                //deteccion de cambios en la configuración
                //actualización del sujeto
                this.list_feature.next(yield this.getlist_feature());
            }),
        });
    }
    //función para saber si un feature está encendido o apagado
    getlist_feature() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.configCatClient.getValueAsync("prueba", false, this.user);
        });
    }
};
ConfigcatService.ctorParameters = () => [
    { type: _platform_service__WEBPACK_IMPORTED_MODULE_5__["PlatformService"] }
];
ConfigcatService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root",
    })
], ConfigcatService);



/***/ }),

/***/ "be5z":
/*!************************************************************!*\
  !*** ./node_modules/configcat-js/lib/esm/ConfigFetcher.js ***!
  \************************************************************/
/*! exports provided: HttpConfigFetcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpConfigFetcher", function() { return HttpConfigFetcher; });
/* harmony import */ var configcat_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! configcat-common */ "q7S3");

var HttpConfigFetcher = /** @class */ (function () {
    function HttpConfigFetcher() {
    }
    HttpConfigFetcher.prototype.fetchLogic = function (options, lastProjectConfig, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                var etag = httpRequest.getResponseHeader("ETag");
                if (httpRequest.status === 200) {
                    callback(new configcat_common__WEBPACK_IMPORTED_MODULE_0__["ProjectConfig"](new Date().getTime(), httpRequest.responseText, etag));
                }
                else if (httpRequest.status === 304) {
                    callback(new configcat_common__WEBPACK_IMPORTED_MODULE_0__["ProjectConfig"](new Date().getTime(), JSON.stringify(lastProjectConfig.ConfigJSON), etag));
                }
                else {
                    options.logger.error("Failed to download feature flags & settings from ConfigCat. " + httpRequest.status + " - " + httpRequest.statusText);
                    callback(lastProjectConfig);
                }
            }
        };
        httpRequest.open("GET", options.getUrl(), true);
        httpRequest.timeout = options.requestTimeoutMs;
        httpRequest.setRequestHeader("X-ConfigCat-UserAgent", "ConfigCat-JS/" + options.clientVersion);
        httpRequest.setRequestHeader("Cache-Control", "no-cache"); // any locally cached version isn't trusted without the server's say-so
        if (lastProjectConfig && lastProjectConfig.HttpETag) {
            httpRequest.setRequestHeader("If-None-Match", lastProjectConfig.HttpETag);
        }
        httpRequest.send(null);
    };
    return HttpConfigFetcher;
}());



/***/ }),

/***/ "elqL":
/*!************************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/LazyLoadConfigService.js ***!
  \************************************************************************/
/*! exports provided: LazyLoadConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadConfigService", function() { return LazyLoadConfigService; });
/* harmony import */ var _ConfigServiceBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigServiceBase */ "7w3z");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var LazyLoadConfigService = /** @class */ (function (_super) {
    __extends(LazyLoadConfigService, _super);
    function LazyLoadConfigService(configFetcher, config) {
        var _this = _super.call(this, configFetcher, config) || this;
        _this.cacheTimeToLiveSeconds = config.cacheTimeToLiveSeconds;
        return _this;
    }
    LazyLoadConfigService.prototype.getConfig = function () {
        var p = this.baseConfig.cache.get(this.baseConfig.getCacheKey());
        if (p && p.Timestamp + (this.cacheTimeToLiveSeconds * 1000) > new Date().getTime()) {
            return new Promise(function (resolve) { return resolve(p); });
        }
        else {
            return this.refreshLogicBaseAsync(p);
        }
    };
    LazyLoadConfigService.prototype.refreshConfigAsync = function () {
        var p = this.baseConfig.cache.get(this.baseConfig.getCacheKey());
        return this.refreshLogicBaseAsync(p);
    };
    return LazyLoadConfigService;
}(_ConfigServiceBase__WEBPACK_IMPORTED_MODULE_0__["ConfigServiceBase"]));



/***/ }),

/***/ "hK9C":
/*!********************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/Utils.js ***!
  \********************************************************/
/*! exports provided: isUndefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
var isUndefined = function (comp) { return comp === undefined; };


/***/ }),

/***/ "hO9l":
/*!*************************************!*\
  !*** ./src/app/tabs/tabs.module.ts ***!
  \*************************************/
/*! exports provided: TabsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _tabs_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs-routing.module */ "kB8F");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs.page */ "MJr+");







let TabsPageModule = class TabsPageModule {
};
TabsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _tabs_routing_module__WEBPACK_IMPORTED_MODULE_5__["TabsPageRoutingModule"]
        ],
        declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_6__["TabsPage"]]
    })
], TabsPageModule);



/***/ }),

/***/ "ioK0":
/*!********************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/ManualPollService.js ***!
  \********************************************************************/
/*! exports provided: ManualPollService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManualPollService", function() { return ManualPollService; });
/* harmony import */ var _ConfigServiceBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigServiceBase */ "7w3z");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ManualPollService = /** @class */ (function (_super) {
    __extends(ManualPollService, _super);
    function ManualPollService(configFetcher, config) {
        return _super.call(this, configFetcher, config) || this;
    }
    ManualPollService.prototype.getConfig = function () {
        var _this = this;
        return new Promise(function (resolve) { return resolve(_this.baseConfig.cache.get(_this.baseConfig.getCacheKey())); });
    };
    ManualPollService.prototype.refreshConfigAsync = function () {
        var p = this.baseConfig.cache.get(this.baseConfig.getCacheKey());
        return this.refreshLogicBaseAsync(p);
    };
    return ManualPollService;
}(_ConfigServiceBase__WEBPACK_IMPORTED_MODULE_0__["ConfigServiceBase"]));



/***/ }),

/***/ "kB8F":
/*!*********************************************!*\
  !*** ./src/app/tabs/tabs-routing.module.ts ***!
  \*********************************************/
/*! exports provided: TabsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageRoutingModule", function() { return TabsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_routes_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/routes-guard.service */ "XXc6");
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tabs.page */ "MJr+");





const routes = [
    {
        path: "tabs",
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_4__["TabsPage"],
        children: [
            {
                path: "tab1",
                loadChildren: () => Promise.all(/*! import() | pages-tab1-tab1-module */[__webpack_require__.e("common"), __webpack_require__.e("pages-tab1-tab1-module")]).then(__webpack_require__.bind(null, /*! ../pages/tab1/tab1.module */ "uMfO")).then((m) => m.Tab1PageModule),
            },
            {
                path: "tab2",
                loadChildren: () => Promise.all(/*! import() | pages-tab2-tab2-module */[__webpack_require__.e("common"), __webpack_require__.e("pages-tab2-tab2-module")]).then(__webpack_require__.bind(null, /*! ../pages/tab2/tab2.module */ "HJ/b")).then((m) => m.Tab2PageModule),
                canActivate: [_services_routes_guard_service__WEBPACK_IMPORTED_MODULE_3__["RoutesGuardService"]],
            },
            // {
            //   path: "agregar/:listaId",
            //   loadChildren: () =>
            //     import("../pages/agregar/agregar.module").then(
            //       (m) => m.AgregarPageModule
            //     ),
            //   canActivate: [RoutesGuardService],
            // },
            {
                path: "",
                redirectTo: "/tabs/tab1",
                pathMatch: "full",
            },
        ],
    },
    {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full",
    },
];
let TabsPageRoutingModule = class TabsPageRoutingModule {
};
TabsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], TabsPageRoutingModule);



/***/ }),

/***/ "nGbc":
/*!******************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/ConfigCatLogger.js ***!
  \******************************************************************/
/*! exports provided: ConfigCatConsoleLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCatConsoleLogger", function() { return ConfigCatConsoleLogger; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "q7S3");

var ConfigCatConsoleLogger = /** @class */ (function () {
    /**
     * Create an instance of ConfigCatConsoleLogger
     */
    function ConfigCatConsoleLogger(logLevel) {
        this.SOURCE = "ConfigCat";
        this.level = _index__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Warn;
        if (logLevel) {
            this.level = logLevel;
        }
    }
    ConfigCatConsoleLogger.prototype.log = function (message) {
        this.info(message);
    };
    ConfigCatConsoleLogger.prototype.info = function (message) {
        if (this.isLogLevelEnabled(_index__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Info)) {
            console.info(this.SOURCE + " - INFO - " + message);
        }
    };
    ConfigCatConsoleLogger.prototype.warn = function (message) {
        if (this.isLogLevelEnabled(_index__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Warn)) {
            console.warn(this.SOURCE + " - WARN - " + message);
        }
    };
    ConfigCatConsoleLogger.prototype.error = function (message) {
        if (this.isLogLevelEnabled(_index__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Error)) {
            console.error(this.SOURCE + " - ERROR - " + message);
        }
    };
    ConfigCatConsoleLogger.prototype.isLogLevelEnabled = function (logLevel) {
        return this.level >= logLevel;
    };
    return ConfigCatConsoleLogger;
}());



/***/ }),

/***/ "o13+":
/*!********************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/Cache.js ***!
  \********************************************************/
/*! exports provided: InMemoryCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InMemoryCache", function() { return InMemoryCache; });
var InMemoryCache = /** @class */ (function () {
    function InMemoryCache() {
        this.cache = {};
    }
    InMemoryCache.prototype.set = function (key, config) {
        this.cache[key] = config;
    };
    InMemoryCache.prototype.get = function (key) {
        return this.cache[key];
    };
    return InMemoryCache;
}());



/***/ }),

/***/ "oa0v":
/*!******************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/ConfigCatClient.js ***!
  \******************************************************************/
/*! exports provided: ConfigCatClient, SettingKeyValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCatClient", function() { return ConfigCatClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingKeyValue", function() { return SettingKeyValue; });
/* harmony import */ var _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigCatClientOptions */ "2cly");
/* harmony import */ var _AutoPollConfigService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoPollConfigService */ "tAnk");
/* harmony import */ var _LazyLoadConfigService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LazyLoadConfigService */ "elqL");
/* harmony import */ var _ManualPollService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ManualPollService */ "ioK0");
/* harmony import */ var _RolloutEvaluator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RolloutEvaluator */ "XHuA");
/* harmony import */ var _ProjectConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProjectConfig */ "Op/A");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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






var ConfigCatClient = /** @class */ (function () {
    function ConfigCatClient(options, configCatKernel) {
        if (!options) {
            throw new Error("Invalid 'options' value");
        }
        this.options = options;
        if (!configCatKernel) {
            throw new Error("Invalid 'configCatKernel' value");
        }
        if (!configCatKernel.configFetcher) {
            throw new Error("Invalid 'configCatKernel.configFetcher' value");
        }
        this.evaluator = new _RolloutEvaluator__WEBPACK_IMPORTED_MODULE_4__["RolloutEvaluator"](options.logger);
        if (options && options instanceof _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_0__["LazyLoadOptions"]) {
            this.configService = new _LazyLoadConfigService__WEBPACK_IMPORTED_MODULE_2__["LazyLoadConfigService"](configCatKernel.configFetcher, options);
        }
        else if (options && options instanceof _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_0__["ManualPollOptions"]) {
            this.configService = new _ManualPollService__WEBPACK_IMPORTED_MODULE_3__["ManualPollService"](configCatKernel.configFetcher, options);
        }
        else if (options && options instanceof _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_0__["AutoPollOptions"]) {
            this.configService = new _AutoPollConfigService__WEBPACK_IMPORTED_MODULE_1__["AutoPollConfigService"](configCatKernel.configFetcher, options);
        }
        else {
            throw new Error("Invalid 'options' value");
        }
    }
    ConfigCatClient.prototype.dispose = function () {
        if (this.configService instanceof _AutoPollConfigService__WEBPACK_IMPORTED_MODULE_1__["AutoPollConfigService"]) {
            this.configService.dispose();
        }
    };
    ConfigCatClient.prototype.getValue = function (key, defaultValue, callback, user) {
        this.getValueAsync(key, defaultValue, user).then(function (value) {
            callback(value);
        });
    };
    ConfigCatClient.prototype.getValueAsync = function (key, defaultValue, user) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        result = this.evaluator.Evaluate(config, key, defaultValue, user).Value;
                        resolve(result);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.forceRefresh = function (callback) {
        this.forceRefreshAsync().then(function () {
            callback();
        });
    };
    ConfigCatClient.prototype.forceRefreshAsync = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.refreshConfigAsync()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getAllKeys = function (callback) {
        this.getAllKeysAsync().then(function (value) {
            callback(value);
        });
    };
    ConfigCatClient.prototype.getAllKeysAsync = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        if (!config || !config.ConfigJSON || !config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["ConfigFile"].FeatureFlags]) {
                            this.options.logger.error("config.json is not present, returning empty array");
                            resolve([]);
                            return [2 /*return*/];
                        }
                        resolve(Object.keys(config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["ConfigFile"].FeatureFlags]));
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getVariationId = function (key, defaultVariationId, callback, user) {
        this.getVariationIdAsync(key, defaultVariationId, user).then(function (variationId) {
            callback(variationId);
        });
    };
    ConfigCatClient.prototype.getVariationIdAsync = function (key, defaultVariationId, user) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        result = this.evaluator.Evaluate(config, key, null, user, defaultVariationId).VariationId;
                        resolve(result);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getAllVariationIds = function (callback, user) {
        this.getAllVariationIdsAsync(user).then(function (variationIds) {
            callback(variationIds);
        });
    };
    ConfigCatClient.prototype.getAllVariationIdsAsync = function (user) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var keys, promises, variationIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllKeysAsync()];
                    case 1:
                        keys = _a.sent();
                        if (keys.length === 0) {
                            resolve([]);
                            return [2 /*return*/];
                        }
                        promises = keys.map(function (key) { return _this.getVariationIdAsync(key, null, user); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        variationIds = _a.sent();
                        resolve(variationIds);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getKeyAndValue = function (variationId, callback) {
        this.getKeyAndValueAsync(variationId).then(function (settingKeyAndValue) {
            callback(settingKeyAndValue);
        });
    };
    ConfigCatClient.prototype.getKeyAndValueAsync = function (variationId) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config, featureFlags, settingKey, rolloutRules, i, rolloutRule, percentageItems, i, percentageItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        if (!config || !config.ConfigJSON || !config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["ConfigFile"].FeatureFlags]) {
                            this.options.logger.error("config.json is not present, returning empty array");
                            resolve(null);
                            return [2 /*return*/];
                        }
                        featureFlags = config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["ConfigFile"].FeatureFlags];
                        for (settingKey in featureFlags) {
                            if (variationId === featureFlags[settingKey][_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["Setting"].VariationId]) {
                                resolve({ settingKey: settingKey, settingValue: featureFlags[settingKey][_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["Setting"].Value] });
                                return [2 /*return*/];
                            }
                            rolloutRules = featureFlags[settingKey][_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["Setting"].RolloutRules];
                            if (rolloutRules && rolloutRules.length > 0) {
                                for (i = 0; i < rolloutRules.length; i++) {
                                    rolloutRule = rolloutRules[i];
                                    if (variationId === rolloutRule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["RolloutRules"].VariationId]) {
                                        resolve({ settingKey: settingKey, settingValue: rolloutRule[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["RolloutRules"].Value] });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                            percentageItems = featureFlags[settingKey][_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["Setting"].RolloutPercentageItems];
                            if (percentageItems && percentageItems.length > 0) {
                                for (i = 0; i < percentageItems.length; i++) {
                                    percentageItem = percentageItems[i];
                                    if (variationId === percentageItem[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["RolloutPercentageItems"].VariationId]) {
                                        resolve({ settingKey: settingKey, settingValue: percentageItem[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["RolloutPercentageItems"].Value] });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                        }
                        this.options.logger.error("Could not find the setting for the given variation ID: " + variationId);
                        resolve(null);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ConfigCatClient.prototype.getAllValues = function (callback, user) {
        this.getAllValuesAsync(user).then(function (value) {
            callback(value);
        });
    };
    ConfigCatClient.prototype.getAllValuesAsync = function (user) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var config, keys, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configService.getConfig()];
                    case 1:
                        config = _a.sent();
                        if (!config || !config.ConfigJSON || !config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["ConfigFile"].FeatureFlags]) {
                            this.options.logger.error("config.json is not present, returning empty array");
                            resolve([]);
                            return [2 /*return*/];
                        }
                        keys = Object.keys(config.ConfigJSON[_ProjectConfig__WEBPACK_IMPORTED_MODULE_5__["ConfigFile"].FeatureFlags]);
                        result = [];
                        keys.forEach(function (key) {
                            result.push({
                                settingKey: key,
                                settingValue: _this.evaluator.Evaluate(config, key, undefined, user).Value
                            });
                        });
                        resolve(result);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ConfigCatClient;
}());

var SettingKeyValue = /** @class */ (function () {
    function SettingKeyValue() {
    }
    return SettingKeyValue;
}());



/***/ }),

/***/ "q7S3":
/*!********************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/index.js ***!
  \********************************************************/
/*! exports provided: createClientWithAutoPoll, createClientWithManualPoll, createClientWithLazyLoad, createConsoleLogger, LogLevel, ProjectConfig, OptionsBase, DataGovernance, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClientWithAutoPoll", function() { return createClientWithAutoPoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClientWithManualPoll", function() { return createClientWithManualPoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClientWithLazyLoad", function() { return createClientWithLazyLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createConsoleLogger", function() { return createConsoleLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* harmony import */ var _ConfigCatClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigCatClient */ "oa0v");
/* harmony import */ var _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigCatClientOptions */ "2cly");
/* harmony import */ var _ConfigCatLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigCatLogger */ "nGbc");
/* harmony import */ var _ProjectConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProjectConfig */ "Op/A");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProjectConfig", function() { return _ProjectConfig__WEBPACK_IMPORTED_MODULE_3__["ProjectConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionsBase", function() { return _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_1__["OptionsBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataGovernance", function() { return _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_1__["DataGovernance"]; });

/* harmony import */ var _RolloutEvaluator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RolloutEvaluator */ "XHuA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _RolloutEvaluator__WEBPACK_IMPORTED_MODULE_4__["User"]; });




/**
 * Create an instance of ConfigCatClient and setup AutoPoll mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for autoPoll mode
 */
function createClientWithAutoPoll(apiKey, configCatKernel, options) {
    return new _ConfigCatClient__WEBPACK_IMPORTED_MODULE_0__["ConfigCatClient"](new _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_1__["AutoPollOptions"](apiKey, options, configCatKernel.cache), configCatKernel);
}
/**
 * Create an instance of ConfigCatClient and setup ManualPoll mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for manualPoll mode
 */
function createClientWithManualPoll(apiKey, configCatKernel, options) {
    return new _ConfigCatClient__WEBPACK_IMPORTED_MODULE_0__["ConfigCatClient"](new _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_1__["ManualPollOptions"](apiKey, options, configCatKernel.cache), configCatKernel);
}
/**
 * Create an instance of ConfigCatClient and setup LazyLoad mode
 * @param {string} apiKey - ApiKey to access your configuration.
 * @param config - Configuration for lazyLoad mode
 */
function createClientWithLazyLoad(apiKey, configCatKernel, options) {
    return new _ConfigCatClient__WEBPACK_IMPORTED_MODULE_0__["ConfigCatClient"](new _ConfigCatClientOptions__WEBPACK_IMPORTED_MODULE_1__["LazyLoadOptions"](apiKey, options, configCatKernel.cache), configCatKernel);
}
/**
 * Create an instance of ConfigCatConsoleLogger
 * @param {LogLevel} logLevel - Specifies message's filtering to output for the CofigCatConsoleLogger.
 */
function createConsoleLogger(logLevel) {
    return new _ConfigCatLogger__WEBPACK_IMPORTED_MODULE_2__["ConfigCatConsoleLogger"](logLevel);
}
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Off"] = -1] = "Off";
})(LogLevel || (LogLevel = {}));





/***/ }),

/***/ "rRx4":
/*!*********************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/Semver.js ***!
  \*********************************************************/
/*! exports provided: valid, looseeq, eq, lt, lte, gt, gte */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valid", function() { return valid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "looseeq", function() { return looseeq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eq", function() { return eq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lt", function() { return lt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lte", function() { return lte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gt", function() { return gt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gte", function() { return gte; });
var numeric = /^[0-9]+$/;
var compareIdentifiers = function (a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0
        : (anum && !bnum) ? -1
            : (bnum && !anum) ? 1
                : a < b ? -1
                    : 1;
};
var rcompareIdentifiers = function (a, b) { return compareIdentifiers(b, a); };
var SEMVER_SPEC_VERSION = '2.0.0';
var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
    /* istanbul ignore next */ 9007199254740991;
var MAX_SAFE_COMPONENT_LENGTH = 16;
// The actual regexps go on exports.re
var re = [];
var src = [];
var t = {};
var R = 0;
var createToken = function (name, value) {
    var index = R++;
    t[name] = index;
    src[index] = value;
    re[index] = new RegExp(value, undefined);
};
createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');
createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');
createToken('MAINVERSION', "(" + src[t['NUMERICIDENTIFIER']] + ")\\." +
    ("(" + src[t['NUMERICIDENTIFIER']] + ")\\.") +
    ("(" + src[t['NUMERICIDENTIFIER']] + ")"));
createToken('MAINVERSIONLOOSE', "(" + src[t['NUMERICIDENTIFIERLOOSE']] + ")\\." +
    ("(" + src[t['NUMERICIDENTIFIERLOOSE']] + ")\\.") +
    ("(" + src[t['NUMERICIDENTIFIERLOOSE']] + ")"));
createToken('PRERELEASEIDENTIFIER', "(?:" + src[t['NUMERICIDENTIFIER']] + "|" + src[t['NONNUMERICIDENTIFIER']] + ")");
createToken('PRERELEASEIDENTIFIERLOOSE', "(?:" + src[t['NUMERICIDENTIFIERLOOSE']] + "|" + src[t['NONNUMERICIDENTIFIER']] + ")");
createToken('PRERELEASE', "(?:-(" + src[t['PRERELEASEIDENTIFIER']] + "(?:\\." + src[t['PRERELEASEIDENTIFIER']] + ")*))");
createToken('PRERELEASELOOSE', "(?:-?(" + src[t['PRERELEASEIDENTIFIERLOOSE']] + "(?:\\." + src[t['PRERELEASEIDENTIFIERLOOSE']] + ")*))");
createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');
createToken('BUILD', "(?:\\+(" + src[t['BUILDIDENTIFIER']] + "(?:\\." + src[t['BUILDIDENTIFIER']] + ")*))");
createToken('FULLPLAIN', "v?" + src[t['MAINVERSION']] + src[t['PRERELEASE']] + "?" + src[t['BUILD']] + "?");
createToken('FULL', "^" + src[t['FULLPLAIN']] + "$");
createToken('LOOSEPLAIN', "[v=\\s]*" + src[t['MAINVERSIONLOOSE']] + src[t['PRERELEASELOOSE']] + "?" + src[t['BUILD']] + "?");
createToken('LOOSE', "^" + src[t['LOOSEPLAIN']] + "$");
var SemVer = /** @class */ (function () {
    function SemVer(version, options) {
        if (!options || typeof options !== 'object') {
            options = {
                loose: !!options,
                includePrerelease: false
            };
        }
        if (version instanceof SemVer) {
            if (version.loose === !!options.loose &&
                version.includePrerelease === !!options.includePrerelease) {
                return version;
            }
            else {
                version = version.version;
            }
        }
        else if (typeof version !== 'string') {
            throw new TypeError("Invalid Version: " + version);
        }
        if (version.length > MAX_LENGTH) {
            throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
        }
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;
        var m = version.trim().match(options.loose ? re[t['LOOSE']] : re[t['FULL']]);
        if (!m) {
            throw new TypeError("Invalid Version: " + version);
        }
        this.raw = version;
        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError('Invalid major version');
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError('Invalid minor version');
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError('Invalid patch version');
        }
        // numberify any prerelease numeric ids
        if (!m[4]) {
            this.prerelease = [];
        }
        else {
            this.prerelease = m[4].split('.').map(function (id) {
                if (/^[0-9]+$/.test(id)) {
                    var num = +id;
                    if (num >= 0 && num < MAX_SAFE_INTEGER) {
                        return num;
                    }
                }
                return id;
            });
        }
        this.build = m[5] ? m[5].split('.') : [];
        this.format();
    }
    SemVer.prototype.format = function () {
        this.version = this.major + "." + this.minor + "." + this.patch;
        if (this.prerelease.length) {
            this.version += "-" + this.prerelease.join('.');
        }
        return this.version;
    };
    SemVer.prototype.toString = function () {
        return this.version;
    };
    SemVer.prototype.compare = function (other) {
        if (!(other instanceof SemVer)) {
            if (typeof other === 'string' && other === this.version) {
                return 0;
            }
            other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
            return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function (other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        return (compareIdentifiers(this.major, other.major) ||
            compareIdentifiers(this.minor, other.minor) ||
            compareIdentifiers(this.patch, other.patch));
    };
    SemVer.prototype.comparePre = function (other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) {
            return -1;
        }
        else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
        }
        else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
        }
        var i = 0;
        do {
            var a = this.prerelease[i];
            var b = other.prerelease[i];
            if (a === undefined && b === undefined) {
                return 0;
            }
            else if (b === undefined) {
                return 1;
            }
            else if (a === undefined) {
                return -1;
            }
            else if (a === b) {
                continue;
            }
            else {
                return compareIdentifiers(a, b);
            }
        } while (++i);
    };
    SemVer.prototype.compareBuild = function (other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        var i = 0;
        do {
            var a = this.build[i];
            var b = other.build[i];
            if (a === undefined && b === undefined) {
                return 0;
            }
            else if (b === undefined) {
                return 1;
            }
            else if (a === undefined) {
                return -1;
            }
            else if (a === b) {
                continue;
            }
            else {
                return compareIdentifiers(a, b);
            }
        } while (++i);
    };
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    SemVer.prototype.inc = function (release, identifier) {
        switch (release) {
            case 'premajor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor = 0;
                this.major++;
                this.inc('pre', identifier);
                break;
            case 'preminor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor++;
                this.inc('pre', identifier);
                break;
            case 'prepatch':
                // If this is already a prerelease, it will bump to the next version
                // drop any prereleases that might already exist, since they are not
                // relevant at this point.
                this.prerelease.length = 0;
                this.inc('patch', identifier);
                this.inc('pre', identifier);
                break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case 'prerelease':
                if (this.prerelease.length === 0) {
                    this.inc('patch', identifier);
                }
                this.inc('pre', identifier);
                break;
            case 'major':
                // If this is a pre-major version, bump up to the same major version.
                // Otherwise increment major.
                // 1.0.0-5 bumps to 1.0.0
                // 1.1.0 bumps to 2.0.0
                if (this.minor !== 0 ||
                    this.patch !== 0 ||
                    this.prerelease.length === 0) {
                    this.major++;
                }
                this.minor = 0;
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'minor':
                // If this is a pre-minor version, bump up to the same minor version.
                // Otherwise increment minor.
                // 1.2.0-5 bumps to 1.2.0
                // 1.2.1 bumps to 1.3.0
                if (this.patch !== 0 || this.prerelease.length === 0) {
                    this.minor++;
                }
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'patch':
                // If this is not a pre-release version, it will increment the patch.
                // If it is a pre-release it will bump up to the same patch version.
                // 1.2.0-5 patches to 1.2.0
                // 1.2.0 patches to 1.2.1
                if (this.prerelease.length === 0) {
                    this.patch++;
                }
                this.prerelease = [];
                break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case 'pre':
                if (this.prerelease.length === 0) {
                    this.prerelease = [0];
                }
                else {
                    var i = this.prerelease.length;
                    while (--i >= 0) {
                        if (typeof this.prerelease[i] === 'number') {
                            this.prerelease[i]++;
                            i = -2;
                        }
                    }
                    if (i === -1) {
                        // didn't increment anything
                        this.prerelease.push(0);
                    }
                }
                if (identifier) {
                    // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                    // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                    if (this.prerelease[0] === identifier) {
                        if (isNaN(this.prerelease[1])) {
                            this.prerelease = [identifier, 0];
                        }
                    }
                    else {
                        this.prerelease = [identifier, 0];
                    }
                }
                break;
            default:
                throw new Error("invalid increment argument: " + release);
        }
        this.format();
        this.raw = this.version;
        return this;
    };
    return SemVer;
}());
var parse = function (version, options) {
    if (!options || typeof options !== 'object') {
        options = {
            loose: !!options,
            includePrerelease: false
        };
    }
    if (version instanceof SemVer) {
        return version;
    }
    if (typeof version !== 'string') {
        return null;
    }
    if (version.length > MAX_LENGTH) {
        return null;
    }
    var r = options.loose ? re[t['LOOSE']] : re[t['FULL']];
    if (!r.test(version)) {
        return null;
    }
    try {
        return new SemVer(version, options);
    }
    catch (er) {
        return null;
    }
};
var compare = function (a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
};
var valid = function (version) {
    var v = parse(version, false);
    return v ? v.version : null;
};
var looseeq = function (a, b) { return compare(a, b, true) === 0; };
var eq = function (a, b) { return compare(a, b, false) === 0; };
var lt = function (a, b) { return compare(a, b, false) < 0; };
var lte = function (a, b) { return compare(a, b, false) <= 0; };
var gt = function (a, b) { return compare(a, b, false) > 0; };
var gte = function (a, b) { return compare(a, b, false) >= 0; };


/***/ }),

/***/ "tAnk":
/*!************************************************************************!*\
  !*** ./node_modules/configcat-common/lib/esm/AutoPollConfigService.js ***!
  \************************************************************************/
/*! exports provided: AutoPollConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoPollConfigService", function() { return AutoPollConfigService; });
/* harmony import */ var _ConfigServiceBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfigServiceBase */ "7w3z");
/* harmony import */ var _ProjectConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectConfig */ "Op/A");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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


var AutoPollConfigService = /** @class */ (function (_super) {
    __extends(AutoPollConfigService, _super);
    function AutoPollConfigService(configFetcher, autoPollConfig) {
        var _this = _super.call(this, configFetcher, autoPollConfig) || this;
        _this.configChanged = autoPollConfig.configChanged;
        _this.startRefreshWorker(autoPollConfig.pollIntervalSeconds * 1000);
        _this.maxInitWaitTimeStamp = new Date().getTime() + (autoPollConfig.maxInitWaitTimeSeconds * 1000);
        return _this;
    }
    AutoPollConfigService.prototype.getConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tryReadFromCache(0)];
                    case 1:
                        p = _a.sent();
                        if (!p) {
                            return [2 /*return*/, this.refreshLogic(true)];
                        }
                        else {
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(p); })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AutoPollConfigService.prototype.refreshConfigAsync = function () {
        return this.refreshLogic(true);
    };
    AutoPollConfigService.prototype.dispose = function () {
        clearTimeout(this.timerId);
    };
    AutoPollConfigService.prototype.refreshLogic = function (forceUpdateCache) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var cachedConfig, newConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachedConfig = this.baseConfig.cache.get(this.baseConfig.getCacheKey());
                        return [4 /*yield*/, this.refreshLogicBaseAsync(cachedConfig, forceUpdateCache)];
                    case 1:
                        newConfig = _a.sent();
                        if (!cachedConfig || !_ProjectConfig__WEBPACK_IMPORTED_MODULE_1__["ProjectConfig"].equals(cachedConfig, newConfig)) {
                            this.configChanged();
                        }
                        resolve(newConfig);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AutoPollConfigService.prototype.startRefreshWorker = function (delay) {
        var _this = this;
        this.refreshLogic(false).then(function (_) {
            _this.timerId = setTimeout(function () {
                _this.startRefreshWorker(delay);
            }, delay);
        });
    };
    AutoPollConfigService.prototype.tryReadFromCache = function (tries) {
        return __awaiter(this, void 0, void 0, function () {
            var p, diff, delay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = this.baseConfig.cache.get(this.baseConfig.getCacheKey());
                        if (!(this.maxInitWaitTimeStamp > new Date().getTime() && !p)) return [3 /*break*/, 2];
                        diff = this.maxInitWaitTimeStamp - new Date().getTime();
                        delay = 30 + (tries * tries * 20);
                        return [4 /*yield*/, this.sleep(Math.min(diff, delay))];
                    case 1:
                        _a.sent();
                        tries++;
                        return [2 /*return*/, this.tryReadFromCache(tries)];
                    case 2: return [2 /*return*/, new Promise(function (resolve) { return resolve(p); })];
                }
            });
        });
    };
    AutoPollConfigService.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return AutoPollConfigService;
}(_ConfigServiceBase__WEBPACK_IMPORTED_MODULE_0__["ConfigServiceBase"]));



/***/ })

}]);
//# sourceMappingURL=tabs-tabs-module-es2015.js.map