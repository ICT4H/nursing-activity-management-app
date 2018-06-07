import React from 'react';
import PersonDetails from '../PersonDetails';
import renderer from 'react-test-renderer';

test('Given medicine object with medicineName,dose and unit gives all in "p" tag and wrapped around with "div" tag', () => {
  let person={medicineName:"Paracetmol", dose:2,unit:"table"};
  const component = renderer.create(
      <PersonDetails person={person} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});