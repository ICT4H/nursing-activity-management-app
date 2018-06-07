function isSameDate(scheduledTime, givenDate) {
  return scheduledTime.getDate() === givenDate.getDate();
}

class Medicine {
  constructor(scheduledMedicineData) {
    this.medicineName = scheduledMedicineData.medicineName;
    this.dose = scheduledMedicineData.dose;
    this.unit = scheduledMedicineData.unit;
    this.schedules = scheduledMedicineData.schedules;
  }

  getTitleOfRow() {
    return this.medicineName;
  }

  getDetailsFor(givenDate) {
    let details = this.schedules.find((schedule) => isSameDate(schedule.scheduledTime, givenDate));
    if (details) {
      return this.getFormattedSchedule(details)
    }
    return "";
  }

  getFormattedSchedule(schedule) {
    return schedule.scheduledTime.getHours() + ":" + schedule.scheduledTime.getMinutes();
  }
}

export default Medicine;