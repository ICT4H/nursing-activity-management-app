import {defaultScheduleFormatter, getResultantObject} from "../../src/utils/utility";
import React from "react";


describe('defaultScheduleFormatter',()=>{
  it('should give 2:30 when provided schedule having scheduleTime', function () {
    let schedule={
      scheduledTime:new Date("June 8, 2018 2:30:00")
    };
    let result=defaultScheduleFormatter(schedule);
    expect(result).toEqual(<p>2:30</p>)
  });
});
describe('getResultantObject',()=>{
  it('should get object with field whose value is replaced by provided value', function () {
    let testingObject={
      firstField:"FIRST",
      secondField:2
    };
    let resultantObject=getResultantObject(testingObject,{secondField:"SECOND"});
    expect(resultantObject).toEqual({firstField:"FIRST",secondField:"SECOND"});
  });
  it('should get object with added field with given value when field is not in given object', function () {
    let testingObject={
      firstField:"FIRST",
      secondField:2
    };
    let resultantObject=getResultantObject(testingObject,{thirdField:"THIRD"});
    expect(resultantObject).toEqual({firstField:"FIRST",secondField:2,thirdField:"THIRD"});
  });
  it('should return new object', function () {
    let testingObject={
      firstField:"FIRST",
      secondField:2
    };
    let resultantObject=getResultantObject(testingObject,{secondField:"SECOND"});
    expect(resultantObject).not.toBe(testingObject);
  });
});