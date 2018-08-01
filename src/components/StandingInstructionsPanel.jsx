import React, {Component} from 'react';
import PanelElement from "./PanelElement";
import PropTypes from "prop-types";

class StandingInstructionsPanel extends Component {
  render() {
    const newDrugs = this.props.drugs || [];
    return (<div className={this.props.className}>
      {this.createPanelElements(newDrugs)}
    </div>)
  }

  createPanelElements(drugs) {
    let panelElements = [];
    for (let i = 0; i < drugs.length; i++) {
      const drug = drugs[i];
      panelElements.push(<PanelElement message={drug.drugName} action={this.props.action.bind(null, drug)}
                                       actionName={this.props.actionName}
                                       key={`PanelElement${drug.drugName}`}/>);
    }
    return panelElements;
  }
}

StandingInstructionsPanel.propTypes = {
  action: PropTypes.instanceOf(Function).isRequired
};

export default StandingInstructionsPanel
