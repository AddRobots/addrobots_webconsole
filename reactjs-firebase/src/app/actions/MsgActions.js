import VehicleMsgs from "../../protobuf-msgs/VehicleMsg_pb";
import base64js from "base64-js";

var MsgActions = {
	execCommand: function(secretKey, robotId, command) {
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
		let body = JSON.stringify(message);
		console.log('body: ' + body);

		return fetch('https://gcm-http.googleapis.com/gcm/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'key=' + secretKey,
				'Accept': 'application/json',
			},
			body: body
		}).then(response => {
			if (response.status >= 400) {
				this.setState({
					value: 'no greeting - status > 400'
				});
				throw new Error('no greeting - throw');
			}
			return response.json()
		}).catch(() => {
			this.setState({
				value: 'no greeting - cb catch'
			})
		})
	}
};

export default MsgActions;