import React, {Component} from 'react';
import ReactDOM from 'react';
import './App.css';
import CommandList from './components/CommandList';
import CommandEdit from './components/CommandEdit';
import Header from './components/Header';
import ButtonAppBar from './components/ButtonAppBar';
import CommandTabs from './components/CommandTabs';
import FirebaseSetup from './FirebaseSetup';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const AppBarExampleIcon = () => (
	<ButtonAppBar
		title="Motor Test Application"
		iconClassNameRight="muidocs-icon-navigation-expand-more"
	/>
);

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
});

class App extends Component {
	render() {
		return (
			<div className="container">
				<Header title="Motor Test Application"/>
				<MuiThemeProvider theme={theme}>
					{AppBarExampleIcon()}
				</MuiThemeProvider>
				<div className="columns">
					<div className="column is-3"></div>
					<div className="column is-6">
						<CommandEdit firebase={FirebaseSetup}/>
					</div>
				</div>
			</div>
		);
	}
}

// // this helps with touch event delays until all of the mobile browsers catch-up.
// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();
//
// ReactDOM.render(
// 	<App/>,
// 	document.getElementById('app')
// );

export default App;
