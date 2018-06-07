import React, {Component} from 'react';
import MedicineDetails from "./MedicineDetails";

class MedicineWithSchedules extends Component {
  render() {
    let schedules = [];
    schedules.push(<td><MedicineDetails medicine={this.props.schedules[0]}/></td>);

    for (let i=0;i<7;i++){
      schedules.push(<td/>)
    }
    return <tr>{schedules}</tr>;
  }
}

export default MedicineWithSchedules
