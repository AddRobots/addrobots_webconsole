import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let config = {
	apiKey: "AIzaSyBgD43_h1Wd00a-DtjNCFuXX8s5L3lVDNQ",
	authDomain: "addrobots.firebaseapp.com",
	databaseURL: "https://addrobots.firebaseio.com",
	projectId: "addrobots",
	storageBucket: "addrobots.appspot.com",
	messagingSenderId: "185039441716"
};

class Firebase {

	constructor() {
		this.user = null;
		this.oAuthToken = null;
	}

	logout = () => {
		firebaseAuth.signOut()
			.then(() => {
				this.user = null;
				this.oAuthToken = null;
			});
	};

	login = () => {
		googleProvider.setCustomParameters({
			prompt: 'select_account'
		});
		firebaseAuth.signInWithPopup(googleProvider)
			.then((result) => {
				this.user = result.user;
				this.fetchOAuthToken();
			});
	};

	isLoggedIn = () => {
		return (this.user !== null);
	};

	fetchOAuthToken = () => {
		firebaseAuth.currentUser.getIdToken()
			.then(token => {
				return fetch('https://us-central1-addrobots.cloudfunctions.net/getOAuthToken', {
					method: 'GET',
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': 'Bearer ' + token,
					}
				}).then(response => {
					if (response.status >= 400) {
						throw new Error('auth error - response code: ' + response.status);
					}
					response.text().then(secret => {
						if (secret !== null) {
							this.oAuthToken = secret;
						}
					});

				}).catch(error => {
					console.log('auth error: ' + error);
				})

			})
			.catch();
	};

	getOAuthToken = () => {
		return this.oAuthToken;
	};

	getUser = () => {
		return this.user;
	}
}

export const firebaseApp = firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export const firebaseUtils = new Firebase();
export const firestoreDb = firebase.firestore();

const settings = {timestampsInSnapshots: true};
firestoreDb.settings(settings);

firebaseUtils.login();