import React from "react";
import DateUtils from "./DateUtils";
import {QD, QOD, BID, TID, QID} from "../constants";

const defaultScheduleFormatter = function (schedule) {
  return <p>{DateUtils.formatTime(schedule.scheduledTime)}</p>;
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
const getSchedulesOf = function (date, schedules) {
  return schedules.filter(schedule => {
    return DateUtils.isSameDate(date, schedule.scheduledTime)
  });
};
export {defaultScheduleFormatter, getResultantObject, mapFrequencyToNumber, getSchedulesOf}
