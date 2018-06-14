import React from 'react';
import PatientMAR from '../PatientMAR';
import renderer from 'react-test-renderer';
import {patientDetails} from "../dummyData";
import NewSchedulePopup from "../NewSchedulePopup";
import WeekControl from "../WeekControl";
import WeeklyTable from "../WeeklyTable";

test('Should have NewSchedulePopup with having patient as property', () => {
  const component = renderer.create(
      <PatientMAR patient={patientDetails}/>,
  );
  let tree = component.toJSON();
  expect(component.root.findByType(NewSchedulePopup).props.patient).toBe(patientDetails);
  expect(tree).toMatchSnapshot();
});

test('Should have WeekControl component with having property currentWeek', () => {
  const component = renderer.create(
      <PatientMAR patient={patientDetails}/>,
  );
  let tree = component.toJSON();
  expect(component.root.findByType(WeekControl).props.currentWeek);
  expect(tree).toMatchSnapshot();
});

test('Should have WeeklyTable component with having property currentWeek and currentWeekData', () => {
  const component = renderer.create(
      <PatientMAR patient={patientDetails}/>,
  );
  let tree = component.toJSON();
  expect(component.root.findByType(WeeklyTable).props.currentWeek);
  expect(component.root.findByType(WeeklyTable).props.currentWeekData);
  expect(tree).toMatchSnapshot();
});