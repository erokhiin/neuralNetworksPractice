// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils/random.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = void 0;

exports.random = function (min, max) {
  return Math.random() * (max - min) + min;
};
},{}],"Perceptron.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Perceptron = void 0;

var random_1 = require("./utils/random");

var Perceptron =
/** @class */
function () {
  function Perceptron(n, lerningRate) {
    this.learningRate = lerningRate;
    this.weights = new Array(n);

    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] = random_1.random(-1, 1);
    }
  }

  Perceptron.prototype.sign = function (n) {
    if (n < 0) return -1;
    return 1;
  };

  Perceptron.prototype.guess = function (inputs) {
    var sum = 0;

    for (var i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }

    var output = this.sign(sum);
    return output;
  };

  Perceptron.prototype.guessY = function (x) {
    var w = this.weights;
    return -(w[2] / w[1]) - w[0] / w[1] * x;
  };

  Perceptron.prototype.train = function (inputs, target) {
    var guess = this.guess(inputs);
    var error = target - guess;

    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningRate;
    }
  };

  return Perceptron;
}();

exports.Perceptron = Perceptron;
},{"./utils/random":"utils/random.ts"}],"Canvas.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = void 0;

var Canvas =
/** @class */
function () {
  function Canvas(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = document.querySelector("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
  }

  Canvas.prototype.drawPoint = function (p, color, size, stroke) {
    if (size === void 0) {
      size = 6;
    }

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, size, 0, 2 * Math.PI, true);
    this.ctx.fill();
    if (stroke) this.ctx.stroke();
  };

  Canvas.prototype.drawLine = function (start, end) {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  };

  Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  return Canvas;
}();

exports.Canvas = Canvas;
},{}],"utils/loop.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loop = void 0;

exports.loop = function (fn) {
  window.requestAnimationFrame(function () {
    return exports.loop(fn);
  });
  fn();
};
},{}],"utils/map.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = exports.constrain = void 0;

exports.constrain = function (n, low, high) {
  return Math.max(Math.min(n, high), low);
};

exports.map = function (n, start1, stop1, start2, stop2, withinBounds) {
  var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;

  if (!withinBounds) {
    return newval;
  }

  if (start2 < stop2) {
    return exports.constrain(newval, start2, stop2);
  } else {
    return exports.constrain(newval, stop2, start2);
  }
};
},{}],"Point.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

var random_1 = require("./utils/random");

var _1 = require(".");

var map_1 = require("./utils/map");

var COLOR_A = "white";
var COLOR_B = "black";

var Point =
/** @class */
function () {
  function Point(x, y) {
    if (x === void 0) {
      x = random_1.random(-1, 1);
    }

    if (y === void 0) {
      y = random_1.random(-1, 1);
    }

    this.x = x;
    this.y = y;
    if (this.y < _1.f(this.x)) this.label = -1;else this.label = 1;
  }

  Point.prototype.pixelX = function () {
    return map_1.map(this.x, -1, 1, 0, _1.canvas.width);
  };

  Point.prototype.pixelY = function () {
    return map_1.map(this.y, -1, 1, _1.canvas.height, 0);
  };

  Point.prototype.show = function () {
    var color;
    if (this.label === 1) color = COLOR_A;else color = COLOR_B;

    _1.canvas.drawPoint({
      x: this.pixelX(),
      y: this.pixelY()
    }, color, 6, true);
  };

  return Point;
}();

exports.Point = Point;
},{"./utils/random":"utils/random.ts",".":"index.ts","./utils/map":"utils/map.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canvas = exports.f = void 0;

var Perceptron_1 = require("./Perceptron");

var Canvas_1 = require("./Canvas");

var loop_1 = require("./utils/loop");

var Point_1 = require("./Point");

var WIDTH = 500;
var HEIGTH = 500;
var COLOR_ERROR = "#cf3030";
var COLOR_SUCCESS = "#2ad55a"; // Line function

exports.f = function (x) {
  return 0.89 * x + 0.2;
};

var BIAS = 1;
exports.canvas = new Canvas_1.Canvas(WIDTH, HEIGTH);
var points = new Array(200);
var brain = new Perceptron_1.Perceptron(3, 0.005);
var count = 0;
var p1 = new Point_1.Point(-1, exports.f(-1));
var p2 = new Point_1.Point(1, exports.f(1));

for (var i = 0; i < points.length; i++) {
  points[i] = new Point_1.Point();
}

loop_1.loop(function () {
  exports.canvas.clear();
  exports.canvas.drawLine({
    x: p1.pixelX(),
    y: p1.pixelY()
  }, {
    x: p2.pixelX(),
    y: p2.pixelY()
  });

  for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
    var point = points_1[_i];
    point.show();
  }

  for (var _a = 0, points_2 = points; _a < points_2.length; _a++) {
    var point = points_2[_a];
    var inputs_1 = [point.x, point.y, BIAS];
    var target_1 = point.label;
    var guess = brain.guess(inputs_1);
    var color = void 0;
    if (guess === target_1) color = COLOR_SUCCESS;else color = COLOR_ERROR;
    exports.canvas.drawPoint({
      x: point.pixelX(),
      y: point.pixelY()
    }, color, 3);
  }

  var training = points[count];
  var inputs = [training.x, training.y, BIAS];
  var target = training.label;
  brain.train(inputs, target);
  var p3 = new Point_1.Point(-1, brain.guessY(-1));
  var p4 = new Point_1.Point(1, brain.guessY(1));
  exports.canvas.drawLine({
    x: p3.pixelX(),
    y: p3.pixelY()
  }, {
    x: p4.pixelX(),
    y: p4.pixelY()
  });
  count++;
  if (count === points.length) count = 0;
});
},{"./Perceptron":"Perceptron.ts","./Canvas":"Canvas.ts","./utils/loop":"utils/loop.ts","./Point":"Point.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56111" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map