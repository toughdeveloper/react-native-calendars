'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _xdate = require('xdate');

var _xdate2 = _interopRequireDefault(_xdate);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _dateutils = require('../../dateutils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarHeader = function (_Component) {
  _inherits(CalendarHeader, _Component);

  function CalendarHeader(props) {
    _classCallCheck(this, CalendarHeader);

    var _this = _possibleConstructorReturn(this, (CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).call(this, props));

    _this.style = (0, _style2.default)(props.theme);
    _this.addMonth = _this.addMonth.bind(_this);
    _this.substractMonth = _this.substractMonth.bind(_this);
    return _this;
  }

  _createClass(CalendarHeader, [{
    key: 'addMonth',
    value: function addMonth() {
      this.props.addMonth(1);
    }
  }, {
    key: 'substractMonth',
    value: function substractMonth() {
      this.props.addMonth(-1);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.month.toString('yyyy MM') !== this.props.month.toString('yyyy MM')) {
        return true;
      }
      if (nextProps.showIndicator !== this.props.showIndicator) {
        return true;
      }
      if (nextProps.hideDayNames !== this.props.hideDayNames) {
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var leftArrow = _react2.default.createElement(_reactNative.View, null);
      var rightArrow = _react2.default.createElement(_reactNative.View, null);
      var weekDaysNames = (0, _dateutils.weekDayNames)(this.props.firstDay);
      if (!this.props.hideArrows) {
        leftArrow = _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            onPress: this.substractMonth,
            style: this.style.arrow
          },
          this.props.renderArrow ? this.props.renderArrow('left') : _react2.default.createElement(_reactNative.Image, {
            source: require('../img/previous.png'),
            style: this.style.arrowImage
          })
        );
        rightArrow = _react2.default.createElement(
          _reactNative.TouchableOpacity,
          { onPress: this.addMonth, style: this.style.arrow },
          this.props.renderArrow ? this.props.renderArrow('right') : _react2.default.createElement(_reactNative.Image, {
            source: require('../img/next.png'),
            style: this.style.arrowImage
          })
        );
      }
      var indicator = void 0;
      if (this.props.showIndicator) {
        indicator = _react2.default.createElement(_reactNative.ActivityIndicator, null);
      }
      return _react2.default.createElement(
        _reactNative.View,
        null,
        _react2.default.createElement(
          _reactNative.View,
          { style: this.style.header },
          leftArrow,
          _react2.default.createElement(
            _reactNative.View,
            { style: { flexDirection: 'row' } },
            _react2.default.createElement(
              _reactNative.Text,
              { allowFontScaling: false, style: this.style.monthText },
              this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'MMMM yyyy')
            ),
            indicator
          ),
          rightArrow
        ),
        !this.props.hideDayNames && _react2.default.createElement(
          _reactNative.View,
          { style: this.style.week },
          this.props.weekNumbers && _react2.default.createElement(_reactNative.Text, { allowFontScaling: false, style: this.style.dayHeader }),
          weekDaysNames.map(function (day, idx) {
            return _react2.default.createElement(
              _reactNative.Text,
              { allowFontScaling: false, key: idx, style: _this2.style.dayHeader, numberOfLines: 1 },
              day
            );
          })
        )
      );
    }
  }]);

  return CalendarHeader;
}(_react.Component);

CalendarHeader.propTypes = {
  theme: _propTypes2.default.object,
  hideArrows: _propTypes2.default.bool,
  month: _propTypes2.default.instanceOf(_xdate2.default),
  addMonth: _propTypes2.default.func,
  showIndicator: _propTypes2.default.bool,
  firstDay: _propTypes2.default.number,
  renderArrow: _propTypes2.default.func,
  hideDayNames: _propTypes2.default.bool,
  weekNumbers: _propTypes2.default.bool
};
exports.default = CalendarHeader;