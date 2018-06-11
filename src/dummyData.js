import Medicine from "./models/Medicine";

let sampleStartingDate = new Date();

let medicineData = {
  medicineName: "Paracetmol",
  dose: 1,
  unit: 'Tablet',
  dosage: "twice a day",
  startingDate: sampleStartingDate,
  noOfDays: 3,
  schedules: []
};


let medicineData2 = {
  medicineName: "Crosine",
  dose: 1,
  unit: 'Tablet',
  dosage: "twice a day",
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
  unit: "ml",
  schedules: [{
    scheduledTime: new Date('June 5, 2018 9:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 5, 2018 02:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 5, 2018 07:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 7, 2018 02:30:00'),
    status: "administrated"
  }, {
    scheduledTime: new Date('June 8, 2018 02:30:00'),
    status: "toBeAdministrated"
  }]
};

let scheduledMedicineData2 = {
  medicineName: "Metformin 850mg",
  dose: 1,
  unit: "Tablet",
  schedules: [{
    scheduledTime: new Date('June 2, 2018 02:30:00'),
    status: "toBeAdministrated"
  }, {
    scheduledTime: new Date('June 8, 2018 9:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 9, 2018 02:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 12, 2018 07:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 14, 2018 02:30:00'),
    status: "administrated"
  }]
};

export {patientDetails, scheduledMedicineData, scheduledMedicineData2}