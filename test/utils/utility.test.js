import {
  defaultScheduleFormatter,
  getResultantObject,
  getScheduleShortDetails,
  groupByMedicineOrder,
  mapFrequencyToNumber
} from "../../src/utils/utility";
import React from "react";
import {BID, QD, QID, QOD, TID} from "../../src/constants";

describe('utility', () => {
  describe('defaultScheduleFormatter', () => {
    it('should give 2:30 when provided schedule having scheduleTime', function () {
      let schedule = {
        scheduledTime: new Date("June 8, 2018 2:30:00")
      };
      let result = defaultScheduleFormatter(schedule);
      expect(result).toEqual(<p>2:30 AM</p>)
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
  describe('getScheduleShortDetails', () => {
    it('should give only scheduledTime and status from given schedules object', function () {
      const scheduledTime = new Date("July 25, 2018 2:30:00");
      const schedule = {
        drug: {
          drugName: "sampleDrug",
          dose: 2,
          doseUnits: "once a day"
        },
        order: {
          uuid: "ORDER-2"
        },
        scheduledTime: scheduledTime,
        status: "scheduled"
      };
      const expected = {
        scheduledTime: scheduledTime,
        status: "scheduled"
      };

      const scheduleShortDetails = getScheduleShortDetails(schedule);
      expect(scheduleShortDetails).toEqual(expected);
    });
  });
  describe('groupByMedicineOrder', () => {
    it('Should get one medicine with only one schedule in list when only one schedule is given', () => {
      const schedules = [{
        drug: {
          drugName: "sampleDrug",
          dose: 2,
          doseUnits: "once a day"
        },
        order: {
          uuid: "ORDER-1"
        }
      }];

      let expectedSchedulesList = [getScheduleShortDetails(schedules[0])];
      const expected = [{
        drugName: "sampleDrug",
        dose: 2,
        doseUnits: "once a day",
        order: schedules[0].order,
        schedules:expectedSchedulesList
      }];

      const result = groupByMedicineOrder(schedules);
      expect(result).toEqual(expected);
    });

    it('Should get one medicine with two schedules in list when two schedules of with same orderId are given', () => {
      const schedules = [{
        drug: {
          drugName: "sampleDrug",
          dose: 2,
          doseUnits: "once a day"
        },
        order: {
          uuid: "ORDER-1"
        },
        scheduledTime: new Date("July 24, 2018 2:30:00")
      }, {
        drug: {
          drugName: "sampleDrug",
          dose: 2,
          doseUnits: "once a day"
        },
        order: {
          uuid: "ORDER-1"
        },
        scheduledTime: new Date("July 25, 2018 2:30:00")
      }];
      let expectedSchedulesList = [getScheduleShortDetails(schedules[0]),getScheduleShortDetails(schedules[1])];
      const expected = [{
        drugName: "sampleDrug",
        dose: 2,
        doseUnits: "once a day",
        order: schedules[0].order,
        schedules: expectedSchedulesList
      }];

      const result = groupByMedicineOrder(schedules);
      expect(result).toEqual(expected);
    });

    it('Should get two medicine with each one schedule in list when two schedules of with different orderId are given', () => {
      const firstSchedule = {
        drug: {
          drugName: "sampleDrug",
          dose: 2,
          doseUnits: "once a day"
        },
        order: {
          uuid: "ORDER-1"
        },
        scheduledTime: new Date("July 24, 2018 2:30:00")
      };
      const secondSchedule = {
        drug: {
          drugName: "sampleDrug",
          dose: 2,
          doseUnits: "once a day"
        },
        order: {
          uuid: "ORDER-2"
        },
        scheduledTime: new Date("July 25, 2018 2:30:00"),
      };
      const schedules = [firstSchedule, secondSchedule];

      const expectedSchedules1 = [getScheduleShortDetails(firstSchedule)];
      const expectedSchedules2 = [getScheduleShortDetails(secondSchedule)];
      const expected = [{
        drugName: "sampleDrug",
        dose: 2,
        doseUnits: "once a day",
        order: firstSchedule.order,
        schedules: expectedSchedules1
      }, {
        drugName: "sampleDrug",
        dose: 2,
        doseUnits: "once a day",
        order: secondSchedule.order,
        schedules: expectedSchedules2,
      }];

      const result = groupByMedicineOrder(schedules);
      expect(result).toEqual(expected);
    })

  })
});
