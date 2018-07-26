import React, {Component} from 'react';

class PanelElement extends Component {
  render() {
    return (<div className="panelElement">
      <p>{this.props.message}</p>
      <button onClick={this.props.action}>{this.props.actionName}</button>
    </div>)
  }
}

export default PanelElement
