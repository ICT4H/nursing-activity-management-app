import React from "react";
import PersonDetails from './PersonDetails'
import SelectOptions from "./SelectOptions";
import SaveCancelButtons from "./SaveCancelButtons";
import {drugOrderConfigUrl} from "../constants";
import {getDosingTimesPerDay, getNoOfDaysInWeek, getResultantObject, isWeeklyFreqType} from "../utils/utility";
import AdministrateTimes from "./AdministrateTimes";
import MedicationInput from "./MedicationInput";
import DosingInstructions from "./DosingInstructions";
import DosingPeriod from "./DosingPeriod";
import HttpRequest from "../utils/HttpRequest";
import DaysOfWeek from "./DaysOfWeek";

class NewSchedulePopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleMedicineNameChange = this.handleMedicineNameChange.bind(this);
    this.handleDoseChange = this.handleDoseChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleMedicineUnitChange = this.handleMedicineUnitChange.bind(this);
    this.handleStartingDateChange = this.handleStartingDateChange.bind(this);
    this.handleEndingDateChange = this.handleEndingDateChange.bind(this);
    this.handleTimingChanges = this.handleTimingChanges.bind(this);
    this.updateDaysOfWeek = this.updateDaysOfWeek.bind(this);
    this.getFrequency = this.getFrequency.bind(this);
    this.state = {
      frequencies: [],
      doseUnits: []
    };
  }

  componentWillMount() {
    this.getFrequenciesAndDosingUnits();
  }

  render() {
    let drug = this.props.drug;
    return (
        <div className={this.getClassName()}>
          <div className="popupContent">
            <p>Add New Medicine Schedule</p>
            <PersonDetails person={this.props.patient} className={"patientDetails"}/>
            <MedicationInput drugName={drug.drugName} onChange={this.handleMedicineNameChange}/>
            <DosingInstructions medicineUnits={this.state.doseUnits}
                                handleMedicineUnitChange={this.handleMedicineUnitChange}
                                doseUnit={drug.doseUnits} doseValue={drug.dose}
                                handleDoseChange={this.handleDoseChange}
            />
            <SelectOptions selectedValue={drug.frequencyString} options={this.state.frequencies}
                           className="chooseFrequency"
                           chooseMsg="CHOOSE FREQUENCY" onChange={this.handleFrequencyChange}/>
            <DosingPeriod handleStartingDateChange={this.handleStartingDateChange}
                          handleEndingDateChange={this.handleEndingDateChange}
                          startingDate={drug.startingDate} endingDate={drug.endingDate}
            />
            <DaysOfWeek hidden={!isWeeklyFreqType(drug.frequencyString)} onChange={this.updateDaysOfWeek}
                        noOfDaysInWeek={getNoOfDaysInWeek(drug.frequencyString)}/>
            <AdministrateTimes noOfTimeInputs={this.getFrequencyPerDay(drug.frequencyString)}
                               handleTimeChange={this.handleTimingChanges}/>
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
    const frequency = this.getFrequency(event.target.value);
    let changedFrequency = {frequency: frequency};
    let changedFrequencyValue = {frequencyString: event.target.value};
    let resultantDrug = getResultantObject(this.props.drug, changedFrequencyValue);
    resultantDrug = getResultantObject(resultantDrug, changedFrequency);
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

  handleTimingChanges(timings) {
    let resultantDrug = getResultantObject(this.props.drug, {timings: timings});
    this.props.onChange(resultantDrug);
  }

  getFrequenciesAndDosingUnits() {
    HttpRequest
        .get(drugOrderConfigUrl, "application/json")
        .then((data) => {
          this.setState({frequencies: data.frequencies, doseUnits: data.doseUnits});
        })
        .catch((error) => {
          console.log(error.message);
        })
  }

  getFrequency(frequencyValue) {
    return this.state.frequencies.find((f) => f.name === frequencyValue);
  }

  getFrequencyPerDay(frequencyValue) {
    let frequency = this.state.frequencies.find((f) => f.name === frequencyValue);
    if (isWeeklyFreqType(frequencyValue)) {
      getDosingTimesPerDay(frequencyValue);
    }
    return (frequency) ? Math.ceil(frequency.frequencyPerDay || 0) : 0;
  }

  updateDaysOfWeek(daysOfWeek) {
    let resultantDrug = getResultantObject(this.props.drug, {daysOfWeek});
    this.props.onChange(resultantDrug);
  }
}

export default NewSchedulePopup;
