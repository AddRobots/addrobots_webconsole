import React, {Component} from 'react';
import '../css/App.css';
import CssBaseline from 'material-ui/CssBaseline';
import DefaultLayout from 'app/ui/layouts/DefaultLayout';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CommandPage from "./ui/pages/CommandPage";
import ControlsPage from "./ui/pages/ControlsPage";

const theme = createMuiTheme({
	palette: {
		type: "light",
	},
});

class App extends Component {
	render() {
		return (
			<div>
				<CssBaseline/>
				<Router>
					<MuiThemeProvider theme={theme}>
						<DefaultLayout>
							<Route exact path="/" component={CommandPage}/>
							<Switch>
								<Route exact path="/commands" component={CommandPage}/>
								<Route exact path="/controls" component={ControlsPage}/>
							</Switch>
						</DefaultLayout>
					</MuiThemeProvider>
				</Router>
			</div>
		);
	}
}

export default App;