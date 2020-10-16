import './styles.css';

import React from 'react';

const Spinner = () => {
	return (
		<div className="spinner-container">
			<h1>Loading...</h1>
			<div className="loader" />
		</div>
	);
};
export { Spinner };
