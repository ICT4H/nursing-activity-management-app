import React from 'react';
import NewSchedulePopup from '../NewSchedulePopup';
import renderer from 'react-test-renderer';
import SaveCancelButtons from "../SaveCancelButtons";
import SelectOptions from "../SelectOptions";
import PersonDetails from "../PersonDetails";


let component;
let medicineToPopup = {
  medicineName: "Paracetmol",
  dose: 2,
  unit: "Tablet"
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
  test('Should have input fields medicineName, dose, unit with given values', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should have save cancel buttons', () => {
    expect(component.root.findByType(SaveCancelButtons).props.saveFn).toBe(saveFn);
    expect(component.root.findByType(SaveCancelButtons).props.cancelFn).toBe(cancelFn);
  });

  test('Should have SelectOptions with provided unit as selected value', () => {
    expect(component.root.findByType(SelectOptions).props.selectedValue).toBe(medicineToPopup.unit);
  });

  test('Should have given patient details in it', () => {
    expect(component.root.findByType(PersonDetails).props.person).toBe(patient);
  });

  test('Should have input field with given medicine name as value', () => {
    expect(component.root.find(element => element.type === 'input' && element.props.placeholder === 'medicineName').props.value).toBe(medicineToPopup.medicineName);
  });

  test('Should have input field with given dose as value', () => {
    expect(component.root.find(element => element.type === 'input' && element.props.placeholder === 'dose').props.value).toBe(medicineToPopup.dose);
  });
});
