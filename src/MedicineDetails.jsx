import React, {Component} from 'react';

class MedicineDetails extends Component {
  render() {
    let medicine = this.props.medicine;
    let onClickFunction = this.props.showPopup && this.props.showPopup.bind(null, medicine);
    return (
        <div onClick={onClickFunction} className={"medicineDetails"}>
          <p>{medicine.medicineName}</p>
          <p>{medicine.dose + "\t" + medicine.unit}</p>
        </div>
    )
  }
}

export default MedicineDetails
