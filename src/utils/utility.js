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

const groupByMedicineOrder = function (schedules) {
  let medicines = [];
  schedules.forEach((schedule) => {
    let medicineIndex = medicines.findIndex(medicine => medicine.order.uuid === schedule.order.uuid);
    if (medicines[medicineIndex]) {
      medicines[medicineIndex].schedules.push(schedule);
    } else {
      let newMedicine = schedule.drug || {};
      newMedicine.order = schedule.order;
      newMedicine.schedules = [schedule];
      medicines.push(newMedicine)
    }
  });
  return medicines;
};
export {defaultScheduleFormatter, getResultantObject, mapFrequencyToNumber, getSchedulesOf, groupByMedicineOrder}
