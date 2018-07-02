import React from 'react';
import ReactTable from 'react-table';
import PatientMAR from '../src/PatientMAR';
import renderer from 'react-test-renderer';
import NewSchedulePopup from "../src/NewSchedulePopup";
import WeekControl from "../src/WeekControl";
import moment from "moment";
import {initialEmptyMedicine, patientDetails} from "../src/dummyData";
import {mount} from "enzyme";

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

  test('Should have ReactTable component with having property data', () => {
    // expect(component.root.findByType(ReactTable).props.currentWeek);
    expect(component.root.findByType(ReactTable).props.data).toBeTruthy();
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

  test('Initially shallHidePopup should be true', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);

    const instanceOfPatientMAR = component.instance();

    expect(instanceOfPatientMAR.state.shallHidePopup).toBe(true);
  });

  test('Should set shallHidePopup as false when showNewSchedulePopup function is called', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);

    const instanceOfPatientMAR = component.instance();
    instanceOfPatientMAR.showNewSchedulePopup(initialEmptyMedicine);

    expect(instanceOfPatientMAR.state.shallHidePopup).toBe(false);
  });

  test('Should set shallHidePopup as true when hidePopup function is called', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);

    const instanceOfPatientMAR = component.instance();
    instanceOfPatientMAR.showNewSchedulePopup(initialEmptyMedicine);
    instanceOfPatientMAR.hidePopup();

    expect(instanceOfPatientMAR.state.shallHidePopup).toBe(true);
  });
});