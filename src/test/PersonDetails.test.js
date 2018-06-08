import React from 'react';
import PersonDetails from '../PersonDetails';
import renderer from 'react-test-renderer';

test('Given person object with name,gender and age gives all in "p" tag and wrapped around with "div" tag', () => {
  let person={name:"Cally Cardena", gender:"male",age:33};
  const component = renderer.create(
      <PersonDetails person={person} className={"personDetails"}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});