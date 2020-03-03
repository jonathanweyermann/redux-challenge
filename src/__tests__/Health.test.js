import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Health from '../health';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom';

describe('health component', () => {
  it('creates a low health snapshot', () => {
		const wrapper = mount(<Health value={42} displayValue={true} />);
	  expect(wrapper).toMatchSnapshot();
  });
  it('creates a medium health snapshot', () => {
		const wrapper = mount(<Health value={65} displayValue={true} />);
	  expect(wrapper).toMatchSnapshot();
  });
  it('creates a high health snapshot', () => {
		const wrapper = mount(<Health value={88} displayValue={true} />);
	  expect(wrapper).toMatchSnapshot();
  });
  it('creates a high health snapshot with no display number', () => {
		const wrapper = mount(<Health value={88} />);
	  expect(wrapper).toMatchSnapshot();
  });
});
