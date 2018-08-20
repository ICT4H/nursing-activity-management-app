import React, {Component} from 'react';
import SelectOptions from "./SelectOptions";
import {WeekDaysOptions} from "../constants";

class DaysOfWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysOfWeek: []
    };
    this.handleDayOfWeekChange = this.handleDayOfWeekChange.bind(this);
  }

  render() {
    return <div className={this.getClassName()}>
      ChooseDays
      {this.getSelectDayOptions()}
    </div>
  }

  getClassName() {
    return (this.props.hidden) ? 'hidden' : 'daysOfWeek';
  }

  getSelectDayOptions() {
    let selectDayOptions = [];
    for (let i = 0; i < this.props.noOfDaysInWeek; i++) {
      selectDayOptions.push(<SelectOptions options={WeekDaysOptions}
                                           onChange={this.handleDayOfWeekChange.bind(this, i)}/>);
    }
    return selectDayOptions;
  }

  handleDayOfWeekChange(optionIndex, event) {
    let daysOfWeek = this.state.daysOfWeek;
    daysOfWeek[optionIndex] = event.target.value;
    this.setState({daysOfWeek});
    this.props.onChange(daysOfWeek);
  }
}

export default DaysOfWeek
