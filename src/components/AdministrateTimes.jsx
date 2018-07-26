import React, {Component} from 'react';
import PropTypes from "prop-types";

class AdministrateTimes extends Component {
  constructor(props){
    super(props);
    this.state = {
      timings : []
    };
    this.changeTimes = this.changeTimes.bind(this);
  }

  render() {
    let inputs = [];
    for (let i = 0; i < this.props.noOfTimeInputs; i++) {
      inputs.push(<input key={`administrateTime${i}`} type="time" onChange={this.changeTimes.bind(this,i)}
                         className="administrateTime"/>);
    }
    return (<div className="AdministrateTimes">{inputs}</div>)
  }

  changeTimes(indexOfTiming,event) {
    let newTimings  = this.state.timings;
    newTimings[indexOfTiming] = event.target.value;
    this.setState({timings:newTimings});
    this.props.handleTimeChange(newTimings);
  }
}


AdministrateTimes.proptype = {
  noOfTimeInputs:PropTypes.number.isRequired
};
export default AdministrateTimes
