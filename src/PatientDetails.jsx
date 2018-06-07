import React, {Component} from 'react';

class PatientDetails extends Component {
  render() {
    let patient = this.props.patient;
    return (<div className={"PatientDetails"}>
      <p>
        {patient.name + " " + patient.gender + ", " + patient.age + " yrs"}
      </p>
    </div>)
  }
}

export default PatientDetails
