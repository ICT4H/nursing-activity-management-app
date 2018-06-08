import React from "react";
import moment from "moment/moment";
import NewSchedulePopup from './NewSchedulePopup';
import PersonDetails from './PersonDetails';
import Medicine from './Medicine';

import WeeklyTable from "./WeeklyTable";


function scheduleFormatter(schedule) {
  return <p>{schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes()}</p>
}

let initialEmptyMedicine = {
  medicineName: "", dose: 0,
  unit: "", dosage: ""
};


let scheduledMedicineData = {
  medicineName: "Dopamine 40mg/ml",
  dose: 40,
  unit: "ml",
  schedules: [{
    scheduledTime: new Date('June 5, 2018 9:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 5, 2018 02:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 5, 2018 07:30:00'),
    status: "notAdministrated"
  }, {
    scheduledTime: new Date('June 7, 2018 02:30:00'),
    status: "administrated"
  }, {
    scheduledTime: new Date('June 8, 2018 02:30:00'),
    status: "toBeAdministrated"
  }]
};

let scheduledMedicine = new Medicine(scheduledMedicineData,scheduleFormatter);

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
    this.scheduledMedicines = [scheduledMedicine];
    this.showNewSchedulePopup = this.showNewSchedulePopup.bind(this);
    this.updateCurrentMedicine = this.updateCurrentMedicine.bind(this);
    this.resetCurrentMedicine = this.resetCurrentMedicine.bind(this);
    this.pastWeek = this.pastWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
  }

  showNewSchedulePopup(currentMedicineToPopup) {
    this.setState({currentMedicineToPopup: currentMedicineToPopup});
    makePopupVisible();
  }

  updateCurrentMedicine(medicine) {
    let newState = {
      currentMedicineToPopup: medicine,
      currentWeek: this.state.currentWeek,
      schedules: this.state.schedules
    };
    this.setState(newState);
  }

  updateCurrentWeek(givenWeek) {
    let newState = {
      currentMedicineToPopup: this.state.currentMedicineToPopup,
      currentWeek: givenWeek,
      schedules: this.state.schedules
    };
    this.setState(newState);
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

  render() {
    let patient = this.props.patient;
    return (
        <div>
          <NewSchedulePopup medicine={this.state.currentMedicineToPopup}
                            patient={patient} onChange={this.updateCurrentMedicine}
                            resetInputFields={this.resetCurrentMedicine}
          />

          <Titles patient={patient}
                  showPopup={this.showNewSchedulePopup.bind(this, this.state.currentMedicineToPopup)}/>
          <div className={"changeWeek"}>
            <button onClick={this.pastWeek}>{"<"}</button>
            <p>{moment(this.state.currentWeek.startingDate).format('DD')}-
              {moment(this.state.currentWeek.endingDate).format('DD MMM')}
            </p>
            <button onClick={this.nextWeek}>{">"}</button>
          </div>
          <WeeklyTable currentWeek={this.state.currentWeek} title={"medicineName"}
                       data={this.scheduledMedicines.concat(this.props.patient.medicinesToBeScheduled)}/>
        </div>
    )
  }

}

export default PatientMAR;