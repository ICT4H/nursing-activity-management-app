import React from 'react';
import ReactTable from 'react-table';
import PatientMAR from '../../src/components/PatientMAR';
import NewSchedulePopup from "../../src/components/NewSchedulePopup";
import WeekControl from "../../src/components/WeekControl";
import {initialEmptyDrug, patientDetails} from "../../src/data/dummyData";
import {mount} from "enzyme";
import DateUtils from "../../src/utils/DateUtils";

let component;
let today;

beforeEach(() => {
  jest.clearAllMocks();
  jest.mock('whatwg-fetch');
  today = new Date("June 14, 2018 02:30:00");
  component = mount(
      <PatientMAR patient={patientDetails} today={today}/>,
  );
  component.setState({
    patient: patientDetails, currentWeekData: {
      schedules: [],
      newDrugs: []
    }
  });
});

describe('PatientMAR', () => {
  test('Should have NewSchedulePopup with having patient as property', () => {
    expect(component.find('NewSchedulePopup').prop('patient')).toBe(patientDetails.person);
  });

  test('Should have WeekControl component with having property currentWeek', () => {
    expect(component.find('WeekControl').prop('currentWeek'));
  });

  test('Should have ReactTable component with having property data', () => {
    // expect(component.find('ReactTable').props.currentWeek);
    expect(component.find('ReactTable').prop('data')).toBeTruthy();
  });

  test('Should have Headers component with having property patient and today (date)', () => {
    expect(component.find('Headers').prop('today')).toEqual(today);
    expect(component.find('Headers').prop('patient')).toEqual(patientDetails.person);
  });

  test('Should change starting and ending dates of currentWeek on click of goToPastWeek button(button with symbol "<")', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);
    component.setState({currentWeek: {startingDate: sampleDate}});
    let pastWeekButton = component.find('button').find(".pastWeek");
    pastWeekButton.simulate('click');
    expect(component.state('currentWeek')).toEqual(DateUtils.getPastWeekStatingAndEndingDates(sampleDate));
  });

  test('Should change starting and ending dates of currentWeek on click of goToNextWeek button(button with symbol ">")', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);
    component.setState({currentWeek: {startingDate: sampleDate}});
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
    instanceOfPatientMAR.showNewSchedulePopup(initialEmptyDrug);

    expect(instanceOfPatientMAR.state.shallHidePopup).toBe(false);
  });

  test('Should set shallHidePopup as true when hidePopup function is called', () => {
    let sampleDate = new Date("June 14, 2018 02:30:00");
    component = mount(<PatientMAR patient={patientDetails}
                                  today={sampleDate}/>,);

    const instanceOfPatientMAR = component.instance();
    instanceOfPatientMAR.showNewSchedulePopup(initialEmptyDrug);
    instanceOfPatientMAR.hidePopup();

    expect(instanceOfPatientMAR.state.shallHidePopup).toBe(true);
  });
});
