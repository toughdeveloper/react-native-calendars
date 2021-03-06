'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _calendar = require('../calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarListItem = function (_Component) {
  _inherits(CalendarListItem, _Component);

  function CalendarListItem(props) {
    _classCallCheck(this, CalendarListItem);

    var _this = _possibleConstructorReturn(this, (CalendarListItem.__proto__ || Object.getPrototypeOf(CalendarListItem)).call(this, props));

    _this.style = (0, _style2.default)(props.theme);
    return _this;
  }

  _createClass(CalendarListItem, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var r1 = this.props.item;
      var r2 = nextProps.item;
      return r1.toString('yyyy MM') !== r2.toString('yyyy MM') || !!(r2.propbump && r2.propbump !== r1.propbump);
    }
  }, {
    key: 'render',
    value: function render() {
      var row = this.props.item;
      if (row.getTime) {
        return _react2.default.createElement(_calendar2.default, {
          theme: this.props.theme,
          style: [{ height: this.props.calendarHeight }, this.style.calendar],
          current: row,
          hideArrows: true,
          hideExtraDays: this.props.hideExtraDays === undefined ? true : this.props.hideExtraDays,
          disableMonthChange: true,
          markedDates: this.props.markedDates,
          markingType: this.props.markingType,
          hideDayNames: this.props.hideDayNames,
          onDayPress: this.props.onDayPress,
          displayLoadingIndicator: this.props.displayLoadingIndicator,
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
          firstDay: this.props.firstDay,
          monthFormat: this.props.monthFormat,
          dayComponent: this.props.dayComponent,
          disabledByDefault: this.props.disabledByDefault,
          showWeekNumbers: this.props.showWeekNumbers
        });
      } else {
        var text = row.toString();
        return _react2.default.createElement(
          _reactNative.View,
          { style: [{ height: this.props.calendarHeight }, this.style.placeholder] },
          _react2.default.createElement(
            _reactNative.Text,
            { allowFontScaling: false, style: this.style.placeholderText },
            text
          )
        );
      }
    }
  }]);

  return CalendarListItem;
}(_react.Component);

exports.default = CalendarListItem;