import React from "react";

const defaultScheduleFormatter = function (schedule) {
  return <p>{schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes()}</p>;
};

const getResultantObject = function (objectToMergeWith, changeInObject) {
  return Object.assign({}, objectToMergeWith, changeInObject);
};
export {defaultScheduleFormatter, getResultantObject}