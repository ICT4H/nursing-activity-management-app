import React from "react";
import moment from "moment";

function PatientDetails(props) {
  return (
      <div className={"PatientDetails"}>
        <p>
          {props.patient.name +" "+ props.patient.gender +", "+props.patient.age + " yrs"}
        </p>
      </div>
  );
}

class CurrentWeek extends React.Component{
  createTable(){
    let row = [];
    for (let i = 0; i < 7; i++) {
      row.push(<th key={i.toString()}>
          {moment().day(i).toDate().toDateString()}
        </th>)
    }
    return row;
  };

  render() {
    return(this.createTable())
  }
}

class Medicine extends React.Component{
  render(){
    return(
        <tr>
          <td>{this.props.medicine.name}</td>
          <td/>
          <td/>
          <td/>
          <td/>
          <td/>
          <td/>
          <td/>
        </tr>
    )
  }
}


class PatientView extends React.Component{
  render(){
    return (
        <div>
          <div className={"titles"}>
            <PatientDetails patient={this.props.patient}/>
            <p>Medicine Administration Record</p>
            <p>{new Date().toDateString()}</p>
          </div>
          <table className={"medicineTable"}>
            <tbody>
            <tr>
              <th>
                Medicine
              </th>
              <CurrentWeek/>
            </tr>
            <Medicine medicine={this.props.patient.medicine}/>
            </tbody>
          </table>
        </div>
    )
  }
}

export default PatientView;