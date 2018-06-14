import React, {Component} from 'react';

class Timings extends Component {
  constructor(props){
    super(props);
    this.addMoreTimes=this.addMoreTimes.bind(this);
  }
  render() {
    return (<div ref="timings">
      <button onClick={this.addMoreTimes}>+ Add More Times</button>
    </div>)
  }

  addMoreTimes() {
    console.log(this.refs.timings.innerHTML);
  }
}

export default Timings
