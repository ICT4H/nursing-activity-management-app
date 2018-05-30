import React, { Component } from 'react';
import PatientView from './PatientView'

let sampleTime=new Date().getTime();
let sampleStartingDate=new Date();

const patientDetails = {
      id:'GAN12345',
      name: "Cally Cardenas",
      gender:'male',
      age:33,
      medicine:{
        name:"Paracetmol",
        startingDate:sampleStartingDate,
        noOfDays:3,
        dosage:2,
        timings:[sampleTime]
      }
};


class App extends Component {
  render() {
    return (
        <div>
          <script src="./moment.js"/>
          <PatientView patient={patientDetails}/>
        </div>
    );
  }
}

export default App;
