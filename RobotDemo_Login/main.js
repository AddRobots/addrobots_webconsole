var ref = firebase.database().ref();
var username = document.getElementById("username");
var password = document.getElementById("password");
var loginBtn = document.getElementById("login-btn");
function signIn() {
  firebase.auth().signInWithEmailAndPassword(username.value, password.value).catch(function(error) {
    console.error(error);
    alert(error);
  });
}
loginBtn.addEventListener("click", signIn);