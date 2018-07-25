import React from "react";
import PersonDetails from './PersonDetails'
import SelectOptions from "./SelectOptions";
import SaveCancelButtons from "./SaveCancelButtons";
import {BID, CAP, MG, ML, QD, QID, QOD, TAB, TBSP, TID, TSP} from "../constants";
import {getResultantObject, mapFrequencyToNumber} from "../utils/utility";
import AdministrateTimes from "./AdministrateTimes";
import MedicationInput from "./MedicationInput";
import DosingInstructions from "./DosingInstructions";
import DosingPeriod from "./DosingPeriod";

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
    let drug = this.props.drug;
    return (
        <div className={this.getClassName()}>
          <div className="popupContent">
            <p>Add New Medicine Schedule</p>
            <PersonDetails person={this.props.patient} className={"patientDetails"}/>
            <MedicationInput drugName={drug.drugName} onChange={this.handleMedicineNameChange}/>
            <DosingInstructions medicineUnits={this.medicineUnits}
                                handleMedicineUnitChange={this.handleMedicineUnitChange}
                                doseUnit={drug.unit} doseValue={drug.dose}
                                handleDoseChange={this.handleDoseChange}
            />
            <SelectOptions selectedValue={drug.frequency} options={this.frequencies} className="chooseFrequency"
                           ref="frequency" chooseMsg="CHOOSE FREQUENCY" onChange={this.handleFrequencyChange}/>
            <DosingPeriod handleStartingDateChange={this.handleStartingDateChange}
                          handleEndingDateChange={this.handleEndingDateChange}
                          startingDate={drug.startingDate} endingDate={drug.endingDate}
            />
            <AdministrateTimes noOfTimeInputs={mapFrequencyToNumber(drug.frequency)}/>
            <SaveCancelButtons saveFn={this.props.saveFn} cancelFn={this.props.cancelFn}/>
          </div>
        </div>
    )
  }

  handleMedicineNameChange(event) {
    let changedDrugName = {drugName: event.target.value};
    let resultantDrug = getResultantObject(this.props.drug, changedDrugName);
    this.props.onChange(resultantDrug);
  }

  handleDoseChange(event) {
    let changedDose = {dose: event.target.value};
    let resultantDrug = getResultantObject(this.props.drug, changedDose);
    this.props.onChange(resultantDrug);
  }

  handleFrequencyChange(event) {
    let changedFrequency = {frequency: event.target.value};
    let resultantDrug = getResultantObject(this.props.drug, changedFrequency);
    this.props.onChange(resultantDrug);
  }

  handleStartingDateChange(event) {
    let startingDate = new Date(event.target.value);
    let changedStartingDate = {startingDate: startingDate};
    let resultantDrug = getResultantObject(this.props.drug, changedStartingDate);
    this.props.onChange(resultantDrug);
  }

  handleEndingDateChange(event) {
    let startingDate = new Date(event.target.value);
    let changedEndingDate = {endingDate: startingDate};
    let resultantDrug = getResultantObject(this.props.drug, changedEndingDate);
    this.props.onChange(resultantDrug);
  }

  getClassName() {
    return (this.props.hidden) ? "hidden" : "newSchedulePopup";
  }

  handleMedicineUnitChange(event) {
    let changedMedicineUnit = {unit: event.target.value};
    let resultantDrug = getResultantObject(this.props.drug, changedMedicineUnit);
    this.props.onChange(resultantDrug);
  }
}

export default NewSchedulePopup;
