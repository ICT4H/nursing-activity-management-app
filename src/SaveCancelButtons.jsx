import React, {Component} from 'react';

class SaveCancelButtons extends Component {
  render() {
    return (
        <div>
          <button onClick={this.props.saveFn} className={"button"} value={"Save"}>Save</button>
          <button onClick={this.props.cancelFn} className={"button"} value={"Cancel"}>Cancel</button>
        </div>
    )
  }
}

export default SaveCancelButtons
