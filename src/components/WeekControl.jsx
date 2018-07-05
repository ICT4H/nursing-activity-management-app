import React, {Component} from 'react';
import moment from "moment/moment";
import PropTypes from "prop-types";

class WeekControl extends Component {
  render() {
    const currentWeek = this.props.currentWeek;
    return (
        <div className={this.props.className}>
          <button onClick={this.props.pastWeek} className={"pastWeek"}>{"<"}</button>
          <div>{moment(currentWeek.startingDate).format('DD')}-
            {moment(currentWeek.endingDate).format('DD MMM')}
          </div>
          <button onClick={this.props.nextWeek} className={"nextWeek"}>{">"}</button>
        </div>
    )
  }
}

WeekControl.propTypes = {
  currentWeek: PropTypes.objectOf(PropTypes.instanceOf(Date)).isRequired,
  date: PropTypes.arrayOf(PropTypes.object)
};

export default WeekControl
