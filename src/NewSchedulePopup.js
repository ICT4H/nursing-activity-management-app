import React from "react";
import PersonDetails from './PersonDetails'
import SelectOptions from "./SelectOptions";
import SaveCancelButtons from "./SaveCancelButtons";

class NewSchedulePopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    //todo: Might come from server using an API
    this.allOptions = ["Tablet", "Capsule", "ml", "mg", "Tablespoon"];
  }

  handleChange() {
    let medicine = {
      medicineName: this.refs.medicineName.value,
      dose: this.refs.dose.value,
      unit: this.refs.unit.value
    };
    this.props.onChange(medicine);
  }

  render() {
    let medicine = this.props.medicine;
    return (
        <div className="popup">
          <div className="popupContent">
            <p>Add New Medicine Schedule</p>
            <PersonDetails person={this.props.patient}
                           className={"patientDetails"}/>
            <input
                type="text" placeholder="medicineName" ref="medicineName"
                value={medicine.medicineName} onChange={this.handleChange}/>

            <input
                type="text" placeholder="dose" ref="dose"
                value={medicine.dose} onChange={this.handleChange}/>

            <SelectOptions selectedValue={medicine.unit} ref="unit" options={this.allOptions}
                           onChange={this.handleChange}/>

            <SaveCancelButtons saveFn={this.props.saveFn} cancelFn={this.props.cancelFn}/>
          </div>
        </div>
    )
  }
}

export default NewSchedulePopup;