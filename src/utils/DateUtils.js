import moment from "moment";

const getFormattedDate = function (date) {
  return moment(date).format('YYYY-MM-DD');
};
const isInBetween = function (date, from, to) {
  return moment(date).isBetween(from, to,null,'[]');
};
const addDays = function (date, noOfDays) {
  return moment(date).add(noOfDays, 'days').toDate();
};
export {getFormattedDate, isInBetween, addDays}