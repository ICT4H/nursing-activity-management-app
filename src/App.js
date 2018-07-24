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
          <PatientMAR patient={patientDetails} today={new Date()} patientUuid="a81c9847-bfef-41f3-8bc2-8abfe11e3a6a"/>
        </div>
    );
  }
}

export default App;
