import React from 'react';
import Knob from 'react-canvas-knob';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {firebaseLogin} from '../../../firebase/FirebaseLogin';
import base64js from "base64-js";
import {MotorMsg} from "../../../protobuf-msgs/MotorMsg_pb";

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
			value: 0,
			lastTime: 0
		};
	}

	handleChange = (newValue) => {
		console.timeEnd();
		// Figure out which way we're turning.
		let degDiff = newValue - (this.state.value);
		while (degDiff < -180) {
			degDiff += 360;
		}
		while (degDiff > 180) {
			degDiff -= 360;
		}
		let clockwise = (degDiff > 0);
		let timeDiff = Date.now() - this.state.lastTime;
		if (timeDiff > 50) {
			this.setState({value: newValue, lastTime: Date.now()});
			this.sendCommand(newValue, clockwise);
			console.log(' new value: ' + newValue);
			console.time();
		}
	};

	sendCommand = (deg, clockwise) => {
		let payload = {
			"message": {
				"token": "c-GdQDJRLYg:APA91bHEk4t0ycS33pIeYIob410NERRc_bk11Xi820_3KKxKiQ9ZGEFb5mL0HfzGcYlHRdZxLX0Cb4DziMndimXZBqo53fiuKUL00_R3j_LbbCvRdr7EEk1GE4YkhT0txWf55dvCERfi",
				"data": {
					"MOTOR_CMD": ""
				},
			}
		};

		let velocityParam = new MotorMsg.Cmd.Param();
		velocityParam.setId(MotorMsg.Cmd.Param.Id.VELOCITY);
		velocityParam.setValue(1500);
		velocityParam.setUnit(MotorMsg.Unit.DOUBLE);

		let dirParam = new MotorMsg.Cmd.Param();
		dirParam.setId(MotorMsg.Cmd.Param.Id.CLOCKWISE);
		dirParam.setValue(clockwise);
		dirParam.setUnit(MotorMsg.Unit.BOOLEAN);

		let posParam = new MotorMsg.Cmd.Param();
		posParam.setId(MotorMsg.Cmd.Param.Id.POSITION);
		posParam.setValue(deg);
		posParam.setUnit(MotorMsg.Unit.DEGREE);

		let motorCmd = new MotorMsg.Cmd();
		motorCmd.setAction(MotorMsg.Cmd.Action.GOTO_POS)
		motorCmd.setParamsList([velocityParam, dirParam, posParam]);

		let motorMsg = new MotorMsg();
		motorMsg.setUuid('1111');
		motorMsg.setMotorCmd(motorCmd);
		let bytes = motorMsg.serializeBinary();
		let cmdData = base64js.fromByteArray(bytes);
		payload.message.data.MOTOR_CMD = cmdData;
		let body = JSON.stringify(payload);
		console.log('body: ' + body);

		return fetch('https://fcm.googleapis.com/v1/projects/addrobots-console/messages:send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + firebaseLogin.getOAuthToken(),
			},
			body: body
		}).then(response => {
			response.text().then(msg => {
				if (response.status >= 400) {
					console.log('error: ' + msg);
				}
				console.log('command response: ' + msg);
				return msg
			})
		}).catch(error => {
			console.log('error: ' + error);
		})
	};

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