import DateUtils from "../../src/utils/DateUtils";

describe('DateUtils', () => {
  describe('getFormattedDate', () => {
    it('should get given date in "YYYY-MM-DD" format', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let result = DateUtils.getFormattedDate(sampleDate);
      expect(result).toEqual('2018-06-09');
    });
  });
  describe('isInBetween', () => {
    it('should give false when given date is before fromDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const dateBefore = new Date("June 8, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = DateUtils.isInBetween(dateBefore, fromDate, toDate);
      expect(result).toBe(false);
    });
    it('should give true when given date is same as fromDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = DateUtils.isInBetween(fromDate, fromDate, toDate);
      expect(result).toBe(true);
    });
    it('should give true when given date is after fromDate and before toDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const dateBetween = new Date("June 10, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = DateUtils.isInBetween(dateBetween, fromDate, toDate);
      expect(result).toBe(true);
    });
    it('should give true when given date is same as toDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = DateUtils.isInBetween(toDate, fromDate, toDate);
      expect(result).toBe(true);
    });
    it('should give false when given date is after toDate', function () {
      const fromDate = new Date("June 9, 2018 02:30:00");
      const dateAfter = new Date("June 12, 2018 02:30:00");
      const toDate = new Date("June 11, 2018 02:30:00");
      let result = DateUtils.isInBetween(dateAfter, fromDate, toDate);
      expect(result).toBe(false);
    });
  });
  describe('addDays', () => {
    it('should get next date when asked to add 1 day in given date', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let nextDate = new Date("June 10, 2018 02:30:00");
      let result = DateUtils.addDays(sampleDate, 1);
      expect(result).toEqual(nextDate);
    });
    it('should get next to next date when asked to add 2 days in given date', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let nextDate = new Date("June 11, 2018 02:30:00");
      let result = DateUtils.addDays(sampleDate, 2);
      expect(result).toEqual(nextDate);
    });
    it('should get date of N days after given date when asked to N days in given date', function () {
      let sampleDate = new Date("June 9, 2018 02:30:00");
      let nextDate = new Date("June 14, 2018 02:30:00");
      let result = DateUtils.addDays(sampleDate, 5);
      expect(result).toEqual(nextDate);
    });
  });
  describe('getPastWeekStatingAndEndingDates', () => {
    it('should give dates from past week assuming given date as starting date of this week', function () {
      let thisWeekStartingDate = new Date("June 15, 2018 02:30:00");
      let pastWeekStartingDate = new Date("June 8, 2018 02:30:00");
      let pastWeekEndingDate = new Date("June 14, 2018 02:30:00");
      let pastWeek = {startingDate:pastWeekStartingDate,endingDate:pastWeekEndingDate};
      let result = DateUtils.getPastWeekStatingAndEndingDates(thisWeekStartingDate);
      expect(result).toEqual(pastWeek);
    })
  });
  describe('getNextWeekStatingAndEndingDates', () => {
    it('should give dates from next week assuming given date as starting date of this week', function () {
      let thisWeekStartingDate = new Date("June 8, 2018 02:30:00");
      let nextWeekStartingDate = new Date("June 15, 2018 02:30:00");
      let nextWeekEndingDate = new Date("June 21, 2018 02:30:00");
      let nextWeek = {startingDate:nextWeekStartingDate,endingDate:nextWeekEndingDate};
      let result = DateUtils.getNextWeekStatingAndEndingDates(thisWeekStartingDate);
      expect(result).toEqual(nextWeek);
    })
  });
  describe('formatWeekStartEndDate', () => {
    it('should give dates from givenWeek(consist starting and ending dates)', function () {
      let thisWeekStartingDate = new Date("June 8, 2018 02:30:00");
      let thisWeekEndingDate = new Date("June 14, 2018 02:30:00");
      const givenWeek = {startingDate:thisWeekStartingDate,endingDate:thisWeekEndingDate};
      let result = DateUtils.formatWeekStartEndDate(givenWeek);
      expect(result).toEqual("8 Jun - 14 Jun");
    })
  });
  describe('getDateAndDay', () => {
    it('should give date with only month and day of week for given date', function () {
      let sampleDate = new Date("July 9, 2018 02:30:00");
      let result = DateUtils.getDateAndDay(sampleDate);
      expect(result).toEqual("9 Jul, Mon");
    })
  })
});
