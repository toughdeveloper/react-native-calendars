'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _style = require('../../../style');

var defaultStyle = _interopRequireWildcard(_style);

var _style2 = require('./style');

var _style3 = _interopRequireDefault(_style2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import _ from 'lodash';


var Day = function (_Component) {
  _inherits(Day, _Component);

  function Day(props) {
    _classCallCheck(this, Day);

    var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

    _this.theme = _extends({}, defaultStyle, props.theme || {});
    _this.style = (0, _style3.default)(props.theme);
    _this.markingStyle = _this.getDrawingStyle(props.marking || []);
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

      var newMarkingStyle = this.getDrawingStyle(nextProps.marking);

      if (JSON.stringify(this.markingStyle) !== JSON.stringify(newMarkingStyle)) {
        this.markingStyle = newMarkingStyle;
        return true;
      }

      return ['state', 'children'].reduce(function (prev, next) {
        if (prev || nextProps[next] !== _this2.props[next]) {
          return true;
        }
        return prev;
      }, false);
    }
  }, {
    key: 'getDrawingStyle',
    value: function getDrawingStyle(marking) {
      var _this3 = this;

      var defaultStyle = { textStyle: {} };
      if (!marking) {
        return defaultStyle;
      }
      if (marking.disabled) {
        defaultStyle.textStyle.color = this.theme.textDisabledColor;
      } else if (marking.selected) {
        defaultStyle.textStyle.color = this.theme.selectedDayTextColor;
      }
      var resultStyle = [marking].reduce(function (prev, next) {
        if (next.quickAction) {
          if (next.first || next.last) {
            prev.containerStyle = _this3.style.firstQuickAction;
            prev.textStyle = _this3.style.firstQuickActionText;
            if (next.endSelected && next.first && !next.last) {
              prev.rightFillerStyle = '#c1e4fe';
            } else if (next.endSelected && next.last && !next.first) {
              prev.leftFillerStyle = '#c1e4fe';
            }
          } else if (!next.endSelected) {
            prev.containerStyle = _this3.style.quickAction;
            prev.textStyle = _this3.style.quickActionText;
          } else if (next.endSelected) {
            prev.leftFillerStyle = '#c1e4fe';
            prev.rightFillerStyle = '#c1e4fe';
          }
          return prev;
        }

        var color = next.color;
        if (next.status === 'NotAvailable') {
          prev.textStyle = _this3.style.naText;
        }
        if (next.startingDay) {
          prev.startingDay = {
            color: color
          };
        }
        if (next.endingDay) {
          prev.endingDay = {
            color: color
          };
        }
        if (!next.startingDay && !next.endingDay) {
          prev.day = {
            color: color
          };
        }
        if (next.textColor) {
          prev.textStyle.color = next.textColor;
        }
        return prev;
      }, defaultStyle);
      return resultStyle;
    }
  }, {
    key: 'render',
    value: function render() {
      var containerStyle = [this.style.base];
      var textStyle = [this.style.text];
      var leftFillerStyle = {};
      var rightFillerStyle = {};
      var fillerStyle = {};
      var fillers = void 0;

      if (this.props.state === 'disabled') {
        textStyle.push(this.style.disabledText);
      } else if (this.props.state === 'today') {
        textStyle.push(this.style.todayText);
      }

      if (this.props.marking) {
        containerStyle.push({
          borderRadius: 17
        });

        var flags = this.markingStyle;
        if (flags.textStyle) {
          textStyle.push(flags.textStyle);
        }
        if (flags.containerStyle) {
          containerStyle.push(flags.containerStyle);
        }
        if (flags.leftFillerStyle) {
          leftFillerStyle.backgroundColor = flags.leftFillerStyle;
        }
        if (flags.rightFillerStyle) {
          rightFillerStyle.backgroundColor = flags.rightFillerStyle;
        }

        if (flags.startingDay && !flags.endingDay) {
          leftFillerStyle = {
            backgroundColor: this.theme.calendarBackground
          };
          rightFillerStyle = {
            backgroundColor: flags.startingDay.color
          };
          containerStyle.push({
            backgroundColor: flags.startingDay.color
          });
        } else if (flags.endingDay && !flags.startingDay) {
          rightFillerStyle = {
            backgroundColor: this.theme.calendarBackground
          };
          leftFillerStyle = {
            backgroundColor: flags.endingDay.color
          };
          containerStyle.push({
            backgroundColor: flags.endingDay.color
          });
        } else if (flags.day) {
          leftFillerStyle = { backgroundColor: flags.day.color };
          rightFillerStyle = { backgroundColor: flags.day.color };
          // #177 bug
          fillerStyle = { backgroundColor: flags.day.color };
        } else if (flags.endingDay && flags.startingDay) {
          rightFillerStyle = {
            backgroundColor: this.theme.calendarBackground
          };
          leftFillerStyle = {
            backgroundColor: this.theme.calendarBackground
          };
          containerStyle.push({
            backgroundColor: flags.endingDay.color
          });
        }

        fillers = _react2.default.createElement(
          _reactNative.View,
          { style: [this.style.fillers, fillerStyle] },
          _react2.default.createElement(_reactNative.View, { style: [this.style.leftFiller, leftFillerStyle] }),
          _react2.default.createElement(_reactNative.View, { style: [this.style.rightFiller, rightFillerStyle] })
        );
      }

      return _react2.default.createElement(
        _reactNative.TouchableWithoutFeedback,
        { onPress: this.onDayPress },
        _react2.default.createElement(
          _reactNative.View,
          { style: this.style.wrapper },
          fillers,
          _react2.default.createElement(
            _reactNative.View,
            { style: containerStyle },
            _react2.default.createElement(
              _reactNative.Text,
              { allowFontScaling: false, style: textStyle },
              String(this.props.children)
            )
          )
        )
      );
    }
  }]);

  return Day;
}(_react.Component);

Day.propTypes = {
  // TODO: selected + disabled props should be removed
  state: _propTypes2.default.oneOf(['selected', 'disabled', 'today', '']),

  // Specify theme properties to override specific styles for calendar parts. Default = {}
  theme: _propTypes2.default.object,
  marking: _propTypes2.default.any,

  onPress: _propTypes2.default.func,
  date: _propTypes2.default.object,

  markingExists: _propTypes2.default.bool
};
exports.default = Day;