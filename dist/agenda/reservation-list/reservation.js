import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { xdateToData } from '../../interface';
import XDate from 'xdate';
import dateutils from '../../dateutils';
import styleConstructor from './style';

class ReservationListItem extends Component {
  constructor(props) {
    super(props);
    this.styles = styleConstructor(props.theme);
  }

  shouldComponentUpdate(nextProps) {
    const r1 = this.props.item;
    const r2 = nextProps.item;
    let changed = true;
    if (!r1 && !r2) {
      changed = false;
    } else if (r1 && r2) {
      if (r1.day.getTime() !== r2.day.getTime()) {
        changed = true;
      } else if (!r1.reservation && !r2.reservation) {
        changed = false;
      } else if (r1.reservation && r2.reservation) {
        if (!r1.date && !r2.date || r1.date && r2.date) {
          changed = this.props.rowHasChanged(r1.reservation, r2.reservation);
        }
      }
    }
    return changed;
  }

  renderDate(date, item) {
    if (this.props.renderDay) {
      return this.props.renderDay(date ? xdateToData(date) : undefined, item);
    }
    const today = dateutils.sameDate(date, XDate()) ? this.styles.today : undefined;
    if (date) {
      return React.createElement(
        View,
        { style: this.styles.day },
        React.createElement(
          Text,
          { allowFontScaling: false, style: [this.styles.dayNum, today] },
          date.getDate()
        ),
        React.createElement(
          Text,
          { allowFontScaling: false, style: [this.styles.dayText, today] },
          XDate.locales[XDate.defaultLocale].dayNamesShort[date.getDay()]
        )
      );
    } else {
      return React.createElement(View, { style: this.styles.day });
    }
  }

  render() {
    const { reservation, date } = this.props.item;
    let content;
    if (reservation) {
      const firstItem = date ? true : false;
      content = this.props.renderItem(reservation, firstItem);
    } else {
      content = this.props.renderEmptyDate(date);
    }
    return React.createElement(
      View,
      { style: this.styles.container },
      this.renderDate(date, reservation),
      React.createElement(
        View,
        { style: { flex: 1 } },
        content
      )
    );
  }
}

export default ReservationListItem;