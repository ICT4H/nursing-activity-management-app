import React, {Component} from 'react';
import PropTypes from "prop-types";

class AdministrateTimes extends Component {
  render() {
    let inputs = [];
    for (let i = 0; i < this.props.noOfTimeInputs; i++) {
      inputs.push(<input key={`administrateTime${i}`} type="time"/>);
    }
    return (<div className="AdministrateTimes">{inputs}</div>)
  }
}


AdministrateTimes.proptype = {
  noOfTimeInputs:PropTypes.number.isRequired
};
export default AdministrateTimes
