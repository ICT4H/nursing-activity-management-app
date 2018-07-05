import React, {Component} from 'react';

class MedicationInput extends Component {
  render() {
    return (<div className="medicationInput">
      <label>MedicineName</label>
      <input value={this.props.medicineName} onChange={this.props.onChange}/>
    </div>);
  }
}

export default MedicationInput
