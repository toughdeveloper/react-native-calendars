'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agendaKnobColor = exports.agendaTodayColor = exports.agendaDayNumColor = exports.agendaDayTextColor = exports.monthTextColor = exports.arrowColor = exports.selectedDotColor = exports.dotColor = exports.textDisabledColor = exports.dayTextColor = exports.todayTextColor = exports.selectedDayTextColor = exports.selectedDayBackgroundColor = exports.textSectionTitleColor = exports.calendarBackground = exports.textDayHeaderFontSize = exports.textMonthFontSize = exports.textDayFontSize = exports.textDayHeaderFontFamily = exports.textMonthFontFamily = exports.textDayFontFamily = exports.textSecondaryColor = exports.textLinkColor = exports.textColor = exports.textDefaultColor = exports.failedColor = exports.processingColor = exports.processedColor = exports.separatorColor = exports.backgroundColor = exports.foregroundColor = undefined;

var _reactNative = require('react-native');

var foregroundColor = exports.foregroundColor = '#ffffff';
var backgroundColor = exports.backgroundColor = '#f4f4f4';
var separatorColor = exports.separatorColor = '#e8e9ec';

var processedColor = exports.processedColor = '#a7e0a3';
var processingColor = exports.processingColor = '#ffce5c';
var failedColor = exports.failedColor = 'rgba(246, 126, 126,1)';

var textDefaultColor = exports.textDefaultColor = '#2d4150';
var textColor = exports.textColor = '#43515c';
var textLinkColor = exports.textLinkColor = '#00adf5';
var textSecondaryColor = exports.textSecondaryColor = '#7a92a5';

var textDayFontFamily = exports.textDayFontFamily = 'System';
var textMonthFontFamily = exports.textMonthFontFamily = 'System';
var textDayHeaderFontFamily = exports.textDayHeaderFontFamily = 'System';

var textDayFontSize = exports.textDayFontSize = 16;
var textMonthFontSize = exports.textMonthFontSize = 16;
var textDayHeaderFontSize = exports.textDayHeaderFontSize = 13;

var calendarBackground = exports.calendarBackground = foregroundColor;
var textSectionTitleColor = exports.textSectionTitleColor = '#b6c1cd';
var selectedDayBackgroundColor = exports.selectedDayBackgroundColor = textLinkColor;
var selectedDayTextColor = exports.selectedDayTextColor = foregroundColor;
var todayTextColor = exports.todayTextColor = textLinkColor;
var dayTextColor = exports.dayTextColor = textDefaultColor;
var textDisabledColor = exports.textDisabledColor = '#d9e1e8';
var dotColor = exports.dotColor = textLinkColor;
var selectedDotColor = exports.selectedDotColor = foregroundColor;
var arrowColor = exports.arrowColor = textLinkColor;
var monthTextColor = exports.monthTextColor = textDefaultColor;
var agendaDayTextColor = exports.agendaDayTextColor = '#7a92a5';
var agendaDayNumColor = exports.agendaDayNumColor = '#7a92a5';
var agendaTodayColor = exports.agendaTodayColor = textLinkColor;
var agendaKnobColor = exports.agendaKnobColor = _reactNative.Platform.OS === 'ios' ? '#f2F4f5' : '#4ac4f7';