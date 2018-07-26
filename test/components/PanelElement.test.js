import React from 'react';
import PanelElement from '../../src/components/PanelElement';
import {mount} from "enzyme";

describe('PanelElement', () => {
  it('Should have given message', () => {
    const component = mount(<PanelElement message="New drug"/>);
    expect(component.text()).toMatch("New drug");
  });

  it('Should have button with given action as onClick function', () => {
    const newDrugMessage = "New drug";
    const onClickFn = () => {
    };
    const component = mount(<PanelElement message={newDrugMessage} action={onClickFn}/>);
    const button = component.find('button');
    expect(button.prop('onClick')).toBe(onClickFn);
  });

  it('Should have button with given actionName as value', () => {
    const newDrugMessage = "New drug";
    const component = mount(<PanelElement message={newDrugMessage} actionName="Introduce"/>);
    const button = component.find('button');
    expect(button.text()).toMatch("Introduce");
  });
});
