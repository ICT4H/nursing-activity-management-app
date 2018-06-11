import React from 'react';
import WeekControl from '../WeekControl';
import renderer from 'react-test-renderer';
import moment from "moment/moment";

test('Should have current week starting date and ending date', () => {
  const currentWeek = {
    startingDate: moment(new Date('June 5, 2018 9:30:00')).day(0).toDate(),
    endingDate: moment(new Date('June 5, 2018 9:30:00')).day(6).toDate()
  };
  let component=renderer.create(<WeekControl currentWeek={currentWeek}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Should function pastWeek called when clicked on pastWeek button', () => {
  const currentWeek = {
    startingDate: moment(new Date('June 5, 2018 9:30:00')).day(0).toDate(),
    endingDate: moment(new Date('June 5, 2018 9:30:00')).day(6).toDate()
  };
  const mockPastWeekFn = jest.fn();

  let component=renderer.create(<WeekControl currentWeek={currentWeek} pastWeek={mockPastWeekFn}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  let pastWeekButton = (tree.children.find((c)=>c.className="pastWeek"));
  expect(mockPastWeekFn.mock.calls.length).toBe(0);
  pastWeekButton.props.onClick();
  expect(mockPastWeekFn.mock.calls.length).toBe(1);

  pastWeekButton.props.onClick();
  expect(mockPastWeekFn.mock.calls.length).toBe(2);
});