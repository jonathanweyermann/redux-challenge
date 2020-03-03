import renderer from 'react-test-renderer';

import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

import mock from 'xhr-mock';
import { render } from '@testing-library/react';

describe('Main page', () => {
  it('shows a blank page except for some links', () => {
		const wrapper = mount(<App />);
    expect(wrapper).toMatchSnapshot();
  });

	it('renders /machines link', () => {
	  const { getByText } = render(<App />);
	  const linkElement = getByText(/machines/i);
	  expect(linkElement).toBeInTheDocument();
	});
});
