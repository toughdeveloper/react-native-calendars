'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _interface = require('../../interface');

var _xdate = require('xdate');

var _xdate2 = _interopRequireDefault(_xdate);

var _dateutils = require('../../dateutils');

var _dateutils2 = _interopRequireDefault(_dateutils);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReservationListItem = function (_Component) {
  _inherits(ReservationListItem, _Component);

  function ReservationListItem(props) {
    _classCallCheck(this, ReservationListItem);

    var _this = _possibleConstructorReturn(this, (ReservationListItem.__proto__ || Object.getPrototypeOf(ReservationListItem)).call(this, props));

    _this.styles = (0, _style2.default)(props.theme);
    return _this;
  }

  _createClass(ReservationListItem, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var r1 = this.props.item;
      var r2 = nextProps.item;
      var changed = true;
      if (!r1 && !r2) {
        changed = false;
      } else if (r1 && r2) {
        if (r1.day.getTime() !== r2.day.getTime()) {
          changed = true;
        } else if (!r1.reservation && !r2.reservation) {
          changed = false;
        } else if (r1.reservation && r2.reservation) {
          if (!r1.date && !r2.date || r1.date && r2.date) {
            changed = this.props.rowHasChanged(r1.reservation, r2.reservation);
          }
        }
      }
      return changed;
    }
  }, {
    key: 'renderDate',
    value: function renderDate(date, item) {
      if (this.props.renderDay) {
        return this.props.renderDay(date ? (0, _interface.xdateToData)(date) : undefined, item);
      }
      var today = _dateutils2.default.sameDate(date, (0, _xdate2.default)()) ? this.styles.today : undefined;
      if (date) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: this.styles.day },
          _react2.default.createElement(
            _reactNative.Text,
            { allowFontScaling: false, style: [this.styles.dayNum, today] },
            date.getDate()
          ),
          _react2.default.createElement(
            _reactNative.Text,
            { allowFontScaling: false, style: [this.styles.dayText, today] },
            _xdate2.default.locales[_xdate2.default.defaultLocale].dayNamesShort[date.getDay()]
          )
        );
      } else {
        return _react2.default.createElement(_reactNative.View, { style: this.styles.day });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$item = this.props.item,
          reservation = _props$item.reservation,
          date = _props$item.date;

      var content = void 0;
      if (reservation) {
        var firstItem = date ? true : false;
        content = this.props.renderItem(reservation, firstItem);
      } else {
        content = this.props.renderEmptyDate(date);
      }
      return _react2.default.createElement(
        _reactNative.View,
        { style: this.styles.container },
        this.renderDate(date, reservation),
        _react2.default.createElement(
          _reactNative.View,
          { style: { flex: 1 } },
          content
        )
      );
    }
  }]);

  return ReservationListItem;
}(_react.Component);

exports.default = ReservationListItem;