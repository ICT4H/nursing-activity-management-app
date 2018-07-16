import React from 'react';
import AdministrateTimes from '../../src/components/AdministrateTimes';
import {mount} from "enzyme";


describe('Administrate Times', () => {
  test('Should have 1 input when noOfTimeInput is 1', () => {
    let component = mount(<AdministrateTimes noOfTimeInputs={1}/>);
    expect(component.find('input').first().type()).toBe('input');
  });
  test('Should have 2 inputs when noOfTimeInput is 2', () => {
    let component = mount(<AdministrateTimes noOfTimeInputs={2}/>);
    expect(component.find('input').at(0).first().type()).toBe('input');
    expect(component.find('input').at(1).first().type()).toBe('input');
    expect(component.find('input')).toHaveLength(2);
  });
  test('Should have N inputs when noOfTimeInput is N', () => {
    let component = mount(<AdministrateTimes noOfTimeInputs={6}/>);
    expect(component.find('input').at(0).first().type()).toBe('input');
    expect(component.find('input').at(5).first().type()).toBe('input');
    expect(component.find('input')).toHaveLength(6);
  });
  test('Should have N inputs when property noOfTimeInput is changed to N from M', () => {
    let component = mount(<AdministrateTimes noOfTimeInputs={4}/>);
    expect(component.find('input').at(0).first().type()).toBe('input');
    component.setProps({noOfTimeInputs:8});
    expect(component.find('input').at(7).first().type()).toBe('input');
    expect(component.find('input')).toHaveLength(8);
  });
});
