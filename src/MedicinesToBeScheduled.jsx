import React, {Component} from 'react';
import MedicineWithEmptySchedules from "./MedicineWithEmptySchedules";

class MedicinesToBeScheduled extends Component {
  render() {
    let allMedicines = [];
    for (let i = 0; i < this.props.medicinesToBeScheduled.length; i++) {
      allMedicines.push(
          <MedicineWithEmptySchedules medicine={this.props.medicinesToBeScheduled[i]} showPopup={this.props.showPopup}/>);
    }
    return allMedicines;
  }
}

export default MedicinesToBeScheduled
