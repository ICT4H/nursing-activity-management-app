import {defaultScheduleFormatter, getResultantObject, mapFrequencyToNumber} from "../../src/utils/utility";
import React from "react";
import {BID, QD, QID, QOD, TID} from "../../src/constants";


describe('defaultScheduleFormatter', () => {
  it('should give 2:30 when provided schedule having scheduleTime', function () {
    let schedule = {
      scheduledTime: new Date("June 8, 2018 2:30:00")
    };
    let result = defaultScheduleFormatter(schedule);
    expect(result).toEqual(<p>2:30</p>)
  });
});
describe('getResultantObject', () => {
  it('should get object with field whose value is replaced by provided value', function () {
    let testingObject = {
      firstField: "FIRST",
      secondField: 2
    };
    let resultantObject = getResultantObject(testingObject, {secondField: "SECOND"});
    expect(resultantObject).toEqual({firstField: "FIRST", secondField: "SECOND"});
  });
  it('should get object with added field with given value when field is not in given object', function () {
    let testingObject = {
      firstField: "FIRST",
      secondField: 2
    };
    let resultantObject = getResultantObject(testingObject, {thirdField: "THIRD"});
    expect(resultantObject).toEqual({firstField: "FIRST", secondField: 2, thirdField: "THIRD"});
  });
  it('should return new object', function () {
    let testingObject = {
      firstField: "FIRST",
      secondField: 2
    };
    let resultantObject = getResultantObject(testingObject, {secondField: "SECOND"});
    expect(resultantObject).not.toBe(testingObject);
  });
});
describe('mapFrequencyToNumber', () => {
  it('should give 1 when frequency is QD(once a day)', function () {
    expect(mapFrequencyToNumber(QD)).toBe(1);
  });
  it('should give 1 when frequency is QOD(on alternative days)', function () {
    expect(mapFrequencyToNumber(QOD)).toBe(1);
  });
  it('should give 2 when frequency is BID(twice a day)', function () {
    expect(mapFrequencyToNumber(BID)).toBe(2);
  });
  it('should give 3 when frequency is TID(thrice a day)', function () {
    expect(mapFrequencyToNumber(TID)).toBe(3);
  });
  it('should give 4 when frequency is QID(four times a day)', function () {
    expect(mapFrequencyToNumber(QID)).toBe(4);
  });
  it('should give 0 for all other parameters', function () {
    expect(mapFrequencyToNumber('QID')).toBe(0);
    expect(mapFrequencyToNumber('CHOOSEFREQUENCY')).toBe(0);
  });
});