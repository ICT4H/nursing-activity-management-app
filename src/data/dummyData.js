import {QD, TAB} from "../constants";

const patientDetails = {
  id: 'GAN12345',
  name: "Cally Cardenas",
  gender: 'male',
  age: 33,
  patientUuid :"a81c9847-bfef-41f3-8bc2-8abfe11e3a6a"
};
let initialEmptyDrug = {
  drugName: "", dose: 1,
  unit: "",
  frequency: "",
  startingDate: new Date('June 8, 2018 2:30:00'),
  endingDate: new Date('June 8, 2018 2:30:00')
};

const NEW_DRUGS = [{
  drugName: "Paracetmol",
  dose:1,
  unit: TAB,
  frequency: QD
}, {
  drugName: "Crosine",
  dose:1,
  unit: TAB,
  frequency: QD
}];

export {patientDetails, initialEmptyDrug, NEW_DRUGS}
