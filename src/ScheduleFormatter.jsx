import React, {Component} from 'react';
import {SYMBOLSHEXCODE} from "./constants";

function FormatTime(time) {
  //AM and PM not showing currently (24 hours clock);
  return <span className="scheduleTime">{time.getHours() + ":" + time.getMinutes()}</span>;
}

class ScheduleFormatter extends Component {
  render() {
    let schedule = this.props.schedule;
    return (<div className="schedule">
      <span>{FormatTime(schedule.scheduledTime)} {this.getScheduleStatus()}</span>
    </div>)
  }

  getScheduleStatus() {
    let statusHexCode = SYMBOLSHEXCODE[this.props.schedule.status];
    return <span className="scheduleStatus">{String.fromCharCode(statusHexCode)}</span>;
  }
}

export default ScheduleFormatter
