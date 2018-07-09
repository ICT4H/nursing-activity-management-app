import React, {Component} from 'react';
import {SYMBOLSHEXCODE} from "../constants";
import DateUtils from "../utils/DateUtils";

class ScheduleFormatter extends Component {
  render() {
    let schedule = this.props.schedule;
    return (<div className="schedule">
      <span>
        <span className="scheduleTime">{DateUtils.formatTime(schedule.scheduledTime)}</span>
        {this.getScheduleStatus()}</span>
    </div>)
  }

  getScheduleStatus() {
    let statusHexCode = SYMBOLSHEXCODE[this.props.schedule.status];
    return <span className="scheduleStatus">{String.fromCharCode(statusHexCode)}</span>;
  }
}

export default ScheduleFormatter
