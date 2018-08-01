import React, {Component} from 'react';
import PersonDetails from "./PersonDetails";
import PropTypes from "prop-types";

class Headers extends Component {
  render() {
    return (
        <div className="headers">
          <PersonDetails person={this.props.patient} className="patientDetails"/>
          <button onClick={this.props.onClickOfButton}>+ add more</button>
          <p>{this.props.today.toDateString()}</p>
        </div>
    )
  }
}

Headers.propTypes = {
  today: PropTypes.instanceOf(Date).isRequired
};


export default Headers
