import React from 'react';
import DosingInstructions from '../../src/components/DosingInstructions';
import {mount} from "enzyme";

describe('DosingInstructions', () => {
  it('Should have input element with given doseValue as value', () => {
    let component = mount(<DosingInstructions doseValue={2} medicineUnits={[]}/>);
    expect(component.find('input').prop('value')).toBe(2);
  });
  it('Should have input element with given handleDoseChange function as onChange', () => {
    const mockedDoseChangeFunction = jest.fn();
    let component = mount(<DosingInstructions doseValue={2} medicineUnits={[]}
                                              handleDoseChange={mockedDoseChangeFunction}
    />);
    expect(component.find('input').prop('onChange')).toBe(mockedDoseChangeFunction);
  });
  it('Should have SelectOptions component with given medicineUnits as options props', () => {
    let component = mount(<DosingInstructions doseValue={2} medicineUnits={["twice", "once", "thrice"]}/>);
    expect(component.find('SelectOptions').prop('options')).toEqual(["twice", "once", "thrice"]);
  });
  it('Should have SelectOptions component with given doseUnit as selectedValue props', () => {
    let component = mount(<DosingInstructions doseValue={2} medicineUnits={["twice", "once", "thrice"]}
                                              doseUnit={"once"}/>);
    expect(component.find('SelectOptions').prop('selectedValue')).toBe("once");
  });
  it('Should have SelectOptions component with given handleMedicineUnitChange function as onChange props', () => {
    let mockedFunction = jest.fn();
    let component = mount(<DosingInstructions doseValue={2} medicineUnits={["twice", "once", "thrice"]}
                                              doseUnit={"once"} handleMedicineUnitChange={mockedFunction}
    />);
    expect(component.find('SelectOptions').prop('onChange')).toBe(mockedFunction);
  });
});
