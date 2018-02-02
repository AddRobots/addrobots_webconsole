import React from 'react';
import Knob from 'react-canvas-knob';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {firebaseLogin} from '../../../firebase/FirebaseLogin';

const styles = theme => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
	}),
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class ControlsPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 50
		};
	}

	handleChange = (newValue) => {
		console.timeEnd();
		this.setState({value: newValue});
		this.sendCommand();
		console.log(' new value: ' + newValue);
		console.time();
	};

	sendCommand = () => {
		let body = {
			"message":{
				"topic" : "foo-bar",
				"notification" : {
					"body" : "This is a Firebase Cloud Messaging Topic Message!",
					"title" : "FCM Message"
				}
			}
		};
		return fetch('https://fcm.googleapis.com/v1/projects/addrobots-console/messages:send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + firebaseLogin.getOAuthToken(),
			},
			body: JSON.stringify(body)
		}).then(response => {
			if (response.status >= 400) {
				response.text().then(msg => {
					console.log('error: ' + msg);
				})

			}
			console.log('command response: ' + response);
			return response.json()
		}).catch(error => {
			console.log('error: ' + error);
		})
	}

	render() {
		const {classes} = this.props;

		return (
			<div>
				<Paper className={classes.root} elevation={3}>
					<Knob
						value={this.state.value}
						onChange={this.handleChange}
						width={150}
						max={360}
						step={0.01}
						cursor={20}
						stopper={false}
						font={'Roboto'}
					/>
				</Paper>
			</div>
		)
	}
}

ControlsPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlsPage);