import React from "react";

const defaultScheduleFormatter=function(schedule) {
  return <p>{schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes()}</p>;
};
export {defaultScheduleFormatter}