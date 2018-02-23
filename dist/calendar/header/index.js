import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import XDate from 'xdate';
import PropTypes from 'prop-types';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';

class CalendarHeader extends Component {

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.month.toString('yyyy MM') !== this.props.month.toString('yyyy MM')) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    if (nextProps.hideDayNames !== this.props.hideDayNames) {
      return true;
    }
    return false;
  }

  render() {
    let leftArrow = React.createElement(View, null);
    let rightArrow = React.createElement(View, null);
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = React.createElement(
        TouchableOpacity,
        {
          onPress: this.substractMonth,
          style: this.style.arrow
        },
        this.props.renderArrow ? this.props.renderArrow('left') : React.createElement(Image, {
          source: require('../img/previous.png'),
          style: this.style.arrowImage
        })
      );
      rightArrow = React.createElement(
        TouchableOpacity,
        { onPress: this.addMonth, style: this.style.arrow },
        this.props.renderArrow ? this.props.renderArrow('right') : React.createElement(Image, {
          source: require('../img/next.png'),
          style: this.style.arrowImage
        })
      );
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = React.createElement(ActivityIndicator, null);
    }
    return React.createElement(
      View,
      null,
      React.createElement(
        View,
        { style: this.style.header },
        leftArrow,
        React.createElement(
          View,
          { style: { flexDirection: 'row' } },
          React.createElement(
            Text,
            { allowFontScaling: false, style: this.style.monthText },
            this.props.month.toString(this.props.monthFormat ? this.props.monthFormat : 'MMMM yyyy')
          ),
          indicator
        ),
        rightArrow
      ),
      !this.props.hideDayNames && React.createElement(
        View,
        { style: this.style.week },
        this.props.weekNumbers && React.createElement(Text, { allowFontScaling: false, style: this.style.dayHeader }),
        weekDaysNames.map((day, idx) => React.createElement(
          Text,
          { allowFontScaling: false, key: idx, style: this.style.dayHeader, numberOfLines: 1 },
          day
        ))
      )
    );
  }
}

CalendarHeader.propTypes = {
  theme: PropTypes.object,
  hideArrows: PropTypes.bool,
  month: PropTypes.instanceOf(XDate),
  addMonth: PropTypes.func,
  showIndicator: PropTypes.bool,
  firstDay: PropTypes.number,
  renderArrow: PropTypes.func,
  hideDayNames: PropTypes.bool,
  weekNumbers: PropTypes.bool
};
export default CalendarHeader;