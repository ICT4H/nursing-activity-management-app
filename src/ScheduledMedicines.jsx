import React, {Component} from 'react';
import MedicineWithSchedules from "./MedicineWithSchedules";

class ScheduledMedicines extends Component {
  render() {
    let allMedicines=[];
    for (let i = 0; i < this.props.schedules.length; i++){
      allMedicines.push(
          <MedicineWithSchedules schedules={this.props.schedules[i]} currentWeek={this.props.currentWeek}/>);
    }
    return allMedicines;
  }
}

export default ScheduledMedicines
