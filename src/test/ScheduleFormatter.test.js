import React from 'react';
import ScheduleFormatter from '../ScheduleFormatter';
import renderer from 'react-test-renderer';

test('Should have time of given schedule', () => {
  let schedule = {scheduledTime:new Date("June 8, 2018 2:30:00")};
  const component = renderer.create(
      <ScheduleFormatter schedule={schedule}/>,
  );
  expect(component.root.findByType("p").props.children).toBe("2:30");
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


//Need to write test for getting emoji based on schedule status