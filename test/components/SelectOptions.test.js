import React from 'react';
import SelectOptions from '../../src/components/SelectOptions';
import renderer from 'react-test-renderer';

test('Should have all options from list of options provided', () => {
  let options=["male","female"];
  let selectedValue = 'male';
  const mockHandleChange = jest.fn();
  const component = renderer.create(
      <SelectOptions options={options} className="selectOption" selectedValue={selectedValue}
                     chooseMsg="select Option" onChange={mockHandleChange}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Given option should be selected default', () => {
  let options=["male","female"];
  let selectedValue="male";
  const mockHandleChange = jest.fn();
  const component = renderer.create(
      <SelectOptions options={options} className="selectOption"
                     selectedValue={selectedValue} chooseMsg="select Option" onChange={mockHandleChange}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});