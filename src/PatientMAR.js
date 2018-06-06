import React from "react";
import moment from "moment/moment";
import NewSchedulePopup from './NewSchedulePopup';
import {PatientDetails,ScheduledMedicines,MedicinesTobeScheduled,CurrentWeekDates} from './utility';

let initialEmptyMedicine = {
  medicineName: "", dose: 0,
  unit: "", dosage: ""
};

let schedules=[
  [{
    medicineName:"Dopamine 40mg/ml",
    dose:40,
    unit:"ml",
    scheduledTime:new Date('June 4, 2018 01:30:00'),
    status:"notAdministrated"
  },{
    medicineName:"Dopamine 40mg/ml",
    dose:40,
    unit:"ml",
    scheduledTime:new Date('June 5, 2018 01:30:00'),
    status:"administrated"
  },{
    medicineName:"Dopamine 40mg/ml",
    dose:40,
    unit:"ml",
    scheduledTime:new Date('June 6, 2018 01:30:00'),
    status:"toBeAdministrated"
  }]
];

function Titles(props) {
  return(
      <div className={"titles"}>
        <PatientDetails patient={props.patient}/>
        <button onClick={props.showPopup}>+ add more</button>
        <p>{new Date().toDateString()}</p>
      </div>
  )
}

function makePopupVisible() {
  let popup=document.querySelector('.popup');
  popup.style.display='block';
  return true;
}

class PatientMAR extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      currentMedicineToPopup: initialEmptyMedicine,
      currentWeek:{
        startingDate:moment().day(0).toDate(),
        endingDate:moment().day(6).toDate()
      },
      schedules:schedules
    };
    this.showNewSchedulePopup=this.showNewSchedulePopup.bind(this);
    this.updateCurrentMedicine=this.updateCurrentMedicine.bind(this);
    this.resetCurrentMedicine=this.resetCurrentMedicine.bind(this);
    this.pastWeek=this.pastWeek.bind(this);
    this.nextWeek=this.nextWeek.bind(this);
  }

  showNewSchedulePopup(currentMedicineToPopup){
    this.setState({currentMedicineToPopup: currentMedicineToPopup});
    makePopupVisible();
  }

  updateCurrentMedicine(medicine){
    let newState={
      currentMedicineToPopup:medicine,
      currentWeek:this.state.currentWeek,
      schedules:this.state.schedules
    };
    this.setState(newState);
  }

  updateCurrentWeek(givenWeek){
    let newState={
      currentMedicineToPopup:this.state.currentMedicineToPopup,
      currentWeek:givenWeek,
      schedules:this.state.schedules
    };
    this.setState(newState);
  }

  resetCurrentMedicine(){
    this.updateCurrentMedicine(initialEmptyMedicine);
  }

  pastWeek(){
    let pastWeek={};
    pastWeek.startingDate=moment(this.state.currentWeek.startingDate).day(-7).toDate();
    pastWeek.endingDate=moment(pastWeek.startingDate).day(6).toDate();
    this.updateCurrentWeek(pastWeek);
  }

  nextWeek(){
    let nextWeek={};
    nextWeek.startingDate=moment(this.state.currentWeek.startingDate).day(7).toDate();
    nextWeek.endingDate=moment(nextWeek.startingDate).day(6).toDate();
    this.updateCurrentWeek(nextWeek);
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
          <div>
            <button onClick={this.pastWeek}>{"<"}</button>
            <p>{moment(this.state.currentWeek.startingDate).format('DD')}-
              {moment(this.state.currentWeek.endingDate).format('DD MMM')}
            </p>
            <button onClick={this.nextWeek}>{">"}</button>
          </div>
          <table className="medicineTable">
            <tbody>
            <tr>
              <th>medicine</th>
              {<CurrentWeekDates currentWeek={this.state.currentWeek}/>}
            </tr>
            <MedicinesTobeScheduled medicinesToBeScheduled={patient.medicinesToBeScheduled} showPopup={this.showNewSchedulePopup}/>
            <ScheduledMedicines schedules={this.state.schedules} currentWeek={this.state.currentWeek}/>
            </tbody>
          </table>
        </div>
    )
  }
}

export default PatientMAR;