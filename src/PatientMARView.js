import React from "react";
import moment from "moment/moment";
import NewSchedulePopup from './NewSchedulePopup';

let initialEmptyMedicine = {
  name: "", dose: 0,
  unit: "", dosage: ""
};

function Titles(props) {
  return(
      <div className={"titles"}>
        <PatientDetails patient={props.patient}/>
        <button onClick={props.showPopup}>+ add more</button>
        <p>{new Date().toDateString()}</p>
      </div>
  )
}

function PatientDetails(props) {
  let patient = props.patient;
  return (
      <div className={"PatientDetails"}>
        <p>
          {patient.name +" "+ patient.gender +", "+patient.age + " yrs"}
        </p>
      </div>
  );
}

function CurrentWeekDates(props){
  let currentWeekDates=[];
  let startingDate=props.currentWeek.startingDate;

  for (let i=0;i<7;i++){
    currentWeekDates.push(<th key={'day'+i}>{moment(startingDate).day(i).toDate().toDateString()}</th>);
  }

  return currentWeekDates;
}

function makePopupVisible() {
  let popup=document.querySelector('.popup');
  popup.style.display='block';
  return true;
}


function MedicineDetails(props) {
  let medicine=props.medicine;
  let onClickFunction=props.showPopup.bind(null,medicine);
  return(
      <div onClick={onClickFunction} className={"medicineDetails"}>
        {medicine.name}
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

class PatientMARView extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      currentMedicineToPopup: initialEmptyMedicine,
      currentWeek:{
        startingDate:moment().day(0).toDate(),
        endingDate:moment().day(6).toDate()
      },
      scheduledMedicines: []
    };
    this.showNewSchedulePopup=this.showNewSchedulePopup.bind(this);
    this.updateCurrentMedicine=this.updateCurrentMedicine.bind(this);
    this.resetCurrentMedicine=this.resetCurrentMedicine.bind(this);
  }

  showNewSchedulePopup(currentMedicineToPopup){
    this.setState({currentMedicineToPopup: currentMedicineToPopup});
    makePopupVisible();
  }

  updateCurrentMedicine(medicine){
    let newState={
      currentMedicineToPopup:medicine,
      currentWeek:this.state.currentWeek,
      scheduledMedicines:this.state.scheduledMedicines
    };
    this.setState(newState);
  }

  resetCurrentMedicine(){
    this.updateCurrentMedicine(initialEmptyMedicine);
  }

  render(){
    let patient = this.props.patient;
    return (
        <div>
          <NewSchedulePopup medicine={this.state.currentMedicineToPopup}
                            patient={patient} onChange={this.updateCurrentMedicine}
                            resetInputFields={this.resetCurrentMedicine}
          />

          <Titles patient={patient} showPopup={this.showNewSchedulePopup.bind(this,this.state.currentMedicineToPopup)}/>
          <table className={"medicineTable"}>
            <tbody>
            <tr>
              <th>medicine</th>
              {<CurrentWeekDates currentWeek={this.state.currentWeek}/>}
            </tr>
            <MedicinesTobeScheduled medicinesToBeScheduled={patient.medicinesToBeScheduled} showPopup={this.showNewSchedulePopup}/>
            {/*<ScheduledMedicines medicines={patient.scheduledMedicines}*/}
            {/*getScheduleListOfThisWeek={this.getTimingsOfThisWeek}/>*/}
            </tbody>
          </table>
        </div>
    )
  }
}

export default PatientMARView;