import React from 'react';
import NewSchedulePopup from '../NewSchedulePopup';
import renderer from 'react-test-renderer';
import moment from "moment/moment";

test('Should have input fields medicineName, dose, unit with given values and save cancel buttons', () => {
  let medicineToPopup = {
    medicineName:"Paracetmol",
    dose:2,
    unit:"Tablet"
  };
  let patient = {
    name: "Cally Cardenas",
    gender:'male',
    age:33
  };

  let component=renderer.create(<NewSchedulePopup medicine={medicineToPopup}
                                                  patient={patient} onChange={()=>true}
                                                  resetInputFields={()=>true}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});