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

var _dateutils = require('../dateutils');

var _dateutils2 = _interopRequireDefault(_dateutils);

var _calendarList = require('../calendar-list');

var _calendarList2 = _interopRequireDefault(_calendarList);

var _reservationList = require('./reservation-list');

var _reservationList2 = _interopRequireDefault(_reservationList);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _input = require('../input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HEADER_HEIGHT = 104;
var KNOB_HEIGHT = 24;

//Fallback when RN version is < 0.44
var viewPropTypes = _reactNative.ViewPropTypes || _reactNative.View.propTypes;

var AgendaView = function (_Component) {
  _inherits(AgendaView, _Component);

  function AgendaView(props) {
    _classCallCheck(this, AgendaView);

    var _this = _possibleConstructorReturn(this, (AgendaView.__proto__ || Object.getPrototypeOf(AgendaView)).call(this, props));

    _this.styles = (0, _style2.default)(props.theme);
    var windowSize = _reactNative.Dimensions.get('window');
    _this.viewHeight = windowSize.height;
    _this.viewWidth = windowSize.width;
    _this.scrollTimeout = undefined;
    _this.headerState = 'idle';
    _this.state = {
      scrollY: new _reactNative.Animated.Value(0),
      calendarIsReady: false,
      calendarScrollable: false,
      firstResevationLoad: false,
      selectedDay: (0, _interface.parseDate)(_this.props.selected) || (0, _xdate2.default)(true),
      topDay: (0, _interface.parseDate)(_this.props.selected) || (0, _xdate2.default)(true)
    };
    _this.currentMonth = _this.state.selectedDay.clone();
    _this.onLayout = _this.onLayout.bind(_this);
    _this.onScrollPadLayout = _this.onScrollPadLayout.bind(_this);
    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onTouchEnd = _this.onTouchEnd.bind(_this);
    _this.onStartDrag = _this.onStartDrag.bind(_this);
    _this.onSnapAfterDrag = _this.onSnapAfterDrag.bind(_this);
    _this.generateMarkings = _this.generateMarkings.bind(_this);
    _this.knobTracker = new _input.VelocityTracker();
    _this.state.scrollY.addListener(function (_ref) {
      var value = _ref.value;
      return _this.knobTracker.add(value);
    });
    return _this;
  }

  _createClass(AgendaView, [{
    key: 'calendarOffset',
    value: function calendarOffset() {
      return 90 - this.viewHeight / 2;
    }
  }, {
    key: 'initialScrollPadPosition',
    value: function initialScrollPadPosition() {
      return Math.max(0, this.viewHeight - HEADER_HEIGHT);
    }
  }, {
    key: 'setScrollPadPosition',
    value: function setScrollPadPosition(y, animated) {
      this.scrollPad._component.scrollTo({ x: 0, y: y, animated: animated });
    }
  }, {
    key: 'onScrollPadLayout',
    value: function onScrollPadLayout() {
      var _this2 = this;

      // When user touches knob, the actual component that receives touch events is a ScrollView.
      // It needs to be scrolled to the bottom, so that when user moves finger downwards,
      // scroll position actually changes (it would stay at 0, when scrolled to the top).
      this.setScrollPadPosition(this.initialScrollPadPosition(), false);
      // delay rendering calendar in full height because otherwise it still flickers sometimes
      setTimeout(function () {
        return _this2.setState({ calendarIsReady: true });
      }, 0);
    }
  }, {
    key: 'onLayout',
    value: function onLayout(event) {
      this.viewHeight = event.nativeEvent.layout.height;
      this.viewWidth = event.nativeEvent.layout.width;
      this.calendar.scrollToDay(this.state.selectedDay.clone(), this.calendarOffset(), false);
      this.forceUpdate();
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart() {
      this.headerState = 'touched';
      if (this.knob) {
        this.knob.setNativeProps({ style: { opacity: 0.5 } });
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd() {
      if (this.knob) {
        this.knob.setNativeProps({ style: { opacity: 1 } });
      }

      if (this.headerState === 'touched') {
        this.setScrollPadPosition(0, true);
        this.enableCalendarScrolling();
      }
      this.headerState = 'idle';
    }
  }, {
    key: 'onStartDrag',
    value: function onStartDrag() {
      this.headerState = 'dragged';
      this.knobTracker.reset();
    }
  }, {
    key: 'onSnapAfterDrag',
    value: function onSnapAfterDrag(e) {
      // on Android onTouchEnd is not called if dragging was started
      this.onTouchEnd();
      var currentY = e.nativeEvent.contentOffset.y;
      this.knobTracker.add(currentY);
      var projectedY = currentY + this.knobTracker.estimateSpeed() * 250 /*ms*/;
      var maxY = this.initialScrollPadPosition();
      var snapY = projectedY > maxY / 2 ? maxY : 0;
      this.setScrollPadPosition(snapY, true);
      if (snapY === 0) {
        this.enableCalendarScrolling();
      }
    }
  }, {
    key: 'onVisibleMonthsChange',
    value: function onVisibleMonthsChange(months) {
      var _this3 = this;

      if (this.props.items && !this.state.firstResevationLoad) {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(function () {
          if (_this3.props.loadItemsForMonth && _this3._isMounted) {
            _this3.props.loadItemsForMonth(months[0]);
          }
        }, 200);
      }
    }
  }, {
    key: 'loadReservations',
    value: function loadReservations(props) {
      var _this4 = this;

      if ((!props.items || !Object.keys(props.items).length) && !this.state.firstResevationLoad) {
        this.setState({
          firstResevationLoad: true
        }, function () {
          if (_this4.props.loadItemsForMonth) {
            _this4.props.loadItemsForMonth((0, _interface.xdateToData)(_this4.state.selectedDay));
          }
        });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._isMounted = true;
      this.loadReservations(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.items) {
        this.setState({
          firstResevationLoad: false
        });
      } else {
        this.loadReservations(props);
      }
    }
  }, {
    key: 'enableCalendarScrolling',
    value: function enableCalendarScrolling() {
      this.setState({
        calendarScrollable: true
      });
      if (this.props.onCalendarToggled) {
        this.props.onCalendarToggled(true);
      }
      // Enlarge calendarOffset here as a workaround on iOS to force repaint.
      // Otherwise the month after current one or before current one remains invisible.
      // The problem is caused by overflow: 'hidden' style, which we need for dragging
      // to be performant.
      // Another working solution for this bug would be to set removeClippedSubviews={false}
      // in CalendarList listView, but that might impact performance when scrolling
      // month list in expanded CalendarList.
      // Further info https://github.com/facebook/react-native/issues/1831
      this.calendar.scrollToDay(this.state.selectedDay, this.calendarOffset() + 1, true);
    }
  }, {
    key: '_chooseDayFromCalendar',
    value: function _chooseDayFromCalendar(d) {
      this.chooseDay(d, !this.state.calendarScrollable);
    }
  }, {
    key: 'chooseDay',
    value: function chooseDay(d, optimisticScroll) {
      var day = (0, _interface.parseDate)(d);
      this.setState({
        calendarScrollable: false,
        selectedDay: day.clone()
      });
      if (this.props.onCalendarToggled) {
        this.props.onCalendarToggled(false);
      }
      if (!optimisticScroll) {
        this.setState({
          topDay: day.clone()
        });
      }
      this.setScrollPadPosition(this.initialScrollPadPosition(), true);
      this.calendar.scrollToDay(day, this.calendarOffset(), true);
      if (this.props.loadItemsForMonth) {
        this.props.loadItemsForMonth((0, _interface.xdateToData)(day));
      }
      if (this.props.onDayPress) {
        this.props.onDayPress((0, _interface.xdateToData)(day));
      }
    }
  }, {
    key: 'renderReservations',
    value: function renderReservations() {
      var _this5 = this;

      return _react2.default.createElement(_reservationList2.default, {
        rowHasChanged: this.props.rowHasChanged,
        renderItem: this.props.renderItem,
        renderDay: this.props.renderDay,
        renderEmptyDate: this.props.renderEmptyDate,
        reservations: this.props.items,
        selectedDay: this.state.selectedDay,
        renderEmptyData: this.props.renderEmptyData,
        topDay: this.state.topDay,
        onDayChange: this.onDayChange.bind(this),
        onScroll: function onScroll() {},
        ref: function ref(c) {
          return _this5.list = c;
        },
        theme: this.props.theme
      });
    }
  }, {
    key: 'onDayChange',
    value: function onDayChange(day) {
      var newDate = (0, _interface.parseDate)(day);
      var withAnimation = _dateutils2.default.sameMonth(newDate, this.state.selectedDay);
      this.calendar.scrollToDay(day, this.calendarOffset(), withAnimation);
      this.setState({
        selectedDay: (0, _interface.parseDate)(day)
      });

      if (this.props.onDayChange) {
        this.props.onDayChange((0, _interface.xdateToData)(newDate));
      }
    }
  }, {
    key: 'generateMarkings',
    value: function generateMarkings() {
      var _this6 = this;

      var markings = this.props.markedDates;
      if (!markings) {
        markings = {};
        Object.keys(this.props.items || {}).forEach(function (key) {
          if (_this6.props.items[key] && _this6.props.items[key].length) {
            markings[key] = { marked: true };
          }
        });
      }
      var key = this.state.selectedDay.toString('yyyy-MM-dd');
      return _extends({}, markings, _defineProperty({}, key, _extends({}, markings[key] || {}, { selected: true })));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var agendaHeight = Math.max(0, this.viewHeight - HEADER_HEIGHT);
      var weekDaysNames = _dateutils2.default.weekDayNames(this.props.firstDay);
      var weekdaysStyle = [this.styles.weekdays, {
        opacity: this.state.scrollY.interpolate({
          inputRange: [agendaHeight - HEADER_HEIGHT, agendaHeight],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        }),
        transform: [{ translateY: this.state.scrollY.interpolate({
            inputRange: [Math.max(0, agendaHeight - HEADER_HEIGHT), agendaHeight],
            outputRange: [-HEADER_HEIGHT, 0],
            extrapolate: 'clamp'
          }) }]
      }];

      var headerTranslate = this.state.scrollY.interpolate({
        inputRange: [0, agendaHeight],
        outputRange: [agendaHeight, 0],
        extrapolate: 'clamp'
      });

      var contentTranslate = this.state.scrollY.interpolate({
        inputRange: [0, agendaHeight],
        outputRange: [0, agendaHeight / 2],
        extrapolate: 'clamp'
      });

      var headerStyle = [this.styles.header, { bottom: agendaHeight, transform: [{ translateY: headerTranslate }] }];

      if (!this.state.calendarIsReady) {
        // limit header height until everything is setup for calendar dragging
        headerStyle.push({ height: 0 });
        // fill header with appStyle.calendarBackground background to reduce flickering
        weekdaysStyle.push({ height: HEADER_HEIGHT });
      }

      var shouldAllowDragging = !this.props.hideKnob && !this.state.calendarScrollable;
      var scrollPadPosition = (shouldAllowDragging ? HEADER_HEIGHT : 0) - KNOB_HEIGHT;

      var scrollPadStyle = {
        position: 'absolute',
        width: 80,
        height: KNOB_HEIGHT,
        top: scrollPadPosition,
        left: (this.viewWidth - 80) / 2
      };

      var knob = _react2.default.createElement(_reactNative.View, { style: this.styles.knobContainer });

      if (!this.props.hideKnob) {
        var knobView = this.props.renderKnob ? this.props.renderKnob() : _react2.default.createElement(_reactNative.View, { style: this.styles.knob });
        knob = this.state.calendarScrollable ? null : _react2.default.createElement(
          _reactNative.View,
          { style: this.styles.knobContainer },
          _react2.default.createElement(
            _reactNative.View,
            { ref: function ref(c) {
                return _this7.knob = c;
              } },
            knobView
          )
        );
      }

      return _react2.default.createElement(
        _reactNative.View,
        { onLayout: this.onLayout, style: [this.props.style, { flex: 1, overflow: 'hidden' }] },
        _react2.default.createElement(
          _reactNative.View,
          { style: this.styles.reservations },
          this.renderReservations()
        ),
        _react2.default.createElement(
          _reactNative.Animated.View,
          { style: headerStyle },
          _react2.default.createElement(
            _reactNative.Animated.View,
            { style: { flex: 1, transform: [{ translateY: contentTranslate }] } },
            _react2.default.createElement(_calendarList2.default, {
              theme: this.props.theme,
              onVisibleMonthsChange: this.onVisibleMonthsChange.bind(this),
              ref: function ref(c) {
                return _this7.calendar = c;
              },
              minDate: this.props.minDate,
              maxDate: this.props.maxDate,
              current: this.currentMonth,
              markedDates: this.generateMarkings(),
              markingType: this.props.markingType,
              onDayPress: this._chooseDayFromCalendar.bind(this),
              scrollingEnabled: this.state.calendarScrollable,
              hideExtraDays: this.state.calendarScrollable,
              firstDay: this.props.firstDay,
              monthFormat: this.props.monthFormat,
              pastScrollRange: this.props.pastScrollRange,
              futureScrollRange: this.props.futureScrollRange,
              dayComponent: this.props.dayComponent,
              disabledByDefault: this.props.disabledByDefault
            })
          ),
          knob
        ),
        _react2.default.createElement(
          _reactNative.Animated.View,
          { style: weekdaysStyle },
          weekDaysNames.map(function (day) {
            return _react2.default.createElement(
              _reactNative.Text,
              { allowFontScaling: false, key: day, style: _this7.styles.weekday, numberOfLines: 1 },
              day
            );
          })
        ),
        _react2.default.createElement(
          _reactNative.Animated.ScrollView,
          {
            ref: function ref(c) {
              return _this7.scrollPad = c;
            },
            overScrollMode: 'never',
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            style: scrollPadStyle,
            scrollEventThrottle: 1,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
            onScrollBeginDrag: this.onStartDrag,
            onScrollEndDrag: this.onSnapAfterDrag,
            onScroll: _reactNative.Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: true })
          },
          _react2.default.createElement(_reactNative.View, { style: { height: agendaHeight + KNOB_HEIGHT }, onLayout: this.onScrollPadLayout })
        )
      );
    }
  }]);

  return AgendaView;
}(_react.Component);

AgendaView.propTypes = {
  // Specify theme properties to override specific styles for calendar parts. Default = {}
  theme: _propTypes2.default.object,

  // agenda container style
  style: viewPropTypes.style,

  // the list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items: _propTypes2.default.object,

  // callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth: _propTypes2.default.func,
  // callback that fires when the calendar is opened or closed
  onCalendarToggled: _propTypes2.default.func,
  // callback that gets called on day press
  onDayPress: _propTypes2.default.func,
  // callback that gets called when day changes while scrolling agenda list
  onDaychange: _propTypes2.default.func,
  // specify how each item should be rendered in agenda
  renderItem: _propTypes2.default.func,
  // specify how each date should be rendered. day can be undefined if the item is not first in that day.
  renderDay: _propTypes2.default.func,
  // specify how agenda knob should look like
  renderKnob: _propTypes2.default.func,
  // specify how empty date content with no items should be rendered
  renderEmptyDay: _propTypes2.default.func,
  // specify what should be rendered instead of ActivityIndicator
  renderEmptyData: _propTypes2.default.func,
  // specify your item comparison function for increased performance
  rowHasChanged: _propTypes2.default.func,

  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange: _propTypes2.default.number,

  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange: _propTypes2.default.number,

  // initially selected day
  selected: _propTypes2.default.any,
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate: _propTypes2.default.any,
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate: _propTypes2.default.any,

  // Collection of dates that have to be marked. Default = items
  markedDates: _propTypes2.default.object,
  // Optional marking type if custom markedDates are provided
  markingType: _propTypes2.default.string,

  // Hide knob button. Default = false
  hideKnob: _propTypes2.default.bool,
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat: _propTypes2.default.string
};
exports.default = AgendaView;