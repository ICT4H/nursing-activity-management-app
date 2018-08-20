import React from 'react';
import DaysOfWeek from '../../src/components/DaysOfWeek';
import {mount, shallow} from "enzyme";
import SelectOptions from "../../src/components/SelectOptions";
import {WeekDaysOptions} from "../../src/constants";

describe('DaysOfWeek', () => {
  it('Should have selectOptions component once with weekDays as options prop when noOfDaysInWeek is given as 1', () => {
    let component = mount(<DaysOfWeek noOfDaysInWeek={1}/>);
    expect(component.find(SelectOptions)).toHaveLength(1);
    expect(component.find(SelectOptions).at(0).prop('options')).toEqual(WeekDaysOptions)
  });

  it('Should have selectOptions component N noOfTimes with weekDays as options prop when noOfDaysInWeek is given N', () => {
    let component = mount(<DaysOfWeek noOfDaysInWeek={3}/>);
    expect(component.find(SelectOptions)).toHaveLength(3);
    expect(component.find(SelectOptions).at(2).prop('options')).toEqual(WeekDaysOptions)
  });

  it('Should have className hidden when hidden prop is given as true', () => {
    let component = shallow(<DaysOfWeek hidden={true}/>);
    expect(component.hasClass('hidden')).toBe(true);
  });

  it('Should change className to daysOfWeek when hidden prop is changed to false', () => {
    let component = shallow(<DaysOfWeek hidden={true}/>);
    expect(component.hasClass('hidden')).toBe(true);
    component.setProps({hidden: false});
    expect(component.hasClass('daysOfWeek')).toBe(true);
  });

  it('Should have className daysOfWeek when hidden prop is given as false', () => {
    let component = shallow(<DaysOfWeek hidden={false}/>);
    expect(component.hasClass('daysOfWeek')).toBe(true);
  });

  it('Should have className hidden when hidden prop is changed to true', () => {
    let component = shallow(<DaysOfWeek hidden={false}/>);
    expect(component.hasClass('daysOfWeek')).toBe(true);
    component.setProps({hidden: true});
    expect(component.hasClass('hidden')).toBe(true);
  });
});
