import React, {Component} from 'react';

class MedicationInput extends Component {
  render() {
    return (<div className="medicationInput">
      <label>DrugName</label>
      <input value={this.props.drugName} onChange={this.props.onChange}/>
    </div>);
  }
}

export default MedicationInput
