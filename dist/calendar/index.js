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

var _xdate = require('xdate');

var _xdate2 = _interopRequireDefault(_xdate);

var _dateutils = require('../dateutils');

var _dateutils2 = _interopRequireDefault(_dateutils);

var _interface = require('../interface');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _basic = require('./day/basic');

var _basic2 = _interopRequireDefault(_basic);

var _period = require('./day/period');

var _period2 = _interopRequireDefault(_period);

var _multiDot = require('./day/multi-dot');

var _multiDot2 = _interopRequireDefault(_multiDot);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _updater = require('./updater');

var _updater2 = _interopRequireDefault(_updater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Fallback when RN version is < 0.44
var viewPropTypes = _reactNative.ViewPropTypes || _reactNative.View.propTypes;

var EmptyArray = [];

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.style = (0, _style2.default)(_this.props.theme);
    var currentMonth = void 0;
    if (props.current) {
      currentMonth = (0, _interface.parseDate)(props.current);
    } else {
      currentMonth = (0, _xdate2.default)();
    }
    _this.state = {
      currentMonth: currentMonth
    };

    _this.updateMonth = _this.updateMonth.bind(_this);
    _this.addMonth = _this.addMonth.bind(_this);
    _this.pressDay = _this.pressDay.bind(_this);
    _this.shouldComponentUpdate = _updater2.default;
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var current = (0, _interface.parseDate)(nextProps.current);
      if (current && current.toString('yyyy MM') !== this.state.currentMonth.toString('yyyy MM')) {
        this.setState({
          currentMonth: current.clone()
        });
      }
    }
  }, {
    key: 'updateMonth',
    value: function updateMonth(day, doNotTriggerListeners) {
      var _this2 = this;

      if (day.toString('yyyy MM') === this.state.currentMonth.toString('yyyy MM')) {
        return;
      }
      this.setState({
        currentMonth: day.clone()
      }, function () {
        if (!doNotTriggerListeners) {
          var currMont = _this2.state.currentMonth.clone();
          if (_this2.props.onMonthChange) {
            _this2.props.onMonthChange((0, _interface.xdateToData)(currMont));
          }
          if (_this2.props.onVisibleMonthsChange) {
            _this2.props.onVisibleMonthsChange([(0, _interface.xdateToData)(currMont)]);
          }
        }
      });
    }
  }, {
    key: 'pressDay',
    value: function pressDay(date) {
      var day = (0, _interface.parseDate)(date);
      var minDate = (0, _interface.parseDate)(this.props.minDate);
      var maxDate = (0, _interface.parseDate)(this.props.maxDate);
      if (!(minDate && !_dateutils2.default.isGTE(day, minDate)) && !(maxDate && !_dateutils2.default.isLTE(day, maxDate))) {
        var shouldUpdateMonth = this.props.disableMonthChange === undefined || !this.props.disableMonthChange;
        if (shouldUpdateMonth) {
          this.updateMonth(day);
        }
        if (this.props.onDayPress) {
          this.props.onDayPress((0, _interface.xdateToData)(day));
        }
      }
    }
  }, {
    key: 'addMonth',
    value: function addMonth(count) {
      this.updateMonth(this.state.currentMonth.clone().addMonths(count, true));
    }
  }, {
    key: 'renderDay',
    value: function renderDay(day, id) {
      var minDate = (0, _interface.parseDate)(this.props.minDate);
      var maxDate = (0, _interface.parseDate)(this.props.maxDate);
      var state = '';
      if (this.props.disabledByDefault) {
        state = 'disabled';
      } else if (minDate && !_dateutils2.default.isGTE(day, minDate) || maxDate && !_dateutils2.default.isLTE(day, maxDate)) {
        state = 'disabled';
      } else if (!_dateutils2.default.sameMonth(day, this.state.currentMonth)) {
        state = 'disabled';
      } else if (_dateutils2.default.sameDate(day, (0, _xdate2.default)())) {
        state = 'today';
      }
      var dayComp = void 0;
      if (!_dateutils2.default.sameMonth(day, this.state.currentMonth) && this.props.hideExtraDays) {
        if (this.props.markingType === 'period') {
          dayComp = _react2.default.createElement(_reactNative.View, { key: id, style: { flex: 1 } });
        } else {
          dayComp = _react2.default.createElement(_reactNative.View, { key: id, style: { width: 32 } });
        }
      } else {
        var DayComp = this.getDayComponent();
        var date = day.getDate();
        dayComp = _react2.default.createElement(
          DayComp,
          {
            key: id,
            state: state,
            theme: this.props.theme,
            onPress: this.pressDay,
            date: (0, _interface.xdateToData)(day),
            marking: this.getDateMarking(day)
          },
          date
        );
      }
      return dayComp;
    }
  }, {
    key: 'getDayComponent',
    value: function getDayComponent() {
      if (this.props.dayComponent) {
        return this.props.dayComponent;
      }

      switch (this.props.markingType) {
        case 'period':
          return _period2.default;
        case 'multi-dot':
          return _multiDot2.default;
        default:
          return _basic2.default;
      }
    }
  }, {
    key: 'getDateMarking',
    value: function getDateMarking(day) {
      if (!this.props.markedDates) {
        return false;
      }
      var dates = this.props.markedDates[day.toString('yyyy-MM-dd')] || EmptyArray;
      if (dates.length || dates) {
        return dates;
      } else {
        return false;
      }
    }
  }, {
    key: 'renderWeekNumber',
    value: function renderWeekNumber(weekNumber) {
      return _react2.default.createElement(
        _basic2.default,
        { key: 'week-' + weekNumber, theme: this.props.theme, state: 'disabled' },
        weekNumber
      );
    }
  }, {
    key: 'renderWeek',
    value: function renderWeek(days, id) {
      var _this3 = this;

      var week = [];
      days.forEach(function (day, id2) {
        week.push(_this3.renderDay(day, id2));
      }, this);

      if (this.props.showWeekNumbers) {
        week.unshift(this.renderWeekNumber(days[days.length - 1].getWeek()));
      }

      return _react2.default.createElement(
        _reactNative.View,
        { style: this.style.week, key: id },
        week
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var days = _dateutils2.default.page(this.state.currentMonth, this.props.firstDay);
      var weeks = [];
      while (days.length) {
        weeks.push(this.renderWeek(days.splice(0, 7), weeks.length));
      }
      var indicator = void 0;
      var current = (0, _interface.parseDate)(this.props.current);
      if (current) {
        var lastMonthOfDay = current.clone().addMonths(1, true).setDate(1).addDays(-1).toString('yyyy-MM-dd');
        if (this.props.displayLoadingIndicator && !(this.props.markedDates && this.props.markedDates[lastMonthOfDay])) {
          indicator = true;
        }
      }
      return _react2.default.createElement(
        _reactNative.View,
        { style: [this.style.container, this.props.style] },
        _react2.default.createElement(_header2.default, {
          theme: this.props.theme,
          hideArrows: this.props.hideArrows,
          month: this.state.currentMonth,
          addMonth: this.addMonth,
          showIndicator: indicator,
          firstDay: this.props.firstDay,
          renderArrow: this.props.renderArrow,
          monthFormat: this.props.monthFormat,
          hideDayNames: this.props.hideDayNames,
          weekNumbers: this.props.showWeekNumbers
        }),
        weeks
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  // Specify theme properties to override specific styles for calendar parts. Default = {}
  theme: _propTypes2.default.object,
  // Collection of dates that have to be marked. Default = {}
  markedDates: _propTypes2.default.object,

  // Specify style for calendar container element. Default = {}
  style: viewPropTypes.style,
  // Initially visible month. Default = Date()
  current: _propTypes2.default.any,
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate: _propTypes2.default.any,
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate: _propTypes2.default.any,

  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay: _propTypes2.default.number,

  // Date marking style [simple/period]. Default = 'simple'
  markingType: _propTypes2.default.string,

  // Hide month navigation arrows. Default = false
  hideArrows: _propTypes2.default.bool,
  // Display loading indicador. Default = false
  displayLoadingIndicator: _propTypes2.default.bool,
  // Do not show days of other months in month page. Default = false
  hideExtraDays: _propTypes2.default.bool,

  // Handler which gets executed on day press. Default = undefined
  onDayPress: _propTypes2.default.func,
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange: _propTypes2.default.func,
  onVisibleMonthsChange: _propTypes2.default.func,
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow: _propTypes2.default.func,
  // Provide custom day rendering component
  dayComponent: _propTypes2.default.any,
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat: _propTypes2.default.string,
  // Disables changing month when click on days of other months (when hideExtraDays is false). Default = false
  disableMonthChange: _propTypes2.default.bool,
  //  Hide day names. Default = false
  hideDayNames: _propTypes2.default.bool,
  // Disable days by default. Default = false
  disabledByDefault: _propTypes2.default.bool,
  // Show week numbers. Default = false
  showWeekNumbers: _propTypes2.default.bool
};
exports.default = Calendar;