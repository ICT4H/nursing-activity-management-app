import React from 'react';
import SaveCancelButtons from '../../src/components/SaveCancelButtons';
import renderer from 'react-test-renderer';


let saveFn = () => true;
let cancelFn = () => true;

test('Should be a div with 2 two buttons', () => {
  let component = renderer.create(<SaveCancelButtons saveFn={saveFn} cancelFn={cancelFn}/>);
  let tree = component.toJSON();
  expect(component.root.findAll(element => element.type === "button")).toHaveLength(2);
  expect(tree).toMatchSnapshot();
});

test('Should be a div with given saveFn as on click of save button && cancelFn as on click of cancel button', () => {
  let component = renderer.create(<SaveCancelButtons saveFn={saveFn} cancelFn={cancelFn}/>);
  let findSaveButton = element => element.type === "button" && element.props.value === "Save";
  let findCancelButton = element => element.type === "button" && element.props.value === "Cancel";
  expect(component.root.find(findSaveButton)).toBeTruthy();
  expect(component.root.find(findCancelButton)).toBeTruthy();
});
