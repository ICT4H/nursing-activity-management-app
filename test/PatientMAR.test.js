import React from 'react';
import PatientMAR from '../src/PatientMAR';
import renderer from 'react-test-renderer';
import {patientDetails} from "../src/dummyData";

import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import NewSchedulePopup from "../src/NewSchedulePopup";
import WeekControl from "../src/WeekControl";
import WeeklyTable from "../src/WeeklyTable";
import moment from "moment";

configure({adapter: new Adapter()});


let component;
let tree;

beforeEach(() => {
  component = renderer.create(
      <PatientMAR patient={patientDetails} today={new Date("June 14, 2018 02:30:00")}/>,
  );
  tree = component.toJSON();

});

describe('PatientMAR', () => {
  test('Should have NewSchedulePopup with having patient as property', () => {
    expect(component.root.findByType(NewSchedulePopup).props.patient).toBe(patientDetails);
  });

  test('Should have WeekControl component with having property currentWeek', () => {
    expect(component.root.findByType(WeekControl).props.currentWeek);
  });

  test('Should have WeeklyTable component with having property currentWeek and currentWeekData', () => {
    expect(component.root.findByType(WeeklyTable).props.currentWeek);
    expect(component.root.findByType(WeeklyTable).props.currentWeekData);
  });

  test('Should change starting and ending dates of currentWeek on click of pastWeek button(button with symbol "<")', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);
    let pastWeekButton = component.find('button').find(".pastWeek");
    pastWeekButton.simulate('click');
    let expectedStartingDate = moment(sampleDate).day(-7).toDate();
    let expectedEndingDate = moment(sampleDate).day(-1).toDate();
    expect(component.state('currentWeek')).toEqual({
      startingDate: expectedStartingDate,
      endingDate: expectedEndingDate
    });
  });

  test('Should change starting and ending dates of currentWeek on click of nextWeek button(button with symbol ">")', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);
    let pastWeekButton = component.find('button').find(".nextWeek");
    pastWeekButton.simulate('click');
    let expectedStartingDate = moment(sampleDate).day(7).toDate();
    let expectedEndingDate = moment(sampleDate).day(13).toDate();
    expect(component.state('currentWeek')).toEqual({
      startingDate: expectedStartingDate,
      endingDate: expectedEndingDate
    });
  });
});