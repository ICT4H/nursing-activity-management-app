import moment from "moment";
import AppDescriptor from "../AppDescriptor";

class DateUtils {
  static getFormattedDate(date) {
    return moment(date).format('YYYY-MM-DD');
  };

  static isInBetween(date, from, to) {
    return moment(date).isBetween(from, to, null, '[]');
  };

  static addDays(date, noOfDays) {
    return moment(date).add(noOfDays, 'days').toDate();
  };

  static isSameDate(date, anotherDate) {
    let firstDate = this.getFormattedDate(date);
    let secondDate = this.getFormattedDate(anotherDate);
    return moment(firstDate).isSame(secondDate);
  };

  static formatTime (date) {
    return moment(date).format("h:mm A");
  }

  static getPastWeekStatingAndEndingDates(givenDate){
    let week = {};
    week.startingDate = moment(givenDate).add(-7, "days").toDate();
    week.endingDate = moment(givenDate).add(-1, "days").toDate();
    return week;
  }

  static getNextWeekStatingAndEndingDates(givenDate) {
    let week = {};
    week.startingDate = moment(givenDate).add(7, "days").toDate();
    week.endingDate = moment(givenDate).add(13, "days").toDate();
    return week;
  }

  static getWeekStatingAndEndingDates (givenDate) {
    let week = {};
    let startOfWeek = AppDescriptor.getStartWeekConfig() || 2;
    let startingDate = moment(givenDate).day(startOfWeek-1);
    //TODO:Test this logic and in case of startOfWeek is 7 or greater or blank it should fall back to default which is monday here
    if (moment(startingDate).isAfter(givenDate)) {
      startingDate = moment(givenDate).day(startOfWeek-7);
    }
    week.startingDate = startingDate.toDate();
    week.endingDate = moment(startingDate).add(6, "days").toDate();
    return week;
  };

  static formatWeekStartEndDate(givenWeek) {
    return moment(givenWeek.startingDate).format('D MMM')+" - "+moment(givenWeek.endingDate).format('D MMM');
  }

  static getDateAndDay(date) {
    return moment(date).format('D MMM, ddd');
  }
}

export default DateUtils;
