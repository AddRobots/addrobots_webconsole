import React from 'react';
import Knob from 'react-canvas-knob';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {firebaseLogin} from '../../../firebase/FirebaseLogin';
import base64js from "base64-js";
import {McuWrapper, MotorCmd, MotorAction, CmdParam, Unit, MotorCmdParamId} from "../../../protobuf-msgs/MotorMsg_pb";

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
			value: 0
		};
	}

	handleChange = (newValue) => {
		console.timeEnd();
		// Figure out which way we're turning.
		let diff = newValue - (this.state.value);
		while (diff < -180) {
			diff += 360;
		}
		while (diff > 180) {
			diff -= 360;
		}
		let clockwise = (diff < 0);
		this.setState({value: newValue});
		this.sendCommand(newValue, clockwise);
		console.log(' new value: ' + newValue);
		console.time();
	};

	sendCommand = (deg, clockwise) => {
		let payload = {
			"message": {
				"token": "d7aHAqWM1F4:APA91bHgQ6oHluURA1-UDqmMEY2dpIlGlhtJj4jHK8oPAXic9elbuW78Jw37sBwVVKAL_iFG6xJCgRc-GXrOZrIhulSKmDtTdZacrTnSrOhXsmNhbcNAq6NsNsmT335XvXqXKf90KYCl",
				"data": {
					"MOTOR_CMD": ""
				},
			}
		};

		let velocityParam = new CmdParam();
		velocityParam.setId(MotorCmdParamId.VELOCITY);
		velocityParam.setValue(360);
		velocityParam.setUnit(Unit.DOUBLE);

		let dirParam = new CmdParam();
		dirParam.setId(MotorCmdParamId.CLOCKWISE);
		dirParam.setValue(clockwise);
		dirParam.setUnit(Unit.BOOLEAN);

		let posParam = new CmdParam();
		posParam.setId(MotorCmdParamId.POSITION);
		posParam.setValue(deg);
		posParam.setUnit(Unit.DEGREE);

		let motorCmd = new MotorCmd();
		motorCmd.setAction(MotorAction.GOTO_POS)
		motorCmd.setParamsList([velocityParam, dirParam, posParam]);

		let motorMsg = new McuWrapper();
		motorMsg.setUuid('1111');
		motorMsg.setMotorcmd(motorCmd);
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