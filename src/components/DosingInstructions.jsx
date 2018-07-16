import React, {Component} from 'react';
import SelectOptions from "./SelectOptions";
import PropTypes from "prop-types";

class DosingInstructions extends Component {
  render() {
    return (
        <div>
          <input type="number" placeholder="dose" min={1} value={this.props.doseValue}
              onChange={this.props.handleDoseChange}/>
          <SelectOptions selectedValue={this.props.doseUnit} options={this.props.medicineUnits} className="chooseUnit"
                         onChange={this.props.handleMedicineUnitChange} chooseMsg="CHOOSE UNIT"/>
        </div>
    )
  }
}


DosingInstructions.propTypes = {
  medicineUnits: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default DosingInstructions
