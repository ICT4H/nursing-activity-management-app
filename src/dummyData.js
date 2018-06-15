import Medicine from "./models/Medicine";
import {TOBEADMINISTRATED, ADMINISTRATED, NOTADMINISTRATED, TAB, ML, BID} from "./constants";

let sampleStartingDate = new Date("June 14, 2018 02:30:00");

let medicineData = {
  medicineName: "Paracetmol",
  dose: 1,
  unit: TAB,
  frequency: BID,
  startingDate: sampleStartingDate,
  noOfDays: 3,
  schedules: []
};


let medicineData2 = {
  medicineName: "Crosine",
  dose: 1,
  unit: TAB,
  frequency: BID,
  startingDate: sampleStartingDate,
  noOfDays: 3,
  schedules: []
};

const patientDetails = {
  id: 'GAN12345',
  name: "Cally Cardenas",
  gender: 'male',
  age: 33,
  medicinesToBeScheduled: [new Medicine(medicineData), new Medicine(medicineData2)],
};


let scheduledMedicineData = {
  medicineName: "Dopamine 40mg/ml",
  dose: 40,
  unit: ML,
  scheduleTimes:[new Date('June 5, 2018 2:30:00')],
  schedules: [{
    scheduledTime: new Date('June 5, 2018 9:30:00'),
    status: TOBEADMINISTRATED
  }, {
    scheduledTime: new Date('June 5, 2018 02:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 5, 2018 07:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 7, 2018 02:30:00'),
    status: ADMINISTRATED
  }, {
    scheduledTime: new Date('June 8, 2018 02:30:00'),
    status: TOBEADMINISTRATED
  }]
};

let scheduledMedicineData2 = {
  medicineName: "Metformin 850mg",
  dose: 1,
  unit: TAB,
  scheduleTimes:[new Date('June 8, 2018 2:30:00')],
  schedules: [{
    scheduledTime: new Date('June 2, 2018 02:30:00'),
    status: TOBEADMINISTRATED
  }, {
    scheduledTime: new Date('June 8, 2018 9:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 9, 2018 02:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 12, 2018 07:30:00'),
    status: NOTADMINISTRATED
  }, {
    scheduledTime: new Date('June 14, 2018 02:30:00'),
    status: ADMINISTRATED
  }]
};

let initialEmptyMedicine = {
  medicineName: "", dose: 0,
  startingDate:"",
  unit: "", dosage: "",frequency:""
};

export {patientDetails, scheduledMedicineData, scheduledMedicineData2, initialEmptyMedicine}