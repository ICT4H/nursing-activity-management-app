import React from "react";
import {PatientDetails} from './utility'

class NewSchedulePopup extends React.Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.hidePopup=this.hidePopup.bind(this);
  }

  hidePopup(){
    let popup=document.querySelector('.popup');
    popup.style.display='none';
    this.props.resetInputFields();
    return true;
  }

  handleChange(){
    let medicine = {
      medicineName:this.refs.medicineName.value,
      dose:this.refs.dose.value
    };
    this.props.onChange(medicine);
  }
  render() {
    console.log(this.props.medicine.medicineName);
    return (
        <div className={"popup"}>
          <div className={"popupContent"}>
            <p>Add New Medicine Schedule</p>
            <PatientDetails patient={this.props.patient}/>
            <input
                type={"text"} placeholder={"medicineName"} ref="medicineName"
                value={this.props.medicine.medicineName} onChange={this.handleChange}/>

            <input
                type={"text"} placeholder={"dose"} ref="dose"
                value={this.props.medicine.dose} onChange={this.handleChange}/>

            <SelectingUnit selectedUnit={this.props.medicine.unit}/>

            <SaveCancelButtons saveFn={this.hidePopup} cancelFn={this.hidePopup}/>
          </div>
        </div>
    )
  }
}


function SaveCancelButtons(props) {
  return(
      <div>
        <button onClick={props.saveFn} className={"button"}>Save</button>
        <button onClick={props.cancelFn} className={"button"}>Cancel</button>
      </div>
      )
}

function SelectingUnit (props){
  return(
      <select>
        <option value="">selectUnit</option>
        <option value="Tablet">Tablet</option>
        <option value="Capsule">Capsule</option>
        <option value="ml">ml</option>
        <option value="mg">mg</option>
        <option value="Tablespoon">Tablespoon</option>
      </select>

  );
}

// function InputField(props) {
//   return(
//       <input
//           type={props.type} placeholder={props.placeholder} ref={props.ref}
//           value={props.value} onChange={props.onChange}/>
//   )
// }
export default NewSchedulePopup;