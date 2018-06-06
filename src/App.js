import React, { Component } from 'react';
import PatientMAR from './PatientMAR'
let sampleStartingDate=new Date();

let medicineData = {
  medicineName: "Paracetmol",
  dose:1,
  unit:'Tablet',
  dosage: "twice a day",
  startingDate: sampleStartingDate,
  noOfDays: 3,
};


let medicineData2 = {
  medicineName: "Crosine",
  dose:1,
  unit:'Tablet',
  dosage: "twice a day",
  startingDate: sampleStartingDate,
  noOfDays: 3,
};

const patientDetails = {
      id:'GAN12345',
      name: "Cally Cardenas",
      gender:'male',
      age:33,
      medicinesToBeScheduled:[medicineData,medicineData2],
};


class App extends Component {
  render() {
    return (
        <div>
          <script src="./moment.js"/>
          <div>
            <p>Medicine Administration Record</p>
          </div>
          <PatientMAR patient={patientDetails}/>
        </div>
    );
  }
}

export default App;
