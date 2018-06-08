import React from 'react';
import renderer from 'react-test-renderer';
import MedicineDetails from "../MedicineDetails";

test('Given medicine object with medicineName,dose and unit gives all in "p" tag and wrapped around with "div" tag', () => {
  let medicine={medicineName:"Paracetmol", dose:2,unit:"table"};
  const component = renderer.create(
      <MedicineDetails medicine={medicine}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});