import React from 'react';

class DrugDetails extends React.Component {
  render() {
    const drug = this.props.drug;
    return (<div className={"drugDetails"} onClick={this.props.onClick}>
      <p>{drug.drugName}</p>
      <p>{drug.dose} {drug.doseUnits}</p>
    </div>)
  }
}

export default DrugDetails;
