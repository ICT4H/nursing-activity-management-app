import React, {Component} from 'react';
import moment from "moment/moment";
import PropTypes from "prop-types";
import WeeklyTable from "./WeeklyTable";

class WeekControl extends Component {
  render() {
    return (
        <div className={this.props.className}>
          <button onClick={this.props.pastWeek} className={"pastWeek"}>{"<"}</button>
          <p>{moment(this.props.currentWeek.startingDate).format('DD')}-
            {moment(this.props.currentWeek.endingDate).format('DD MMM')}
          </p>
          <button onClick={this.props.nextWeek} className={"nextWeek"}>{">"}</button>
        </div>
    )
  }
}

WeeklyTable.propTypes = {
  currentWeek: PropTypes.objectOf(PropTypes.instanceOf(Date)).isRequired,
  date: PropTypes.arrayOf(PropTypes.object)
};

export default WeekControl
