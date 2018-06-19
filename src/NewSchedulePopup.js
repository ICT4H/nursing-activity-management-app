import React from "react";
import PersonDetails from './PersonDetails'
import SelectOptions from "./SelectOptions";
import SaveCancelButtons from "./SaveCancelButtons";
import {BID, CAP, MG, ML, QD, QID, QOD, TAB, TBSP, TID, TSP} from "./constants";
import {getFormattedDate} from "./Utils/DateUtils";

class NewSchedulePopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    //todo: Might come from server using an API
    this.medicineUnits = [TAB, CAP, ML, MG, TSP, TBSP];
    this.frequencies = [QD, BID, TID, QID, QOD];
  }

  handleChange() {
    let medicine = {
      medicineName: this.refs.medicineName.value,
      dose: this.refs.dose.value,
      unit: this.refs.unit.value,
      frequency: this.refs.frequency.value,
      startingDate: this.refs.startingDate.value,
      endingDate: this.refs.endingDate.value
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
                type="number" placeholder="dose" ref="dose" min={1}
                value={medicine.dose} onChange={this.handleChange}/>

            <SelectOptions selectedValue={medicine.unit} ref="unit" options={this.medicineUnits}
                           className="chooseUnit" onChange={this.handleChange} chooseMsg="CHOOSE UNIT"/>

            <SelectOptions selectedValue={medicine.frequency} options={this.frequencies} className="chooseFrequency"
                           ref="frequency" chooseMsg="CHOOSE FREQUENCY" onChange={this.handleChange}/>

            <input type="date" ref="startingDate" placeholder="startingDate" onChange={this.handleChange}
                   value={getFormattedDate(medicine.startingDate)}/>
            <input type="date" ref="endingDate" placeholder="endingDate" onChange={this.handleChange}
                   value={getFormattedDate(medicine.endingDate)}/>
            <SaveCancelButtons saveFn={this.props.saveFn} cancelFn={this.props.cancelFn}/>
          </div>
        </div>
    )
  }
}

export default NewSchedulePopup;