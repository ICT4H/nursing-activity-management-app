import React from 'react';
import Schedules from '../../src/components/Schedules';
import {mount} from "enzyme";

describe('Schedules', () => {
  it('Should have component ScheduleFormatter no of times schedules are given', () => {
    const schedules = [{}, {}];
    let component = mount(<Schedules schedules={schedules}/>);
    expect(component.find('ScheduleFormatter')).toHaveLength(2);
  });
});
