const patientDetails = {
  id: 'GAN12345',
  person: {
    name: "Cally Cardenas",
    gender: 'male',
    age: 33
  },
  patientUuid: "a81c9847-bfef-41f3-8bc2-8abfe11e3a6a"
};
let initialEmptyDrug = {
  drugName: "", dose: 1,
  unit: "",
  frequencyString: "",
  frequency: {name: "", uuid: "", frequencyPerDay: 0},
  startingDate: new Date('June 8, 2018 2:30:00'),
  endingDate: new Date('June 8, 2018 2:30:00')
};
export {patientDetails, initialEmptyDrug}
