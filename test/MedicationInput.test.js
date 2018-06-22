import React from 'react';
import MedicationInput from '../src/MedicationInput';
import {mount, shallow} from "enzyme";

describe('MedicationInput',()=>{
  test('Should have input element', () => {
    let component=mount(<MedicationInput/>);
    expect(component.find('input'));
  });

  test('Should have input element with given medicine name as value', () => {
    const medicineName = "Paracetmol";
    let component=mount(<MedicationInput medicineName={medicineName}/>);
    let element = component.find('input');
    expect(element.prop('value')).toBe(medicineName);
  });

  test('Should have label as MedicineName', () => {
    let component=mount(<MedicationInput/>);
    let element = component.find('label');
    expect(element.text()).toBe("MedicineName");
  });

  test('Should have label as MedicineName', () => {
    let component=shallow(<MedicationInput/>);
    expect(component.hasClass('medicationInput')).toBe(true);
  });
});