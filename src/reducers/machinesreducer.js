import { GET_MACHINES, UPDATE_MACHINE, UPDATE_MACHINE_NAME, UPDATE_MACHINES_LOCALLY } from '../actions/types';

const INITIAL_STATE = { machines: [], name: ''};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_MACHINES:
			return { ...state, machines: action.payload };
		case UPDATE_MACHINE:
			let updatedMachines = state.machines.map((m) => {
				if (m.id === action.payload.id) {
					m = action.payload;
				}
				return m;
			});
			return { ...state, machines: updatedMachines};
		case UPDATE_MACHINE_NAME:
			return { ...state, name: action.payload };
		case UPDATE_MACHINES_LOCALLY:
			return { ...state, machines: action.payload };
		default:
			return state;
	}
};
