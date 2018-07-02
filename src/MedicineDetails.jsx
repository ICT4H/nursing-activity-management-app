import React from 'react';
class MedicineDetails extends React.Component {
    render(){
        const medicine=this.props.medicine;
        return (<div className={"medicineDetails"}>
      <p>{medicine.medicineName}</p>
      <p>{medicine.dose} {medicine.unit}</p>
    </div>)
    }
}
export default MedicineDetails;