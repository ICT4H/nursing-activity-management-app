import React from 'react';
import Timings from '../src/Timings';
import renderer from 'react-test-renderer';

test('Should have button to add more time', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00")};
  const component = renderer.create(
      <Timings schedule={schedule}/>,
  );
  expect(component.root.find(element=>element.type==="button").props.children).toBe("+ Add More Times");
});

test('Add more time button should have on click function', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00")};
  const component = renderer.create(
      <Timings schedule={schedule}/>,
  );
  // expect(component.root.find(element=>element.type==="button").props.onClick).toBeInstanceOf(Function);
  expect(component.root.find(element=>element.type==="button").props.onClick).toBeTruthy();
});