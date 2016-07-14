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
  }
}
signupBtn.addEventListener("click", signUp);