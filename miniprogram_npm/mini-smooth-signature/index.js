module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1686279057250, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmoothSignature = function SmoothSignature(_ctx, _options) {
  var _this = this;

  _classCallCheck(this, SmoothSignature);

  this.ctx = void 0;
  this.canvas = void 0;
  this.width = 300;
  this.height = 150;
  this.scale = 1;
  this.color = 'black';
  this.bgColor = '';
  this.openSmooth = true;
  this.minWidth = 2;
  this.maxWidth = 6;
  this.minSpeed = 1.5;
  this.maxWidthDiffRate = 20;
  this.maxHistoryLength = 20;
  this.points = [];
  this.canAddHistory = true;
  this.historyList = [];
  this.getImagePath = void 0;
  this.toDataURL = void 0;
  this.requestAnimationFrame = void 0;

  this.init = function (ctx, options) {
    if (!ctx) return;
    _this.ctx = ctx;
    _this.getImagePath = options.getImagePath;
    _this.toDataURL = options.toDataURL;
    _this.requestAnimationFrame = options.requestAnimationFrame;
    _this.width = options.width || _this.width;
    _this.height = options.height || _this.height;
    _this.color = options.color || _this.color;
    _this.bgColor = options.bgColor || _this.bgColor;
    _this.openSmooth = options.openSmooth === undefined ? _this.openSmooth : !!options.openSmooth;
    _this.minWidth = options.minWidth || _this.minWidth;
    _this.maxWidth = options.maxWidth || _this.maxWidth;
    _this.minSpeed = options.minSpeed || _this.minSpeed;
    _this.maxWidthDiffRate = options.maxWidthDiffRate || _this.maxWidthDiffRate;
    _this.maxHistoryLength = options.maxHistoryLength || _this.maxHistoryLength;

    if (typeof options.scale === 'number') {
      _this.scale = options.scale;

      _this.ctx.scale(_this.scale, _this.scale);

      _this.ctx.draw && _this.ctx.draw();
    }

    _this.ctx.lineCap = 'round';
    _this.ctx.setLineCap && _this.ctx.setLineCap('round');

    _this.drawBgColor();
  };

  this.onDrawStart = function (x, y) {
    _this.canAddHistory = true;
    _this.ctx.strokeStyle = _this.color;
    _this.ctx.setStrokeStyle && _this.ctx.setStrokeStyle(_this.color);

    _this.initPoint(x, y);
  };

  this.onDrawMove = function (x, y) {
    _this.initPoint(x, y);

    _this.onDraw();
  };

  this.onDraw = function () {
    if (_this.points.length < 2) return;

    _this.addHistory();

    var point = _this.points.slice(-1)[0];

    var prePoint = _this.points.slice(-2, -1)[0];

    var onDraw = function onDraw() {
      if (_this.openSmooth) {
        _this.drawSmoothLine(prePoint, point);
      } else {
        _this.drawNoSmoothLine(prePoint, point);
      }
    };

    if (typeof _this.requestAnimationFrame === 'function') {
      _this.requestAnimationFrame(function () {
        return onDraw();
      });
    } else {
      onDraw();
    }
  };

  this.onDrawEnd = function () {
    _this.canAddHistory = true;
    _this.points = [];
  };

  this.getLineWidth = function (speed) {
    var minSpeed = _this.minSpeed > 10 ? 10 : _this.minSpeed < 1 ? 1 : _this.minSpeed;
    var addWidth = (_this.maxWidth - _this.minWidth) * speed / minSpeed;
    var lineWidth = Math.max(_this.maxWidth - addWidth, _this.minWidth);
    return Math.min(lineWidth, _this.maxWidth);
  };

  this.getRadianData = function (x1, y1, x2, y2) {
    var dis_x = x2 - x1;
    var dis_y = y2 - y1;

    if (dis_x === 0) {
      return {
        val: 0,
        pos: -1
      };
    }

    if (dis_y === 0) {
      return {
        val: 0,
        pos: 1
      };
    }

    var val = Math.abs(Math.atan(dis_y / dis_x));

    if (x2 > x1 && y2 < y1 || x2 < x1 && y2 > y1) {
      return {
        val: val,
        pos: 1
      };
    }

    return {
      val: val,
      pos: -1
    };
  };

  this.getRadianPoints = function (radianData, x, y, halfLineWidth) {
    if (radianData.val === 0) {
      if (radianData.pos === 1) {
        return [{
          x: x,
          y: y + halfLineWidth
        }, {
          x: x,
          y: y - halfLineWidth
        }];
      }

      return [{
        y: y,
        x: x + halfLineWidth
      }, {
        y: y,
        x: x - halfLineWidth
      }];
    }

    var dis_x = Math.sin(radianData.val) * halfLineWidth;
    var dis_y = Math.cos(radianData.val) * halfLineWidth;

    if (radianData.pos === 1) {
      return [{
        x: x + dis_x,
        y: y + dis_y
      }, {
        x: x - dis_x,
        y: y - dis_y
      }];
    }

    return [{
      x: x + dis_x,
      y: y - dis_y
    }, {
      x: x - dis_x,
      y: y + dis_y
    }];
  };

  this.initPoint = function (x, y) {
    var point = {
      x: x,
      y: y,
      t: Date.now()
    };

    var prePoint = _this.points.slice(-1)[0];

    if (prePoint && (prePoint.t === point.t || prePoint.x === x && prePoint.y === y)) {
      return;
    }

    if (_this.openSmooth && prePoint) {
      var prePoint2 = _this.points.slice(-2, -1)[0];

      point.distance = Math.sqrt(Math.pow(point.x - prePoint.x, 2) + Math.pow(point.y - prePoint.y, 2));
      point.speed = point.distance / (point.t - prePoint.t || 0.1);
      point.lineWidth = _this.getLineWidth(point.speed);

      if (prePoint2 && prePoint2.lineWidth && prePoint.lineWidth) {
        var rate = (point.lineWidth - prePoint.lineWidth) / prePoint.lineWidth;
        var maxRate = _this.maxWidthDiffRate / 100;
        maxRate = maxRate > 1 ? 1 : maxRate < 0.01 ? 0.01 : maxRate;

        if (Math.abs(rate) > maxRate) {
          var per = rate > 0 ? maxRate : -maxRate;
          point.lineWidth = prePoint.lineWidth * (1 + per);
        }
      }
    }

    _this.points.push(point);

    _this.points = _this.points.slice(-3);
  };

  this.drawSmoothLine = function (prePoint, point) {
    var dis_x = point.x - prePoint.x;
    var dis_y = point.y - prePoint.y;

    if (Math.abs(dis_x) + Math.abs(dis_y) <= 2) {
      point.lastX1 = point.lastX2 = prePoint.x + dis_x * 0.5;
      point.lastY1 = point.lastY2 = prePoint.y + dis_y * 0.5;
    } else {
      point.lastX1 = prePoint.x + dis_x * 0.3;
      point.lastY1 = prePoint.y + dis_y * 0.3;
      point.lastX2 = prePoint.x + dis_x * 0.7;
      point.lastY2 = prePoint.y + dis_y * 0.7;
    }

    point.perLineWidth = (prePoint.lineWidth + point.lineWidth) / 2;

    if (typeof prePoint.lastX1 === 'number') {
      _this.drawCurveLine(prePoint.lastX2, prePoint.lastY2, prePoint.x, prePoint.y, point.lastX1, point.lastY1, point.perLineWidth);

      if (prePoint.isFirstPoint) return;
      if (prePoint.lastX1 === prePoint.lastX2 && prePoint.lastY1 === prePoint.lastY2) return;

      var data = _this.getRadianData(prePoint.lastX1, prePoint.lastY1, prePoint.lastX2, prePoint.lastY2);

      var points1 = _this.getRadianPoints(data, prePoint.lastX1, prePoint.lastY1, prePoint.perLineWidth / 2);

      var points2 = _this.getRadianPoints(data, prePoint.lastX2, prePoint.lastY2, point.perLineWidth / 2);

      _this.drawTrapezoid(points1[0], points2[0], points2[1], points1[1]);
    } else {
      point.isFirstPoint = true;
    }
  };

  this.drawNoSmoothLine = function (prePoint, point) {
    point.lastX = prePoint.x + (point.x - prePoint.x) * 0.5;
    point.lastY = prePoint.y + (point.y - prePoint.y) * 0.5;

    if (typeof prePoint.lastX === 'number') {
      _this.drawCurveLine(prePoint.lastX, prePoint.lastY, prePoint.x, prePoint.y, point.lastX, point.lastY, _this.maxWidth);
    }
  };

  this.drawCurveLine = function (x1, y1, x2, y2, x3, y3, lineWidth) {
    lineWidth = Number(lineWidth.toFixed(1));
    _this.ctx.setLineWidth && _this.ctx.setLineWidth(lineWidth);
    _this.ctx.lineWidth = lineWidth;

    _this.ctx.beginPath();

    _this.ctx.moveTo(Number(x1.toFixed(1)), Number(y1.toFixed(1)));

    _this.ctx.quadraticCurveTo(Number(x2.toFixed(1)), Number(y2.toFixed(1)), Number(x3.toFixed(1)), Number(y3.toFixed(1)));

    _this.ctx.stroke();

    _this.ctx.draw && _this.ctx.draw(true);
  };

  this.drawTrapezoid = function (point1, point2, point3, point4) {
    _this.ctx.beginPath();

    _this.ctx.moveTo(Number(point1.x.toFixed(1)), Number(point1.y.toFixed(1)));

    _this.ctx.lineTo(Number(point2.x.toFixed(1)), Number(point2.y.toFixed(1)));

    _this.ctx.lineTo(Number(point3.x.toFixed(1)), Number(point3.y.toFixed(1)));

    _this.ctx.lineTo(Number(point4.x.toFixed(1)), Number(point4.y.toFixed(1)));

    _this.ctx.setFillStyle && _this.ctx.setFillStyle(_this.color);
    _this.ctx.fillStyle = _this.color;

    _this.ctx.fill();

    _this.ctx.draw && _this.ctx.draw(true);
  };

  this.drawBgColor = function () {
    if (!_this.bgColor) return;
    _this.ctx.setFillStyle && _this.ctx.setFillStyle(_this.bgColor);
    _this.ctx.fillStyle = _this.bgColor;

    _this.ctx.fillRect(0, 0, _this.width, _this.height);

    _this.ctx.draw && _this.ctx.draw(true);
  };

  this.drawByImage = function (url) {
    _this.ctx.clearRect(0, 0, _this.width, _this.height);

    try {
      _this.ctx.drawImage(url, 0, 0, _this.width, _this.height);

      _this.ctx.draw && _this.ctx.draw(true);
    } catch (e) {
      _this.historyList.length = 0;
    }
  };

  this.addHistory = function () {
    if (!_this.maxHistoryLength || !_this.canAddHistory) return;
    _this.canAddHistory = false;

    if (!_this.getImagePath) {
      _this.historyList.length++;
      return;
    }

    _this.getImagePath().then(function (url) {
      if (url) {
        _this.historyList.push(url);

        _this.historyList = _this.historyList.slice(-_this.maxHistoryLength);
      }

      ;
    });
  };

  this.clear = function () {
    _this.ctx.clearRect(0, 0, _this.width, _this.height);

    _this.ctx.draw && _this.ctx.draw();

    _this.drawBgColor();

    _this.historyList.length = 0;
  };

  this.undo = function () {
    if (!_this.getImagePath || !_this.historyList.length) return;

    var pngURL = _this.historyList.splice(-1)[0];

    _this.drawByImage(pngURL);

    if (_this.historyList.length === 0) {
      _this.clear();
    }
  };

  this.isEmpty = function () {
    return _this.historyList.length === 0;
  };

  this.init(_ctx, _options);
};

module.exports = SmoothSignature;
var _default = SmoothSignature;
exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1686279057250);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map