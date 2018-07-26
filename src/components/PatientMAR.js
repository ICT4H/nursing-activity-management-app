import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import NewSchedulePopup from './NewSchedulePopup';
import {initialEmptyDrug} from "../Data/dummyData";
import {getSchedulesOf, groupByMedicineOrder} from "../utils/utility";
import WeekControl from "./WeekControl";
import Schedules from "./Schedules";
import DrugDetails from "./DrugDetails";
import PropTypes from "prop-types";
import DateUtils from "../utils/DateUtils";
import Headers from "./Headers";
import FetchData from "../Data/FetchData";
import AppDescriptor from "../AppDescriptor";

class PatientMAR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDrugToPopup: initialEmptyDrug,
      shallHidePopup: true,
      today: props.today,
      patientUuid: props.patientUuid,
      currentWeekData: []
    };
    this.showNewSchedulePopup = this.showNewSchedulePopup.bind(this);
    this.updateCurrentMedicine = this.updateCurrentMedicine.bind(this);
    this.goToPastWeek = this.goToPastWeek.bind(this);
    this.goToNextWeek = this.goToNextWeek.bind(this);
    this.getThisWeekData = this.getThisWeekData.bind(this);
    this.saveFn = this.saveFn.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
  }

  componentWillMount() {
    let currentWeek = this.getCurrentWeekDates();
    this.setState({currentWeek: currentWeek});
    this.getThisWeekData(currentWeek);
  }

  getCurrentWeekDates() {
    let startOfWeek = AppDescriptor.getStartWeekConfig() || 2;
    return DateUtils.getWeekStatingAndEndingDates(this.props.today, startOfWeek);
  }

  showNewSchedulePopup(currentMedicineToPopup) {
    this.setState({shallHidePopup: false});
    this.updateCurrentMedicine(currentMedicineToPopup);
  }

  updateCurrentMedicine(medicine) {
    this.setState({currentDrugToPopup: medicine});
  }

  goToPastWeek() {
    let pastWeek = DateUtils.getPastWeekStatingAndEndingDates(this.state.currentWeek.startingDate);
    this.getThisWeekData(pastWeek);
    this.setState({currentWeek: pastWeek});
  }

  goToNextWeek() {
    let nextWeek = DateUtils.getNextWeekStatingAndEndingDates(this.state.currentWeek.startingDate);
    this.getThisWeekData(nextWeek);
    this.setState({currentWeek: nextWeek});
  }

  getThisWeekData(currentWeek) {
    let callBack = function (schedules) {
      let currentWeekData = groupByMedicineOrder(schedules);
      this.setState({currentWeekData});
    };
    let startDate = DateUtils.getFormattedDate(currentWeek.startingDate);
    let endDate = DateUtils.getFormattedDate(currentWeek.endingDate);
    FetchData.fetchDataForPatient(this.state.patientUuid, startDate, endDate, callBack.bind(this));
  }

  hidePopup() {
    this.updateCurrentMedicine(initialEmptyDrug);
    this.setState({shallHidePopup: true})
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
      Header: "DrugDetails",
      id: "DrugDetails",
      accessor: d => <DrugDetails drug={d} onClick={this.showNewSchedulePopup.bind(null, d)}/>
    };
    columns.push(medicineDetailColumn);
    for (let date = startingDate; DateUtils.isInBetween(date, startingDate, endingDate); date = DateUtils.addDays(date, 1)) {
      let formattedDate = DateUtils.getDateAndDay(date);
      let column = {
        Header: formattedDate,
        id: formattedDate,
        accessor: d => <Schedules schedules={getSchedulesOf(date, d.schedules)}/>
      };
      columns.push(column);
    }
    return columns;
  }

  render() {
    let patient = this.props.patient;
    const currentWeek = this.state.currentWeek;
    return (
        <div>
          <NewSchedulePopup drug={this.state.currentDrugToPopup} hidden={this.state.shallHidePopup}
                            patient={patient} onChange={this.updateCurrentMedicine}
                            saveFn={this.saveFn} cancelFn={this.hidePopup}
          />

          <Headers patient={patient} today={this.state.today}
                   onClickOfButton={this.showNewSchedulePopup.bind(this, this.state.currentDrugToPopup)}/>
          <ReactTable
              data={this.state.currentWeekData}
              columns={this.getCurrentWeekColumns()}
              className="-highlight"
              PaginationComponent={() => <WeekControl className="weekControl" goToPastWeek={this.goToPastWeek}
                                                      goToNextWeek={this.goToNextWeek} currentWeek={currentWeek}
              />}
              minRows={this.state.currentWeekData.length}
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
