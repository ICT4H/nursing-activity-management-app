import React, {Component} from 'react';
import {ADMINISTRATED, NOTADMINISTRATED, TOBEADMINISTRATED} from "./constants";

function FormatTime(time) {
  //AM and PM not showing currently (24 hours clock);
  return <span className="scheduleTime">{time.getHours() + ":" + time.getMinutes()}</span>;
}

class ScheduleFormatter extends Component {
  render() {
    let schedule=this.props.schedule;
    return (<div className="schedule">
      <span>{FormatTime(schedule.scheduledTime)} {this.getScheduleStatus()}</span>
    </div>)
  }

  //3 ifs looks very bad
  getScheduleStatus() {
    if(this.props.schedule.status===ADMINISTRATED){
      return <span>&#x2705;</span>;
    }
    if(this.props.schedule.status===TOBEADMINISTRATED){
      return <span>&#x23F0;</span>
      // return <p>&#x23F1;</p>;
    }
    if(this.props.schedule.status===NOTADMINISTRATED){
            return <span>&#x26A0;</span>
    }
  }
}

export default ScheduleFormatter
