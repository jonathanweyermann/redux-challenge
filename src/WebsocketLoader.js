import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './machine.css';
import { getMachines, updateMachinesLocally } from '../src/actions';
const JSON = require('circular-json');
const client = new WebSocket('ws://127.0.0.1:1337');

function WebsocketLoader (props) {

	useEffect(() => {
		props.getMachines();
	}, []);

	useEffect(() => {
		client.onopen = () => {
			console.log('WebSocket Client Connected');
		};
		client.onmessage = (message) => {
			props.updateMachinesLocally(JSON.parse(message.data), props.machines.machines);
		};
	});

	return (
		null
	);
}

const mapStateToProps = function (state) {
	return {
		machines: state.machines,
		machineName: state.machineName
	};
};

WebsocketLoader.propTypes = {
	machines: PropTypes.object,
	history: PropTypes.object,
	updateMachine: PropTypes.func,
	machineName: PropTypes.string,
	updateMachinesLocally: PropTypes.func
};

export default connect(mapStateToProps, { updateMachinesLocally, getMachines })(WebsocketLoader);
