import {
  defaultScheduleFormatter,
  filterScheduledDrugs,
  getResultantObject,
  getScheduleShortDetails,
  groupByMedicineOrder,
  mapDrugOrdersToDrugs,
  mapFrequencyToNumber,
  mapScheduleToDrug
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
  describe('mapScheduleToDrug', () => {
    it('should give drug info and add short details of schedule in schedules', function () {
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
      const scheduleShortDetails = getScheduleShortDetails(schedule);
      const mappedDrug = mapScheduleToDrug(schedule);

      const expected = {
        drugName: "sampleDrug",
        dose: 2,
        doseUnits: "once a day",
        order: {
          uuid: "ORDER-2"
        },
        schedules: [scheduleShortDetails]
      };
      expect(mappedDrug).toEqual(expected);
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
        schedules: expectedSchedulesList
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
      let expectedSchedulesList = [getScheduleShortDetails(schedules[0]), getScheduleShortDetails(schedules[1])];
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

  });

  describe('filterScheduledDrugs', () => {
    it('should give empty list when there is only one drugOrder and it is scheduled', function () {
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
      const scheduleDetails = getScheduleShortDetails(firstSchedule);
      const scheduledDrug = {
        drugName: "sampleDrug",
        dose: 2,
        doseUnits: "once a day",
        order: {
          uuid: "9c33cdf6-c805-4c85-94c8-f43df0997e5e"
        },
        schedules: [scheduleDetails]
      };
      const drugOrder = {
        uuid: "9c33cdf6-c805-4c85-94c8-f43df0997e5e",
        orderNumber: "ORD-323",
        orderType: "Drug Order",
        drug: {
          drugName: "sampleDrug"
        },
        dosingInstructions: {
          dose: 2,
          doseUnits: "once a day",
        }
      };
      let filteredDrugs = filterScheduledDrugs([drugOrder], [scheduledDrug]);
      expect(filteredDrugs).toEqual([]);
    });

    it('should give only one drugOrder when there is two drugOrder and one of it is scheduled', function () {
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
      const scheduleDetails = getScheduleShortDetails(firstSchedule);
      const scheduledDrug = {
        drugName: "sampleDrug",
        dose: 2,
        doseUnits: "once a day",
        order: {
          uuid: "9c33cdf6-c805-4c85-94c8-f43df0997e5e"
        },
        schedules: [scheduleDetails]
      };
      const drugOrder = {
        uuid: "9c33cdf6-c805-4c85-94c8-f43df0997e5e",
        orderNumber: "ORD-323",
        orderType: "Drug Order",
        drug: {
          drugName: "sampleDrug"
        },
        dosingInstructions: {
          dose: 2,
          doseUnits: "once a day",
        }
      };
      const anotherDrugOrder = {
        uuid: "f701be5b-40bb-4828-b1ea-7262d3b25246",
        orderNumber: "ORD-319",
        orderType: "Drug Order",
        drug: {
          drugName: "sampleDrug"
        },
        dosingInstructions: {
          dose: 2,
          doseUnits: "once a day",
        }
      };
      let filteredDrugs = filterScheduledDrugs([drugOrder, anotherDrugOrder], [scheduledDrug]);
      expect(filteredDrugs).toEqual([anotherDrugOrder]);
    });
  });

  describe('mapDrugOrdersToDrugs', () => {
    it('should drug details from drug orders', function () {
      const drugOrder = {
        "visit": {
          "uuid": "a998f8d6-e56c-49ed-b44c-1dcb4f07cde4",
          "startDateTime": 1529997089000
        },
        "provider": {
          "uuid": "c1c26908-3f10-11e4-adec-0800271c1b75",
          "name": "Super Man",
          "encounterRoleUuid": null
        },
        "orderAttributes": null,
        "retired": false,
        "creatorName": "Super Man",
        "orderReasonConcept": null,
        "orderReasonText": null,
        "dosingInstructionType": "org.openmrs.module.bahmniemrapi.drugorder.dosinginstructions.FlexibleDosingInstructions",
        "previousOrderUuid": null,
        "concept": {
          "uuid": "62b91692-0641-45b1-9233-3c9609c6b6a8",
          "name": "Paracetamol 500mg",
          "dataType": "N/A",
          "shortName": "Paracetamol 500mg",
          "conceptClass": "Misc",
          "hiNormal": null,
          "lowNormal": null,
          "set": false,
          "mappings": []
        },
        "uuid": "9c33cdf6-c805-4c85-94c8-f43df0997e5e",
        "orderGroup": null,
        "autoExpireDate": 1532928774000,
        "scheduledDate": 1532669575000,
        "dateStopped": null,
        "instructions": null,
        "dateActivated": 1532669575000,
        "commentToFulfiller": null,
        "orderNumber": "ORD-323",
        "careSetting": "OUTPATIENT",
        "orderType": "Drug Order",
        "effectiveStartDate": 1532669575000,
        "effectiveStopDate": 1532928774000,
        "sortWeight": null,
        "dosingInstructions": {
          "dose": 1,
          "doseUnits": "Tablet(s)",
          "route": "Oral",
          "frequency": "Twice a day",
          "asNeeded": false,
          "administrationInstructions": "{\"instructions\":\"As directed\"}",
          "quantity": 6,
          "quantityUnits": "Tablet(s)",
          "numberOfRefills": null
        },
        "durationUnits": "Day(s)",
        "drugNonCoded": null,
        "drug": {
          "name": "Paracetamol 500mg",
          "uuid": "d9c230a5-89d8-4e4d-b08b-2af3b1234c80",
          "form": "Tablet",
          "strength": null
        },
        "action": "NEW",
        "duration": 3
      };
      const anotherDrugOrder = {
        "visit": {
          "uuid": "a998f8d6-e56c-49ed-b44c-1dcb4f07cde4",
          "startDateTime": 1529997089000
        },
        "provider": {
          "uuid": "c1c26908-3f10-11e4-adec-0800271c1b75",
          "name": "Super Man",
          "encounterRoleUuid": null
        },
        "orderAttributes": null,
        "retired": false,
        "creatorName": "Super Man",
        "orderReasonConcept": null,
        "orderReasonText": null,
        "dosingInstructionType": "org.openmrs.module.bahmniemrapi.drugorder.dosinginstructions.FlexibleDosingInstructions",
        "previousOrderUuid": "991cb825-4c3c-40fd-8b7e-18527c7cb74f",
        "concept": {
          "uuid": "62b91692-0641-45b1-9233-3c9609c6b6a8",
          "name": "Paracetamol 500mg",
          "dataType": "N/A",
          "shortName": "Paracetamol 500mg",
          "conceptClass": "Misc",
          "hiNormal": null,
          "lowNormal": null,
          "set": false,
          "mappings": []
        },
        "uuid": "f7f59542-0aca-4a49-abaf-bb3fe751e598",
        "orderGroup": null,
        "autoExpireDate": 1532668806000,
        "scheduledDate": 1532496007000,
        "dateStopped": null,
        "instructions": null,
        "dateActivated": 1532323476000,
        "commentToFulfiller": null,
        "orderNumber": "ORD-322",
        "careSetting": "OUTPATIENT",
        "orderType": "Drug Order",
        "effectiveStartDate": 1532496007000,
        "effectiveStopDate": 1532668806000,
        "sortWeight": null,
        "dosingInstructions": {
          "dose": 1,
          "doseUnits": "Tablet(s)",
          "route": "Oral",
          "frequency": "Twice a day",
          "asNeeded": false,
          "administrationInstructions": "{\"instructions\":\"As directed\"}",
          "quantity": 4,
          "quantityUnits": "Tablet(s)",
          "numberOfRefills": null
        },
        "durationUnits": "Day(s)",
        "drugNonCoded": null,
        "drug": {
          "name": "Paracetamol 500mg",
          "uuid": "d9c230a5-89d8-4e4d-b08b-2af3b1234c80",
          "form": "Tablet",
          "strength": null
        },
        "action": "REVISE",
        "duration": 2
      };
      const firstMappedDrug = {
        order: {
          "uuid": "9c33cdf6-c805-4c85-94c8-f43df0997e5e",
          "autoExpireDate": 1532928774000,
          "scheduledDate": 1532669575000,
          "instructions": null,
          "orderNumber": "ORD-323",
        },
        drugName: "Paracetamol 500mg",
        uuid: "d9c230a5-89d8-4e4d-b08b-2af3b1234c80",
        dose: 1,
        doseUnits: "Tablet(s)",
        route: "Oral",
        frequencyString: "Twice a day",
        startingDate: new Date(1532669575000),
        endingDate: new Date(1532928774000),
        administrationInstructions: "{\"instructions\":\"As directed\"}",
      };
      const secondMappedDrug = {
        order: {
          "uuid": "f7f59542-0aca-4a49-abaf-bb3fe751e598",
          "autoExpireDate": 1532668806000,
          "scheduledDate": 1532496007000,
          "instructions": null,
          "orderNumber": "ORD-322",
        },
        drugName: "Paracetamol 500mg",
        uuid: "d9c230a5-89d8-4e4d-b08b-2af3b1234c80",
        dose: 1,
        doseUnits: "Tablet(s)",
        route: "Oral",
        frequencyString: "Twice a day",
        startingDate: new Date(1532496007000),
        endingDate: new Date(1532668806000),
        administrationInstructions: "{\"instructions\":\"As directed\"}",
      };
      const drugs = mapDrugOrdersToDrugs([drugOrder, anotherDrugOrder]);
      const expectedDrugs = [firstMappedDrug, secondMappedDrug];
      expect(drugs).toEqual(expectedDrugs)
    });
  });
});
