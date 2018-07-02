import React from "react";
import { BID, QD, QID, QOD, TID } from "../constants";

const defaultScheduleFormatter = function (schedule) {
  return <p>{schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes()}</p>;
};

const getResultantObject = function (objectToMergeWith, changeInObject) {
  return Object.assign({}, objectToMergeWith, changeInObject);
};

const mapFrequencyToNumber = function (frequency) {
  let frequencyNumberMapping = {
    [QD]: 1, [QOD]: 1, [BID]: 2, [TID]: 3, [QID]: 4
  };
  return frequencyNumberMapping[frequency] || 0;
};
import { isSameDate } from "./DateUtils";
const getSchedulesOf = function (date, schedules) {
  return schedules.filter(schedule => {
    return isSameDate(date, schedule.scheduledTime)
  });
}
export { defaultScheduleFormatter, getResultantObject, mapFrequencyToNumber, getSchedulesOf }