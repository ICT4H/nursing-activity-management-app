import React from "react";
import DateUtils from "./DateUtils";
import {BID, QD, QID, QOD, TID} from "../constants";

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

function getScheduleShortDetails(schedule) {
  return {
    scheduledTime: schedule.scheduledTime,
    status: schedule.status
  };
}

function mapScheduleToDrug(schedule) {
  let newDrug = schedule.drug || {};
  let scheduleDetails = getScheduleShortDetails(schedule);
  newDrug.schedules = [scheduleDetails];
  newDrug.order = schedule.order;
  return newDrug;
}

const groupByMedicineOrder = function (schedules) {
  let drugs = [];
  schedules.forEach((schedule) => {
    let medicineIndex = drugs.findIndex(drug => drug.order.uuid === schedule.order.uuid);
    if (drugs[medicineIndex]) {
      let scheduleDetails = getScheduleShortDetails(schedule);
      drugs[medicineIndex].schedules.push(scheduleDetails);
    } else {
      let newDrug = mapScheduleToDrug(schedule);
      drugs.push(newDrug)
    }
  });
  return drugs;
};
export {defaultScheduleFormatter, getResultantObject, mapFrequencyToNumber, getSchedulesOf, groupByMedicineOrder, getScheduleShortDetails, mapScheduleToDrug}
