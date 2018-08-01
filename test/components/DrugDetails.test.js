import React from 'react';
import DrugDetails from '../../src/components/DrugDetails';
import {shallow} from "enzyme";

describe('DrugDetails', () => {
  it('should render drugDetails', function () {
    const drug = {
      drugName: "Paracetmol",
      dose: 2,
      doseUnits: "once a day"
    };
    const component = shallow(
        <DrugDetails drug={drug}/>,
    );
    expect(component).toMatchSnapshot();
  });
});
