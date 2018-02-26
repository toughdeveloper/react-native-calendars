'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _xdate = require('xdate');

var _xdate2 = _interopRequireDefault(_xdate);

var _interface = require('../interface');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _dateutils = require('../dateutils');

var _dateutils2 = _interopRequireDefault(_dateutils);

var _calendar = require('../calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var calendarHeight = 360;

var CalendarList = function (_Component) {
  _inherits(CalendarList, _Component);

  function CalendarList(props) {
    _classCallCheck(this, CalendarList);

    var _this = _possibleConstructorReturn(this, (CalendarList.__proto__ || Object.getPrototypeOf(CalendarList)).call(this, props));

    _this.pastScrollRange = props.pastScrollRange === undefined ? 50 : props.pastScrollRange;
    _this.futureScrollRange = props.futureScrollRange === undefined ? 50 : props.futureScrollRange;
    _this.style = (0, _style2.default)(props.theme);
    var rows = [];
    var texts = [];
    var date = (0, _interface.parseDate)(props.current) || (0, _xdate2.default)();
    for (var i = 0; i <= _this.pastScrollRange + _this.futureScrollRange; i++) {
      var rangeDate = date.clone().addMonths(i - _this.pastScrollRange, true);
      var rangeDateStr = rangeDate.toString('MMM yyyy');
      texts.push(rangeDateStr);
      /*
       * This selects range around current shown month [-0, +2] or [-1, +1] month for detail calendar rendering.
       * If `this.pastScrollRange` is `undefined` it's equal to `false` or 0 in next condition.
       */
      if (_this.pastScrollRange - 1 <= i && i <= _this.pastScrollRange + 1 || !_this.pastScrollRange && i <= _this.pastScrollRange + 2) {
        rows.push(rangeDate);
      } else {
        rows.push(rangeDateStr);
      }
    }

    _this.state = {
      rows: rows,
      texts: texts,
      openDate: date,
      initialized: false
    };
    _this.lastScrollPosition = -1000;

    _this.onViewableItemsChangedBound = _this.onViewableItemsChanged.bind(_this);
    _this.renderCalendarBound = _this.renderCalendar.bind(_this);
    return _this;
  }

  _createClass(CalendarList, [{
    key: 'scrollToDay',
    value: function scrollToDay(d, offset, animated) {
      var day = (0, _interface.parseDate)(d);
      var diffMonths = Math.round(this.state.openDate.clone().setDate(1).diffMonths(day.clone().setDate(1)));
      var scrollAmount = calendarHeight * this.pastScrollRange + diffMonths * calendarHeight + (offset || 0);
      var week = 0;
      var days = _dateutils2.default.page(day, this.props.firstDay);
      for (var i = 0; i < days.length; i++) {
        week = Math.floor(i / 7);
        if (_dateutils2.default.sameDate(days[i], day)) {
          scrollAmount += 46 * week;
          break;
        }
      }
      this.listView.scrollToOffset({ offset: scrollAmount, animated: animated });
    }
  }, {
    key: 'scrollToMonth',
    value: function scrollToMonth(m) {
      var month = (0, _interface.parseDate)(m);
      var scrollTo = month || this.state.openDate;
      var diffMonths = Math.round(this.state.openDate.clone().setDate(1).diffMonths(scrollTo.clone().setDate(1)));
      var scrollAmount = calendarHeight * this.pastScrollRange + diffMonths * calendarHeight;
      //console.log(month, this.state.openDate);
      //console.log(scrollAmount, diffMonths);
      this.listView.scrollToOffset({ offset: scrollAmount, animated: false });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var current = (0, _interface.parseDate)(this.props.current);
      var nextCurrent = (0, _interface.parseDate)(props.current);
      if (nextCurrent && current && nextCurrent.getTime() !== current.getTime()) {
        this.scrollToMonth(nextCurrent);
      }

      var rowclone = this.state.rows;
      var newrows = [];
      for (var i = 0; i < rowclone.length; i++) {
        var val = this.state.texts[i];
        if (rowclone[i].getTime) {
          val = rowclone[i].clone();
          val.propbump = rowclone[i].propbump ? rowclone[i].propbump + 1 : 1;
        }
        newrows.push(val);
      }
      this.setState({
        rows: newrows
      });
    }
  }, {
    key: 'onViewableItemsChanged',
    value: function onViewableItemsChanged(_ref) {
      var viewableItems = _ref.viewableItems;

      function rowIsCloseToViewable(index, distance) {
        for (var i = 0; i < viewableItems.length; i++) {
          if (Math.abs(index - parseInt(viewableItems[i].index)) <= distance) {
            return true;
          }
        }
        return false;
      }

      var rowclone = this.state.rows;
      var newrows = [];
      var visibleMonths = [];
      for (var i = 0; i < rowclone.length; i++) {
        var val = rowclone[i];
        var rowShouldBeRendered = rowIsCloseToViewable(i, 1);
        if (rowShouldBeRendered && !rowclone[i].getTime) {
          val = this.state.openDate.clone().addMonths(i - this.pastScrollRange, true);
        } else if (!rowShouldBeRendered) {
          val = this.state.texts[i];
        }
        newrows.push(val);
        if (rowIsCloseToViewable(i, 0)) {
          visibleMonths.push((0, _interface.xdateToData)(val));
        }
      }
      if (this.props.onVisibleMonthsChange) {
        this.props.onVisibleMonthsChange(visibleMonths);
      }
      this.setState({
        rows: newrows
      });
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar(_ref2) {
      var item = _ref2.item;

      return _react2.default.createElement(_item2.default, _extends({ item: item, calendarHeight: calendarHeight }, this.props));
    }
  }, {
    key: 'getItemLayout',
    value: function getItemLayout(data, index) {
      return { length: calendarHeight, offset: calendarHeight * index, index: index };
    }
  }, {
    key: 'getMonthIndex',
    value: function getMonthIndex(month) {
      var diffMonths = this.state.openDate.diffMonths(month) + this.pastScrollRange;
      return diffMonths;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_reactNative.FlatList, {
        ref: function ref(c) {
          return _this2.listView = c;
        }
        //scrollEventThrottle={1000}
        , style: [this.style.container, this.props.style],
        initialListSize: this.pastScrollRange * this.futureScrollRange + 1,
        data: this.state.rows
        //snapToAlignment='start'
        //snapToInterval={calendarHeight}
        , removeClippedSubviews: _reactNative.Platform.OS === 'android' ? false : true,
        pageSize: 1,
        onViewableItemsChanged: this.onViewableItemsChangedBound,
        renderItem: this.renderCalendarBound,
        showsVerticalScrollIndicator: this.props.showScrollIndicator !== undefined ? this.props.showScrollIndicator : false,
        scrollEnabled: this.props.scrollingEnabled !== undefined ? this.props.scrollingEnabled : true,
        keyExtractor: function keyExtractor(item, index) {
          return String(index);
        },
        initialScrollIndex: this.state.openDate ? this.getMonthIndex(this.state.openDate) : false,
        getItemLayout: this.getItemLayout,
        scrollsToTop: this.props.scrollsToTop !== undefined ? this.props.scrollsToTop : false
      });
    }
  }]);

  return CalendarList;
}(_react.Component);

CalendarList.propTypes = _extends({}, _calendar2.default.propTypes, {

  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange: _propTypes2.default.number,

  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange: _propTypes2.default.number,

  // Enable or disable scrolling of calendar list
  scrollEnabled: _propTypes2.default.bool,

  // Enable or disable vertical scroll indicator. Default = false
  showScrollIndicator: _propTypes2.default.bool,

  // When true, the calendar list scrolls to top when the status bar is tapped. Default = true
  scrollsToTop: _propTypes2.default.bool
});
exports.default = CalendarList;