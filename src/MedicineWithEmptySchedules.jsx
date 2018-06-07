import React, {Component} from 'react';
import MedicineDetails from "./MedicineDetails";

class MedicineWithEmptySchedules extends Component {
  render() {
    let schedules = [];
    schedules.push(<td><MedicineDetails medicine={this.props.medicine}
      showPopup={this.props.showPopup}/></td>);
    for (let i=0;i<7;i++){
      schedules.push(<td/>)
    }

    return <tr>{schedules}</tr>;
  }
}

export default MedicineWithEmptySchedules
