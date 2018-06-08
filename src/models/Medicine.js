import React from "react";

function isSameDate(scheduledTime, givenDate) {
  return scheduledTime.getDate() === givenDate.getDate();
}

function defaultScheduleFormatter(schedule){
  return <p>{schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes()}</p>;
}

class Medicine {
  constructor(scheduledMedicineData,scheduleFormatter) {
    this.scheduleFormatter = scheduleFormatter||defaultScheduleFormatter;
    this.medicineName = scheduledMedicineData.medicineName;
    this.dose = scheduledMedicineData.dose;
    this.unit = scheduledMedicineData.unit;
    this.schedules = scheduledMedicineData.schedules;
  }

  getTitleOfRow() {
    return (<div className={"medicineDetails"}>
      <p>{this.medicineName}</p>
      <p>{this.dose} {this.unit}</p>
    </div>);
  }

  getDetailsFor(givenDate) {
    let schedules = this.schedules.filter((schedule) => isSameDate(schedule.scheduledTime, givenDate));
    if (schedules) {
      return <div>{schedules.map((s)=>this.scheduleFormatter(s))}</div>;
    }
    return <div/>;
  }
}

export default Medicine;