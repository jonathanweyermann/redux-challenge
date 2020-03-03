import React from 'react';
import PropTypes from 'prop-types';

import './health.css';

function Health (props) {
	const healthValueDisplay = () => {

		if (!props.displayValue) {
			return null;
		}
		return (
			<div className='health-value-display'>
				{props.value}
			</div>
		);
	};
	const colorPicker = () => {
		if (props.value <= 50) {
			return '#D9534F';
		}
		if (props.value >50 && props.value <= 70) {
			return '#f0ad4e';
		}
		return '#5cb85c';
	};

	return (
		<div className="container" style={{ padding: 0 }}>
			{ healthValueDisplay() }
			<div className="full-bar">
				<div className="solid-bar" data-testid="solid-bar" style={{ width: `calc(100% * ${props.value/100})`, backgroundColor: colorPicker() }}>
				</div>
			</div>
		</div>
	);
}

Health.propTypes = {
	value: PropTypes.number,
	displayValue: PropTypes.bool
};


export default Health;
