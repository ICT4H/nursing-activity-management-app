import React from 'react';
import SelectOptions from '../SelectOptions';
import renderer from 'react-test-renderer';

test('Should have all options from list of options provided', () => {
  let options=["male","female"];
  const component = renderer.create(
      <SelectOptions options={options}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Given option should be selected default', () => {
  let options=["male","female"];
  let selectedValue="male";
  const component = renderer.create(
      <SelectOptions options={options} selectedValue={selectedValue}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});