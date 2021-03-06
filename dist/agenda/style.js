'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = styleConstructor;

var _reactNative = require('react-native');

var _style = require('../style');

var defaultStyle = _interopRequireWildcard(_style);

var _platformStyle = require('./platform-style');

var _platformStyle2 = _interopRequireDefault(_platformStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var STYLESHEET_ID = 'stylesheet.agenda.main';

function styleConstructor() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var appStyle = _extends({}, defaultStyle, theme);

  var _platformStyles = (0, _platformStyle2.default)(appStyle),
      knob = _platformStyles.knob,
      weekdays = _platformStyles.weekdays;

  return _reactNative.StyleSheet.create(_extends({
    knob: knob,
    weekdays: weekdays,
    header: {
      overflow: 'hidden',
      justifyContent: 'flex-end',
      position: 'absolute',
      height: '100%',
      width: '100%'
    },
    calendar: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: appStyle.separatorColor
    },
    knobContainer: {
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      height: 24,
      bottom: 0,
      alignItems: 'center',
      backgroundColor: appStyle.calendarBackground
    },
    weekday: {
      width: 32,
      textAlign: 'center',
      fontSize: 13,
      color: appStyle.textSectionTitleColor
    },
    reservations: {
      flex: 1,
      marginTop: 104,
      backgroundColor: appStyle.backgroundColor
    }
  }, theme[STYLESHEET_ID] || {}));
}