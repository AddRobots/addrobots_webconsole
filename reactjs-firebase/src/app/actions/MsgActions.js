import {VcuWrapper, Drive, Halt} from "../../protobuf-msgs/VehicleMsg_pb";
import base64js from "base64-js";
import {firebaseLogin} from "../../firebase/FirebaseLogin";

var MsgActions = {
	execCommand: function(secretKey, robotId, command) {
		var vcuMsg;
		if (command.drive !== undefined) {
			var driveCmd = new Drive();
			driveCmd.setAcceleration(command.drive.acceleration);
			driveCmd.setDistance(command.drive.distance);
			driveCmd.setVelocity(command.drive.velocity);
			driveCmd.setDirection(command.drive.direction);
			driveCmd.setEdgedistance(command.drive.edgeDistance);

			vcuMsg = new VcuWrapper();
			vcuMsg.setDrive(driveCmd);
		} else if (command.halt !== undefined) {
			var haltCmd = new Halt();

			vcuMsg = new VcuWrapper();
			vcuMsg.setHalt(haltCmd);
		}

		let payload = {
			"message": {
				"token": "d7aHAqWM1F4:APA91bHgQ6oHluURA1-UDqmMEY2dpIlGlhtJj4jHK8oPAXic9elbuW78Jw37sBwVVKAL_iFG6xJCgRc-GXrOZrIhulSKmDtTdZacrTnSrOhXsmNhbcNAq6NsNsmT335XvXqXKf90KYCl",
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
	}
};

export default MsgActions;