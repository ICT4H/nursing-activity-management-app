import React, {Component} from 'react';
import PatientMAR from './PatientMAR'
import {patientDetails} from "./dummyData";


class App extends Component {
  render() {
    return (
        <div>
          <div>
            <p>Medicine Administration Record</p>
          </div>
          <PatientMAR patient={patientDetails}/>
        </div>
    );
  }
}

export default App;
