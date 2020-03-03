import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Health from './health';
import './machine.css';
import { Row, Container, Col } from 'react-bootstrap';
import { updateMachine, updateMachineName } from '../src/actions';

function Machine (props) {
	const onNameChange = (event) => {
		props.updateMachineName(event.target.value);
	};

	const handleSubmit = (currentMachine) => {
		props.updateMachine({ ...currentMachine, name: props.machines.name}, props.machines.machines);
		event.preventDefault();
	};

	const machinesLayout = () => {
		let machine = props.machines.machines.find((machine) => machine.id === props.history.location.pathname.split('/')[2]);
		if (machine === undefined) {
			return null;
		}
		return (
			<Container className="container">
				<Row>
					<Col xs={6}>
						<h1>{machine.name}</h1>
						<h4>Update Device</h4>
						<form onSubmit={() => handleSubmit(machine)}>
							<label>
								Name:
								<input type="text" aria-label="name-input" value={props.machines.machineName} onChange={onNameChange} />
							</label>
							<input type="submit" value="Submit" />
						</form>
					</Col>
					<Col xs={6}>
						<div className="box"><Health value={machine.health} displayValue={true} /></div>
						<h2>Stats</h2>
						IP Address: {machine.ip_address}
					</Col>
				</Row>
			</Container>
		);
	};


	return (
		<React.Fragment>
			{ machinesLayout() }
		</React.Fragment>
	);
}

const mapStateToProps = function (state) {
	return {
		machines: state.machines,
		machineName: state.machineName
	};
};

Machine.propTypes = {
	machines: PropTypes.object,
	history: PropTypes.object,
	updateMachine: PropTypes.func,
	updateMachineName: PropTypes.func,
	machineName: PropTypes.string
};

export default connect(mapStateToProps, { updateMachine, updateMachineName })(Machine);
