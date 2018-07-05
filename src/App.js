import React, {Component} from 'react';
import PatientMAR from './components/PatientMAR'
import {patientDetails} from "./Data/dummyData";


class App extends Component {
  render() {
    return (
        <div>
          <div>
            <p>Medicine Administration Record</p>
          </div>
          <PatientMAR patient={patientDetails} today={new Date()}/>
        </div>
    );
  }
}

export default App;
