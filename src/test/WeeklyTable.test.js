import React from 'react';
import WeeklyTable from '../WeeklyTable';
import renderer from 'react-test-renderer';
import moment from "moment";

test('Provided title and currentWeek having starting date should ' +
    'give table with row having title and dates of given week as table headers', () => {
  const currentWeek = {
    startingDate: moment().day(0)
  };
  let component=renderer.create(<WeeklyTable currentWeek={currentWeek} title={"Column1"}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Provided data as a list of objects having two methods as getTitleOfRow and getDetailsFor(givenDate)' +
    'should give table consisting row for each object', () => {
  const currentWeek = {
    startingDate: moment(new Date('June 5, 2018 9:30:00')).day(0).toDate()
  };
  let sampleObject={
    getTitleOfRow(){
      return "titleOfRow";
    },
    getDetailsFor(date){
      return date.toString();
    }
  };

  let data=[sampleObject];

  let component=renderer.create(<WeeklyTable currentWeek={currentWeek} title={"Column1"} data={data}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});