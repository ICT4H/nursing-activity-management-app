import React, {Component} from 'react';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import PatientMAR from './components/PatientMAR';
import {patientDetails} from "./data/initialData";
import createHashHistory from 'history/createHashHistory'

const history = createHashHistory();

const Home = () => <h1>Home</h1>;

const ShowPatientMAR = ({match}) => (
    <div>
      <PatientMAR today={new Date()} patient={patientDetails} patientUuid={match.params.uuid}/>
    </div>
);


class App extends Component {
  render() {
    return (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/patient/:uuid/mar" component={ShowPatientMAR}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
