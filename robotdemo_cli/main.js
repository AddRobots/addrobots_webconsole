goog.require('goog.base');
goog.require('goog.net.XhrIo');
goog.require('goog.log');
goog.require("proto.VcuWrapperMessage");
goog.require("proto.Drive");

var storage = firebase.storage();
var storageRef = storage.ref();
var input = document.getElementById("command");
var signOutBtn = document.getElementById("sign-out");
var commandList = document.getElementById("command-list");
var emergencyStop = document.getElementById("emergency-stop");
function testUser() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {

		} else {
			window.location = "/addrobots_webconsole/robotdemo_login/index.html";
		}
	});
}
setInterval(testUser, 100);
function signOut() {
	firebase.auth().signOut().then(function () {
	}, function (error) {
	});
}
signOutBtn.addEventListener("click", signOut);
// The actual CLI code is below here. PS are you a cat hater? if so you must die
// PPS I used the OLD firebase. it was still good
// PPPS You should not hate cats if you hate them
// PPPPS There will be no more comments after this one
// Except for this one
// And this one
// :)
function runCommand(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		console.log("I ran the command yay i ran the command i love cats or did i run the command?");

		var secretKey = document.getElementById("secret-key").value;
		var robotId = document.getElementById("robot-id").value;
		var command = document.getElementById("command").value;

		var xhr = new goog.net.XhrIo();

		goog.events.listen(xhr, goog.net.EventType.COMPLETE, function (e) {
			var xhr = /** @type {goog.net.XhrIo} */ (e.target);
			var response = xhr.getResponse();
			alert(response['content']);
		});

		var drive = new proto.Drive();
		drive.setAcceleration(0.025);
		drive.setDistance(1.0);
		drive.setVelocity(1.5);
		drive.setDirection("FWD");
		drive.setEdgedistance(0.0);

		var vcuMsg = new proto.VcuWrapperMessage();
		vcuMsg.setDrive(drive);

		xhr.headers.set('content-type', 'application/json');
		xhr.headers.set('authorization', 'key=' + secretKey);
		var message = {
			"to" : "",
			"priority": "high",
			"notification": {
				"title": "VCU_CMD",
				"text": "VCU_CMD"
			},
			"data": {
				"VCU_CMD": "",
			},
			"time_to_live": 0
		}
		message.to = robotId;
		message.data.VCU_CMD = binaryArrayToString(vcuMsg.serializeBinary());
		xhr.send("https://gcm-http.googleapis.com/gcm/send", 'POST', JSON.stringify(message));
	}
}

function binaryArrayToString(byteArray) {
	var result = "";
	for (var i = 0; i < byteArray.length; i++) {
		result += String.fromCharCode(byteArray[i]);
	}
	return result;
}

document.body.addEventListener("keypress", runCommand);
var submit = document.getElementById("submit");