import React from 'react';
import ScheduleFormatter from '../src/ScheduleFormatter';
import {mount} from "enzyme";
import {ADMINISTRATED, NOTADMINISTRATED, SYMBOLSHEXCODE, TOBEADMINISTRATED} from "../src/constants";

test('Should have time of given schedule', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00")};
  const component = mount(
      <ScheduleFormatter schedule={schedule}/>,
  );
  expect(component.findWhere(element=>element.hasClass("scheduleTime")).text()).toBe("2:30 AM");
});

test('Should have symbol of clock when schedule status is to be administered', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00"),status:TOBEADMINISTRATED};
  const component = mount(
      <ScheduleFormatter schedule={schedule}/>,
  );
  const clockSymbol = String.fromCharCode(SYMBOLSHEXCODE.TOBEADMINISTRATED);
  expect(component.findWhere(element=>element.hasClass("scheduleStatus")).text()).toBe(clockSymbol);
});

test('Should have symbol of danger when schedule status is not administrated', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00"),status:NOTADMINISTRATED};
  const component = mount(
      <ScheduleFormatter schedule={schedule}/>,
  );
  const clockSymbol = String.fromCharCode(SYMBOLSHEXCODE.NOTADMINISTRATED);
  expect(component.findWhere(element=>element.hasClass("scheduleStatus")).text()).toBe(clockSymbol);
});

test('Should have symbol of checkMark when schedule status is to be administered', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00"),status:ADMINISTRATED};
  const component = mount(
      <ScheduleFormatter schedule={schedule}/>,
  );
  const clockSymbol = String.fromCharCode(SYMBOLSHEXCODE.ADMINISTRATED);
  expect(component.findWhere(element=>element.hasClass("scheduleStatus")).text()).toBe(clockSymbol);
});