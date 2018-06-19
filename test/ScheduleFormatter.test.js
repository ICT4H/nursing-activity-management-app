import React from 'react';
import ScheduleFormatter from '../src/ScheduleFormatter';
import {mount} from "enzyme";

test('Should have time of given schedule', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00")};
  const component = mount(
      <ScheduleFormatter schedule={schedule}/>,
  );
  expect(component.findWhere(element=>element.hasClass("scheduleTime")).text()).toBe("2:30");
});


//Need to write test for getting emoji based on schedule status