import React from "react";
import PersonDetails from './PersonDetails'
import SelectOptions from "./SelectOptions";

class NewSchedulePopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.allOptions = ["Tablet", "Capsule", "ml", "mg", "Tablespoon"];
  }

  hidePopup() {
    let popup = document.querySelector('.popup');
    popup.style.display = 'none';
    this.props.resetInputFields();
    return true;
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
        <div className={"popup"}>
          <div className={"popupContent"}>
            <p>Add New Medicine Schedule</p>
            <PersonDetails person={this.props.patient} className={"patientDetails"}/>
            <input
                type={"text"} placeholder={"medicineName"} ref="medicineName"
                value={medicine.medicineName} onChange={this.handleChange}/>

            <input
                type={"text"} placeholder={"dose"} ref="dose"
                value={medicine.dose} onChange={this.handleChange}/>

            <SelectOptions selectedValue={medicine.unit} ref={"unit"} options={this.allOptions}
                           onChange={this.handleChange}/>

            <SaveCancelButtons saveFn={this.hidePopup} cancelFn={this.hidePopup}/>
          </div>
        </div>
    )
  }
}


function SaveCancelButtons(props) {
  return (
      <div>
        <button onClick={props.saveFn} className={"button"} value={"Save"}>Save</button>
        <button onClick={props.cancelFn} className={"button"} value={"Cancel"}>Cancel</button>
      </div>)
}

export default NewSchedulePopup;