import {addDays, getFormattedDate, isInBetween} from "../../src/utils/DateUtils";

describe('DateUtils', () => {
  describe('getFormattedDate', () => {
    it('should get given date in "YYYY-MM-DD" format', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let result = getFormattedDate(sampleDate);
      expect(result).toEqual('2018-06-09');
    });
  });
  describe('isInBetween', () => {
    it('should give false when given date is before fromDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const dateBefore = new Date("June 8, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = isInBetween(dateBefore, fromDate, toDate);
      expect(result).toBe(false);
    });
    it('should give true when given date is same as fromDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = isInBetween(fromDate, fromDate, toDate);
      expect(result).toBe(true);
    });
    it('should give true when given date is after fromDate and before toDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const dateBetween = new Date("June 10, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = isInBetween(dateBetween, fromDate, toDate);
      expect(result).toBe(true);
    });
    it('should give true when given date is same as toDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = isInBetween(toDate, fromDate, toDate);
      expect(result).toBe(true);
    });
    it('should give false when given date is after toDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const dateAfter = new Date("June 12, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = isInBetween(dateAfter, fromDate, toDate);
      expect(result).toBe(false);
    });
  });
  describe('addDays', () => {
    it('should get next date when asked to add 1 day in given date', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let nextDate = new Date("June 10, 2018 02:30:00");
      let result = addDays(sampleDate,1);
      expect(result).toEqual(nextDate);
    });
    it('should get next to next date when asked to add 2 days in given date', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let nextDate = new Date("June 11, 2018 02:30:00");
      let result = addDays(sampleDate,2);
      expect(result).toEqual(nextDate);
    });
    it('should get date of N days after given date when asked to N days in given date', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let nextDate = new Date("June 14, 2018 02:30:00");
      let result = addDays(sampleDate,5);
      expect(result).toEqual(nextDate);
    });
  });
});