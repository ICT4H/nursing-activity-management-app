import React, {Component} from 'react';
import SelectOptions from "./SelectOptions";
import PropTypes from "prop-types";

class DosingInstructions extends Component {
  render() {
    return (
        <div>
          <label>Dose</label>
          <input type="number" placeholder="dose" min={1} value={this.props.doseValue}
                 onChange={this.props.handleDoseChange}/>
          <label>Unit</label>
          <SelectOptions selectedValue={this.props.doseUnit} options={this.props.medicineUnits} className="chooseUnit"
                         onChange={this.props.handleMedicineUnitChange} chooseMsg="CHOOSE UNIT"/>
        </div>
    )
  }
}


DosingInstructions.propTypes = {
  medicineUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default DosingInstructions
