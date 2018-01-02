import React, {Component} from 'react';
import MotorMsgs from '../../protobuf-msgs/MotorMsg_pb';
import VehicleMsgs from '../../protobuf-msgs/VehicleMsg_pb';
import trim from 'trim';
import base64js from 'base64-js';

class CommandEdit extends Component {

	constructor(props) {
		super(props);
		this.execCommand = this.execCommand.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyup = this.onKeyup.bind(this);
		this.state = {
			message: ''
		};
	}

	execCommand(secretKey, robotId, command) {
		var vcuMsg;
		if (command.drive !== undefined) {
			var driveCmd = new VehicleMsgs.Drive();
			driveCmd.setAcceleration(command.drive.acceleration);
			driveCmd.setDistance(command.drive.distance);
			driveCmd.setVelocity(command.drive.velocity);
			driveCmd.setDirection(command.drive.direction);
			driveCmd.setEdgedistance(command.drive.edgeDistance);

			vcuMsg = new VehicleMsgs.VcuWrapperMessage();
			vcuMsg.setDrive(driveCmd);
		} else if (command.halt !== undefined) {
			var haltCmd = new VehicleMsgs.Drive();

			vcuMsg = new VehicleMsgs.VcuWrapperMessage();
			vcuMsg.setHalt(haltCmd);
		}

		var message = {
			"to": "",
			"priority": "high",
			"notification": {
				"title": "VCU_CMD",
				"text": "VCU_CMD"
			},
			"data": {
				"VCU_CMD": ""
			},
			"time_to_live": 0
		};
		message.to = robotId;
		var bytes = vcuMsg.serializeBinary();
		var cmdData = base64js.fromByteArray(bytes);
		message.data.VCU_CMD = cmdData;

		return fetch('https://gcm-http.googleapis.com/gcm/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'key=' + secretKey,
				'Accept': 'application/json',
			},
			body: JSON.stringify(message)
		}).then(response => {
			if (response.status >= 400) {
				this.setState({
					value: 'no greeting - status > 400'
				});
				throw new Error('no greeting - throw');
			}
			return response.json()
		}).then(data => {
			var myData = JSON.parse(data);
			this.setState({
				greeting: myData.name,
				path: myData.link
			});
		}).catch(() => {
			this.setState({
				value: 'no greeting - cb catch'
			})
		})
	}

	onChange(event) {
		this.setState({
			message: event.target.value
		});
	}

	onKeyup(event) {
		if (event.keyCode === 13 && trim(event.target.value) !== '') {
			event.preventDefault();
			// let dbCon = this.props.firebase.database().ref('/messages');
			// dbCon.push({
			// 	message: trim(event.target.value)
			// });
			this.execCommand('secret', 'robotid', 'command')
				.then((json) => {
					// handle success
				})
				.catch(error => error);
			this.setState({
				message: ''
			});
		}
	}

	render() {
		return (
			<form>
                <textarea
	                className="textarea"
	                placeholder="Type a message"
	                cols="100"
	                onChange={this.onChange}
	                onKeyUp={this.onKeyup}
	                value={this.state.message}>
                </textarea>
				<input type="text" placeholder="Command" id="command"
				       value='{ "drive" : { "direction" : "FWD", "distance" : 1.0, "acceleration" : 0.025, "velocity" : 0.5, "edgeDistance" : 0.0 } }'/>
				<input type="text" placeholder="Secret Key" id="secret-key" value=""/>
				<input type="text" placeholder="Robot ID" id="robot-id"
				       value="fLxJ37mccdI:APA91bHx6yAPrGxPyjTGMJYuDs8T2gSnV1Kh1HmfAFGp7sGsOUGuw7sQBaomBiMDZmdUjcbDMgIb7ikWlf9hSN7GsNTo82kEentYhzy3sZ0K2oPXLIk1tTpG-8G9ki8w1_C8QF0LqJsF"/>
				<button id="submit" class="submit" autofocus>Submit</button>
				<button class="sign-out" id="sign-out">Sign Out</button>
				<button class="emergency-stop" id="emergency-stop">Emergency Stop</button>
			</form>
		)
	}
}

export default CommandEdit