import React from 'react';
import StandingInstructionsPanel from '../../src/components/StandingInstructionsPanel';
import {mount} from "enzyme";

describe('StandingInstructionsPanel', () => {
  it('Should have PanelElement component with newDrug name as message', () => {
    const newDrug = {
      drugName: "Paracetmol"
    };
    const drugs = [newDrug];
    const component = mount(<StandingInstructionsPanel drugs={drugs} action={jest.fn()}/>);
    const panelElement = component.find('PanelElement');
    expect(panelElement.prop('message')).toBe("Paracetmol");

  });

  it('Should have more than 1 PanelElement component with given drugName as message', () => {
    const newDrug = {
      drugName: "Paracetmol"
    };
    const anotherNewDrug = {
      drugName: "Some other drug"
    };
    const drugs = [newDrug, anotherNewDrug];
    const component = mount(<StandingInstructionsPanel drugs={drugs} action={jest.fn()}/>);
    const panelElements = component.find('PanelElement');
    expect(panelElements.at(1).prop('message')).toBe("Some other drug");
  });
});
