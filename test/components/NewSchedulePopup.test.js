import React from 'react';
import NewSchedulePopup from '../../src/components/NewSchedulePopup';
import SaveCancelButtons from "../../src/components/SaveCancelButtons";
import PersonDetails from "../../src/components/PersonDetails";
import {mount, shallow} from 'enzyme';
import MedicationInput from "../../src/components/MedicationInput";
import HttpRequest from "../../src/data/HttpRequest";
import * as sinon from "sinon";

let component;
let drugToPopup = {
  drugName: "Paracetmol",
  dose: 2,
  unit: "Tablet(s)",
  frequencyString: "Once a day",
  frequency: {uuid: "9d7c32a2-3f10-11e4-adec-0800271c1b75", frequencyPerDay: 1, name: "Once a day"},
  startingDate: new Date("June 8, 2018 2:30:00"),
  endingDate: new Date("June 10, 2018 2:30:00"),
  timings: []
};
let patient = {
  display: "Cally Cardenas",
  gender: 'male',
  age: 33
};
let saveFn = () => true;
let cancelFn = () => true;

const frequencies = [{uuid: "9d7c32a2-3f10-11e4-adec-0800271c1b75", frequencyPerDay: 1, name: "Once a day"}
  , {uuid: "9d7d0641-3f10-11e4-adec-0800271c1b75", frequencyPerDay: 2, name: "Twice a day"}
  , {uuid: "9d838148-3f10-11e4-adec-0800271c1b75", frequencyPerDay: 3, name: "Thrice a day"}
  , {uuid: "9d84890a-3f10-11e4-adec-0800271c1b75", frequencyPerDay: 4, name: "Four times a day"}
  , {uuid: "33443dad-8a92-11e4-977f-0800271c1b75", frequencyPerDay: 24, name: "Every Hour"}
  , {uuid: "3345a0d3-8a92-11e4-977f-0800271c1b75", frequencyPerDay: 12, name: "Every 2 hours"}
  , {uuid: "0", frequencyPerDay: 1, name: "Immediately"}];
const doseUnits = [{name: "Capsule(s)", rootConcept: null},
  {name: "Tablet(s)", rootConcept: null},
  {name: "ml", rootConcept: null},
  {name: "mg", rootConcept: null},
  {name: "IU", rootConcept: null}];

let getMethodStub;

beforeEach(() => {
  jest.clearAllMocks();
  getMethodStub = sinon.stub(HttpRequest, 'get').callsFake(() => Promise.resolve({frequencies, doseUnits}));
  component = mount(<NewSchedulePopup drug={drugToPopup}
                                      patient={patient} onChange={() => true}
                                      saveFn={saveFn} cancelFn={cancelFn}/>);
});

afterEach(() => {
  getMethodStub.restore();
});

describe('NewSchedulePopup', () => {
  it('Should have save cancel buttons', () => {
    expect(component.find("SaveCancelButtons").prop('saveFn')).toBe(saveFn);
    expect(component.find("SaveCancelButtons").prop('cancelFn')).toBe(cancelFn);
  });

  it('Should have SelectOptions of className "choose frequency" with provided frequency as selected value', () => {
    expect(component.render().find('.chooseFrequency')).toHaveLength(1);
  });

  it('Should have given patient details in it', () => {
    expect(component.find('PersonDetails').prop('person')).toBe(patient);
  });

  it('Should have MedicationInput component', () => {
    component = shallow(<NewSchedulePopup drug={drugToPopup}
                                          patient={patient} onChange={() => true}
                                          saveFn={saveFn} cancelFn={cancelFn}/>);
    let element = component.find(MedicationInput);
    expect(element.props().drugName).toBe(drugToPopup.drugName);
  });

  it('should have DosingInstructions component with given doseUnits and dose value as prop', function () {
    expect(component.find('DosingInstructions').prop('doseUnit')).toBe(drugToPopup.doseUnits);
    expect(component.find('DosingInstructions').prop('doseValue')).toBe(drugToPopup.dose);
  });

  it('Should have input field with given date as value', () => {
    expect(component.find('DosingPeriod').prop('startingDate')).toBe(drugToPopup.startingDate);
    expect(component.find('DosingPeriod').prop('endingDate')).toBe(drugToPopup.endingDate);
  });

  it('Should call onChange function with changed input values', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup drug={drugToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    let drugNameInput = component.findWhere(element => element.type() === 'input'
        && element.prop('value') === drugToPopup.drugName);
    drugNameInput.simulate('change');

    expect(onChangeMock).toBeCalled();
  });

  it('Should call onChange function with changed frequency value when frequency selected is changed', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup drug={drugToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    let frequencyInput = component.findWhere(element => element.type() === 'select' && element.hasClass('chooseFrequency'));
    frequencyInput.simulate('change', {target: {value: "Once a day"}});
    drugToPopup.frequencyString = "Once a day";
    drugToPopup.frequency = {uuid: "9d7c32a2-3f10-11e4-adec-0800271c1b75", frequencyPerDay: 1, name: "Once a day"};
    expect(onChangeMock).toBeCalledWith(drugToPopup);
  });

  it('Should call onChange function with changed dose value when dose input is changed', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup drug={drugToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    let doseInput = component.find(`input [value=${drugToPopup.dose}]`);
    doseInput.simulate('change', {target: {value: 4}});

    drugToPopup.dose = 4;
    expect(onChangeMock).toBeCalledWith(drugToPopup);
  });

  it('Should call onChange function with changed drug unit value when different drug unit selected', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup drug={drugToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    let drugUnitInput = component.findWhere(element => element.type() === 'select' && element.hasClass('chooseUnit'));
    drugUnitInput.simulate('change', {target: {value: "Tablet(s)"}});

    drugToPopup.unit = "Tablet(s)";
    expect(onChangeMock).toBeCalledWith(drugToPopup);
  });

  it('Should call onChange function with changed startingDate when different startingDate is selected', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup drug={drugToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    let startingDateInput = component.find('#dosingPeriodStartingDate');
    const changedDateValue = "2017-02-12";
    startingDateInput.simulate('change', {target: {value: changedDateValue}});

    drugToPopup.startingDate = new Date(changedDateValue);
    expect(onChangeMock).toBeCalledWith(drugToPopup);
  });


  it('Should call onChange function with changed startingDate when different startingDate is selected', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup drug={drugToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    let endingDateInput = component.find('#dosingPeriodEndingDate');
    const changedDateValue = "2018-06-21";
    endingDateInput.simulate('change', {target: {value: changedDateValue}});

    drugToPopup.endingDate = new Date(changedDateValue);
    expect(onChangeMock).toBeCalledWith(drugToPopup);
  });

  it('Should have className hidden when hidden prop is given as true', () => {
    component = mount(<NewSchedulePopup drug={drugToPopup} hidden={true}
                                        patient={patient} onChange={() => true}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    component.hasClass('hidden');
  });

  it('Should change className to newSchedulePopup when hidden prop is changed to false', () => {
    component = mount(<NewSchedulePopup drug={drugToPopup} hidden={true}
                                        patient={patient} onChange={() => true}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    component.hasClass('hidden');
    component.setProps({hidden: false});
    component.hasClass('newSchedulePopup');
  });

  it('Should have className newSchedulePopup when hidden prop is given as false', () => {
    component = mount(<NewSchedulePopup drug={drugToPopup} hidden={false}
                                        patient={patient} onChange={() => true}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    component.hasClass('newSchedulePopup');
  });

  it('Should have className hidden when hidden prop is changed to true', () => {
    component = mount(<NewSchedulePopup drug={drugToPopup} hidden={false}
                                        patient={patient} onChange={() => true}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    component.setState({
      frequencies: frequencies,
      doseUnits: doseUnits
    });
    component.hasClass('newSchedulePopup');
    component.setProps({hidden: true});
    component.hasClass('hidden');
  });

  it('Should call have AdministrateTimes component', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup drug={drugToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    expect(component.find("AdministrateTimes")).toHaveLength(1);
  });
});
