import React from 'react';
import ReactTable from 'react-table';
import PatientMAR from '../../src/components/PatientMAR';
import renderer from 'react-test-renderer';
import NewSchedulePopup from "../../src/components/NewSchedulePopup";
import WeekControl from "../../src/components/WeekControl";
import {initialEmptyMedicine, patientDetails} from "../../src/Data/dummyData";
import {mount} from "enzyme";
import DateUtils from "../../src/utils/DateUtils";

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

  test('Should change starting and ending dates of currentWeek on click of goToPastWeek button(button with symbol "<")', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);
    component.setState({currentWeek:{startingDate:sampleDate}});
    let pastWeekButton = component.find('button').find(".pastWeek");
    pastWeekButton.simulate('click');
    expect(component.state('currentWeek')).toEqual(DateUtils.getPastWeekStatingAndEndingDates(sampleDate));
  });

  test('Should change starting and ending dates of currentWeek on click of goToNextWeek button(button with symbol ">")', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);
    component.setState({currentWeek:{startingDate:sampleDate}});
    let nextWeekButton = component.find('button').find(".nextWeek");
    nextWeekButton.simulate('click');
    expect(component.state('currentWeek')).toEqual(DateUtils.getNextWeekStatingAndEndingDates(sampleDate));
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
