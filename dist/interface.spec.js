'use strict';

var iface = require('./interface');
var XDate = require('xdate');

describe('calendar interface', function () {
  describe('input', function () {
    it('should return undefined if date is undefined', function () {
      var date = iface.parseDate();
      expect(date).toBe(undefined);
    });

    it('should accept UTC timestamp as argument', function () {
      var date = iface.parseDate(1479832134398);
      expect(date.getTime()).toEqual(1479832134398);
      expect(date.getTimezoneOffset()).toEqual(0);
    });

    it('should accept datestring as argument', function () {
      var date = iface.parseDate('2012-03-16');
      expect(date.toString('yyyy-MM-dd')).toEqual('2012-03-16');
      expect(date.getTimezoneOffset()).toEqual(0);
    });

    it('should expect object with UTC timestamp as argument', function () {
      var date = iface.parseDate({ timestamp: 1479832134398 });
      expect(date.getTime()).toEqual(1479832134398);
      expect(date.getTimezoneOffset()).toEqual(0);
    });

    it('should accept XDate as argument', function () {
      var testDate = XDate('2016-11-22 00:00:00+3');
      expect(testDate.toISOString()).toEqual('2016-11-21T21:00:00Z');
      var time = 1479772800000;
      expect(XDate(time, true).toISOString()).toEqual('2016-11-22T00:00:00Z');
    });

    it('should accept Date as argument', function () {
      var testDate = new Date(2015, 5, 5, 12, 0);
      var date = iface.parseDate(testDate);
      expect(date.toString('yyyy-MM-dd')).toEqual('2015-06-05');
    });

    it('should accept data as argument', function () {
      var testDate = {
        year: 2015,
        month: 5,
        day: 6
      };
      var date = iface.parseDate(testDate);
      expect(date.toString('yyyy-MM-dd')).toEqual('2015-05-06');
    });
  });

  describe('output', function () {
    it('should convert xdate to data', function () {
      var time = 1479772800000;
      var testDate = XDate(time, true);
      expect(testDate.toISOString()).toEqual('2016-11-22T00:00:00Z');
      var data = iface.xdateToData(testDate);
      expect(data).toEqual({
        year: 2016,
        month: 11,
        day: 22,
        timestamp: 1479772800000,
        dateString: '2016-11-22'
      });
    });
  });
});