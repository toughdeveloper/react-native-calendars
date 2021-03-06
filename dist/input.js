"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VelocityTracker = exports.VelocityTracker = function () {
  function VelocityTracker() {
    _classCallCheck(this, VelocityTracker);

    this.history = [];
    this.lastPosition = undefined;
    this.lastTimestamp = undefined;
  }

  _createClass(VelocityTracker, [{
    key: "add",
    value: function add(position) {
      var timestamp = new Date().valueOf();
      if (this.lastPosition && timestamp > this.lastTimestamp) {
        var diff = position - this.lastPosition;
        if (diff > 0.001 || diff < -0.001) {
          this.history.push(diff / (timestamp - this.lastTimestamp));
        }
      }
      this.lastPosition = position;
      this.lastTimestamp = timestamp;
    }
  }, {
    key: "estimateSpeed",
    value: function estimateSpeed() {
      var finalTrend = this.history.slice(-3);
      var sum = finalTrend.reduce(function (r, v) {
        return r + v;
      }, 0);
      return sum / finalTrend.length;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.history = [];
      this.lastPosition = undefined;
      this.lastTimestamp = undefined;
    }
  }]);

  return VelocityTracker;
}();