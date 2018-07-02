import React from "react";
import moment from "moment/moment";
import ReactTable from "react-table";
import "react-table/react-table.css";
import NewSchedulePopup from './NewSchedulePopup';
import PersonDetails from './PersonDetails';
import { initialEmptyMedicine, scheduledMedicineData, scheduledMedicineData2 } from "./dummyData";
import { isInBetween, getFormattedDate, addDays } from "./utils/DateUtils";
import { getSchedulesOf } from "./utils/utility";
import WeekControl from "./WeekControl";
import Schedules from "./Schedules";
import MedicineDetails from "./MedicineDetails";
import PropTypes from "prop-types";

function Headers(props) {
  return (
    <div className="headers">
      <PersonDetails person={props.patient} className="patientDetails" />
      <button onClick={props.showPopup}>+ add more</button>
      <p>{props.today.toDateString()}</p>
    </div>
  )
}


class PatientMAR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMedicineToPopup: initialEmptyMedicine,
      currentWeek: {
        startingDate: moment(props.today).day(0).toDate(),
        endingDate: moment(props.today).day(6).toDate(),
      },
      shallHidePopup: true,
      today: props.today
    };
    this.currentWeekData = [];
    this.showNewSchedulePopup = this.showNewSchedulePopup.bind(this);
    this.updateCurrentMedicine = this.updateCurrentMedicine.bind(this);
    this.pastWeek = this.pastWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.getThisWeekData = this.getThisWeekData.bind(this);
    this.saveFn = this.saveFn.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.getThisWeekData();
  }

  showNewSchedulePopup(currentMedicineToPopup) {
    this.setState({ shallHidePopup: false });
    this.updateCurrentMedicine(currentMedicineToPopup);
  }

  updateCurrentMedicine(medicine) {
    this.setState({ currentMedicineToPopup: medicine });
  }

  updateCurrentWeek(givenWeek) {
    this.setState({ currentWeek: givenWeek });
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

  getThisWeekData() {
    let scheduledMedicines = [];
    scheduledMedicines.push(scheduledMedicineData);
    scheduledMedicines.push(scheduledMedicineData2);
    let medicinesToBeScheduled = this.props.patient.medicinesToBeScheduled;
    this.currentWeekData = scheduledMedicines.concat(medicinesToBeScheduled);
  }

  hidePopup() {
    this.updateCurrentMedicine(initialEmptyMedicine);
    this.setState({ shallHidePopup: true })
  }

  saveFn() {
    //todo: Save the medicines schedules
    this.hidePopup();
  }

  getCurrentWeekColumns() {
    let startingDate = this.state.currentWeek.startingDate;
    let endingDate = this.state.currentWeek.endingDate;
    let columns = [];
    let medicineDetailColumn = {
      Header: "MedicineDetails",
      id:"MedicineDetails",
      accessor: d => <MedicineDetails medicine={d}/>
    };
    columns.push(medicineDetailColumn);
    for (let date = startingDate; isInBetween(date, startingDate, endingDate); date = addDays(date, 1)) {
      let formattedDate = getFormattedDate(date);
      let column = {
        Header: formattedDate,
        id: formattedDate,
        accessor: d => <Schedules schedules={getSchedulesOf(date, d.schedules)} />
      }
      columns.push(column);
    }
    return columns;
  }

  render() {
    let patient = this.props.patient;
    const currentWeek = this.state.currentWeek;
    return (
      <div>
        <NewSchedulePopup medicine={this.state.currentMedicineToPopup} hidden={this.state.shallHidePopup}
          patient={patient} onChange={this.updateCurrentMedicine}
          saveFn={this.saveFn} cancelFn={this.hidePopup}
        />

        <Headers patient={patient} today={this.state.today}
          showPopup={this.showNewSchedulePopup.bind(this, this.state.currentMedicineToPopup)} />
        <ReactTable
          data={this.currentWeekData}
          columns={this.getCurrentWeekColumns()}
          className="-highlight"
          PaginationComponent={() => <WeekControl className="weekControl" pastWeek={this.pastWeek}
            nextWeek={this.nextWeek} currentWeek={currentWeek}
          />}
          minRows={this.currentWeekData.length}
          showPaginationTop={true}
          showPaginationBottom={false}
        />
      </div>
    )
  }
}

PatientMAR.propTypes = {
  today: PropTypes.instanceOf(Date).isRequired
};


export default PatientMAR;