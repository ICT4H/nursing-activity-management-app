import React from "react";
import PersonDetails from './PersonDetails'
import SelectOptions from "./SelectOptions";
import SaveCancelButtons from "./SaveCancelButtons";
import {BID, CAP, MG, ML, QD, QID, QOD, TAB, TBSP, TID, TSP} from "./constants";
import {getFormattedDate} from "./utils/DateUtils";
import {getResultantObject, mapFrequencyToNumber} from "./utils/utility";
import AdministrateTimes from "./AdministrateTimes";
import MedicationInput from "./MedicationInput";

class NewSchedulePopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleMedicineNameChange = this.handleMedicineNameChange.bind(this);
    this.handleDoseChange = this.handleDoseChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleMedicineUnitChange = this.handleMedicineUnitChange.bind(this);
    this.handleStartingDateChange = this.handleStartingDateChange.bind(this);
    this.handleEndingDateChange = this.handleEndingDateChange.bind(this);
    //todo: Might come from server using an API
    this.medicineUnits = [TAB, CAP, ML, MG, TSP, TBSP];
    this.frequencies = [QD, BID, TID, QID, QOD];
  }

  render() {
    let medicine = this.props.medicine;
    return (
        <div className={this.getClassName()}>
          <div className="popupContent">
            <p>Add New Medicine Schedule</p>
            <PersonDetails person={this.props.patient} className={"patientDetails"}/>
            <MedicationInput medicineName={medicine.medicineName} onChange={this.handleMedicineNameChange}/>
            <input
                type="number" placeholder="dose" ref="dose" min={1}
                value={medicine.dose} onChange={this.handleDoseChange}/>
            <SelectOptions selectedValue={medicine.unit} ref="unit" options={this.medicineUnits}
                           className="chooseUnit" onChange={this.handleMedicineUnitChange} chooseMsg="CHOOSE UNIT"/>

            <SelectOptions selectedValue={medicine.frequency} options={this.frequencies} className="chooseFrequency"
                           ref="frequency" chooseMsg="CHOOSE FREQUENCY" onChange={this.handleFrequencyChange}/>
            <input type="date" id="scheduleStartingDate" placeholder="startingDate"
                   onChange={this.handleStartingDateChange}
                   value={getFormattedDate(medicine.startingDate)}/>
            <input type="date" id="scheduleEndingDate" placeholder="endingDate" onChange={this.handleEndingDateChange}
                   value={getFormattedDate(medicine.endingDate)}/>
            <AdministrateTimes noOfTimeInputs={mapFrequencyToNumber(medicine.frequency)}/>
            <SaveCancelButtons saveFn={this.props.saveFn} cancelFn={this.props.cancelFn}/>
          </div>
        </div>
    )
  }

  handleMedicineNameChange(event) {
    let changedMedicineName = {medicineName: event.target.value};
    let resultantMedicine = getResultantObject(this.props.medicine, changedMedicineName);
    this.props.onChange(resultantMedicine);
  }

  handleDoseChange(event) {
    let changedDose = {dose: event.target.value};
    let resultantMedicine = getResultantObject(this.props.medicine, changedDose);
    this.props.onChange(resultantMedicine);
  }

  handleFrequencyChange(event) {
    let changedFrequency = {frequency: event.target.value};
    let resultantMedicine = getResultantObject(this.props.medicine, changedFrequency);
    this.props.onChange(resultantMedicine);
  }

  handleStartingDateChange(event) {
    let startingDate = new Date(event.target.value);
    let changedStartingDate = {startingDate: startingDate};
    let resultantMedicine = getResultantObject(this.props.medicine, changedStartingDate);
    this.props.onChange(resultantMedicine);
  }

  handleEndingDateChange(event) {
    let startingDate = new Date(event.target.value);
    let changedEndingDate = {endingDate: startingDate};
    let resultantMedicine = getResultantObject(this.props.medicine, changedEndingDate);
    this.props.onChange(resultantMedicine);
  }

  getClassName() {
    return (this.props.hidden) ? "hidden" : "newSchedulePopup";
  }

  handleMedicineUnitChange(event) {
    let changedMedicineUnit = {unit: event.target.value};
    let resultantMedicine = getResultantObject(this.props.medicine, changedMedicineUnit);
    this.props.onChange(resultantMedicine);
  }
}

export default NewSchedulePopup;