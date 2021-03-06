'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldComponentUpdate;

var _interface = require('../interface');

function shouldComponentUpdate(nextProps, nextState) {
  var _this = this;

  var shouldUpdate = (nextProps.selected || []).reduce(function (prev, next, i) {
    var currentSelected = (_this.props.selected || [])[i];
    if (!currentSelected || !next || (0, _interface.parseDate)(currentSelected).getTime() !== (0, _interface.parseDate)(next).getTime()) {
      return {
        update: true,
        field: 'selected'
      };
    }
    return prev;
  }, { update: false });

  shouldUpdate = ['markedDates', 'hideExtraDays'].reduce(function (prev, next) {
    if (!prev.update && nextProps[next] !== _this.props[next]) {
      return {
        update: true,
        field: next
      };
    }
    return prev;
  }, shouldUpdate);

  shouldUpdate = ['minDate', 'maxDate', 'current'].reduce(function (prev, next) {
    var prevDate = (0, _interface.parseDate)(_this.props[next]);
    var nextDate = (0, _interface.parseDate)(nextProps[next]);
    if (prev.update) {
      return prev;
    } else if (prevDate !== nextDate) {
      if (prevDate && nextDate && prevDate.getTime() === nextDate.getTime()) {
        return prev;
      } else {
        return {
          update: true,
          field: next
        };
      }
    }
    return prev;
  }, shouldUpdate);

  if (nextState.currentMonth !== this.state.currentMonth) {
    shouldUpdate = {
      update: true,
      field: 'current'
    };
  }
  //console.log(shouldUpdate.field, shouldUpdate.update);
  return shouldUpdate.update;
}