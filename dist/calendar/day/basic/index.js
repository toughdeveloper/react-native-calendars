'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_Component) {
  _inherits(Day, _Component);

  function Day(props) {
    _classCallCheck(this, Day);

    var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

    _this.style = (0, _style2.default)(props.theme);
    _this.onDayPress = _this.onDayPress.bind(_this);
    return _this;
  }

  _createClass(Day, [{
    key: 'onDayPress',
    value: function onDayPress() {
      this.props.onPress(this.props.date);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      var changed = ['state', 'children', 'marking', 'onPress'].reduce(function (prev, next) {
        if (prev) {
          return prev;
        } else if (nextProps[next] !== _this2.props[next]) {
          return next;
        }
        return prev;
      }, false);
      if (changed === 'marking') {
        var markingChanged = false;
        if (this.props.marking && nextProps.marking) {
          markingChanged = !(this.props.marking.marked === nextProps.marking.marked && this.props.marking.selected === nextProps.marking.selected && this.props.marking.dotColor === nextProps.marking.dotColor && this.props.marking.disabled === nextProps.marking.disabled);
        } else {
          markingChanged = true;
        }
        // console.log('marking changed', markingChanged);
        return markingChanged;
      } else {
        // console.log('changed', changed);
        return !!changed;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var containerStyle = [this.style.base];
      var textStyle = [this.style.text];
      var dotStyle = [this.style.dot];

      var marking = this.props.marking || {};
      if (marking && marking.constructor === Array && marking.length) {
        marking = {
          marking: true
        };
      }
      var isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';
      var dot = void 0;
      if (marking.marked) {
        dotStyle.push(this.style.visibleDot);
        if (marking.dotColor) {
          dotStyle.push({ backgroundColor: marking.dotColor });
        }
        dot = _react2.default.createElement(_reactNative.View, { style: dotStyle });
      }

      if (marking.selected) {
        containerStyle.push(this.style.selected);
        if (marking.selectedColor) {
          containerStyle.push({ backgroundColor: marking.selectedColor });
        }
        dotStyle.push(this.style.selectedDot);
        textStyle.push(this.style.selectedText);
      } else if (isDisabled) {
        textStyle.push(this.style.disabledText);
      } else if (this.props.state === 'today') {
        textStyle.push(this.style.todayText);
      }

      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        {
          style: containerStyle,
          onPress: this.onDayPress,
          activeOpacity: marking.activeOpacity,
          disabled: marking.disableTouchEvent
        },
        _react2.default.createElement(
          _reactNative.Text,
          { allowFontScaling: false, style: textStyle },
          String(this.props.children)
        ),
        dot
      );
    }
  }]);

  return Day;
}(_react.Component);

Day.propTypes = {
  // TODO: disabled props should be removed
  state: _propTypes2.default.oneOf(['disabled', 'today', '']),

  // Specify theme properties to override specific styles for calendar parts. Default = {}
  theme: _propTypes2.default.object,
  marking: _propTypes2.default.any,
  onPress: _propTypes2.default.func,
  date: _propTypes2.default.object
};
exports.default = Day;