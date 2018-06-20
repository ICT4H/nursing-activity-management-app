import React from 'react';
import WeeklyTable from '../src/WeeklyTable';
import renderer from 'react-test-renderer';

test('Provided title and currentWeek having starting date should ' +
    'give table with row having title and dates of given week as table headers', () => {

  let startingDate = new Date('June 5, 2018 9:30:00');
  let endingDate = new Date('June 12, 2018 9:30:00');
  let component=renderer.create(<WeeklyTable startingDate={startingDate} endingDate={endingDate}
                                             title={"Column1"}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Provided data as a list of objects having two methods as getTitleOfRow and getDetailsFor(givenDate)' +
    'should give table consisting row for each object', () => {
  let sampleObject={
    getTitleOfRow(){
      return "titleOfRow";
    },
    getDetailsFor(date){
      return date.toString();
    }
  };

  let data=[sampleObject];

  let startingDate = new Date('June 5, 2018 9:30:00');
  let endingDate = new Date('June 12, 2018 9:30:00');
  let component=renderer.create(<WeeklyTable startingDate={startingDate} endingDate={endingDate}
                                             title={"Column1"} data={data}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});