var nosignin = 0;
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var nosignin = 0;
	} else {
		var nosignin = 1;
	}
	});
var ref = firebase.database().ref();
var username = document.getElementById("username");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");
var signupBtn = document.getElementById("signup-btn");
function signUp() {
  if (password.value == confirmPassword.value) {

  firebase.auth().createUserWithEmailAndPassword(username.value, password.value).catch(function(error) {
    alert(error);
  });
	  if (nosignin == 1) {
	  	console.log("yeah!");
		  nosignin = 0;
	  }
	  } else {
	  alert("Error: The password do not match.");
  }
}
signupBtn.addEventListener("click", signUp);
function testUser() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {

		} else {

		}
		;
	});
}
setInterval(testUser, 100);
