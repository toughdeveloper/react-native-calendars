'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = styleConstructor;

var _reactNative = require('react-native');

var _style = require('../../style');

var defaultStyle = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var STYLESHEET_ID = 'stylesheet.agenda.list';

function styleConstructor() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var appStyle = _extends({}, defaultStyle, theme);
  return _reactNative.StyleSheet.create(_extends({
    container: {
      flexDirection: 'row'
    },
    dayNum: {
      fontSize: 28,
      fontWeight: '200',
      color: appStyle.agendaDayNumColor
    },
    dayText: {
      fontSize: 14,
      fontWeight: '300',
      color: appStyle.agendaDayTextColor,
      marginTop: -5,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    day: {
      width: 63,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 32
    },
    today: {
      color: appStyle.agendaTodayColor
    }
  }, theme[STYLESHEET_ID] || {}));
}