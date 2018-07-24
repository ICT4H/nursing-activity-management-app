import React from 'react';
class MedicineDetails extends React.Component {
    render(){
        const medicine=this.props.medicine;
        return (<div className={"medicineDetails"} onClick={this.props.onClick}>
      <p>{medicine.drugName}</p>
      <p>{medicine.dose} {medicine.doseUnits}</p>
    </div>)
    }
}
export default MedicineDetails;
