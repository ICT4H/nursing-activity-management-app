import React, {Component} from 'react';
import {SYMBOLSHEXCODE} from "./constants";
import moment from "moment";

function FormatTime(time) {
  return <span className="scheduleTime">{moment(time).format("h:mm A")}</span>;
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
