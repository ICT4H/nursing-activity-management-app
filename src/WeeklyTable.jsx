import React, {Component} from 'react';
import moment from "moment/moment";
import PropTypes from 'prop-types';

class WeeklyTable extends Component {
  getCurrentWeekDates() {
    let currentWeekDates = [];
    let startingDate = this.props.currentWeek.startingDate;

    for (let i = 0; i < 7; i++) {
      currentWeekDates.push(<th key={'day' + i}>{moment(startingDate).day(i).toDate().toDateString()}</th>);
    }
    return currentWeekDates;
  }

  render() {
    let headerRow = [];
    headerRow.push(<th>{this.props.title ? this.props.title : ""}</th>);
    headerRow = headerRow.concat(this.getCurrentWeekDates());
    let resultantTableOfData = [];


    if (this.props.weekData && true) {
      resultantTableOfData = this.getRowForEachDataObject();
    }

    return (<div>
      <table>
        <tbody>
        <tr>{headerRow}</tr>
        {resultantTableOfData}
        </tbody>
      </table>
    </div>)
  }

  getRowForEachDataObject() {
    let startingDate = this.props.currentWeek.startingDate;
    let allRows = [];

    this.props.weekData.forEach((rowData) => {
      let row = [];
      row.push(<td>{rowData.getTitleOfRow()}</td>);
      for (let i = 0; i < 7; i++) {
        let date = moment(startingDate).day(i).toDate();
        row.push(<td>{rowData.getDetailsFor(date)}</td>);
      }
      allRows.push(<tr>{row}</tr>)
    });

    return allRows
  }
}


WeeklyTable.propTypes = {
  currentWeek: PropTypes.objectOf(PropTypes.instanceOf(Date)).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};
export default WeeklyTable
