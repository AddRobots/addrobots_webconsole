import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import './css/index.css';
import App from 'app/App';
import registerServiceWorker from './registerServiceWorker';

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<App/>
		</AppContainer>,
		document.getElementById("root")
	);
}

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('app/App', () => {
		render(App)
	})
}

registerServiceWorker();
