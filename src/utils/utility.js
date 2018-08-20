import React from "react";
import DateUtils from "./DateUtils";
import {administrationScheduleDefinition, BID, QD, QID, QOD, TID} from "../constants";

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
    status: schedule.status,
    id: schedule.scheduleId
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

function isAlreadyScheduled(scheduledDrugs, drugOrder) {
  return scheduledDrugs.some((scheduledDrug) => {
    return drugOrder.uuid === scheduledDrug.order.uuid
  });
}

const filterScheduledDrugs = function (drugOrders, scheduledDrugs) {
  return drugOrders.filter(drugOrder => {
    return !isAlreadyScheduled(scheduledDrugs, drugOrder);
  });
};

const isWeeklyFreqType = function (frequencyString) {
  const frequency = administrationScheduleDefinition[frequencyString];
  return frequency && frequency.type === 'weekly';
};

const getNoOfDaysInWeek = function (frequencyString) {
  const frequency = administrationScheduleDefinition[frequencyString];
  return (frequency && isWeeklyFreqType(frequencyString) && frequency.numberOfTimes) || 0;
};

const getDosingTimesPerDay = function (frequencyString) {
  const frequency = administrationScheduleDefinition[frequencyString];
  return (frequency && isWeeklyFreqType(frequencyString) && frequency.dosingTimesPerDay) || 0;
};

const mapDrugOrdersToDrugs = function (drugOrders) {
  return drugOrders.map((drugOrder) => {
    return {
      order: {
        uuid: drugOrder.uuid,
        autoExpireDate: drugOrder.autoExpireDate,
        scheduledDate: drugOrder.scheduledDate,
        instructions: drugOrder.instructions,
        orderNumber: drugOrder.orderNumber
      },
      drugName: drugOrder.drug.name,
      uuid: drugOrder.drug.uuid,
      dose: drugOrder.dosingInstructions.dose,
      doseUnits: drugOrder.dosingInstructions.doseUnits,
      route: drugOrder.dosingInstructions.route,
      frequencyString: drugOrder.dosingInstructions.frequency,
      startingDate: new Date(drugOrder.scheduledDate),
      endingDate: new Date(drugOrder.autoExpireDate),
      administrationInstructions: drugOrder.dosingInstructions.administrationInstructions
    };
  });
};
export {
  defaultScheduleFormatter,
  getResultantObject,
  mapFrequencyToNumber,
  getSchedulesOf,
  groupByMedicineOrder,
  getScheduleShortDetails,
  mapScheduleToDrug,
  filterScheduledDrugs,
  mapDrugOrdersToDrugs,
  isWeeklyFreqType,
  getNoOfDaysInWeek,
  getDosingTimesPerDay
}
