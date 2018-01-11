import firebase from 'firebase'

let config = {
	apiKey: "AIzaSyDmInOEZxDcox4QLqjLcuPOViaSAdppMG0",
	authDomain: "addrobots-console.firebaseapp.com",
	databaseURL: "https://addrobots-console.firebaseio.com",
	projectId: "addrobots-console",
	storageBucket: "addrobots-console.appspot.com",
	messagingSenderId: "852102904693"
};
var firebaseApp = firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export default firebaseApp;