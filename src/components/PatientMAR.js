import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import NewSchedulePopup from './NewSchedulePopup';
import {initialEmptyMedicine} from "../Data/dummyData";
import {getSchedulesOf, groupByMedicineOrder} from "../utils/utility";
import WeekControl from "./WeekControl";
import Schedules from "./Schedules";
import MedicineDetails from "./MedicineDetails";
import PropTypes from "prop-types";
import DateUtils from "../utils/DateUtils";
import Headers from "./Headers";
import 'whatwg-fetch';

class PatientMAR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMedicineToPopup: initialEmptyMedicine,
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
    this.getThisWeekData();
    let currentWeek = DateUtils.getWeekStatingAndEndingDates(this.props.today);
    this.setState({currentWeek: currentWeek})
  }

  showNewSchedulePopup(currentMedicineToPopup) {
    this.setState({shallHidePopup: false});
    this.updateCurrentMedicine(currentMedicineToPopup);
  }

  updateCurrentMedicine(medicine) {
    this.setState({currentMedicineToPopup: medicine});
  }

  goToPastWeek() {
    let pastWeek = DateUtils.getPastWeekStatingAndEndingDates(this.state.currentWeek.startingDate);
    this.setState({currentWeek: pastWeek});
  }

  goToNextWeek() {
    let nextWeek = DateUtils.getNextWeekStatingAndEndingDates(this.state.currentWeek.startingDate);
    this.setState({currentWeek: nextWeek});
  }

  getThisWeekData() {
    fetch(`/openmrs/ws/rest/v1/ipd/schedules/patient/${this.state.patientUuid}`, {credentials: "include"}).then((res) => {
      res.json().then((schedules) => {
        let currentWeekData = groupByMedicineOrder(schedules);
        this.setState({currentWeekData});
      });
    }).catch((err) => {
      // console.log(err);
    });
  }

  hidePopup() {
    this.updateCurrentMedicine(initialEmptyMedicine);
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
      Header: "MedicineDetails",
      id: "MedicineDetails",
      accessor: d => <MedicineDetails medicine={d} onClick={this.showNewSchedulePopup.bind(null, d)}/>
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
          <NewSchedulePopup medicine={this.state.currentMedicineToPopup} hidden={this.state.shallHidePopup}
                            patient={patient} onChange={this.updateCurrentMedicine}
                            saveFn={this.saveFn} cancelFn={this.hidePopup}
          />

          <Headers patient={patient} today={this.state.today}
                   onClickOfButton={this.showNewSchedulePopup.bind(this, this.state.currentMedicineToPopup)}/>
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
