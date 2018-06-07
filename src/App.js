import React, { Component } from 'react';
import PatientMAR from './PatientMAR'
import Medicine from "./Medicine";
let sampleStartingDate=new Date();

let medicineData = {
  medicineName: "Paracetmol",
  dose:1,
  unit:'Tablet',
  dosage: "twice a day",
  startingDate: sampleStartingDate,
  noOfDays: 3,
  schedules:[]
};


let medicineData2 = {
  medicineName: "Crosine",
  dose:1,
  unit:'Tablet',
  dosage: "twice a day",
  startingDate: sampleStartingDate,
  noOfDays: 3,
  schedules:[]
};

const patientDetails = {
      id:'GAN12345',
      name: "Cally Cardenas",
      gender:'male',
      age:33,
      medicinesToBeScheduled:[new Medicine(medicineData),new Medicine(medicineData2)],
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
