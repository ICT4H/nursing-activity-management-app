import React, {Component} from 'react';
import DateUtils from "../utils/DateUtils";

class DosingPeriod extends Component {
  render() {
    return (<div>
      <label>StartingDate</label>
      <input type="date" id="dosingPeriodStartingDate" placeholder="startingDate"
             onChange={this.props.handleStartingDateChange}
             value={DateUtils.getFormattedDate(this.props.startingDate)}/>
      <label>EndingDate</label>
      <input type="date" id="dosingPeriodEndingDate" placeholder="endingDate"
             onChange={this.props.handleEndingDateChange}
             value={DateUtils.getFormattedDate(this.props.endingDate)}/>
    </div>)
  }
}

export default DosingPeriod
