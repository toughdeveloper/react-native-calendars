'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getStyle;

var _reactNative = require('react-native');

var _style = require('../style');

var defaultStyle = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var STYLESHEET_ID = 'stylesheet.calendar-list.main';

function getStyle() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var appStyle = _extends({}, defaultStyle, theme);
  return _reactNative.StyleSheet.create(_extends({
    container: {
      backgroundColor: appStyle.calendarBackground
    },
    placeholder: {
      backgroundColor: appStyle.calendarBackground,
      alignItems: 'center',
      justifyContent: 'center'
    },
    placeholderText: {
      fontSize: 30,
      fontWeight: '200',
      color: appStyle.dayTextColor
    },
    calendar: {
      paddingLeft: 15,
      paddingRight: 15
    }
  }, theme[STYLESHEET_ID] || {}));
}