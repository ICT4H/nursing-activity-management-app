import {BID, TAB,} from "../constants";

const patientDetails = {
  id: 'GAN12345',
  name: "Cally Cardenas",
  gender: 'male',
  age: 33,
};
let initialEmptyDrug = {
  drugName: "", dose: 1,
  unit: TAB,
  frequency: BID,
  startingDate: new Date('June 8, 2018 2:30:00'),
  endingDate: new Date('June 8, 2018 2:30:00')
};

export {patientDetails, initialEmptyDrug}
