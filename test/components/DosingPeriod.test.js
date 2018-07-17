import React from 'react';
import DosingPeriod from '../../src/components/DosingPeriod';
import {mount} from "enzyme";
import DateUtils from "../../src/utils/DateUtils";

describe('DosingPeriod', () => {
  it('Should have startingDate input with given date as value', () => {
    const sampleDate = new Date();
    let formattedDate = DateUtils.getFormattedDate(sampleDate);
    let component = mount(<DosingPeriod startingDate={sampleDate}/>);
    expect(component.find('#dosingPeriodStartingDate').prop('value')).toEqual(formattedDate);
  });
  it('Should have endingDate input with given date as value', () => {
    const sampleDate = new Date();
    let formattedDate = DateUtils.getFormattedDate(sampleDate);
    let component = mount(<DosingPeriod endingDate={sampleDate}/>);
    expect(component.find('#dosingPeriodEndingDate').prop('value')).toEqual(formattedDate);
  });
});
