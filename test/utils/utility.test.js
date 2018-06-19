import {defaultScheduleFormatter} from "../../src/utils/utility";
import React from "react";

it('should ', function () {
  let schedule={
    scheduledTime:new Date("June 8, 2018 2:30:00")
  };
  let result=defaultScheduleFormatter(schedule);
  expect(result).toEqual(<p>2:30</p>)
});