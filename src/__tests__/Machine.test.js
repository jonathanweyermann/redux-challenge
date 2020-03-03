
import { expect as chai_expect } from 'chai';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Machine from '../Machine';
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk'
const props = {"history":{"length":5,"action":"POP","location":{"pathname":"/machines/99ade105-dee1-49eb-8ac4-e4d272f89fba","search":"","hash":"","key":"ybxgrt"}}};

const mockStore = configureMockStore([thunk]);
const store = mockStore(
  {"machines":{"machines":[{"id":"99ade105-dee1-49eb-8ac4-e4d272f89fba","name":"Renamed Machine","ip_address":"127.0.0.31","health":84},
													 {"id":"4111947a-6c58-4977-90fa-2caaaef88648","name":"Machine 2","ip_address":"127.0.0.4","health":95},
													 {"id":"57342663-909c-4adf-9829-6dd1a3aa9143","name":"Machine 3","ip_address":"127.0.0.55","health":2},
													 {"id":"5632e1ec-46cb-4895-bc8b-a91644568cd5","name":"Machine 4","ip_address":"127.0.0.3","health":22}],
							"machine":{"name":""},
							"name":""}}
);

describe('machine component', () => {
	const setUpFn = () => {
	 return mount(
		 <Provider store={store}>
			 <Machine {...props} />
		 </Provider>
	 );
 };

	let wrapper;
	beforeEach(() => {
		wrapper = setUpFn();
	});

	it('renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});
});



const setup = () => {
  const utils = render(<Provider store={store}><Machine {...props} /></Provider>);
  const input = utils.getByLabelText('name-input')
  return {
    input,
    ...utils,
  }
}

test('renders name of current machine link', () => {
  const { getByText } = render(<Provider store={store}><Machine {...props} /></Provider>);
  const linkElement = getByText(/Renamed Machine/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders name of new machine link once renamed', () => {
	const { input } = setup();
	fireEvent.change(input, { target: { value: 'Machine 12' } })
  const { getByText } = render(<Provider store={store}><Machine {...props} /></Provider>);

	setTimeout(function(){
		const linkElement = getByText(/Machine 12/i);
		expect(linkElement).toBeInTheDocument();
	}, 1000);

});
