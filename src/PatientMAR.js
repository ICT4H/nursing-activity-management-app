import React from "react";
import moment from "moment/moment";
import NewSchedulePopup from './NewSchedulePopup';
import PersonDetails from './PersonDetails';
import WeeklyTable from "./WeeklyTable";
import {scheduledMedicineData, scheduledMedicineData2} from "./dummyData";
import Medicine from "./models/Medicine";
import WeekControl from "./WeekControl";

let initialEmptyMedicine = {
  medicineName: "", dose: 0,
  unit: "", dosage: ""
};

function scheduleFormatter(schedule) {
  return <p>{schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes()}</p>;
}

function Titles(props) {
  return (
      <div className={"titles"}>
        <PersonDetails person={props.patient} className={"patientDetails"}/>
        <button onClick={props.showPopup}>+ add more</button>
        <p>{new Date().toDateString()}</p>
      </div>
  )
}

function makePopupVisible() {
  let popup = document.querySelector('.popup');
  popup.style.display = 'block';
  return true;
}

class PatientMAR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMedicineToPopup: initialEmptyMedicine,
      currentWeek: {
        startingDate: moment().day(0).toDate(),
        endingDate: moment().day(6).toDate()
      }
    };
    this.currentWeekData = [];
    this.showNewSchedulePopup = this.showNewSchedulePopup.bind(this);
    this.updateCurrentMedicine = this.updateCurrentMedicine.bind(this);
    this.resetCurrentMedicine = this.resetCurrentMedicine.bind(this);
    this.pastWeek = this.pastWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.prepareThisWeekData = this.prepareThisWeekData.bind(this);
    this.saveFn = this.saveFn.bind(this);
    this.cancelFn = this.cancelFn.bind(this);
    this.prepareThisWeekData();
  }

  showNewSchedulePopup(currentMedicineToPopup) {
    this.setState({currentMedicineToPopup: currentMedicineToPopup});
    makePopupVisible();
  }

  updateCurrentMedicine(medicine) {
    this.setState({currentMedicineToPopup: medicine});
  }

  updateCurrentWeek(givenWeek) {
    this.setState({currentWeek: givenWeek});
  }

  resetCurrentMedicine() {
    this.updateCurrentMedicine(initialEmptyMedicine);
  }

  pastWeek() {
    let pastWeek = {};
    pastWeek.startingDate = moment(this.state.currentWeek.startingDate).day(-7).toDate();
    pastWeek.endingDate = moment(pastWeek.startingDate).day(6).toDate();
    this.updateCurrentWeek(pastWeek);
  }

  nextWeek() {
    let nextWeek = {};
    nextWeek.startingDate = moment(this.state.currentWeek.startingDate).day(7).toDate();
    nextWeek.endingDate = moment(nextWeek.startingDate).day(6).toDate();
    this.updateCurrentWeek(nextWeek);
  }

  prepareThisWeekData() {
    let scheduledMedicines = [];
    scheduledMedicines.push(new Medicine(scheduledMedicineData, scheduleFormatter, this.showNewSchedulePopup.bind(null, scheduledMedicineData)));
    scheduledMedicines.push(new Medicine(scheduledMedicineData2, scheduleFormatter, this.showNewSchedulePopup.bind(null, scheduledMedicineData2)));
    let medicinesToBeScheduled = this.props.patient.medicinesToBeScheduled.map((medData) => new Medicine(medData, null, this.showNewSchedulePopup.bind(null, medData)))
    this.currentWeekData = scheduledMedicines.concat(medicinesToBeScheduled);
  }

  hidePopup() {
    let popup = document.querySelector('.popup');
    popup.style.display = 'none';
    this.resetCurrentMedicine();
    return true;
  }

  saveFn() {
    //todo: Save the medicines schedules
    this.hidePopup();
  }

  cancelFn() {
    //todo: Save the medicines
    this.hidePopup();
  }

  render() {
    let patient = this.props.patient;
    return (
        <div>
          <NewSchedulePopup medicine={this.state.currentMedicineToPopup}
                            patient={patient} onChange={this.updateCurrentMedicine}
                            saveFn={this.saveFn} cancelFn={this.cancelFn}
          />

          <Titles patient={patient}
                  showPopup={this.showNewSchedulePopup.bind(this, this.state.currentMedicineToPopup)}/>
          <WeekControl className={"changeWeek"} pastWeek={this.pastWeek}
                       nextWeek={this.nextWeek} currentWeek={this.state.currentWeek}
          />
          <WeeklyTable currentWeek={this.state.currentWeek} title={"medicineName"}
                       data={this.currentWeekData}/>
        </div>
    )
  }
}

export default PatientMAR;