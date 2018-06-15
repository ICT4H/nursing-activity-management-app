import React from 'react';
import PatientMAR from '../src/PatientMAR';
import renderer from 'react-test-renderer';
import {patientDetails} from "../src/dummyData";
import NewSchedulePopup from "../src/NewSchedulePopup";
import WeekControl from "../src/WeekControl";
import WeeklyTable from "../src/WeeklyTable";

let component;
let tree;

beforeEach(() => {
  component = renderer.create(
      <PatientMAR patient={patientDetails} today={new Date("June 14, 2018 02:30:00")}/>,
  );
  tree = component.toJSON();

});

test('Should have NewSchedulePopup with having patient as property', () => {
  expect(component.root.findByType(NewSchedulePopup).props.patient).toBe(patientDetails);
  expect(tree).toMatchSnapshot();
});

test('Should have WeekControl component with having property currentWeek', () => {
  expect(component.root.findByType(WeekControl).props.currentWeek);
  expect(tree).toMatchSnapshot();
});

test('Should have WeeklyTable component with having property currentWeek and currentWeekData', () => {
  expect(component.root.findByType(WeeklyTable).props.currentWeek);
  expect(component.root.findByType(WeeklyTable).props.currentWeekData);
  expect(tree).toMatchSnapshot();
});