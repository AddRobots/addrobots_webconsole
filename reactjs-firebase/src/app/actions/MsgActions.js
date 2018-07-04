import {VehicleMsg} from "../../protobuf-msgs/VehicleMsg_pb";
import base64js from "base64-js";
import {firebaseUtils} from "../../firebase/Firebase";

var MsgActions = {
	execCommand: function(secretKey, robotId, command) {
		var vcuMsg;
		if (command.drive !== undefined) {
			var driveCmd = new VehicleMsg.Drive();
			driveCmd.setAcceleration(command.drive.acceleration);
			driveCmd.setDistance(command.drive.distance);
			driveCmd.setVelocity(command.drive.velocity);
			driveCmd.setDirection(command.drive.direction);
			driveCmd.setEdgeDistance(command.drive.edgeDistance);

			vcuMsg = new VehicleMsg();
			vcuMsg.setDrive(driveCmd);
		} else if (command.halt !== undefined) {
			var haltCmd = new VehicleMsg.Halt();

			vcuMsg = new VehicleMsg();
			vcuMsg.setHalt(haltCmd);
		}

		let payload = {
			"message": {
				"token": "fXruUeeX7Kk:APA91bHqTpnT5sEd5EebNTT7iSAPr8dxaQxbnt_ZRsGpNF9P6R64SMQFT-CJEufGpvFhyv1eUjRPjNrc7nTWUJIp4xPJPbQWcKxQOglbe1gCh5neQ1GyQiKxcPB817MULdBffYQXvdGm",
				"data": {
					"VCU_CMD": ""
				},
			}
		};
		var bytes = vcuMsg.serializeBinary();
		var cmdData = base64js.fromByteArray(bytes);
		payload.message.data.VCU_CMD = cmdData;
		let body = JSON.stringify(payload);
		console.log('body: ' + body);

		return fetch('https://fcm.googleapis.com/v1/projects/addrobots-console/messages:send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + firebaseUtils.getOAuthToken(),
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
	}
};

export default MsgActions;