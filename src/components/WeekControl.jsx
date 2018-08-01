import React, {Component} from 'react';
import PropTypes from "prop-types";
import DateUtils from "../utils/DateUtils";

class WeekControl extends Component {
  render() {
    const currentWeek = this.props.currentWeek;
    return (
        <div className={this.props.className}>
          <button onClick={this.props.goToPastWeek} className={"pastWeek"}>{"<"}</button>
          <div>
            {DateUtils.formatWeekStartEndDate(currentWeek)}
          </div>
          <button onClick={this.props.goToNextWeek} className={"nextWeek"}>{">"}</button>
        </div>
    )
  }
}

WeekControl.propTypes = {
  currentWeek: PropTypes.objectOf(PropTypes.instanceOf(Date)).isRequired,
  date: PropTypes.arrayOf(PropTypes.object)
};

export default WeekControl
