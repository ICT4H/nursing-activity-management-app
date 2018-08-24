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
  uuid: "",
  drugName: "", dose: 1,
  unit: "",
  route: "",
  frequencyString: "",
  frequency: {name: "", uuid: "", frequencyPerDay: 0},
  daysOfWeek: [],
  timings: [],
  scheduleType: "",
  startingDate: new Date(),
  endingDate: new Date()
};
export {patientDetails, initialEmptyDrug}
