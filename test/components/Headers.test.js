import React from 'react';
import Headers from '../../src/Components/Headers';
import PersonDetails from "../../src/components/PersonDetails";
import {mount} from "enzyme";

describe('Headers', () => {
  it('Should have element PersonDetails with given patient as person props', () => {
    let patient = {name: "Cally Cardena", gender: "male", age: 33};
    const component = mount(
        <Headers patient={patient} today={new Date()}/>,
    );
    expect(component.find('PersonDetails').prop("person")).toEqual(patient);
  });

  it('Should have element button with given onClickFunction', () => {
    let patient = {name: "Cally Cardena", gender: "male", age: 33};
    const mockFunction = jest.fn();
    const component = mount(
        <Headers patient={patient} today={new Date()} onClickOfButton={mockFunction}/>,
    );
    expect(component.find('button').prop("onClick")).toEqual(mockFunction);
  });

  it('Should have element having given date as today', () => {
    let patient = {name: "Cally Cardena", gender: "male", age: 33};
    const mockFunction = jest.fn();
    let todayDate = new Date();
    const component = mount(
        <Headers patient={patient} today={todayDate} onClickOfButton={mockFunction}/>,
    );
    expect(component.find('p').text()).toEqual(todayDate.toDateString());
  });

});
