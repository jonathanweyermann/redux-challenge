import { render, fireEvent } from '@testing-library/react';
import { expect as chai_expect } from 'chai';
import renderer from 'react-test-renderer';
var sinon = require('sinon');

import React from 'react';
import { shallow, mount } from 'enzyme';
import Machines from '../Machines';

import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
const props = {"history":{"length":5,"action":"POP","location":{"pathname":"/machines","search":"","hash":"","key":"ybxgrt"}}};
const store = mockStore(
  {"machines":{"machines":[{"id":"99ade105-dee1-49eb-8ac4-e4d272f89fba","name":"Machine X","ip_address":"127.0.0.31","health":84},
													 {"id":"4111947a-6c58-4977-90fa-2caaaef88648","name":"Machine 2","ip_address":"127.0.0.4","health":95},
													 {"id":"57342663-909c-4adf-9829-6dd1a3aa9143","name":"Machine 3","ip_address":"127.0.0.55","health":2},
													 {"id":"5632e1ec-46cb-4895-bc8b-a91644568cd5","name":"Machine 4","ip_address":"127.0.0.3","health":22}],
							"machine":{"name":""},
							"name":""}}
);


describe('machines component', () => {
	const setUpFn = () => {
	 return mount(
		 <Provider store={store}>
			 <Machines {...props} />
		 </Provider>
	 );
 };

	let wrapper;
	beforeEach(() => {
		wrapper = setUpFn();
	});

  it('renders 4 machines', () => {
	  expect(wrapper).toMatchSnapshot();
  });

	const setup = () => {
	  const utils = render(<Provider store={store}><Machines {...props} /></Provider>);
	  const input = utils.getByLabelText('name-input')
	  return {
	    input,
	    ...utils,
	  }
	}

	it('renders name of all machines', () => {
	  const { getByText } = render(<Provider store={store}><Machines {...props} /></Provider>);
	  const linkElement = getByText(/Machine X/i);
	  expect(linkElement).toBeInTheDocument();
	  const linkElement2 = getByText(/Machine 2/i);
	  expect(linkElement2).toBeInTheDocument();
	  const linkElement3 = getByText(/Machine 3/i);
	  expect(linkElement3).toBeInTheDocument();
	  const linkElement4 = getByText(/Machine 4/i);
	  expect(linkElement4).toBeInTheDocument();
	});

});
