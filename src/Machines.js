import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Health from './health';
import './machines.css';
import { Table } from 'react-bootstrap';
import { getMachines } from '../src/actions';

function Machines (props) {

	useEffect(() => {
		props.getMachines();
	}, []);

	const machineDetails = (id) => {
		props.history.push(`/machines/${id}`);
	};

	const machinesLayout = () => {
		let layout = props.machines.machines.map((machine) => {
			return (
				<tr key={machine.id} onClick={() => machineDetails(machine.id)}>
					<td>{machine.name}</td>
					<td colSpan="2">{machine.ip_address}</td>
					<td colSpan="2"><Health value={machine.health} /></td>
				</tr>
			);
		});
		return (<React.Fragment>{layout}</React.Fragment>);
	};


	return (
		<Table striped>
			<thead>
				<tr>
					<th>Name</th>
					<th colSpan="2">IP Address</th>
					<th colSpan="2">Health</th>
				</tr>
			</thead>
			<tbody>
				{ machinesLayout() }
			</tbody>
		</Table>
	);
}

const mapStateToProps = function (state) {
	return {
		machines: state.machines
	};
};

Machines.propTypes = {
	getMachines: PropTypes.func,
	machines: PropTypes.object,
	history: PropTypes.object
};


export default connect(mapStateToProps, { getMachines })(Machines);
