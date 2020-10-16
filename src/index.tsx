import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { ErrorBoundary } from './components/Error/ErrorBoundary';

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary fullPage render={() => <h1>Ah não, ocorreu um erro.</h1>}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById(`root`)
);
