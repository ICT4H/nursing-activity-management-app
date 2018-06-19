import moment from "moment";

const getFormattedDate=function (date) {
  return moment(date).format('YYYY-MM-DD');
};
export {getFormattedDate}