import React, {Component} from 'react';
import moment from "moment/moment";

class CurrentWeekDates extends Component {
  render() {
    let currentWeekDates=[];
    let startingDate=this.props.currentWeek.startingDate;

    for (let i=0;i<7;i++){
      currentWeekDates.push(<th key={'day'+i}>{moment(startingDate).day(i).toDate().toDateString()}</th>);
    }

    return currentWeekDates;
  }
}

export default CurrentWeekDates
