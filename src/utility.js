import React from "react";
import moment from "moment/moment";
let PatientDetails = function (props) {
  let patient = props.patient;
  return (
      <div className={"PatientDetails"}>
        <p>
          {patient.name +" "+ patient.gender +", "+patient.age + " yrs"}
        </p>
      </div>
  );
};
function CurrentWeekDates(props){
  let currentWeekDates=[];
  let startingDate=props.currentWeek.startingDate;

  for (let i=0;i<7;i++){
    currentWeekDates.push(<th key={'day'+i}>{moment(startingDate).day(i).toDate().toDateString()}</th>);
  }

  return currentWeekDates;
}

function MedicineDetails(props) {
  let medicine=props.medicine;
  let onClickFunction=props.showPopup&&props.showPopup.bind(null,medicine);
  return(
      <div onClick={onClickFunction} className={"medicineDetails"}>
        {medicine.medicineName}
        <br/>
        {medicine.dose+"\t"+medicine.unit}
      </div>
  )
}

function MedicineWithEmptySchedules(props){
  let schedules = [];
  schedules.push(<td>{MedicineDetails(props)}</td>);
  for (let i=0;i<7;i++){
    schedules.push(<td/>)
  }

  return <tr>{schedules}</tr>;
}

function MedicinesTobeScheduled(props){
  let allMedicines=[];
  for (let i = 0; i < props.medicinesToBeScheduled.length; i++){
    allMedicines.push(
        <MedicineWithEmptySchedules medicine={props.medicinesToBeScheduled[i]} showPopup={props.showPopup}/>);
  }
  return allMedicines;
}
//
// function Schedules(props){
//   return <td>{props.scheduleDetails.scheduledTime.toDateString()}</td>
// }

function MedicineWithSchedules(props){
  let schedules = [];
  schedules.push(<td><MedicineDetails medicine={props.schedules[0]}/></td>);
  // for (let i=0;i<7.length;i++){
  //   props.
  //   schedules.push(<Schedules scheduleDetails={props.schedules[i]}/>)
  // }
  for (let i=0;i<7;i++){
    schedules.push(<td/>)
  }
  return <tr>{schedules}</tr>;
}

function ScheduledMedicines(props){
  let allMedicines=[];
  for (let i = 0; i < props.schedules.length; i++){
    allMedicines.push(
        <MedicineWithSchedules schedules={props.schedules[i]} currentWeek={props.currentWeek}/>);
  }
  return allMedicines;
}


export {PatientDetails,ScheduledMedicines,MedicinesTobeScheduled,MedicineDetails,CurrentWeekDates}