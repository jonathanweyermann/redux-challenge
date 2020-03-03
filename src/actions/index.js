import axios from 'axios';
import { GET_MACHINES, UPDATE_MACHINE_NAME, UPDATE_MACHINE, UPDATE_MACHINES_LOCALLY } from './types';

export const getMachines = () => {
	return (dispatch) => {
		axios.get('http://localhost:8080/machines')
			.then(function (response) {
				// handle success
				dispatch({
					type: GET_MACHINES,
					payload: response.data
				});
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});

	};
};

export const updateMachineName = (machineName) => {
	return {
		type: UPDATE_MACHINE_NAME,
		payload: machineName
	};
};

export const updateMachinesLocally = (event, machines) => {
	let updatedMachines = machines.map((m) => {
		if (m.id === event.id) {
			m.health = event.health;
		}
		return m;
	});
	return {
		type: UPDATE_MACHINES_LOCALLY,
		payload: updatedMachines
	};
};

export const updateMachine = (machine) => {
	return (dispatch) => {
		axios.put(`http://localhost:8080/machines/${machine.id}`, {
			name: machine.name
		})
			.then(function (response) {
				dispatch({ type: UPDATE_MACHINE, payload: response.data});
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};
