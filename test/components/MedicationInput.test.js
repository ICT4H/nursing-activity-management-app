import React from 'react';
import MedicationInput from '../../src/components/MedicationInput';
import {mount, shallow} from "enzyme";

describe('MedicationInput', () => {
  test('Should have input element', () => {
    let component = mount(<MedicationInput/>);
    expect(component.find('input'));
  });

  test('Should have input element with given medicine name as value', () => {
    const drugName = "Paracetmol";
    let component = mount(<MedicationInput drugName={drugName}/>);
    let element = component.find('input');
    expect(element.prop('value')).toBe(drugName);
  });

  test('Should have label as MedicineName', () => {
    let component = mount(<MedicationInput/>);
    let element = component.find('label');
    expect(element.text()).toBe("DrugName");
  });

  test('Should have label as MedicineName', () => {
    let component = shallow(<MedicationInput/>);
    expect(component.hasClass('medicationInput')).toBe(true);
  });
});
