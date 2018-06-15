import React from "react";

function isSameDate(scheduledTime, givenDate) {
  let isSameDay = scheduledTime.getDate() === givenDate.getDate();
  let isSameMonth = scheduledTime.getMonth() === givenDate.getMonth();
  return isSameDay && isSameMonth;
}

function defaultScheduleFormatter(schedule) {
  return <p>{schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes()}</p>;
}

class Medicine {
  constructor(medicineData, scheduleFormatter, onClickOfTitle) {
    this.onClickOfTitle = onClickOfTitle;
    this.scheduleFormatter = scheduleFormatter || defaultScheduleFormatter;
    this.medicineName = medicineData.medicineName;
    this.dose = medicineData.dose;
    this.unit = medicineData.unit;
    this.schedules = medicineData.schedules;
    this.frequency = medicineData.frequency;
    this.startingDate = medicineData.startingDate;
    this.scheduleTimes=medicineData.scheduleTimes;
  }

  getTitleOfRow() {
    return (<div className={"medicineDetails"} onClick={this.onClickOfTitle}>
      <p>{this.medicineName}</p>
      <p>{this.dose} {this.unit}</p>
    </div>);
  }

  getDetailsFor(givenDate) {
    let schedules = this.schedules.filter((schedule) => isSameDate(schedule.scheduledTime, givenDate));
    if (schedules) {
      return <div>{schedules.map((s) => < this.scheduleFormatter schedule={s} />)}</div>;
    }
    return <div/>;
  }
}

export default Medicine;