import {TOBEADMINISTRATED, ADMINISTRATED, NOTADMINISTRATED, TAB, ML, BID} from "./constants";

const patientDetails = {
  id: 'GAN12345',
  name: "Cally Cardenas",
  gender: 'male',
  age: 33,
};


let scheduledMedicineData = {
  medicineName: "Dopamine 40mg/ml",
  dose: 40,
  unit: ML,
  frequency: BID,
  schedules: [{
    scheduledTime: new Date('June 5, 2018 9:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 5, 2018 15:30:00'),
    status: NOTADMINISTRATED
  },{
    scheduledTime: new Date('June 6, 2018 9:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 6, 2018 14:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 7, 2018 9:30:00'),
    status: TOBEADMINISTRATED
  }, {
    scheduledTime: new Date('June 7, 2018 14:30:00'),
    status: ADMINISTRATED
  }, {
    scheduledTime: new Date('June 8, 2018 9:30:00'),
    status: TOBEADMINISTRATED
  },{
    scheduledTime: new Date('June 8, 2018 14:30:00'),
    status: TOBEADMINISTRATED
  }]
};

let scheduledMedicineData2 = {
  medicineName: "Metformin 850mg",
  dose: 1,
  unit: TAB,
  frequency: BID,
  schedules: [{
    scheduledTime: new Date('June 2, 2018 02:30:00'),
    status: TOBEADMINISTRATED
  }, {
    scheduledTime: new Date('June 3, 2018 9:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 4, 2018 02:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 5, 2018 07:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 6, 2018 02:30:00'),
    status: ADMINISTRATED
  }]
};

let initialEmptyMedicine = {
  medicineName: "", dose: 1,
  unit: TAB,
  frequency: BID,
  startingDate: new Date('June 8, 2018 2:30:00'),
  endingDate: new Date('June 8, 2018 2:30:00')
};

export {patientDetails, scheduledMedicineData, scheduledMedicineData2, initialEmptyMedicine}