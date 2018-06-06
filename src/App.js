import React, { Component } from 'react';
import PatientMARView from './PatientMARView'
let sampleStartingDate=new Date();

let medicineData = {
  name: "Paracetmol",
  dose:1,
  unit:'Tablet',
  dosage: "twice a day",
  startingDate: sampleStartingDate,
  noOfDays: 3,
};


let medicineData2 = {
  name: "Crosine",
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
          <PatientMARView patient={patientDetails}/>
        </div>
    );
  }
}

export default App;
