'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reservation = require('./reservation');

var _reservation2 = _interopRequireDefault(_reservation);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var ReactComp = function (_Component) {
  _inherits(ReactComp, _Component);

  function ReactComp(props) {
    _classCallCheck(this, ReactComp);

    var _this = _possibleConstructorReturn(this, (ReactComp.__proto__ || Object.getPrototypeOf(ReactComp)).call(this, props));

    _this.styles = (0, _style2.default)(props.theme);
    _this.state = {
      reservations: []
    };
    _this.heights = [];
    _this.selectedDay = _this.props.selectedDay;
    _this.scrollOver = true;
    return _this;
  }

  _createClass(ReactComp, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateDataSource(this.getReservations(this.props).reservations);
    }
  }, {
    key: 'updateDataSource',
    value: function updateDataSource(reservations) {
      this.setState({
        reservations: reservations
      });
    }
  }, {
    key: 'updateReservations',
    value: function updateReservations(props) {
      var reservations = this.getReservations(props);
      if (this.list && !_dateutils2.default.sameDate(props.selectedDay, this.selectedDay)) {
        var scrollPosition = 0;
        for (var i = 0; i < reservations.scrollPosition; i++) {
          scrollPosition += this.heights[i] || 0;
        }
        this.scrollOver = false;
        this.list.scrollToOffset({ offset: scrollPosition, animated: true });
      }
      this.selectedDay = props.selectedDay;
      this.updateDataSource(reservations.reservations);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      if (!_dateutils2.default.sameDate(props.topDay, this.props.topDay)) {
        this.setState({
          reservations: []
        }, function () {
          _this2.updateReservations(props);
        });
      } else {
        this.updateReservations(props);
      }
    }
  }, {
    key: 'onScroll',
    value: function onScroll(event) {
      var yOffset = event.nativeEvent.contentOffset.y;
      this.props.onScroll(yOffset);
      var topRowOffset = 0;
      var topRow = void 0;
      for (topRow = 0; topRow < this.heights.length; topRow++) {
        if (topRowOffset + this.heights[topRow] / 2 >= yOffset) {
          break;
        }
        topRowOffset += this.heights[topRow];
      }
      var row = this.state.reservations[topRow];
      if (!row) return;
      var day = row.day;
      var sameDate = _dateutils2.default.sameDate(day, this.selectedDay);
      if (!sameDate && this.scrollOver) {
        this.selectedDay = day.clone();
        this.props.onDayChange(day.clone());
      }
    }
  }, {
    key: 'onRowLayoutChange',
    value: function onRowLayoutChange(ind, event) {
      this.heights[ind] = event.nativeEvent.layout.height;
    }
  }, {
    key: 'renderRow',
    value: function renderRow(_ref) {
      var item = _ref.item,
          index = _ref.index;

      return _react2.default.createElement(
        _reactNative.View,
        { onLayout: this.onRowLayoutChange.bind(this, index) },
        _react2.default.createElement(_reservation2.default, {
          item: item,
          renderItem: this.props.renderItem,
          renderDay: this.props.renderDay,
          renderEmptyDate: this.props.renderEmptyDate,
          theme: this.props.theme,
          rowHasChanged: this.props.rowHasChanged
        })
      );
    }
  }, {
    key: 'getReservationsForDay',
    value: function getReservationsForDay(iterator, props) {
      var day = iterator.clone();
      var res = props.reservations[day.toString('yyyy-MM-dd')];
      if (res && res.length) {
        return res.map(function (reservation, i) {
          return {
            reservation: reservation,
            date: i ? false : day,
            day: day
          };
        });
      } else if (res) {
        return [{
          date: iterator.clone(),
          day: day
        }];
      } else {
        return false;
      }
    }
  }, {
    key: 'onListTouch',
    value: function onListTouch() {
      this.scrollOver = true;
    }
  }, {
    key: 'getReservations',
    value: function getReservations(props) {
      if (!props.reservations || !props.selectedDay) {
        return { reservations: [], scrollPosition: 0 };
      }
      var reservations = [];
      if (this.state.reservations && this.state.reservations.length) {
        var _iterator = this.state.reservations[0].day.clone();
        while (_iterator.getTime() < props.selectedDay.getTime()) {
          var res = this.getReservationsForDay(_iterator, props);
          if (!res) {
            reservations = [];
            break;
          } else {
            reservations = reservations.concat(res);
          }
          _iterator.addDays(1);
        }
      }
      var scrollPosition = reservations.length;
      var iterator = props.selectedDay.clone();
      for (var i = 0; i < 31; i++) {
        var _res = this.getReservationsForDay(iterator, props);
        if (_res) {
          reservations = reservations.concat(_res);
        }
        iterator.addDays(1);
      }

      return { reservations: reservations, scrollPosition: scrollPosition };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!this.props.reservations || !this.props.reservations[this.props.selectedDay.toString('yyyy-MM-dd')]) {
        if (this.props.renderEmptyData) {
          return this.props.renderEmptyData();
        }
        return _react2.default.createElement(_reactNative.ActivityIndicator, { style: { marginTop: 80 } });
      }
      return _react2.default.createElement(_reactNative.FlatList, {
        ref: function ref(c) {
          return _this3.list = c;
        },
        style: this.props.style,
        renderItem: this.renderRow.bind(this),
        data: this.state.reservations,
        onScroll: this.onScroll.bind(this),
        showsVerticalScrollIndicator: false,
        scrollEventThrottle: 200,
        onMoveShouldSetResponderCapture: function onMoveShouldSetResponderCapture() {
          _this3.onListTouch();return false;
        },
        keyExtractor: function keyExtractor(item, index) {
          return String(index);
        }
      });
    }
  }]);

  return ReactComp;
}(_react.Component);

ReactComp.propTypes = {
  // specify your item comparison function for increased performance
  rowHasChanged: _propTypes2.default.func,
  // specify how each item should be rendered in agenda
  renderItem: _propTypes2.default.func,
  // specify how each date should be rendered. day can be undefined if the item is not first in that day.
  renderDay: _propTypes2.default.func,
  // specify how empty date content with no items should be rendered
  renderEmptyDate: _propTypes2.default.func,
  // callback that gets called when day changes while scrolling agenda list
  onDayChange: _propTypes2.default.func,
  // onScroll ListView event
  onScroll: _propTypes2.default.func,
  // the list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key kas to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  reservations: _propTypes2.default.object,

  selectedDay: _propTypes2.default.instanceOf(_xdate2.default),
  topDay: _propTypes2.default.instanceOf(_xdate2.default)
};
exports.default = ReactComp;