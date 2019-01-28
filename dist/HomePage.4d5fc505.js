// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"..\\node_modules\\process\\browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],"..\\node_modules\\is-node\\index.js":[function(require,module,exports) {
var process = require("process");
// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
'use strict';

exports = module.exports = !!(typeof process !== 'undefined' && process.versions && process.versions.node);
},{"process":"..\\node_modules\\process\\browser.js"}],"..\\node_modules\\browser-jsonp\\lib\\jsonp.js":[function(require,module,exports) {
var define;
(function() {
  var JSONP, computedUrl, createElement, encode, noop, objectToURI, random, randomString;

  createElement = function(tag) {
    return window.document.createElement(tag);
  };

  encode = window.encodeURIComponent;

  random = Math.random;

  JSONP = function(options) {
    var callback, callbackFunc, callbackName, done, head, params, script;
    if (options == null) {
      options = {};
    }
    params = {
      data: options.data || {},
      error: options.error || noop,
      success: options.success || noop,
      beforeSend: options.beforeSend || noop,
      complete: options.complete || noop,
      url: options.url || ''
    };
    params.computedUrl = computedUrl(params);
    if (params.url.length === 0) {
      throw new Error('MissingUrl');
    }
    done = false;
    if (params.beforeSend({}, params) !== false) {
      callbackName = options.callbackName || 'callback';
      callbackFunc = options.callbackFunc || 'jsonp_' + randomString(15);
      callback = params.data[callbackName] = callbackFunc;
      window[callback] = function(data) {
        window[callback] = null;
        params.success(data, params);
        return params.complete(data, params);
      };
      script = createElement('script');
      script.src = computedUrl(params);
      script.async = true;
      script.onerror = function(evt) {
        params.error({
          url: script.src,
          event: evt
        });
        return params.complete({
          url: script.src,
          event: evt
        }, params);
      };
      script.onload = script.onreadystatechange = function() {
        var ref, ref1;
        if (done || ((ref = this.readyState) !== 'loaded' && ref !== 'complete')) {
          return;
        }
        done = true;
        if (script) {
          script.onload = script.onreadystatechange = null;
          if ((ref1 = script.parentNode) != null) {
            ref1.removeChild(script);
          }
          return script = null;
        }
      };
      head = window.document.getElementsByTagName('head')[0] || window.document.documentElement;
      head.insertBefore(script, head.firstChild);
    }
    return {
      abort: function() {
        window[callback] = function() {
          return window[callback] = null;
        };
        done = true;
        if (script != null ? script.parentNode : void 0) {
          script.onload = script.onreadystatechange = null;
          script.parentNode.removeChild(script);
          return script = null;
        }
      }
    };
  };

  noop = function() {
    return void 0;
  };

  computedUrl = function(params) {
    var url;
    url = params.url;
    url += params.url.indexOf('?') < 0 ? '?' : '&';
    url += objectToURI(params.data);
    return url;
  };

  randomString = function(length) {
    var str;
    str = '';
    while (str.length < length) {
      str += random().toString(36).slice(2, 3);
    }
    return str;
  };

  objectToURI = function(obj) {
    var data, key, value;
    data = (function() {
      var results;
      results = [];
      for (key in obj) {
        value = obj[key];
        results.push(encode(key) + '=' + encode(value));
      }
      return results;
    })();
    return data.join('&');
  };

  if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define(function() {
      return JSONP;
    });
  } else if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = JSONP;
  } else {
    this.JSONP = JSONP;
  }

}).call(this);

},{}],"..\\node_modules\\petfinder-client\\index.js":[function(require,module,exports) {
const isNode = require("is-node");
let jsonp = () =>
  console.warn("WARNING, YOU CALLED JSONP IN A NON-BROWSER CONTEXT");
if (!isNode) {
  jsonp = require("browser-jsonp");
}

let key;
const BASE_URL = "http://api.petfinder.com";
const ANIMALS = [
  "dog",
  "cat",
  "bird",
  "barnyard",
  "reptile",
  "smallfurry",
  "horse",
  "pig"
];

const serialize = function(res) {
  const acc = {};
  for (let prop in res) {
    if (!prop) {
      break;
    }
    if (res.hasOwnProperty(prop) && prop.charAt(0) !== "@") {
      if (res[prop].hasOwnProperty("$t")) {
        acc[prop] = res[prop]["$t"];
      } else if (Array.isArray(res[prop])) {
        acc[prop] = res[prop].map(item => {
          if (item.hasOwnProperty("$t")) {
            if (Object.getOwnPropertyNames(item).length > 1) {
              item.value = item["$t"];
              delete item["$t"];
              return item;
            } else {
              return item["$t"];
            }
          } else {
            return serialize(item);
          }
        });
      } else if (Object.getOwnPropertyNames(res[prop]).length === 0) {
        acc[prop] = null;
      } else {
        let serialized = serialize(res[prop]);
        acc[prop] = serialized;
      }
    }
  }
  return acc;
};

const request = function(method, opts) {
  let newOpts = { key, format: "json" };
  newOpts = Object.assign(newOpts, opts);
  return new Promise((resolve, reject) => {
    jsonp({
      url: BASE_URL + "/" + method,
      data: newOpts,
      success: function(data) {
        resolve(serialize(data));
      },
      error: function(err) {
        reject(err);
      }
    });
  });
};

const api = {
  breed: {
    list(opts) {
      return request("breed.list", opts);
    }
  },
  pet: {
    getRandom(opts) {
      return request("pet.getRandom", opts);
    },
    get(opts) {
      return request("pet.get", opts);
    },
    find(opts) {
      return request("pet.find", opts);
    }
  },
  shelter: {
    getPets(opts) {
      return request("shelter.getPets", opts);
    },
    listByBreed(opts) {
      return request("shelter.listByBreed", opts);
    },
    find(opts) {
      return request("shelter.find", opts);
    },
    get(opts) {
      return request("shelter.get", opts);
    }
  }
};

module.exports = function createPetfinderSingleton(creds) {
  if (creds) {
    key = creds.key;
  }
  return api;
};
module.exports.ANIMALS = ANIMALS;

},{"is-node":"..\\node_modules\\is-node\\index.js","browser-jsonp":"..\\node_modules\\browser-jsonp\\lib\\jsonp.js"}],"actionCreators\\getBreeds.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBreeds;

var _petfinderClient = require("petfinder-client");

var _petfinderClient2 = _interopRequireDefault(_petfinderClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var petfinder = (0, _petfinderClient2.default)({
  key: undefined,
  secret: undefined
});

function getBreeds() {
  return function getBreedsThunk(dispatch, getState) {
    var _getState = getState(),
        animal = _getState.animal;

    if (animal) {
      petfinder.breed.list({ animal: animal }).then(function (data) {
        if (data.petfinder && data.petfinder.breeds && Array.isArray(data.petfinder.breeds.breed)) {
          dispatch({
            type: "SET_BREEDS",
            payload: data.petfinder.breeds.breed
          });
        } else {
          dispatch({
            type: "SET_BREEDS",
            payload: []
          });
        }
      });
    } else {
      dispatch({
        type: "SET_BREEDS",
        payload: []
      });
    }
  };
}
},{"petfinder-client":"..\\node_modules\\petfinder-client\\index.js"}],"actionCreators\\changeBreed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = changeBreed;
function changeBreed(breed) {
  return { type: "SET_BREED", payload: breed };
}
},{}],"actionCreators\\changeAnimal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = changeAnimal;
function changeAnimal(animal) {
  return { type: "SET_ANIMAL", payload: animal };
}
},{}],"actionCreators\\changeLocation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = changeLocation;
function changeLocation(location) {
  return { type: "SET_LOCATION", payload: location };
}
},{}],"HomePage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _getBreeds = require("./actionCreators/getBreeds");

var _getBreeds2 = _interopRequireDefault(_getBreeds);

var _changeBreed = require("./actionCreators/changeBreed");

var _changeBreed2 = _interopRequireDefault(_changeBreed);

var _changeAnimal = require("./actionCreators/changeAnimal");

var _changeAnimal2 = _interopRequireDefault(_changeAnimal);

var _changeLocation = require("./actionCreators/changeLocation");

var _changeLocation2 = _interopRequireDefault(_changeLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_React$Component) {
  _inherits(HomePage, _React$Component);

  function HomePage() {
    _classCallCheck(this, HomePage);

    return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).apply(this, arguments));
  }

  _createClass(HomePage, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "home" },
        "hello"
      );
    }
  }]);

  return HomePage;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var breed = _ref.breed,
      breeds = _ref.breeds,
      animal = _ref.animal,
      location = _ref.location;
  return {
    breed: breed,
    breeds: breeds,
    animal: animal,
    location: location
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleAnimalChange: function handleAnimalChange(e) {
      dispatch((0, _changeAnimal2.default)(e.target.value));
      dispatch((0, _getBreeds2.default)());
    },
    handleBreedChange: function handleBreedChange(e) {
      dispatch((0, _changeBreed2.default)(e.target.value));
    },
    handleLocationChange: function handleLocationChange(e) {
      dispatch((0, _changeLocation2.default)(e.target.value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HomePage);
},{"react":"..\\node_modules\\react\\index.js","react-redux":"..\\node_modules\\react-redux\\es\\index.js","./actionCreators/getBreeds":"actionCreators\\getBreeds.js","./actionCreators/changeBreed":"actionCreators\\changeBreed.js","./actionCreators/changeAnimal":"actionCreators\\changeAnimal.js","./actionCreators/changeLocation":"actionCreators\\changeLocation.js"}],"..\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52033' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","HomePage.js"], null)
//# sourceMappingURL=/HomePage.4d5fc505.map