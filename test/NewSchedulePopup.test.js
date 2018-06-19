import React from 'react';
import NewSchedulePopup from '../src/NewSchedulePopup';
import renderer from 'react-test-renderer';
import SaveCancelButtons from "../src/SaveCancelButtons";
import PersonDetails from "../src/PersonDetails";
import {BID, TAB} from "../src/constants";

import {mount} from 'enzyme'
import {getFormattedDate} from "../src/Utils/DateUtils";

let component;
let medicineToPopup = {
  medicineName: "Paracetmol",
  dose: 2,
  unit: TAB,
  frequency: BID,
  startingDate: new Date("June 8, 2018 2:30:00")
};
let patient = {
  name: "Cally Cardenas",
  gender: 'male',
  age: 33
};
let saveFn = () => true;
let cancelFn = () => true;

beforeEach(() => {
  component = renderer.create(<NewSchedulePopup medicine={medicineToPopup}
                                                patient={patient} onChange={() => true}
                                                saveFn={saveFn} cancelFn={cancelFn}/>);
});

describe('NewSchedulePopup', () => {
  test('Should have save cancel buttons', () => {
    expect(component.root.findByType(SaveCancelButtons).props.saveFn).toBe(saveFn);
    expect(component.root.findByType(SaveCancelButtons).props.cancelFn).toBe(cancelFn);
  });

  test('Should have SelectOptions of className "choose unit" with provided unit as selected value', () => {
    expect(component.root.findByProps({className: 'chooseUnit'}).props.selectedValue).toBe(medicineToPopup.unit);
  });

  test('Should have SelectOptions of className "choose frequency" with provided frequency as selected value', () => {
    expect(component.root.findByProps({className: 'chooseFrequency'}).props.selectedValue).toBe(medicineToPopup.frequency);
  });

  test('Should have given patient details in it', () => {
    expect(component.root.findByType(PersonDetails).props.person).toBe(patient);
  });

  test('Should have input field with given medicine name as value', () => {
    let element = component.root.findByProps({placeholder: 'medicineName'});
    expect(element.props.value).toBe(medicineToPopup.medicineName);
    expect(element.type).toBe('input');
  });

  test('Should have input field with given dose as value', () => {
    let element = component.root.findByProps({placeholder: 'dose'});
    component.root.findByProps({placeholder: 'dose'});
    expect(element.props.value).toBe(medicineToPopup.dose);
    expect(element.type).toBe('input');
  });

  test('Should have input field with given date as value', () => {
    let element = component.root.findByProps({placeholder: 'startingDate'});
    expect(element.type).toBe('input');
    expect(element.props.value).toBe(getFormattedDate(medicineToPopup.startingDate));
  });

  test('Should call onChange function with changed input values', () => {
    const onChangeMock = jest.fn();
    component = mount(<NewSchedulePopup medicine={medicineToPopup}
                                        patient={patient} onChange={onChangeMock}
                                        saveFn={saveFn} cancelFn={cancelFn}/>);
    let medicineNameInput = component.findWhere(element => element.type() === 'input'
        && element.prop('value') === medicineToPopup.medicineName);
    medicineNameInput.simulate('change');

    expect(onChangeMock).toBeCalled();
  });
});
