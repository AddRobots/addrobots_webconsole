goog.require('goog.base');
goog.require('goog.net.XhrIo');
goog.require('goog.log');
goog.require('goog.crypt.base64');
goog.require("proto.VcuWrapperMessage");
goog.require("proto.Drive");
var storage = firebase.storage();
var storageRef = storage.ref();
var input = document.getElementById("command");
var signOutBtn = document.getElementById("sign-out");
var commandList = document.getElementById("command-list");
var emergencyStop = document.getElementById("emergency-stop");

function testUser() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var email = firebase.auth().currentUser.email;
			emailReady = email.replace(/[@\/\\#,+()$~%.'":*?<>{}]/g,'');
		} else {
			window.location = "/addrobots_webconsole/robotdemo_login/index.html";
		}
	});
}
setInterval(testUser, 100);
function signOut() {
	firebase.auth().signOut().then(function() {
	}, function(error) {
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
//
//
//
//
//
//
//
// whoops
function listCommand() {
  	var d = new Date();
	var year = d.getFullYear();
	var day = d.getDay();
	var month = d.getMonth();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	timestamp = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
	var command = document.getElementById("command").value;
	commandList.innerHTML += "<p style='font-size: .9em; line-height: 10px;'>" + timestamp + " " + command + "</p>";
	commandList.scrollTop = 2000000;
	
	firebase.auth().onAuthStateChanged(function() {
		var user = firebase.auth().currentUser;
		var email = user.email;
		emailReady = email.replace(/[@\/\\#,+()$~%.'":*?<>{}]/g, '');
	});
		var userRef = firebase.database().ref("/userdata/" + emailReady);
		  userRef.push(timestamp + " " + command);
		  console.log(userRef);
}
function testClick() {
	var command = document.getElementById("command");
	if (event.target.className == "listed-command") {
	  	command.value = event.target.innerHTML;
	}
}
document.body.addEventListener("click", testClick);
var secretKey = document.getElementById("secret-key").value;
var robotId = document.getElementById("robot-id").value;
var command = JSON.parse(document.getElementById("command").value);
function runCommand(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		swal({
			title: "Command ran!",
			text: "Command has been successfully run!",
			timer: 500,
			type: "success",
		});
		secretKey = document.getElementById("secret-key").value;
		robotId = document.getElementById("robot-id").value;
		command = JSON.parse(document.getElementById("command").value);

		execCommand(secretKey, robotId, command);
	}
}

function runHaltCommand() {
	var commandInput = document.getElementById("command");
	secretKey = document.getElementById("secret-key").value;
	robotId = document.getElementById("robot-id").value;
	command = { "halt" : {}};
	commandInput.value = '{ "halt" : {}}';
	execCommand(secretKey, robotId, command);


}

function execCommand(secretKey, robotId, command) {
	    listCommand();
		var xhr = new goog.net.XhrIo();

		goog.events.listen(xhr, goog.net.EventType.COMPLETE, function(e) {
			var xhr = /** @type {goog.net.XhrIo} */
				(e.target);
			var response = xhr.getResponse();
			// alert(response['content']);
		});

		var vcuMsg;
		if (command.drive !== undefined) {
			var driveCmd = new proto.Drive();
			driveCmd.setAcceleration(command.drive.acceleration);
			driveCmd.setDistance(command.drive.distance);
			driveCmd.setVelocity(command.drive.velocity);
			driveCmd.setDirection(command.drive.direction);
			driveCmd.setEdgedistance(command.drive.edgeDistance);

			vcuMsg = new proto.VcuWrapperMessage();
			vcuMsg.setDrive(driveCmd);
		} else if (command.halt !== undefined) {
			var haltCmd = new proto.Drive();

			vcuMsg = new proto.VcuWrapperMessage();
			vcuMsg.setHalt(haltCmd);
		}

		xhr.headers.set('content-type', 'application/json');
		xhr.headers.set('authorization', 'key=' + secretKey);
		var message = {
			"to" : "",
			"priority" : "high",
			"notification" : {
				"title" : "VCU_CMD",
				"text" : "VCU_CMD"
			},
			"data" : {
				"VCU_CMD" : ""
			},
			"time_to_live" : 0
		};
		message.to = robotId;

		// We need to encode the raw bytes as UTF-8 so that they conduct across Firebase Cloud Messaging.
		var bytes = vcuMsg.serializeBinary();
		var cmdData = goog.crypt.base64.encodeByteArray(bytes);
		message.data.VCU_CMD = cmdData;
		xhr.send("https://gcm-http.googleapis.com/gcm/send", 'POST', JSON.stringify(message));
}
function execCommandFromButton() {
	execCommand(secretKey, robotId, command);
}
document.body.addEventListener("keypress", runCommand);
var submitBtn = document.getElementById("submit");
var stopBtn = document.getElementById("emergency-stop");
stopBtn.addEventListener("click", runHaltCommand);
submitBtn.addEventListener("click", execCommandFromButton);
function loadCommands() {
  
}
setInterval(loadCommands, 10);