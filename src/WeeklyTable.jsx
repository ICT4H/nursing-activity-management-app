import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addDays, isInBetween} from "./utils/DateUtils";

class WeeklyTable extends Component {
  getCurrentWeekDates() {
    let currentWeekDates = [];
    let startingDate = this.props.currentWeek.startingDate;
    let endingDate = this.props.currentWeek.endingDate;

    for (let i = startingDate; isInBetween(i, startingDate, endingDate); i = addDays(i, 1)) {
      currentWeekDates.push(<th>{i.toDateString()}</th>)
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
    let endingDate = this.props.currentWeek.endingDate;
    let allRows = [];

    this.props.weekData.forEach((rowData) => {
      let row = [];
      row.push(<td>{rowData.getTitleOfRow()}</td>);
      for (let i = startingDate; isInBetween(i, startingDate, endingDate); i = addDays(i, 1)) {
        row.push(<td>{rowData.getDetailsFor(i)}</td>);
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
